import React, { useState } from 'react';
import { Presentation, Layout, BarChart3, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AIPPT() {
  const {
    pptProjects, setPptProjects,
    selectedPptProjectId, setSelectedPptProjectId,
    pptGenerating, setPptGenerating,
    pptError, setPptError,
    pptExporting, pptExportError,
    getGenerationStatusMeta, callGenerationApi, downloadPptProject,
    theme, darkMode,
  } = useApp();

  const [pptForm, setPptForm] = useState({
    topic: '2026 渠道伙伴增长计划',
    audience: '渠道伙伴 / 管理层',
    goal: '方案提案',
    pageCount: '12',
    tone: '专业科技',
    sectionsText: '行业趋势，产品价值，合作政策，联合营销，行动计划',
  });

  const activePptProject = pptProjects.find(item => item.id === selectedPptProjectId) || pptProjects[0];
  const pptPresets = [
    { name: '经营汇报', values: { goal: '经营汇报', tone: '极简商务', pageCount: '10' } },
    { name: '客户提案', values: { goal: '解决方案提案', tone: '专业科技', pageCount: '12' } },
    { name: '发布会方案', values: { goal: '大会演讲', tone: '品牌发布', pageCount: '16' } },
  ];

  const createPptProject = async () => {
    if (!pptForm.topic.trim() || pptGenerating) return;
    try {
      setPptGenerating(true);
      setPptError('');
      const newProject = await callGenerationApi('/api/generate/ppt', pptForm);
      setPptProjects(prev => [newProject, ...prev]);
      setSelectedPptProjectId(newProject.id);
    } catch (error) {
      setPptError(error.message);
    } finally {
      setPptGenerating(false);
    }
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{
        padding: 28,
        borderRadius: 8,
        marginBottom: 24,
        background: darkMode
          ? 'linear-gradient(135deg, #1f3a8a, #0f766e 60%, #164e63 120%)'
          : 'linear-gradient(135deg, #1d4ed8, #0f766e 58%, #67e8f9 120%)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 24,
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.8px', opacity: 0.85, marginBottom: 12 }}>SMART DECK BUILDER</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>PPT 生成</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.92 }}>
            输入演示主题、对象和页数目标，自动生成汇报结构、页面文案和版式建议，适用于经营汇报、方案提案和大会演讲。
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {[
            { label: '常见页数', value: '10-16页' },
            { label: '默认产出', value: '目录 + 内容' },
            { label: '最快成稿', value: '3 分钟' },
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.95fr', gap: 20, marginBottom: 24 }}>
        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: 8,
          border: `1px solid ${theme.border}`,
          padding: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: theme.text, marginBottom: 6 }}>Deck 参数</h3>
              <p style={{ fontSize: 13, color: theme.textSecondary }}>先确定演示目标，再生成结构和页面草稿。</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {pptPresets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => setPptForm(prev => ({ ...prev, ...preset.values }))}
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
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>演示主题</label>
            <input
              type="text"
              value={pptForm.topic}
              onChange={(e) => setPptForm(prev => ({ ...prev, topic: e.target.value }))}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>汇报对象</label>
              <input
                type="text"
                value={pptForm.audience}
                onChange={(e) => setPptForm(prev => ({ ...prev, audience: e.target.value }))}
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
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>目标类型</label>
              <select
                value={pptForm.goal}
                onChange={(e) => setPptForm(prev => ({ ...prev, goal: e.target.value }))}
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
                {['方案提案', '经营汇报', '大会演讲', '项目复盘'].map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>目标页数</label>
              <select
                value={pptForm.pageCount}
                onChange={(e) => setPptForm(prev => ({ ...prev, pageCount: e.target.value }))}
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
                {['8', '10', '12', '16', '20'].map(option => <option key={option} value={option}>{option} 页</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>视觉语气</label>
              <select
                value={pptForm.tone}
                onChange={(e) => setPptForm(prev => ({ ...prev, tone: e.target.value }))}
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
                {['专业科技', '极简商务', '品牌发布', '创意提案'].map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>必含章节</label>
              <textarea
                value={pptForm.sectionsText}
                onChange={(e) => setPptForm(prev => ({ ...prev, sectionsText: e.target.value }))}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 14px',
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
          </div>

          {pptError && (
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
              {pptError}
            </div>
          )}

          {pptExportError && (
            <div style={{
              marginBottom: 16,
              padding: '12px 14px',
              borderRadius: 5,
              backgroundColor: darkMode ? 'rgba(245, 158, 11, 0.14)' : 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.22)',
              color: theme.warning,
              fontSize: 13,
              lineHeight: 1.6,
            }}>
              {pptExportError}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={createPptProject}
              disabled={!pptForm.topic.trim() || pptGenerating}
              style={{
                padding: '12px 20px',
                borderRadius: 5,
                border: 'none',
                backgroundColor: !pptForm.topic.trim() || pptGenerating ? theme.bgTertiary : theme.accent,
                color: '#fff',
                cursor: !pptForm.topic.trim() || pptGenerating ? 'not-allowed' : 'pointer',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Presentation size={16} />
              {pptGenerating ? '生成中...' : '生成 Deck'}
            </button>
            <button
              onClick={() => downloadPptProject(activePptProject)}
              style={{
                padding: '12px 20px',
                borderRadius: 5,
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bgTertiary,
                color: theme.textSecondary,
                cursor: activePptProject ? 'pointer' : 'not-allowed',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {pptExporting ? '正在导出...' : '下载 PPTX'}
            </button>
            <span style={{ fontSize: 12, color: theme.textMuted }}>
              通过 `/api/generate/ppt` 返回结构化大纲，并可直接导出 `.pptx`。
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {[
            { icon: Layout, title: '自动结构化', text: '自动产出封面、目录、内容页和收尾页，先搭框架再补内容。', accentColor: '#1d4ed8' },
            { icon: BarChart3, title: '页面节奏建议', text: '根据主题推荐图表页、案例页和结论页的占比。', accentColor: '#0f766e' },
            { icon: FileText, title: '文案即页面', text: '为每页提供标题、要点和版式指引，方便设计师继续深化。', accentColor: '#b45309' },
          ].map(card => (
            <div key={card.title} style={{
              padding: 20,
              borderRadius: 8,
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`,
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
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '18px 20px', borderBottom: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, marginBottom: 4 }}>Deck 历史</h3>
            <p style={{ fontSize: 12, color: theme.textMuted }}>最近生成的主题与结构草稿。</p>
          </div>
          <div style={{ padding: 12 }}>
            {pptProjects.map(project => {
              const statusMeta = getGenerationStatusMeta(project.status);
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedPptProjectId(project.id)}
                  style={{
                    width: '100%',
                    padding: 14,
                    marginBottom: 8,
                    borderRadius: 6,
                    border: selectedPptProjectId === project.id ? `1px solid ${theme.accent}` : '1px solid transparent',
                    backgroundColor: selectedPptProjectId === project.id ? theme.accentLight : theme.bgTertiary,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: selectedPptProjectId === project.id ? theme.accent : theme.text }}>{project.title}</div>
                    <span className={statusMeta.label === '生成中' ? 'ai-generating' : ''} style={{ fontSize: 11, padding: '4px 8px', borderRadius: 999, backgroundColor: statusMeta.bg, color: statusMeta.color, fontWeight: 500 }}>
                      {statusMeta.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: theme.textSecondary, marginBottom: 6 }}>{project.pageCount} 页 · {project.tone}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted }}>{project.updatedAt}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: 8,
          border: `1px solid ${theme.border}`,
          padding: 24,
        }}>
          {activePptProject && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600, color: theme.text }}>{activePptProject.title}</h3>
                    <span style={{
                      fontSize: 12,
                      padding: '4px 10px',
                      borderRadius: 999,
                      backgroundColor: getGenerationStatusMeta(activePptProject.status).bg,
                      color: getGenerationStatusMeta(activePptProject.status).color,
                    }}>
                      {getGenerationStatusMeta(activePptProject.status).label}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.7, maxWidth: 780 }}>
                    主题：{activePptProject.topic}，面向 {activePptProject.audience}，当前建议使用 {activePptProject.tone} 风格完成 {activePptProject.pageCount} 页输出。
                  </p>
                </div>
                <button
                  onClick={() => downloadPptProject(activePptProject)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 5,
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.bgTertiary,
                    color: theme.textSecondary,
                    cursor: 'pointer',
                    fontSize: 13,
                  }}>
                  {pptExporting ? '导出中...' : '下载 PPTX'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 22 }}>
                {[
                  { label: '建议页数', value: `${activePptProject.pageCount} 页` },
                  { label: '汇报对象', value: activePptProject.audience },
                  { label: '核心章节', value: activePptProject.sections.join(' / ') || '自动生成' },
                ].map(item => (
                  <div key={item.label} style={{
                    padding: 16,
                    borderRadius: 6,
                    backgroundColor: theme.bgTertiary,
                  }}>
                    <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.6 }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 12, fontSize: 15, fontWeight: 600, color: theme.text }}>页面草稿</div>
              <div style={{ display: 'grid', gap: 12 }}>
                {activePptProject.slides.map((slide, index) => (
                  <div key={`${activePptProject.id}-${slide.title}`} style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1fr',
                    gap: 14,
                    padding: 18,
                    borderRadius: 6,
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.bgSecondary,
                  }}>
                    <div style={{
                      borderRadius: 6,
                      background: index % 2 === 0
                        ? `linear-gradient(135deg, ${theme.accent}, #2563eb)`
                        : darkMode
                          ? 'linear-gradient(135deg, #1d4ed8, #0f766e)'
                          : 'linear-gradient(135deg, #1d4ed8, #38bdf8)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      fontWeight: 700,
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>{slide.title}</div>
                        <span style={{
                          fontSize: 11,
                          padding: '4px 10px',
                          borderRadius: 999,
                          backgroundColor: theme.bgTertiary,
                          color: theme.textSecondary,
                        }}>
                          {slide.layout}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.7 }}>{slide.summary}</div>
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
