import React, { useState } from 'react';
import { Play, Camera, MessageSquare, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AIVideo() {
  const {
    videoProjects, setVideoProjects,
    selectedVideoProjectId, setSelectedVideoProjectId,
    videoGenerating, setVideoGenerating,
    videoError, setVideoError,
    getGenerationStatusMeta, callGenerationApi,
    theme, darkMode,
  } = useApp();

  const [videoForm, setVideoForm] = useState({
    idea: '围绕 Ankki 数据安全平台升级，生成一支用于官网首屏与大会开场的品牌短片',
    audience: '企业客户 / 合作伙伴',
    highlight: '实时审计、风险联动、部署效率提升',
    duration: '45秒',
    ratio: '16:9',
    style: '科技电影感',
    voice: '专业旁白',
  });

  const activeVideoProject = videoProjects.find(item => item.id === selectedVideoProjectId) || videoProjects[0];
  const videoPresets = [
    { name: '品牌发布', values: { duration: '45秒', ratio: '16:9', style: '科技电影感', voice: '专业旁白' } },
    { name: '短视频投放', values: { duration: '30秒', ratio: '9:16', style: '高节奏信息流', voice: '轻快女声' } },
    { name: '案例访谈', values: { duration: '60秒', ratio: '16:9', style: '纪实访谈', voice: '沉稳男声' } },
  ];

  const createVideoProject = async () => {
    if (!videoForm.idea.trim() || videoGenerating) return;
    try {
      setVideoGenerating(true);
      setVideoError('');
      const newProject = await callGenerationApi('/api/generate/video', videoForm);
      setVideoProjects(prev => [newProject, ...prev]);
      setSelectedVideoProjectId(newProject.id);
    } catch (error) {
      setVideoError(error.message);
    } finally {
      setVideoGenerating(false);
    }
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{
        padding: 28,
        borderRadius: 8,
        marginBottom: 24,
        background: darkMode
          ? `linear-gradient(135deg, #1d4ed8, #2563eb 55%, #3b82f6 120%)`
          : `linear-gradient(135deg, #1260cc, #1478F0 55%, #3b9cf7 120%)`,
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 24,
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.8px', opacity: 0.85, marginBottom: 12 }}>AI CONTENT STUDIO</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>AI 视频生成</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.92 }}>
            输入主题、场景和传播目标，快速生成视频脚本、分镜节奏和交付建议，适合品牌发布、案例传播和社媒短片。
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {[
            { label: '本周生成', value: `${videoProjects.length + 6}` },
            { label: '常用比例', value: '16:9 / 9:16' },
            { label: '最快交付', value: '5 分钟' },
          ].map(item => (
            <div key={item.label} style={{
              minWidth: 120,
              padding: '14px 16px',
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr', gap: 20, marginBottom: 24 }}>
        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: 8,
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          padding: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: theme.text, marginBottom: 6 }}>生成参数</h3>
              <p style={{ fontSize: 13, color: theme.textSecondary }}>先确定传播目标，再由系统自动生成脚本与分镜建议。</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {videoPresets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => setVideoForm(prev => ({ ...prev, ...preset.values }))}
                  style={{
                    padding: '7px 12px',
                    fontSize: 12,
                    backgroundColor: theme.bgTertiary,
                    color: theme.textSecondary,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 999,
                    cursor: 'pointer',
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>视频主题</label>
            <textarea
              value={videoForm.idea}
              onChange={(e) => setVideoForm(prev => ({ ...prev, idea: e.target.value }))}
              rows={4}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 5,
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bg,
                color: theme.text,
                outline: 'none',
                resize: 'vertical',
                lineHeight: 1.6,
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>目标受众</label>
              <input
                type="text"
                value={videoForm.audience}
                onChange={(e) => setVideoForm(prev => ({ ...prev, audience: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 5,
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.bg,
                  color: theme.text,
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>核心卖点</label>
              <input
                type="text"
                value={videoForm.highlight}
                onChange={(e) => setVideoForm(prev => ({ ...prev, highlight: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 5,
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.bg,
                  color: theme.text,
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { key: 'duration', label: '时长', options: ['30秒', '45秒', '60秒'] },
              { key: 'ratio', label: '比例', options: ['16:9', '9:16', '1:1'] },
              { key: 'style', label: '风格', options: ['科技电影感', '高节奏信息流', '纪实访谈'] },
              { key: 'voice', label: '旁白', options: ['专业旁白', '轻快女声', '沉稳男声'] },
            ].map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>{field.label}</label>
                <select
                  value={videoForm[field.key]}
                  onChange={(e) => setVideoForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 5,
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.bg,
                    color: theme.text,
                    outline: 'none',
                  }}
                >
                  {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            ))}
          </div>

          {videoError && (
            <div style={{
              marginBottom: 16,
              padding: '12px 14px',
              borderRadius: 5,
              backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              fontSize: 13,
              lineHeight: 1.6,
            }}>
              {videoError}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={createVideoProject}
              disabled={!videoForm.idea.trim() || videoGenerating}
              style={{
                padding: '12px 20px',
                borderRadius: 5,
                border: 'none',
                backgroundColor: !videoForm.idea.trim() || videoGenerating ? theme.bgTertiary : theme.accent,
                color: '#fff',
                cursor: !videoForm.idea.trim() || videoGenerating ? 'not-allowed' : 'pointer',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Play size={16} className={videoGenerating ? 'ai-generating' : ''} />
              {videoGenerating ? '生成中...' : '立即生成'}
            </button>
            <button
              style={{
                padding: '12px 20px',
                borderRadius: 5,
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bgTertiary,
                color: theme.textSecondary,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              保存为模板
            </button>
            <span style={{ fontSize: 12, color: theme.textMuted }}>
              通过 `/api/generate/video` 调用本地 AI 服务，需在 `.env` 中配置可用密钥。
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {[
            { icon: Camera, title: '镜头建议', text: '根据主题自动拆出开场、痛点、解决方案和 CTA 节奏。', accentColor: '#2563eb' },
            { icon: MessageSquare, title: '字幕口播', text: '自动输出适合配音与字幕同步的台词文案。', accentColor: '#0f766e' },
            { icon: Download, title: '交付清单', text: '成片脚本、拍摄建议和发布素材可以一次整理。', accentColor: '#b45309' },
          ].map(card => (
            <div key={card.title} style={{
              padding: 20,
              borderRadius: 8,
              backgroundColor: theme.cardBg,
              border: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 6,
                backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : theme.bgTertiary,
                color: card.accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
              }}>
                <card.icon size={20} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 8 }}>{card.title}</div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: theme.textSecondary }}>{card.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: 8,
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '18px 20px', borderBottom: `1px solid ${theme.border}60` }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, marginBottom: 4 }}>生成记录</h3>
            <p style={{ fontSize: 12, color: theme.textMuted }}>点击查看最近输出的脚本与分镜。</p>
          </div>
          <div style={{ padding: 12 }}>
            {videoProjects.map(project => {
              const statusMeta = getGenerationStatusMeta(project.status);
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedVideoProjectId(project.id)}
                  style={{
                    width: '100%',
                    padding: 14,
                    marginBottom: 8,
                    borderRadius: 6,
                    border: selectedVideoProjectId === project.id ? `1px solid ${theme.accent}` : '1px solid transparent',
                    backgroundColor: selectedVideoProjectId === project.id ? theme.accentLight : theme.bgTertiary,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: selectedVideoProjectId === project.id ? theme.accent : theme.text }}>{project.title}</div>
                    <span className={statusMeta.label === '生成中' ? 'ai-generating' : ''} style={{ fontSize: 11, padding: '4px 8px', borderRadius: 999, backgroundColor: statusMeta.bg, color: statusMeta.color, fontWeight: 500 }}>
                      {statusMeta.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: theme.textSecondary, marginBottom: 6 }}>{project.duration} · {project.ratio} · {project.style}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted }}>{project.updatedAt}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: 8,
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          padding: 24,
        }}>
          {activeVideoProject && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600, color: theme.text }}>{activeVideoProject.title}</h3>
                    <span style={{
                      fontSize: 12,
                      padding: '4px 10px',
                      borderRadius: 999,
                      backgroundColor: getGenerationStatusMeta(activeVideoProject.status).bg,
                      color: getGenerationStatusMeta(activeVideoProject.status).color,
                    }}>
                      {getGenerationStatusMeta(activeVideoProject.status).label}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.7, maxWidth: 780 }}>{activeVideoProject.prompt}</p>
                </div>
                <button style={{
                  padding: '10px 16px',
                  borderRadius: 5,
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.bgTertiary,
                  color: theme.textSecondary,
                  cursor: 'pointer',
                  fontSize: 13,
                }}>
                  导出脚本
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 22 }}>
                {[
                  { label: '建议时长', value: activeVideoProject.duration },
                  { label: '画面比例', value: activeVideoProject.ratio },
                  { label: '产出文件', value: activeVideoProject.outputs.join(' / ') },
                ].map(item => (
                  <div key={item.label} style={{
                    padding: 16,
                    borderRadius: 6,
                    backgroundColor: theme.bgTertiary,
                  }}>
                    <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 12, fontSize: 15, fontWeight: 600, color: theme.text }}>分镜脚本</div>
              <div style={{ display: 'grid', gap: 12 }}>
                {activeVideoProject.scenes.map(scene => (
                  <div key={`${activeVideoProject.id}-${scene.title}`} style={{
                    padding: 18,
                    borderRadius: 6,
                    borderBottom: `1px solid ${theme.border}40`,
                    backgroundColor: theme.bgSecondary,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>{scene.title}</div>
                      <div style={{ fontSize: 12, color: theme.textMuted }}>{scene.seconds}</div>
                    </div>
                    <div style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.7, marginBottom: 8 }}>
                      <strong style={{ color: theme.text }}>画面：</strong>{scene.visual}
                    </div>
                    <div style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.7 }}>
                      <strong style={{ color: theme.text }}>口播：</strong>{scene.narration}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
