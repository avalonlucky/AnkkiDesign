import React from 'react';
import { Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  pptCompleteTemplates,
  pptSingleTemplates,
  pptCompleteCategories,
  pptCompleteSubCategories,
  pptSingleCategories,
  pptSingleSubCategories,
} from '../../data/mockData';

function renderCompleteTemplatePreview(template, { darkMode }) {
  const firstPage = template.previewPages?.[0];
  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: 14,
      color: '#fff',
      background: `linear-gradient(135deg, ${firstPage?.color || '#1e40af'}, ${darkMode ? '#0f172a' : '#60a5fa'})`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <div style={{ fontSize: 10, opacity: 0.72, letterSpacing: '0.6px' }}>{firstPage?.title || '封面'}</div>
      <div>
        <div style={{
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.25,
          marginBottom: 8,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          whiteSpace: 'pre-line',
        }}>
          {firstPage?.content || template.name}
        </div>
        <div style={{
          width: 54,
          height: 4,
          borderRadius: 999,
          backgroundColor: 'rgba(255,255,255,0.72)',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.72 }}>
        <span>Ankki Design</span>
        <span>{template.pages}P</span>
      </div>
    </div>
  );
}

function renderSingleTemplatePreview(template, { darkMode }) {
  const preview = template.previewContent || {};
  const baseStyle = {
    width: '100%',
    height: '100%',
    padding: 12,
    borderRadius: 0,
    color: '#fff',
    background: `linear-gradient(135deg, ${preview.color || '#1e40af'}, ${darkMode ? '#111827' : '#cbd5e1'})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  };

  if (template.type === 'cover') {
    return (
      <div style={baseStyle}>
        <div style={{ fontSize: 9, opacity: 0.74 }}>Ankki Deck</div>
        <div>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.25,
            marginBottom: 8,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            whiteSpace: 'pre-line',
          }}>
            {preview.title}
          </div>
          <div style={{ fontSize: 10, opacity: 0.82 }}>{preview.subtitle}</div>
        </div>
        <div style={{ width: 42, height: 3, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.7)' }} />
      </div>
    );
  }

  if (template.type === 'paragraph') {
    return (
      <div style={baseStyle}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{preview.title}</div>
        <div style={{
          fontSize: 9,
          lineHeight: 1.6,
          opacity: 0.92,
          whiteSpace: 'pre-line',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {preview.content}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2].map(item => (
            <span key={item} style={{ flex: 1, height: 3, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.32)' }} />
          ))}
        </div>
      </div>
    );
  }

  if (template.type === 'image') {
    return (
      <div style={{ ...baseStyle, flexDirection: 'row', gap: 10, alignItems: 'stretch' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{preview.title}</div>
          <div style={{ fontSize: 9, lineHeight: 1.5, opacity: 0.82 }}>{preview.content}</div>
        </div>
        <div style={{
          width: 46,
          borderRadius: 5,
          backgroundColor: 'rgba(255,255,255,0.16)',
          border: '1px solid rgba(255,255,255,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>
          ▣
        </div>
      </div>
    );
  }

  if (template.type === 'logic') {
    return (
      <div style={baseStyle}>
        <div style={{ fontSize: 12, fontWeight: 600 }}>{preview.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
          {[0, 1, 2].map(item => (
            <React.Fragment key={item}>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.24)',
                border: '1px solid rgba(255,255,255,0.35)',
              }} />
              {item < 2 && <div style={{ flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.28)' }} />}
            </React.Fragment>
          ))}
        </div>
        <div style={{ fontSize: 9, lineHeight: 1.5, opacity: 0.86, whiteSpace: 'pre-line' }}>{preview.content}</div>
      </div>
    );
  }

  return (
    <div style={baseStyle}>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{preview.title}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 40 }}>
        {[18, 30, 22, 34].map((height, index) => (
          <div
            key={height}
            style={{
              flex: 1,
              height,
              borderRadius: '6px 6px 2px 2px',
              backgroundColor: ['#34d399', '#fbbf24', '#60a5fa', '#f87171'][index],
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 9, lineHeight: 1.5, opacity: 0.86, whiteSpace: 'pre-line' }}>{preview.content}</div>
    </div>
  );
}

function PPTPreviewModal({ previewPPT, previewPage, setPreviewPPT, setPreviewPage, theme, darkMode }) {
  if (!previewPPT) return null;

  const isComplete = !!previewPPT.previewPages;
  const totalPages = isComplete ? previewPPT.previewPages.length : 1;
  const currentPageData = isComplete ? previewPPT.previewPages[previewPage] : previewPPT.previewContent;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
    }} onClick={() => { setPreviewPPT(null); setPreviewPage(0); }}>
      <div style={{
        width: '90%',
        maxWidth: 1100,
        maxHeight: '90vh',
        display: 'flex',
        gap: 24,
      }} onClick={e => e.stopPropagation()}>

        {/* 左侧 - PPT预览区 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 预览主区域 */}
          <div style={{
            flex: 1,
            backgroundColor: currentPageData?.color || '#1e40af',
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
            position: 'relative',
            aspectRatio: '16/9',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}>
            {/* 关闭按钮 */}
            <button
              onClick={() => { setPreviewPPT(null); setPreviewPage(0); }}
              style={{
                position: 'absolute',
                top: -48,
                right: 0,
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}
            >
              ✕
            </button>

            {/* PPT内容 */}
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 16, letterSpacing: 2 }}>
                {isComplete ? currentPageData?.title : '昂楷科技'}
              </div>
              <div style={{
                fontSize: isComplete ? 36 : 42,
                fontWeight: 600,
                marginBottom: 20,
                lineHeight: 1.3,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              }}>
                {isComplete ? currentPageData?.content : currentPageData?.title}
              </div>
              {!isComplete && currentPageData?.subtitle && (
                <div style={{ fontSize: 18, opacity: 0.8 }}>{currentPageData.subtitle}</div>
              )}
              {!isComplete && currentPageData?.content && (
                <div style={{ fontSize: 16, opacity: 0.9, marginTop: 24, whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                  {currentPageData.content}
                </div>
              )}
            </div>

            {/* 页码指示 */}
            {isComplete && (
              <div style={{
                position: 'absolute',
                bottom: 20,
                right: 24,
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
              }}>
                {previewPage + 1} / {totalPages}
              </div>
            )}
          </div>

          {/* 翻页控制 */}
          {isComplete && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              marginTop: 20,
            }}>
              <button
                onClick={() => setPreviewPage(Math.max(0, previewPage - 1))}
                disabled={previewPage === 0}
                style={{
                  padding: '10px 24px',
                  backgroundColor: previewPage === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                  color: previewPage === 0 ? 'rgba(255,255,255,0.3)' : '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: previewPage === 0 ? 'not-allowed' : 'pointer',
                  fontSize: 14,
                }}
              >
                ← 上一页
              </button>

              {/* 页码点 */}
              <div style={{ display: 'flex', gap: 8 }}>
                {previewPPT.previewPages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewPage(i)}
                    style={{
                      width: previewPage === i ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: previewPage === i ? theme.accent : 'rgba(255,255,255,0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setPreviewPage(Math.min(totalPages - 1, previewPage + 1))}
                disabled={previewPage === totalPages - 1}
                style={{
                  padding: '10px 24px',
                  backgroundColor: previewPage === totalPages - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                  color: previewPage === totalPages - 1 ? 'rgba(255,255,255,0.3)' : '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: previewPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                  fontSize: 14,
                }}
              >
                下一页 →
              </button>
            </div>
          )}
        </div>

        {/* 右侧 - 信息面板 */}
        <div style={{
          width: 320,
          backgroundColor: theme.cardBg,
          borderRadius: 6,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            color: theme.text,
            marginBottom: 8,
            lineHeight: 1.4,
          }}>
            {previewPPT.name}
          </h3>
          <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20, lineHeight: 1.6 }}>
            {previewPPT.desc}
          </p>

          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: 20,
            flexWrap: 'wrap',
          }}>
            {previewPPT.tag && (
              <span style={{
                padding: '4px 12px',
                fontSize: 12,
                backgroundColor: theme.accentLight,
                color: theme.accent,
                borderRadius: 4,
              }}>
                {previewPPT.tag}
              </span>
            )}
            {previewPPT.pages && (
              <span style={{
                padding: '4px 12px',
                fontSize: 12,
                backgroundColor: theme.bgTertiary,
                color: theme.textSecondary,
                borderRadius: 4,
              }}>
                {previewPPT.pages}页
              </span>
            )}
            <span style={{
              padding: '4px 12px',
              fontSize: 12,
              backgroundColor: theme.bgTertiary,
              color: theme.textSecondary,
              borderRadius: 4,
            }}>
              {previewPPT.views}人阅读
            </span>
          </div>

          {/* 页面缩略图列表 - 仅整套显示 */}
          {isComplete && (
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 12 }}>
                页面预览
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {previewPPT.previewPages.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewPage(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: 10,
                      backgroundColor: previewPage === i ? theme.accentLight : theme.bgTertiary,
                      border: previewPage === i ? `1px solid ${theme.accent}` : '1px solid transparent',
                      borderRadius: 8,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{
                      width: 48,
                      height: 27,
                      backgroundColor: page.color,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 8,
                      color: '#fff',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: previewPage === i ? theme.accent : theme.text,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {page.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button style={{
            width: '100%',
            padding: '14px',
            backgroundColor: theme.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            <Download size={18} />
            下载模板
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PPTTemplates() {
  const {
    pptTab, setPptTab,
    pptCompleteCategory, setPptCompleteCategory,
    pptCompleteSubCategory, setPptCompleteSubCategory,
    pptSingleCategory, setPptSingleCategory,
    pptSingleSubCategory, setPptSingleSubCategory,
    previewPPT, setPreviewPPT,
    previewPage, setPreviewPage,
    theme, darkMode,
  } = useApp();

  return (
    <div style={{ padding: 28 }}>
      {/* PPTPreviewModal */}
      <PPTPreviewModal
        previewPPT={previewPPT}
        previewPage={previewPage}
        setPreviewPPT={setPreviewPPT}
        setPreviewPage={setPreviewPage}
        theme={theme}
        darkMode={darkMode}
      />

      {/* 页面标题 */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: theme.text, marginBottom: 8, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
          PPT模版库
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>精选高质量PPT模板，助力高效办公</p>
      </div>

      {/* 主Tab切换 */}
      <div style={{
        display: 'flex',
        gap: 32,
        borderBottom: `1px solid ${theme.border}`,
        marginBottom: 24,
      }}>
        <button
          onClick={() => setPptTab('complete')}
          style={{
            padding: '12px 0',
            fontSize: 16,
            fontWeight: 500,
            color: pptTab === 'complete' ? theme.accent : theme.textSecondary,
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: pptTab === 'complete' ? `2px solid ${theme.accent}` : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: -1,
          }}
        >
          PPT定制模板库（整套）
        </button>
        <button
          onClick={() => setPptTab('single')}
          style={{
            padding: '12px 0',
            fontSize: 16,
            fontWeight: 500,
            color: pptTab === 'single' ? theme.accent : theme.textSecondary,
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: pptTab === 'single' ? `2px solid ${theme.accent}` : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: -1,
          }}
        >
          PPT创意版式库（单页）
        </button>
      </div>

      {pptTab === 'complete' ? (
        // 整套模板库
        <div>
          <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>所有案例均为原创PPT模板</p>

          {/* 一级分类 */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            {pptCompleteCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setPptCompleteCategory(cat.id); setPptCompleteSubCategory(pptCompleteSubCategories[cat.id][0].id); }}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: pptCompleteCategory === cat.id ? theme.accent : theme.textSecondary,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* 二级分类标签 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {pptCompleteSubCategories[pptCompleteCategory]?.map(sub => (
              <button
                key={sub.id}
                onClick={() => setPptCompleteSubCategory(sub.id)}
                style={{
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 400,
                  color: pptCompleteSubCategory === sub.id ? theme.accent : theme.textSecondary,
                  backgroundColor: pptCompleteSubCategory === sub.id ? theme.accentLight : theme.tagBg,
                  border: pptCompleteSubCategory === sub.id ? `1px solid ${theme.accent}` : '1px solid transparent',
                  borderRadius: 5,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* 模板网格 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {pptCompleteTemplates.map(template => (
              <div
                key={template.id}
                className="ppt-card"
                onClick={() => { setPreviewPPT(template); setPreviewPage(0); }}
                style={{
                  backgroundColor: theme.cardBg,
                  borderRadius: 6,
                  overflow: 'hidden',
                  border: 'none',
                  boxShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                }}
              >
                {/* 缩略图 */}
                <div style={{
                  position: 'relative',
                  height: 160,
                  background: `linear-gradient(135deg, ${darkMode ? '#2a3f5f' : '#e8f4fc'}, ${darkMode ? '#1e3a5f' : '#d1e9f6'})`,
                  overflow: 'hidden',
                }}>
                  {renderCompleteTemplatePreview(template, { darkMode })}
                  {template.tag && (
                    <span style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#fff',
                      backgroundColor: template.tag === '热门' ? '#ef4444' : theme.accent,
                      borderRadius: 4,
                    }}>{template.tag}</span>
                  )}
                  <span style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    padding: '4px 8px',
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 4,
                  }}>预览</span>
                </div>

                {/* 信息 */}
                <div style={{ padding: 16 }}>
                  <h4 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: theme.text,
                    marginBottom: 6,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>{template.name}</h4>
                  <p style={{
                    fontSize: 12,
                    color: theme.textMuted,
                    marginBottom: 12,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>{template.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: theme.textMuted }}>{template.views}人阅读</span>
                    <span style={{ fontSize: 12, color: theme.accent, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Download size={12} />
                      下载
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // 单页版式库
        <div>
          <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>每一页都是精品</p>

          {/* 一级分类 */}
          <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
            {pptSingleCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setPptSingleCategory(cat.id); setPptSingleSubCategory(pptSingleSubCategories[cat.id][0].id); }}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: pptSingleCategory === cat.id ? theme.accent : theme.textSecondary,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: pptSingleCategory === cat.id ? `2px solid ${theme.accent}` : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '8px 0',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* 二级分类标签 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {pptSingleSubCategories[pptSingleCategory]?.map(sub => (
              <button
                key={sub.id}
                onClick={() => setPptSingleSubCategory(sub.id)}
                style={{
                  padding: '8px 20px',
                  fontSize: 13,
                  fontWeight: 400,
                  color: pptSingleSubCategory === sub.id ? theme.accent : theme.textSecondary,
                  backgroundColor: pptSingleSubCategory === sub.id ? theme.accentLight : theme.tagBg,
                  border: pptSingleSubCategory === sub.id ? `1px solid ${theme.accent}` : '1px solid transparent',
                  borderRadius: 5,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* 模板网格 - 5列 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {pptSingleTemplates.map(template => (
              <div
                key={template.id}
                className="ppt-card"
                onClick={() => { setPreviewPPT(template); setPreviewPage(0); }}
                style={{
                  backgroundColor: theme.cardBg,
                  borderRadius: 5,
                  overflow: 'hidden',
                  border: 'none',
                  boxShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                }}
              >
                {/* 缩略图 */}
                <div style={{
                  position: 'relative',
                  height: 120,
                  background: `linear-gradient(135deg, ${darkMode ? '#2d3748' : '#f0f4f8'}, ${darkMode ? '#1a202c' : '#e2e8f0'})`,
                  overflow: 'hidden',
                }}>
                  {renderSingleTemplatePreview(template, { darkMode })}
                  <span style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 6,
                    padding: '3px 6px',
                    fontSize: 9,
                    fontWeight: 500,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 3,
                  }}>点击预览</span>
                </div>

                {/* 信息 */}
                <div style={{ padding: 12 }}>
                  <h4 style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: theme.text,
                    marginBottom: 8,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: 34,
                  }}>{template.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: theme.textMuted }}>{template.views}人阅读</span>
                    <span style={{ fontSize: 12, color: theme.accent, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Download size={11} />
                      下载
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
