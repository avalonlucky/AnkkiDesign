const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');
const os = require('os');
const PptxGenJS = require('pptxgenjs');

loadEnvFile();

const PORT = Number(process.env.API_PORT || 3001);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const OPENAI_TEXT_MODEL = process.env.OPENAI_TEXT_MODEL || 'gpt-4o-mini';

const videoSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string' },
    summary: { type: 'string' },
    duration: { type: 'string' },
    ratio: { type: 'string' },
    style: { type: 'string' },
    outputs: {
      type: 'array',
      items: { type: 'string' },
    },
    scenes: {
      type: 'array',
      minItems: 4,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: { type: 'string' },
          seconds: { type: 'string' },
          visual: { type: 'string' },
          narration: { type: 'string' },
        },
        required: ['title', 'seconds', 'visual', 'narration'],
      },
    },
  },
  required: ['title', 'summary', 'duration', 'ratio', 'style', 'outputs', 'scenes'],
};

const pptSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string' },
    topic: { type: 'string' },
    tone: { type: 'string' },
    audience: { type: 'string' },
    pageCount: { type: 'number' },
    sections: {
      type: 'array',
      items: { type: 'string' },
    },
    slides: {
      type: 'array',
      minItems: 6,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: { type: 'string' },
          layout: { type: 'string' },
          summary: { type: 'string' },
        },
        required: ['title', 'layout', 'summary'],
      },
    },
  },
  required: ['title', 'topic', 'tone', 'audience', 'pageCount', 'sections', 'slides'],
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  if (req.method === 'GET' && url.pathname === '/api/health') {
    return sendJson(res, 200, {
      ok: true,
      provider: 'openai-compatible',
      configured: Boolean(OPENAI_API_KEY),
      model: OPENAI_TEXT_MODEL,
    });
  }

  if (req.method === 'POST' && url.pathname === '/api/generate/video') {
    try {
      ensureApiKey();
      const payload = await readJsonBody(req);
      const result = await generateVideoProject(payload);
      return sendJson(res, 200, result);
    } catch (error) {
      return sendError(res, error);
    }
  }

  if (req.method === 'POST' && url.pathname === '/api/generate/ppt') {
    try {
      ensureApiKey();
      const payload = await readJsonBody(req);
      const result = await generatePptProject(payload);
      return sendJson(res, 200, result);
    } catch (error) {
      return sendError(res, error);
    }
  }

  if (req.method === 'POST' && url.pathname === '/api/export/pptx') {
    try {
      const payload = await readJsonBody(req);
      const { fileName, buffer } = await exportPptx(payload);
      return sendBinary(res, 200, buffer, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      });
    } catch (error) {
      return sendError(res, error);
    }
  }

  return sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`[ankki-api] listening on http://localhost:${PORT}`);
});

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function ensureApiKey() {
  if (!OPENAI_API_KEY) {
    const error = new Error('未检测到 OPENAI_API_KEY，请先复制 .env.example 为 .env 并填入可用密钥。');
    error.statusCode = 500;
    throw error;
  }
}

function sendJson(res, statusCode, payload) {
  const body = Buffer.from(JSON.stringify(payload));
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Content-Length': body.length,
  });
  res.end(body);
}

function sendBinary(res, statusCode, buffer, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Content-Length': buffer.length,
    ...extraHeaders,
  });
  res.end(buffer);
}

function sendError(res, error) {
  const statusCode = error.statusCode || 500;
  const message = error.message || '服务暂时不可用';
  return sendJson(res, statusCode, { error: message });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let rawBody = '';

    req.on('data', (chunk) => {
      rawBody += chunk;
    });

    req.on('end', () => {
      try {
        resolve(rawBody ? JSON.parse(rawBody) : {});
      } catch (error) {
        reject(new Error('请求体不是合法的 JSON。'));
      }
    });

    req.on('error', reject);
  });
}

async function generateVideoProject(payload) {
  const cleaned = {
    idea: String(payload.idea || '').trim(),
    audience: String(payload.audience || '').trim(),
    highlight: String(payload.highlight || '').trim(),
    duration: String(payload.duration || '').trim(),
    ratio: String(payload.ratio || '').trim(),
    style: String(payload.style || '').trim(),
    voice: String(payload.voice || '').trim(),
  };

  if (!cleaned.idea) {
    const error = new Error('视频主题不能为空。');
    error.statusCode = 400;
    throw error;
  }

  const prompt = [
    `视频主题：${cleaned.idea}`,
    `目标受众：${cleaned.audience || '未指定'}`,
    `核心卖点：${cleaned.highlight || '未指定'}`,
    `目标时长：${cleaned.duration || '45秒'}`,
    `画面比例：${cleaned.ratio || '16:9'}`,
    `视觉风格：${cleaned.style || '专业科技'}`,
    `旁白设定：${cleaned.voice || '专业旁白'}`,
    '请输出中文，适合企业宣传、品牌发布或营销传播场景。',
  ].join('\n');

  const result = await requestStructuredResponse({
    schemaName: 'ankki_video_storyboard',
    schema: videoSchema,
    system: '你是一名企业品牌视频导演与文案总监。请输出可直接进入创意评审的分镜脚本，内容具体、节奏清晰、语言专业，避免空泛描述。',
    prompt,
  });

  return {
    id: Date.now(),
    status: 'ready',
    updatedAt: '刚刚生成',
    prompt: cleaned.idea,
    ...result,
  };
}

async function generatePptProject(payload) {
  const cleaned = {
    topic: String(payload.topic || '').trim(),
    audience: String(payload.audience || '').trim(),
    goal: String(payload.goal || '').trim(),
    pageCount: Number(payload.pageCount || 12),
    tone: String(payload.tone || '').trim(),
    sectionsText: String(payload.sectionsText || '').trim(),
  };

  if (!cleaned.topic) {
    const error = new Error('演示主题不能为空。');
    error.statusCode = 400;
    throw error;
  }

  const prompt = [
    `演示主题：${cleaned.topic}`,
    `汇报对象：${cleaned.audience || '未指定'}`,
    `目标类型：${cleaned.goal || '方案提案'}`,
    `目标页数：${cleaned.pageCount || 12}`,
    `视觉语气：${cleaned.tone || '专业科技'}`,
    `必含章节：${cleaned.sectionsText || '请自动规划章节'}`,
    '请输出中文，适合企业汇报、方案提案或大会演讲，强调页与页之间的逻辑承接。',
  ].join('\n');

  const result = await requestStructuredResponse({
    schemaName: 'ankki_ppt_outline',
    schema: pptSchema,
    system: '你是一名资深咨询顾问与演示设计总监。请输出结构化的 PPT 大纲，每页都要明确标题、推荐版式和一句页面摘要，保证逻辑完整且适合继续深化设计。',
    prompt,
  });

  return {
    id: Date.now(),
    status: 'ready',
    updatedAt: '刚刚生成',
    ...result,
  };
}

async function exportPptx(project) {
  const slides = Array.isArray(project.slides) ? project.slides : [];
  if (!project.title || slides.length === 0) {
    const error = new Error('当前没有可导出的 PPT 内容，请先生成 Deck。');
    error.statusCode = 400;
    throw error;
  }

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Ankki Design';
  pptx.company = 'Ankki Design';
  pptx.subject = project.topic || project.title;
  pptx.title = project.title;
  pptx.lang = 'zh-CN';
  pptx.theme = {
    headFontFace: 'Aptos',
    bodyFontFace: 'Aptos',
    lang: 'zh-CN',
  };
  pptx.defineSlideMaster({
    title: 'ANKKI_MASTER',
    background: { color: 'F8FAFC' },
    objects: [
      { rect: { x: 0, y: 0, w: 13.333, h: 0.4, fill: { color: 'D97757' }, line: { color: 'D97757' } } },
      { text: { text: 'Ankki Design', options: { x: 0.7, y: 7.1, w: 2.4, h: 0.25, fontSize: 9, color: '94A3B8', fontFace: 'Aptos' } } },
      { text: { text: project.title, options: { x: 9.3, y: 7.08, w: 3.2, h: 0.25, align: 'right', fontSize: 9, color: '94A3B8', fontFace: 'Aptos' } } },
    ],
  });

  const titleSlide = pptx.addSlide('ANKKI_MASTER');
  titleSlide.background = { color: 'FFF7F2' };
  titleSlide.addShape(pptx.ShapeType.rect, {
    x: 0.7,
    y: 0.9,
    w: 5.2,
    h: 5.4,
    fill: { color: 'D97757', transparency: 8 },
    line: { color: 'D97757', transparency: 100 },
    radius: 0.18,
  });
  titleSlide.addText(project.title, {
    x: 0.95,
    y: 1.3,
    w: 4.6,
    h: 1.6,
    fontFace: 'Aptos Display',
    fontSize: 24,
    bold: true,
    color: 'FFFFFF',
    valign: 'mid',
  });
  titleSlide.addText(project.topic || project.title, {
    x: 6.3,
    y: 1.45,
    w: 5.9,
    h: 0.6,
    fontFace: 'Aptos Display',
    fontSize: 24,
    bold: true,
    color: '0F172A',
  });
  titleSlide.addText(`汇报对象：${project.audience || '未指定'}\n视觉风格：${project.tone || '专业科技'}\n建议页数：${project.pageCount || slides.length} 页`, {
    x: 6.35,
    y: 2.4,
    w: 5.4,
    h: 1.4,
    fontFace: 'Aptos',
    fontSize: 14,
    color: '475569',
    breakLine: false,
    valign: 'top',
    margin: 0,
  });
  titleSlide.addText('AI 自动生成的结构化演示稿，可继续由设计师深化排版。', {
    x: 6.35,
    y: 4.35,
    w: 5.4,
    h: 0.5,
    fontFace: 'Aptos',
    fontSize: 12,
    color: '64748B',
  });

  slides.forEach((slideData, index) => {
    const slide = pptx.addSlide('ANKKI_MASTER');
    const accentPalette = ['D97757', '2563EB', '0F766E', '7C3AED', 'EA580C', '16A34A'];
    const accentColor = accentPalette[index % accentPalette.length];

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.7,
      y: 0.7,
      w: 12,
      h: 5.95,
      rectRadius: 0.12,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', pt: 1 },
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.95,
      y: 0.95,
      w: 2.1,
      h: 0.36,
      rectRadius: 0.08,
      fill: { color: `${accentColor}` },
      line: { color: `${accentColor}` },
    });
    slide.addText(slideData.title, {
      x: 0.95,
      y: 1.45,
      w: 6.8,
      h: 0.6,
      fontFace: 'Aptos Display',
      fontSize: 22,
      bold: true,
      color: '0F172A',
    });
    slide.addText(slideData.layout || '内容页', {
      x: 10.15,
      y: 1.48,
      w: 1.5,
      h: 0.32,
      align: 'center',
      fontFace: 'Aptos',
      fontSize: 10,
      color: accentColor,
      fill: { color: 'F8FAFC' },
      line: { color: accentColor, pt: 0.8 },
      margin: 0.06,
    });
    slide.addText(slideData.summary || '', {
      x: 0.98,
      y: 2.25,
      w: 6.55,
      h: 2.35,
      fontFace: 'Aptos',
      fontSize: 17,
      color: '334155',
      breakLine: false,
      valign: 'top',
      margin: 0,
      fit: 'shrink',
    });

    slide.addText([
      { text: '页面建议\n', options: { bold: true, color: '0F172A' } },
      { text: `1. 用 ${slideData.layout || '图文结合'} 方式组织内容\n2. 重点突出和主题的业务价值\n3. 收尾处给出下一步行动或结论` },
    ], {
      x: 8.1,
      y: 2.2,
      w: 3.2,
      h: 1.95,
      fontFace: 'Aptos',
      fontSize: 11.5,
      color: '475569',
      fill: { color: 'F8FAFC' },
      line: { color: 'E2E8F0', pt: 1 },
      margin: 0.16,
      breakLine: false,
      valign: 'top',
      fit: 'shrink',
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 8.1,
      y: 4.55,
      w: 3.15,
      h: 0,
      line: { color: 'E2E8F0', pt: 1.2 },
    });
    slide.addText(`No.${String(index + 1).padStart(2, '0')}`, {
      x: 10.4,
      y: 5.3,
      w: 0.9,
      h: 0.3,
      fontFace: 'Aptos',
      fontSize: 18,
      bold: true,
      color: accentColor,
      align: 'right',
    });
  });

  const outputPath = path.join(os.tmpdir(), `ankki-${Date.now()}.pptx`);
  await pptx.writeFile({ fileName: outputPath });
  const buffer = fs.readFileSync(outputPath);
  fs.unlinkSync(outputPath);

  return {
    fileName: `${sanitizeFileName(project.title || 'ankki-deck')}.pptx`,
    buffer,
  };
}

async function requestStructuredResponse({ schemaName, schema, system, prompt }) {
  const response = await fetch(`${OPENAI_BASE_URL}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_TEXT_MODEL,
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: system }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: prompt }],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: schemaName,
          strict: true,
          schema,
        },
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || '模型调用失败，请稍后再试。';
    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }

  const outputText = extractOutputText(data);
  if (!outputText) {
    throw new Error('模型没有返回可解析的内容。');
  }

  try {
    return JSON.parse(outputText);
  } catch (error) {
    throw new Error('模型返回的数据格式异常，暂时无法解析。');
  }
}

function extractOutputText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) {
    return data.output_text;
  }

  const outputs = Array.isArray(data.output) ? data.output : [];
  for (const item of outputs) {
    const contents = Array.isArray(item.content) ? item.content : [];
    for (const content of contents) {
      if (typeof content.text === 'string' && content.text.trim()) {
        return content.text;
      }
    }
  }

  return '';
}

function sanitizeFileName(value) {
  return String(value)
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, '-')
    .slice(0, 60);
}
