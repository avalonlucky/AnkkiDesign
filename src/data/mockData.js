import { FolderOpen, Star, FileText, Presentation, Bookmark, Shield, Image, Type, ImageIcon, GitBranch, PieChart } from 'lucide-react';

// PPT整套模板数据
export const pptCompleteTemplates = [
  { id: 1, name: '经管会汇报模版', desc: '适合汇报/述职/竞聘（逻辑框架+数据图表+...', views: '7.1W', thumbnail: '📊', tag: '热门', pages: 200,
    previewPages: [
      { title: '封面', content: '经管会工作汇报', color: '#1e40af' },
      { title: '目录', content: '01 工作回顾\n02 数据分析\n03 问题总结\n04 下步计划', color: '#1e3a8a' },
      { title: '工作回顾', content: '本季度完成销售额 ¥2,580万\n同比增长 23.5%', color: '#1d4ed8' },
      { title: '数据分析', content: '市场份额提升至 18.6%\n客户满意度 96.2%', color: '#2563eb' },
      { title: '结尾', content: '感谢聆听', color: '#1e40af' },
    ]
  },
  { id: 2, name: '月度/季度汇报模版', desc: '月度季度工作总结汇报模版｜数据可视化...', views: '4.2W', thumbnail: '📅', tag: '热门', pages: 200,
    previewPages: [
      { title: '封面', content: '2024年Q4季度汇报', color: '#047857' },
      { title: '本月概览', content: '完成率 98.5%\n新增客户 126家', color: '#059669' },
      { title: '业绩对比', content: '环比增长 15%\n同比增长 32%', color: '#10b981' },
      { title: '下月计划', content: '目标销售额 ¥500万\n拓展新市场 3个', color: '#047857' },
      { title: '结尾', content: '谢谢大家', color: '#065f46' },
    ]
  },
  { id: 3, name: '销售年会汇报模版', desc: '年度销售总结｜业绩展示｜颁奖典礼...', views: '8.3W', thumbnail: '🏆', tag: '热门', pages: 150,
    previewPages: [
      { title: '封面', content: '2024年度销售年会', color: '#b91c1c' },
      { title: '年度回顾', content: '全年销售额突破 ¥1.2亿\n团队人数增长 50%', color: '#dc2626' },
      { title: '销售冠军', content: '🥇 张三 ¥1,580万\n🥈 李四 ¥1,230万\n🥉 王五 ¥980万', color: '#ef4444' },
      { title: '明年目标', content: '销售目标 ¥2亿\n市场扩张 5个城市', color: '#b91c1c' },
      { title: '结尾', content: '共创辉煌', color: '#991b1b' },
    ]
  },
  { id: 4, name: '战略规划汇报模版', desc: '企业战略规划｜发展蓝图｜目标分解...', views: '29.2W', thumbnail: '🎯', tag: '热门', pages: 500,
    previewPages: [
      { title: '封面', content: '2025-2030战略规划', color: '#7c3aed' },
      { title: '愿景使命', content: '成为行业领先的数据安全服务商', color: '#8b5cf6' },
      { title: '战略目标', content: '营收增长 300%\n市场份额 25%\n客户数量 10,000+', color: '#a78bfa' },
      { title: '实施路径', content: '第一阶段：夯实基础\n第二阶段：快速扩张\n第三阶段：行业领先', color: '#7c3aed' },
      { title: '结尾', content: '携手共进', color: '#6d28d9' },
    ]
  },
  { id: 5, name: '项目进度汇报模版', desc: '项目管理｜进度跟踪｜里程碑展示...', views: '3.8W', thumbnail: '📋', tag: '推荐', pages: 50,
    previewPages: [
      { title: '封面', content: '项目进度汇报', color: '#0891b2' },
      { title: '项目概览', content: '项目名称：数据平台升级\n总工期：6个月\n当前进度：65%', color: '#06b6d4' },
      { title: '里程碑', content: '✅ 需求分析\n✅ 系统设计\n🔄 开发测试\n⏳ 上线部署', color: '#22d3ee' },
      { title: '风险预警', content: '资源风险：中\n技术风险：低\n进度风险：低', color: '#0891b2' },
      { title: '结尾', content: '项目顺利推进中', color: '#0e7490' },
    ]
  },
  { id: 6, name: '产品发布汇报模版', desc: '新品发布｜产品介绍｜功能亮点...', views: '5.6W', thumbnail: '🚀', tag: '推荐', pages: 200,
    previewPages: [
      { title: '封面', content: '新产品发布会', color: '#ea580c' },
      { title: '产品介绍', content: '昂楷数据安全平台 V3.0\n全新架构 · 极致性能', color: '#f97316' },
      { title: '核心功能', content: '🔒 数据加密\n🛡️ 访问控制\n📊 审计分析\n🚨 风险预警', color: '#fb923c' },
      { title: '技术优势', content: '性能提升 200%\n部署时间缩短 50%', color: '#ea580c' },
      { title: '结尾', content: '即刻体验', color: '#c2410c' },
    ]
  },
  { id: 7, name: '技术方案汇报模版', desc: '技术架构｜解决方案｜实施方案...', views: '2.1W', thumbnail: '💻', tag: '推荐', pages: 150,
    previewPages: [
      { title: '封面', content: '技术方案汇报', color: '#4f46e5' },
      { title: '需求分析', content: '业务痛点分析\n技术需求梳理', color: '#6366f1' },
      { title: '技术架构', content: '微服务架构\n分布式部署\n高可用设计', color: '#818cf8' },
      { title: '实施计划', content: '第1周：环境搭建\n第2-4周：核心开发\n第5周：测试上线', color: '#4f46e5' },
      { title: '结尾', content: '技术驱动创新', color: '#4338ca' },
    ]
  },
  { id: 8, name: '市场分析汇报模版', desc: '市场调研｜竞品分析｜趋势洞察...', views: '1.8W', thumbnail: '📈', tag: '推荐', pages: 150,
    previewPages: [
      { title: '封面', content: '市场分析报告', color: '#0d9488' },
      { title: '市场规模', content: '2024年市场规模 ¥500亿\n年增长率 18.5%', color: '#14b8a6' },
      { title: '竞品分析', content: '竞品A：市场份额 22%\n竞品B：市场份额 18%\n我司：市场份额 15%', color: '#2dd4bf' },
      { title: '机会洞察', content: '新兴市场机会\n技术创新方向\n客户需求变化', color: '#0d9488' },
      { title: '结尾', content: '把握机遇', color: '#0f766e' },
    ]
  },
];

// PPT单页版式数据
export const pptSingleTemplates = [
  { id: 1, name: '封面页304-昂楷科技解决方案', views: '1W', thumbnail: '🌆', type: 'cover', previewContent: { title: '数据安全解决方案', subtitle: '昂楷科技', color: '#1e40af' } },
  { id: 2, name: '封面页303-昂楷科技解决方案', views: '2417', thumbnail: '⚽', type: 'cover', previewContent: { title: '智能运维平台', subtitle: 'Smart Operations', color: '#047857' } },
  { id: 3, name: '封面页302-昂楷科技解决方案', views: '1.1W', thumbnail: '🌾', type: 'cover', previewContent: { title: '企业数字化转型', subtitle: 'Digital Transformation', color: '#b45309' } },
  { id: 4, name: '封面页301-昂楷科技解决方案', views: '6265', thumbnail: '📖', type: 'cover', previewContent: { title: '年度工作汇报', subtitle: '2024 Annual Report', color: '#7c3aed' } },
  { id: 5, name: '封面页300-昂楷科技解决方案', views: '4780', thumbnail: '🎯', type: 'cover', previewContent: { title: '战略规划方案', subtitle: 'Strategic Planning', color: '#dc2626' } },
  { id: 6, name: '一段内容页036-昂楷科技解决方案', views: '2613', thumbnail: '🏢', type: 'paragraph', previewContent: { title: '公司简介', content: '昂楷科技成立于2010年，是国内领先的数据安全服务商，专注于为企业提供全方位的数据保护解决方案。', color: '#0891b2' } },
  { id: 7, name: '一段内容页035-昂楷科技解决方案', views: '1217', thumbnail: '🏯', type: 'paragraph', previewContent: { title: '核心优势', content: '• 10年+行业经验\n• 500+成功案例\n• 7x24小时服务', color: '#ea580c' } },
  { id: 8, name: '一段内容页034-昂楷科技解决方案', views: '2186', thumbnail: '📱', type: 'paragraph', previewContent: { title: '服务范围', content: '数据加密、访问控制、安全审计、风险评估、合规咨询', color: '#4f46e5' } },
  { id: 9, name: '产品展示页032-昂楷科技解决方案', views: '236', thumbnail: '💻', type: 'image', previewContent: { title: '产品展示', content: '昂楷数据安全平台 V3.0', color: '#0d9488' } },
  { id: 10, name: '产品展示页031-昂楷科技解决方案', views: '2076', thumbnail: '🏗️', type: 'image', previewContent: { title: '解决方案架构', content: '分布式部署 · 高可用设计', color: '#6366f1' } },
  { id: 11, name: '时间轴页042-昂楷科技解决方案', views: '2951', thumbnail: '📅', type: 'logic', previewContent: { title: '发展历程', content: '2010 创立\n2015 A轮融资\n2020 上市\n2024 国际化', color: '#8b5cf6' } },
  { id: 12, name: '时间轴页026-昂楷科技解决方案', views: '2082', thumbnail: '📈', type: 'logic', previewContent: { title: '项目里程碑', content: 'Q1 需求分析\nQ2 开发测试\nQ3 试运行\nQ4 正式上线', color: '#059669' } },
  { id: 13, name: '数据图表页066-昂楷科技解决方案', views: '651', thumbnail: '📊', type: 'chart', previewContent: { title: '销售数据', content: '月度销售趋势图\n环比增长 23%', color: '#dc2626' } },
  { id: 14, name: '数据图表页065-昂楷科技解决方案', views: '1814', thumbnail: '📉', type: 'chart', previewContent: { title: '市场份额', content: '饼图展示\n市场占有率 18.6%', color: '#f59e0b' } },
  { id: 15, name: '数据图表页064-昂楷科技解决方案', views: '2126', thumbnail: '🥧', type: 'chart', previewContent: { title: '客户分布', content: '金融 35%\n政府 28%\n企业 37%', color: '#10b981' } },
];

// PPT整套模板分类
export const pptCompleteCategories = [
  { id: 'workplace', name: '职场场景' },
  { id: 'creative', name: '创意主题' },
  { id: 'animation', name: '动画库' },
];

export const pptCompleteSubCategories = {
  workplace: [
    { id: 'report', name: '汇报' },
    { id: 'solution', name: '解决方案' },
    { id: 'product', name: '产品' },
    { id: 'annual', name: '年会' },
    { id: 'company', name: '企业介绍' },
  ],
  creative: [
    { id: 'simple', name: '简约' },
    { id: 'tech', name: '科技' },
    { id: 'chinese', name: '中国风' },
    { id: 'cartoon', name: '卡通' },
  ],
  animation: [
    { id: 'basic', name: '基础动画' },
    { id: 'advanced', name: '高级动画' },
  ],
};

// PPT单页版式分类
export const pptSingleCategories = [
  { id: 'essential', name: '必备', icon: Star },
  { id: 'paragraph', name: '文段排版', icon: Type },
  { id: 'image', name: '图片排版', icon: ImageIcon },
  { id: 'logic', name: '逻辑图示', icon: GitBranch },
  { id: 'chart', name: '数据图表', icon: PieChart },
  { id: 'article', name: '文章专享', icon: FileText },
];

export const pptSingleSubCategories = {
  essential: [
    { id: 'cover', name: '封面' },
    { id: 'toc', name: '目录' },
    { id: 'transition', name: '过渡' },
    { id: 'ending', name: '结尾' },
  ],
  paragraph: [
    { id: '1p', name: '1段' },
    { id: '2p', name: '2段' },
    { id: '3p', name: '3段' },
    { id: '4p', name: '4段' },
    { id: 'multi', name: '多段' },
    { id: 'multiItem', name: '多项' },
  ],
  image: [
    { id: 'product', name: '产品' },
    { id: 'multiImg', name: '多图' },
    { id: 'person', name: '人物' },
    { id: 'screenshot', name: '截图' },
    { id: 'honor', name: '荣誉' },
    { id: 'logo', name: 'logo' },
  ],
  logic: [
    { id: 'timeline', name: '时间轴' },
    { id: 'structure', name: '架构' },
    { id: 'flowchart', name: '逻辑图' },
    { id: 'compare', name: '对比' },
  ],
  chart: [
    { id: 'chartType', name: '图表' },
    { id: 'table', name: '表格' },
    { id: 'data', name: '数据' },
    { id: 'map', name: '地图' },
  ],
  article: [
    { id: 'quote', name: '引用' },
    { id: 'highlight', name: '重点' },
  ],
};

// 模拟素材数据
export const assets = [
  {
    id: 1, name: 'Ankki 品牌标准色卡', type: 'image', format: 'PNG', size: '2.4 MB', version: '3.2',
    updatedAt: '2024-01-15', updatedBy: '张设计', category: 'brand', downloads: 234, thumbnail: '🎨', status: 'approved',
    imagePreview: {
      colors: [
        { name: '主色-橙', hex: '#D97757', rgb: '217, 119, 87' },
        { name: '辅色-蓝', hex: '#1E40AF', rgb: '30, 64, 175' },
        { name: '辅色-绿', hex: '#047857', rgb: '4, 120, 87' },
        { name: '中性-深', hex: '#1A1A1A', rgb: '26, 26, 26' },
        { name: '中性-浅', hex: '#F5F4F2', rgb: '245, 244, 242' },
      ]
    }
  },
  {
    id: 2, name: '2024年度品牌手册', type: 'document', format: 'PDF', size: '18.6 MB', version: '2.0',
    updatedAt: '2024-01-10', updatedBy: '李经理', category: 'guide', downloads: 567, thumbnail: '📘', status: 'approved',
    pdfPreview: {
      totalPages: 48,
      pages: [
        { num: 1, title: '封面', content: 'Ankki Design\n2024 品牌手册' },
        { num: 2, title: '目录', content: '01 品牌理念\n02 视觉识别\n03 应用规范\n04 品牌资产' },
        { num: 3, title: '品牌理念', content: '我们的使命是为企业提供\n最安全可靠的数据保护方案' },
        { num: 4, title: '核心价值观', content: '创新 · 专业 · 信赖 · 共赢' },
        { num: 5, title: '品牌故事', content: '成立于2010年，昂楷科技始终\n专注于数据安全领域...' },
      ]
    }
  },
  {
    id: 3, name: '产品宣传PPT模板', type: 'presentation', format: 'PPTX', size: '5.2 MB', version: '1.5',
    updatedAt: '2024-01-08', updatedBy: '王策划', category: 'template', downloads: 189, thumbnail: '📊', status: 'approved',
    pptPreview: {
      totalSlides: 25,
      slides: [
        { num: 1, title: '封面', content: '昂楷数据安全平台\n产品介绍', color: '#1E40AF' },
        { num: 2, title: '公司简介', content: '国内领先的数据安全服务商\n500+成功案例', color: '#047857' },
        { num: 3, title: '产品概述', content: '全方位数据保护\n一站式安全解决方案', color: '#7C3AED' },
        { num: 4, title: '核心功能', content: '数据加密 | 访问控制\n安全审计 | 风险预警', color: '#DC2626' },
        { num: 5, title: '联系我们', content: 'www.ankki.com\n400-xxx-xxxx', color: '#1E40AF' },
      ]
    }
  },
  {
    id: 4, name: '企业LOGO矢量文件', type: 'image', format: 'SVG', size: '0.8 MB', version: '4.0',
    updatedAt: '2024-01-05', updatedBy: '张设计', category: 'brand', downloads: 892, thumbnail: '✨', status: 'approved',
    svgPreview: {
      variants: [
        { name: '标准版', bg: '#ffffff', color: '#D97757' },
        { name: '深色版', bg: '#1A1A1A', color: '#ffffff' },
        { name: '单色版', bg: '#F5F4F2', color: '#1A1A1A' },
      ]
    }
  },
  {
    id: 5, name: '社交媒体素材包', type: 'archive', format: 'ZIP', size: '45.3 MB', version: '2.1',
    updatedAt: '2024-01-03', updatedBy: '陈运营', category: 'marketing', downloads: 156, thumbnail: '📱', status: 'approved',
    zipPreview: {
      totalFiles: 36,
      files: [
        { name: '微信公众号封面_01.png', size: '1.2 MB', type: 'image' },
        { name: '微信公众号封面_02.png', size: '1.1 MB', type: 'image' },
        { name: '朋友圈海报_01.jpg', size: '2.3 MB', type: 'image' },
        { name: '朋友圈海报_02.jpg', size: '2.1 MB', type: 'image' },
        { name: '微博配图_01.png', size: '0.8 MB', type: 'image' },
        { name: '微博配图_02.png', size: '0.9 MB', type: 'image' },
        { name: '小红书封面_01.jpg', size: '1.5 MB', type: 'image' },
        { name: '抖音封面_01.jpg', size: '1.8 MB', type: 'image' },
        { name: '使用说明.txt', size: '2 KB', type: 'text' },
      ]
    }
  },
  {
    id: 6, name: '财务报表模板', type: 'spreadsheet', format: 'XLSX', size: '1.2 MB', version: '1.8',
    updatedAt: '2024-01-02', updatedBy: '刘财务', category: 'template', downloads: 78, thumbnail: '📈', status: 'approved',
    excelData: {
      sheetName: '2024年度财务报表',
      headers: ['月份', '收入(万元)', '支出(万元)', '利润(万元)', '同比增长'],
      rows: [
        ['1月', '580', '420', '160', '+12%'],
        ['2月', '620', '450', '170', '+15%'],
        ['3月', '750', '520', '230', '+18%'],
        ['4月', '680', '480', '200', '+10%'],
        ['5月', '720', '510', '210', '+14%'],
        ['6月', '890', '580', '310', '+22%'],
      ]
    }
  },
  {
    id: 7, name: '员工手册', type: 'document', format: 'DOCX', size: '3.5 MB', version: '2.3',
    updatedAt: '2024-01-01', updatedBy: '人事部', category: 'internal', downloads: 445, thumbnail: '📄', status: 'approved',
    wordPreview: {
      title: '昂楷科技员工手册',
      totalPages: 32,
      sections: [
        { title: '第一章 公司简介', content: '昂楷科技成立于2010年，是国内领先的数据安全服务商。公司总部位于北京，在上海、深圳、成都设有分公司。' },
        { title: '第二章 企业文化', content: '愿景：成为最值得信赖的数据安全专家\n使命：用技术守护数据价值\n价值观：创新、专业、信赖、共赢' },
        { title: '第三章 规章制度', content: '3.1 考勤制度\n工作时间：9:00-18:00\n午休时间：12:00-13:30\n\n3.2 请假制度\n事假需提前1天申请...' },
        { title: '第四章 薪酬福利', content: '4.1 薪资结构\n基本工资 + 绩效奖金 + 项目奖金\n\n4.2 福利待遇\n五险一金、带薪年假、节日福利...' },
      ]
    }
  },
  {
    id: 8, name: '销售数据统计表', type: 'spreadsheet', format: 'XLSX', size: '2.1 MB', version: '1.0',
    updatedAt: '2024-01-03', updatedBy: '销售部', category: 'internal', downloads: 234, thumbnail: '💰', status: 'approved',
    excelData: {
      sheetName: 'Q4销售数据',
      headers: ['产品名称', '销售数量', '单价(元)', '销售额(万元)', '区域'],
      rows: [
        ['数据安全平台', '126', '50,000', '630', '华东'],
        ['审计系统', '89', '30,000', '267', '华北'],
        ['加密网关', '215', '15,000', '322.5', '华南'],
        ['访问控制系统', '78', '25,000', '195', '西南'],
        ['风险预警平台', '56', '40,000', '224', '华中'],
      ]
    }
  },
  {
    id: 9, name: '产品宣传图-主视觉', type: 'image', format: 'JPG', size: '4.8 MB', version: '1.2',
    updatedAt: '2024-01-06', updatedBy: '张设计', category: 'marketing', downloads: 321, thumbnail: '🖼️', status: 'approved',
    imagePreview: {
      dimensions: '3840 x 2160',
      description: '产品主视觉宣传图，适用于官网首页、宣传册封面等场景',
      colorMode: 'RGB',
    }
  },
  {
    id: 10, name: '技术白皮书', type: 'document', format: 'PDF', size: '8.2 MB', version: '1.0',
    updatedAt: '2024-01-04', updatedBy: '技术部', category: 'guide', downloads: 189, thumbnail: '📑', status: 'approved',
    pdfPreview: {
      totalPages: 28,
      pages: [
        { num: 1, title: '封面', content: '数据安全技术白皮书\n昂楷科技 2024' },
        { num: 2, title: '摘要', content: '本白皮书详细介绍了\n昂楷数据安全解决方案的\n技术架构与实现原理' },
        { num: 3, title: '技术架构', content: '采用分布式微服务架构\n支持高可用、高并发场景' },
        { num: 4, title: '核心算法', content: 'AES-256加密算法\n国密SM4算法支持' },
        { num: 5, title: '部署方案', content: '支持私有云、公有云、混合云\n多种部署模式' },
      ]
    }
  },
  {
    id: 11, name: '昂楷科技解决方案总册', type: 'document', format: 'PDF', size: '12.4 MB', version: '3.0',
    updatedAt: '2024-01-12', updatedBy: '解决方案部', category: 'guide', downloads: 406, thumbnail: '📘', status: 'approved',
    pdfPreview: {
      totalPages: 36,
      pages: [
        { num: 1, title: '封面', content: '昂楷科技\n数据安全解决方案总册' },
        { num: 2, title: '方案地图', content: '数据库审计\n数据脱敏\n运维安全\n风险预警' },
        { num: 3, title: '行业场景', content: '金融、政务、能源、制造\n四大核心行业实践' },
        { num: 4, title: '产品矩阵', content: '平台产品 + 行业方案 + 交付服务' },
        { num: 5, title: '客户价值', content: '降低风险暴露\n提升合规效率\n缩短交付周期' },
      ]
    }
  },
  {
    id: 12, name: '数据库安全审计产品手册', type: 'document', format: 'PDF', size: '9.6 MB', version: '2.4',
    updatedAt: '2024-01-11', updatedBy: '产品市场部', category: 'guide', downloads: 332, thumbnail: '📗', status: 'approved',
    pdfPreview: {
      totalPages: 24,
      pages: [
        { num: 1, title: '封面', content: '数据库安全审计\n产品手册' },
        { num: 2, title: '产品定位', content: '面向核心数据库资产的\n访问审计与风险识别平台' },
        { num: 3, title: '核心能力', content: 'SQL 审计\n账号画像\n异常告警\n行为回溯' },
        { num: 4, title: '部署方式', content: '旁路审计 · 集群扩展\n支持国产化环境' },
      ]
    }
  },
  {
    id: 13, name: '央国企数据安全治理汇报模板', type: 'presentation', format: 'PPTX', size: '7.8 MB', version: '1.7',
    updatedAt: '2024-01-09', updatedBy: '售前团队', category: 'template', downloads: 267, thumbnail: '📊', status: 'approved',
    pptPreview: {
      totalSlides: 18,
      slides: [
        { num: 1, title: '封面', content: '央国企数据安全治理\n年度汇报', color: '#1e3a8a' },
        { num: 2, title: '治理背景', content: '政策趋严 · 资产复杂 · 审计提级', color: '#1d4ed8' },
        { num: 3, title: '建设目标', content: '统一视图\n分级分域\n持续运营', color: '#2563eb' },
        { num: 4, title: '实施路径', content: '制度梳理\n平台建设\n运营闭环', color: '#1e40af' },
      ]
    }
  },
  {
    id: 14, name: '合作伙伴赋能训练营 Deck', type: 'presentation', format: 'PPTX', size: '6.1 MB', version: '1.3',
    updatedAt: '2024-01-07', updatedBy: '渠道运营', category: 'template', downloads: 148, thumbnail: '📙', status: 'approved',
    pptPreview: {
      totalSlides: 22,
      slides: [
        { num: 1, title: '封面', content: '昂楷合作伙伴训练营', color: '#0f766e' },
        { num: 2, title: '伙伴价值', content: '产品赋能 · 售前支撑 · 市场共创', color: '#059669' },
        { num: 3, title: '销售打法', content: '商机识别\n客户画像\n方案落单', color: '#10b981' },
        { num: 4, title: '激励政策', content: '返点政策\n认证体系\n联合营销', color: '#047857' },
      ]
    }
  },
  {
    id: 15, name: '客户成功案例集', type: 'document', format: 'DOCX', size: '4.1 MB', version: '1.6',
    updatedAt: '2024-01-13', updatedBy: '市场部', category: 'internal', downloads: 219, thumbnail: '📄', status: 'approved',
    wordPreview: {
      title: '昂楷科技客户成功案例集',
      totalPages: 26,
      sections: [
        { title: '案例一 金融行业', content: '某股份制银行通过昂楷数据库审计平台，实现关键 SQL 行为可视、异常操作及时告警，审计闭环效率提升 68%。' },
        { title: '案例二 制造行业', content: '某制造集团完成多厂区数据库纳管，建立统一策略模板，支撑跨区域审计联动与集团级报表汇总。' },
        { title: '案例三 政务行业', content: '在政务云项目中完成国产数据库环境兼容适配，满足监管检查和等保合规要求。' },
      ]
    }
  },
  {
    id: 16, name: '售前项目立项模板', type: 'document', format: 'DOCX', size: '2.7 MB', version: '2.1',
    updatedAt: '2024-01-14', updatedBy: '售前管理组', category: 'template', downloads: 173, thumbnail: '📄', status: 'approved',
    wordPreview: {
      title: '售前项目立项模板',
      totalPages: 14,
      sections: [
        { title: '项目概述', content: '记录客户背景、项目目标、关键时间节点和参与角色，帮助团队快速完成项目立项。' },
        { title: '机会评估', content: '包含预算判断、竞争格局、风险项与赢单动作，适配解决方案型销售场景。' },
        { title: '资源申请', content: '用于申请售前、研发、交付、市场等跨部门资源支持。' },
      ]
    }
  },
  {
    id: 17, name: '品牌海报主视觉合集', type: 'image', format: 'JPG', size: '16.8 MB', version: '1.9',
    updatedAt: '2024-01-15', updatedBy: '品牌设计组', category: 'marketing', downloads: 388, thumbnail: '🖼️', status: 'approved',
    imagePreview: {
      dimensions: '4961 x 3508',
      description: '包含新品发布、年度峰会、客户案例和渠道招募等 12 张主视觉海报，可用于官网、会场与社媒传播。',
      colorMode: 'CMYK / RGB',
    }
  },
  {
    id: 18, name: '招投标资质文件包', type: 'archive', format: 'ZIP', size: '58.4 MB', version: '4.2',
    updatedAt: '2024-01-15', updatedBy: '商务支持', category: 'internal', downloads: 92, thumbnail: '📦', status: 'approved',
    zipPreview: {
      totalFiles: 42,
      files: [
        { name: '营业执照.pdf', size: '1.1 MB', type: 'document' },
        { name: '高新技术企业证书.pdf', size: '2.0 MB', type: 'document' },
        { name: 'ISO27001认证.pdf', size: '1.6 MB', type: 'document' },
        { name: '典型案例清单.docx', size: '0.4 MB', type: 'document' },
      ]
    }
  },
  {
    id: 19, name: '行业线索周报数据表', type: 'spreadsheet', format: 'XLSX', size: '1.9 MB', version: '1.1',
    updatedAt: '2024-01-15', updatedBy: '市场运营', category: 'internal', downloads: 141, thumbnail: '📈', status: 'approved',
    excelData: {
      sheetName: '线索周报',
      headers: ['行业', '新增线索', '有效商机', '转方案', '赢单率'],
      rows: [
        ['金融', '36', '18', '9', '22%'],
        ['制造', '28', '14', '7', '18%'],
        ['政务', '22', '10', '5', '16%'],
        ['能源', '16', '8', '4', '19%'],
      ]
    }
  },
  {
    id: 20, name: '昂楷科技品牌应用规范', type: 'document', format: 'PDF', size: '14.2 MB', version: '3.5',
    updatedAt: '2024-01-16', updatedBy: '品牌中心', category: 'brand', downloads: 512, thumbnail: '📕', status: 'approved',
    pdfPreview: {
      totalPages: 42,
      pages: [
        { num: 1, title: '封面', content: '昂楷科技\n品牌应用规范' },
        { num: 2, title: '品牌基调', content: '专业 · 稳健 · 技术可信赖' },
        { num: 3, title: 'Logo 规范', content: '标准比例、保护区与错误示范' },
        { num: 4, title: '版式系统', content: '封面、海报、展板和演示文稿规范' },
      ]
    }
  },
];

export const categories = [
  { id: 'all', name: '全部素材', icon: FolderOpen, count: 156 },
  { id: 'brand', name: '品牌素材', icon: Star, count: 24, children: [
    { id: 'brand-logo', name: 'Logo标志', count: 8 },
    { id: 'brand-color', name: '色卡规范', count: 6 },
    { id: 'brand-font', name: '字体文件', count: 5 },
    { id: 'brand-vi', name: 'VI规范', count: 5 },
  ]},
  { id: 'template', name: '模板文件', icon: FileText, count: 38, children: [
    { id: 'template-word', name: 'Word模板', count: 12 },
    { id: 'template-excel', name: 'Excel模板', count: 15 },
    { id: 'template-contract', name: '合同模板', count: 11 },
  ]},
  { id: 'ppt', name: 'PPT模版', icon: Presentation, count: 520, isSpecial: true, children: [
    { id: 'ppt-complete', name: '整套模板', count: 200, badge: '热门' },
    { id: 'ppt-single', name: '单页版式', count: 320 },
  ]},
  { id: 'guide', name: '规范指南', icon: Bookmark, count: 15, children: [
    { id: 'guide-brand', name: '品牌手册', count: 5 },
    { id: 'guide-design', name: '设计规范', count: 6 },
    { id: 'guide-tech', name: '技术文档', count: 4 },
  ]},
  { id: 'marketing', name: '营销素材', icon: Image, count: 67, children: [
    { id: 'marketing-poster', name: '海报设计', count: 25 },
    { id: 'marketing-banner', name: '横幅广告', count: 20 },
    { id: 'marketing-social', name: '社交媒体', count: 22 },
  ]},
  { id: 'internal', name: '内部文档', icon: Shield, count: 12 },
];

export const users = [
  { id: 1, name: '系统管理员', email: 'superadmin@ankki.com', role: 'superadmin', department: '技术部', uploads: 156, lastActive: '2024-01-15', status: 'active', createdBy: '系统' },
  { id: 2, name: '张管理', email: 'zhangadmin@ankki.com', role: 'admin', department: '设计部', uploads: 89, lastActive: '2024-01-15', status: 'active', createdBy: '系统管理员' },
  { id: 3, name: '李管理', email: 'liadmin@ankki.com', role: 'admin', department: '品牌部', uploads: 67, lastActive: '2024-01-14', status: 'active', createdBy: '系统管理员' },
  { id: 4, name: '张设计', email: 'zhang@ankki.com', role: 'user', department: '设计部', uploads: 45, lastActive: '2024-01-15', status: 'active', createdBy: '张管理' },
  { id: 5, name: '李经理', email: 'li@ankki.com', role: 'user', department: '品牌部', uploads: 23, lastActive: '2024-01-15', status: 'active', createdBy: '李管理' },
  { id: 6, name: '王策划', email: 'wang@ankki.com', role: 'user', department: '市场部', uploads: 18, lastActive: '2024-01-14', status: 'active', createdBy: '张管理' },
  { id: 7, name: '陈运营', email: 'chen@ankki.com', role: 'user', department: '运营部', uploads: 12, lastActive: '2024-01-13', status: 'inactive', createdBy: '李管理' },
];

export const allFeedbacks = [
  { id: 1, type: 'feature', title: '希望增加批量下载功能', content: '目前只能单个下载素材，如果能支持批量选择下载会更方便。', user: '张设计', email: 'zhang@ankki.com', status: 'processing', createdAt: '2024-01-14 14:30', reply: null },
  { id: 2, type: 'bug', title: 'PPT预览时偶尔加载失败', content: '在Chrome浏览器上预览PPT文件时，有时会显示加载失败，刷新后正常。', user: '李经理', email: 'li@ankki.com', status: 'resolved', createdAt: '2024-01-10 09:15', reply: '感谢反馈，问题已修复，请刷新页面重试。' },
  { id: 3, type: 'experience', title: '建议优化搜索结果排序', content: '搜索结果希望能按相关度、时间、下载量等多种方式排序。', user: '王策划', email: 'wang@ankki.com', status: 'pending', createdAt: '2024-01-08 16:45', reply: null },
  { id: 4, type: 'feature', title: '希望支持素材收藏功能', content: '能够收藏常用的素材，方便下次快速找到。', user: '陈运营', email: 'chen@ankki.com', status: 'pending', createdAt: '2024-01-07 11:20', reply: null },
  { id: 5, type: 'other', title: '关于素材使用授权的疑问', content: '请问下载的素材可以用于商业项目吗？有没有使用范围的限制？', user: '赵市场', email: 'zhao@ankki.com', status: 'resolved', createdAt: '2024-01-05 10:00', reply: '您好，平台素材仅限公司内部使用，详细授权说明请查看使用规范文档。' },
];

export const dashboardStats = [
  { label: '总素材数', value: '1,256', change: '+23' },
  { label: '本月下载', value: '3,847', change: '+12%' },
  { label: '待审核', value: '8', change: '-3' },
  { label: '活跃用户', value: '89', change: '+5' },
];

export const initialVideoProjects = [
  {
    id: 101,
    title: '新品发布品牌短片',
    status: 'ready',
    duration: '45秒',
    ratio: '16:9',
    style: '科技电影感',
    updatedAt: '刚刚同步',
    prompt: '围绕 Ankki 数据安全平台升级发布，生成一支适合官网和大会暖场播放的品牌短片。',
    outputs: ['横版成片', '口播字幕', '分镜脚本'],
    scenes: [
      { title: '开场钩子', seconds: '00-08s', visual: '城市夜景与数据流线条交错，品牌主色缓慢显现。', narration: '当数据成为企业增长引擎，安全就是最关键的护城河。' },
      { title: '痛点场景', seconds: '08-18s', visual: '业务系统高速运转，风险告警在屏幕边缘闪现。', narration: '复杂业务协同之下，企业需要更实时、更稳定的数据保护能力。' },
      { title: '产品亮相', seconds: '18-33s', visual: '平台 3D UI 演绎核心模块，突出审计、加密和风险联动。', narration: 'Ankki 新一代平台，以可视化、自动化和智能化重新定义数据安全。' },
      { title: '价值收束', seconds: '33-45s', visual: '团队协作与客户成果镜头拼接，收尾落在品牌口号。', narration: '从治理到增长，让安全能力真正成为企业竞争力。' },
    ],
  },
  {
    id: 102,
    title: '客户案例社媒短视频',
    status: 'generating',
    duration: '30秒',
    ratio: '9:16',
    style: '高节奏信息流',
    updatedAt: '2分钟前',
    prompt: '把客户成功案例改编成适合朋友圈和短视频渠道传播的竖版视频。',
    outputs: ['竖版成片', '封面文案'],
    scenes: [
      { title: '案例标题', seconds: '00-06s', visual: '客户品牌 Logo 与数字化场景叠加出现。', narration: '某头部制造企业，如何用 60 天完成数据安全升级。' },
      { title: '成果展示', seconds: '06-18s', visual: '核心数据指标数字翻牌，穿插业务现场镜头。', narration: '风险响应提速 70%，审计效率提升 3 倍。' },
      { title: 'CTA', seconds: '18-30s', visual: '品牌收尾页与咨询二维码位置。', narration: '想复制同样的增长路径，现在就预约方案演示。' },
    ],
  },
];

export const initialPptProjects = [
  {
    id: 201,
    title: '渠道伙伴大会方案',
    status: 'ready',
    pageCount: 14,
    tone: '专业科技',
    audience: '渠道伙伴 / 销售团队',
    updatedAt: '10分钟前',
    topic: '2026 渠道伙伴增长计划',
    sections: ['会议背景', '市场机会', '政策升级', '激励机制', '行动节奏'],
    slides: [
      { title: '封面', layout: '品牌封面', summary: '大会主题、时间地点与视觉主 KV。' },
      { title: '会议目标', layout: '目标拆解', summary: '明确拉新、转化、复购三项核心指标。' },
      { title: '市场机会', layout: '数据图表', summary: '展示行业增长趋势和重点区域空白市场。' },
      { title: '政策升级', layout: '左右对比', summary: '新旧合作政策对比与升级收益。' },
      { title: '行动排期', layout: '路线图', summary: '按季度拆解招商、培训和联合营销动作。' },
    ],
  },
  {
    id: 202,
    title: '季度经营汇报 Deck',
    status: 'queued',
    pageCount: 10,
    tone: '极简商务',
    audience: '经管会',
    updatedAt: '排队中',
    topic: '2026 Q1 经营复盘',
    sections: ['经营摘要', '关键指标', '问题复盘', '下季计划'],
    slides: [
      { title: '经营摘要', layout: '标题 + 三卡片', summary: '一页完成结果概览与经营判断。' },
      { title: '关键指标', layout: '图表墙', summary: '收入、成本、签约与回款指标联动呈现。' },
      { title: '问题复盘', layout: '问题树', summary: '聚焦偏差原因和改进行动。' },
    ],
  },
];

// 产品彩页数据
export const initialBrochures = [
  {
    id: 'b1', title: '2024 产品手册', subtitle: 'Product Catalog 2024', category: '产品手册',
    gradient: ['#1478F0', '#0a4fa8'], pages: 24, uploadedBy: '张管理', uploadedAt: '2024-03-15',
    size: '8.5 MB', shareCode: 'prd-2024-catalog', views: 1234, description: '覆盖全线产品的年度核心手册，包含规格参数、应用场景与选型指南。',
    previewPages: [
      { label: '封面', bg: '#1478F0', title: '2024 产品手册', sub: 'Product Catalog 2024' },
      { label: '产品概览', bg: '#1260cc', title: '核心产品线', sub: '企业级 · 专业级 · 入门级' },
      { label: '旗舰产品', bg: '#0a4fa8', title: 'Pro 系列', sub: '性能领先行业 25%' },
      { label: '参数对比', bg: '#1478F0', title: '规格一览表', sub: '12 款产品全参数' },
      { label: '案例展示', bg: '#2563eb', title: '标杆客户案例', sub: '覆盖 8 大行业' },
    ],
  },
  {
    id: 'b2', title: '企业画册 2024', subtitle: 'Company Profile', category: '企业画册',
    gradient: ['#7c3aed', '#4c1d95'], pages: 32, uploadedBy: '系统管理员', uploadedAt: '2024-02-28',
    size: '15.2 MB', shareCode: 'corp-profile-2024', views: 892, description: '展示企业发展历程、核心团队、技术实力与战略布局的完整品牌画册。',
    previewPages: [
      { label: '封面', bg: '#7c3aed', title: '企业画册 2024', sub: 'Ankki Design Co., Ltd.' },
      { label: '关于我们', bg: '#6d28d9', title: '创立于 2018', sub: '专注设计科技领域' },
      { label: '核心业务', bg: '#5b21b6', title: '三大业务方向', sub: '品牌 · 数字 · 体验' },
      { label: '团队实力', bg: '#4c1d95', title: '150+ 专业团队', sub: '平均行业经验 8 年' },
    ],
  },
  {
    id: 'b3', title: '智能制造解决方案', subtitle: 'Smart Manufacturing', category: '解决方案',
    gradient: ['#0f766e', '#134e4a'], pages: 18, uploadedBy: '张管理', uploadedAt: '2024-03-01',
    size: '6.8 MB', shareCode: 'smart-mfg-solution', views: 567, description: '面向制造业客户的数字化转型整体解决方案，含架构图、实施路径与 ROI 测算。',
    previewPages: [
      { label: '封面', bg: '#0f766e', title: '智能制造解决方案', sub: 'Smart Manufacturing Solution' },
      { label: '行业痛点', bg: '#0d6b63', title: '三大核心挑战', sub: '效率 · 质量 · 成本' },
      { label: '方案架构', bg: '#0e7560', title: '五层数字化架构', sub: '感知 → 互联 → 分析 → 决策 → 执行' },
      { label: 'ROI 分析', bg: '#134e4a', title: '18 个月回报周期', sub: '典型客户降本 23%' },
    ],
  },
  {
    id: 'b4', title: '金融科技产品白皮书', subtitle: 'FinTech White Paper', category: '白皮书',
    gradient: ['#b45309', '#78350f'], pages: 48, uploadedBy: '系统管理员', uploadedAt: '2024-01-20',
    size: '22.1 MB', shareCode: 'fintech-whitepaper', views: 2341, description: '深度解析金融科技趋势、监管环境与产品技术路线的行业白皮书。',
    previewPages: [
      { label: '封面', bg: '#b45309', title: '金融科技产品白皮书', sub: 'FinTech Industry Report 2024' },
      { label: '市场规模', bg: '#92400e', title: '2024 市场规模', sub: '全球 3.1 万亿美元' },
      { label: '技术趋势', bg: '#78350f', title: 'AI · 区块链 · 云原生', sub: '三大核心技术驱动' },
      { label: '产品矩阵', bg: '#b45309', title: '全栈金融基础设施', sub: '支付 · 风控 · 合规' },
    ],
  },
  {
    id: 'b5', title: '零售行业案例集', subtitle: 'Retail Case Studies', category: '案例集',
    gradient: ['#be123c', '#881337'], pages: 36, uploadedBy: '张管理', uploadedAt: '2024-03-10',
    size: '18.4 MB', shareCode: 'retail-cases-2024', views: 445, description: '精选 12 个零售行业数字化转型落地案例，含项目背景、方案详情与客户收益。',
    previewPages: [
      { label: '封面', bg: '#be123c', title: '零售行业案例集', sub: 'Retail Industry Case Studies' },
      { label: '案例总览', bg: '#9f1239', title: '12 个标杆案例', sub: '覆盖商超 · 品牌 · 电商' },
      { label: '案例精选', bg: '#881337', title: '某头部商超集团', sub: '数字化会员体系重构' },
    ],
  },
  {
    id: 'b6', title: '医疗健康产品简介', subtitle: 'Healthcare Products', category: '产品手册',
    gradient: ['#0369a1', '#0c4a6e'], pages: 20, uploadedBy: '系统管理员', uploadedAt: '2024-02-14',
    size: '9.7 MB', shareCode: 'healthcare-products', views: 334, description: '面向医疗机构的健康管理产品系列介绍，含设备规格、认证资质与临床数据。',
    previewPages: [
      { label: '封面', bg: '#0369a1', title: '医疗健康产品简介', sub: 'Healthcare Product Catalog' },
      { label: '产品系列', bg: '#075985', title: '四大产品系列', sub: '监测 · 诊断 · 治疗 · 管理' },
      { label: '核心优势', bg: '#0c4a6e', title: 'CE · FDA · NMPA 认证', sub: '符合全球医疗标准' },
    ],
  },
];

