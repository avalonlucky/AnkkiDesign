import React from 'react';
import { Shield, ChevronRight, Download, FolderOpen, Clock, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { assets, pptCompleteTemplates, dashboardStats } from '../../data/mockData';

export default function Dashboard() {
  const { theme, darkMode, isAdmin, isSuperAdmin, currentUser, setCurrentView, setSelectedCategory, setPreviewAsset } = useApp();

  const renderAssetPreviewCompact = (asset) => {
    const previewHeight = 44;
    const labelStyle = { fontSize: 8, opacity: 0.72, letterSpacing: '0.5px' };

    const wrap = (children, background) => (
      <div style={{ width: '100%', height: previewHeight, borderRadius: 0, background, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
    );

    if (asset.pdfPreview?.pages?.length) {
      const firstPage = asset.pdfPreview.pages[0];
      return wrap(
        <div style={{ height: '100%', padding: 8, background: darkMode ? '#f8fafc' : '#ffffff', color: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
          <div style={{ ...labelStyle, color: '#dc2626', opacity: 1 }}>PDF</div>
          <div style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.3, whiteSpace: 'pre-line', marginBottom: 4 }}>{firstPage.content}</div>
          <div style={{ fontSize: 7, color: '#64748b' }}>{asset.name}</div>
        </div>,
        darkMode ? '#111827' : '#e2e8f0'
      );
    }

    if (asset.wordPreview?.sections?.length) {
      const firstSection = asset.wordPreview.sections[0];
      return wrap(
        <div style={{ height: '100%', padding: 8, background: darkMode ? '#f8fafc' : '#ffffff', color: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
          <div style={{ ...labelStyle, color: '#2563eb', opacity: 1 }}>DOCX</div>
          <div style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.35, marginBottom: 4 }}>{asset.wordPreview.title}</div>
        </div>,
        darkMode ? '#0f172a' : '#dbeafe'
      );
    }

    if (asset.pptPreview?.slides?.length) {
      const firstSlide = asset.pptPreview.slides[0];
      return wrap(
        <div style={{ height: '100%', padding: 8, color: '#fff', background: `linear-gradient(135deg, ${firstSlide.color}, ${darkMode ? '#0f172a' : '#93c5fd'})`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={labelStyle}>SLIDE 01</div>
          <div style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.28, whiteSpace: 'pre-line' }}>{firstSlide.content}</div>
        </div>,
        firstSlide.color
      );
    }

    if (asset.excelData?.headers?.length) {
      return wrap(
        <div style={{ height: '100%', padding: 8, background: darkMode ? '#0f172a' : '#ecfdf5', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ ...labelStyle, color: '#047857', opacity: 1 }}>XLSX</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {asset.excelData.headers.slice(0, 3).map(header => (
              <div key={header} style={{ padding: '3px 4px', borderRadius: 4, backgroundColor: '#047857', color: '#fff', fontSize: 6, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{header}</div>
            ))}
          </div>
        </div>,
        darkMode ? '#064e3b' : '#d1fae5'
      );
    }

    if (asset.imagePreview?.colors?.length) {
      return wrap(
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: `repeat(${asset.imagePreview.colors.length}, 1fr)` }}>
          {asset.imagePreview.colors.map(color => (
            <div key={color.hex} style={{ backgroundColor: color.hex }} />
          ))}
        </div>,
        darkMode ? '#111827' : '#f8fafc'
      );
    }

    if (asset.svgPreview?.variants?.length) {
      return wrap(
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, padding: 6, backgroundColor: darkMode ? '#111827' : '#f8fafc' }}>
          {asset.svgPreview.variants.slice(0, 2).map(variant => (
            <div key={variant.name} style={{ borderRadius: 6, backgroundColor: variant.bg, border: '1px solid rgba(148,163,184,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: variant.color, fontWeight: 700, fontSize: 8 }}>A</div>
          ))}
        </div>,
        darkMode ? '#111827' : '#f8fafc'
      );
    }

    if (asset.zipPreview?.files?.length) {
      return wrap(
        <div style={{ height: '100%', padding: 8, background: darkMode ? '#1e1b4b' : '#eef2ff', color: darkMode ? '#e0e7ff' : '#312e81', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ ...labelStyle, color: darkMode ? '#c4b5fd' : '#4338ca', opacity: 1 }}>ZIP</div>
          {asset.zipPreview.files.slice(0, 2).map(file => (
            <div key={file.name} style={{ padding: '3px 5px', borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.55)', fontSize: 6, color: '#312e81', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
          ))}
        </div>,
        darkMode ? '#312e81' : '#c7d2fe'
      );
    }

    return wrap(
      <div style={{ height: '100%', padding: 8, background: `linear-gradient(135deg, ${theme.accent}, ${darkMode ? '#111827' : '#fde7db'})`, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={labelStyle}>{asset.format}</div>
        <div style={{ fontSize: 8, fontWeight: 700, lineHeight: 1.35 }}>{asset.name}</div>
      </div>,
      theme.accent
    );
  };

  const renderCompleteTemplatePreview = (template) => {
    const firstPage = template.previewPages?.[0];
    return (
      <div style={{
        width: '100%', height: '100%', padding: 14, color: '#fff',
        background: `linear-gradient(135deg, ${firstPage?.color || '#1e40af'}, ${darkMode ? '#0f172a' : '#60a5fa'})`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 10, opacity: 0.72, letterSpacing: '0.6px' }}>{firstPage?.title || '封面'}</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.25, marginBottom: 8, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", whiteSpace: 'pre-line' }}>
            {firstPage?.content || template.name}
          </div>
          <div style={{ width: 54, height: 4, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.72)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.72 }}>
          <span>Ankki Design</span>
          <span>{template.pages}P</span>
        </div>
      </div>
    );
  };

  const stats = [
    { label: dashboardStats[0].label, value: dashboardStats[0].value, change: dashboardStats[0].change, icon: FolderOpen },
    { label: dashboardStats[1].label, value: dashboardStats[1].value, change: dashboardStats[1].change, icon: Download },
    { label: dashboardStats[2].label, value: dashboardStats[2].value, change: dashboardStats[2].change, icon: Clock },
    { label: dashboardStats[3].label, value: dashboardStats[3].value, change: dashboardStats[3].change, icon: Users },
  ];

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: theme.text, marginBottom: 8, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
          早上好，{currentUser.name} 👋
        </h1>
        <p style={{ fontSize: 15, color: theme.textSecondary }}>
          欢迎回到 Ankki Design 素材管理平台
          {isSuperAdmin && '，您拥有最高管理权限'}
          {isAdmin && !isSuperAdmin && '，您可以管理素材和审核内容'}
          {!isAdmin && '，您可以浏览和下载素材'}
        </p>
      </div>

      {/* 当前角色提示 */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px',
        backgroundColor: isSuperAdmin ? 'rgba(239, 68, 68, 0.1)' : isAdmin ? 'rgba(139, 92, 246, 0.1)' : theme.bgTertiary,
        borderRadius: 5, marginBottom: 24,
      }}>
        <Shield size={16} color={isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.textSecondary} />
        <span style={{ fontSize: 13, fontWeight: 500, color: isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.textSecondary }}>
          {isSuperAdmin ? '超级管理员' : isAdmin ? '管理员' : '普通用户'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <div key={i} className="card-hover" style={{
            backgroundColor: theme.cardBg, borderRadius: 8, padding: '22px 24px',
            border: 'none', boxShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.06)',
            cursor: 'default',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 6,
                background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accentLight})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: theme.accent, boxShadow: `0 2px 8px ${theme.accent}22`,
              }}>
                <stat.icon size={22} />
              </div>
              <span style={{
                fontSize: 12, color: stat.change.includes('+') ? theme.success : theme.warning,
                backgroundColor: stat.change.includes('+') ? (darkMode ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.1)') : (darkMode ? 'rgba(251, 191, 36, 0.15)' : 'rgba(251, 191, 36, 0.1)'),
                padding: '4px 10px', borderRadius: 5, fontWeight: 600,
              }}>{stat.change}</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: theme.text, marginBottom: 4, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", letterSpacing: '-0.5px' }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* PPT模版推荐卡片 */}
      <div style={{
        background: darkMode
          ? `linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)`
          : `linear-gradient(135deg, #1260cc 0%, #1478F0 50%, #3b9cf7 100%)`,
        borderRadius: 8, padding: '28px 36px', marginBottom: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', overflow: 'hidden', boxShadow: `0 4px 20px rgba(20, 120, 240, 0.3)`,
      }}>
        <div style={{ position: 'absolute', right: 120, top: -40, width: 180, height: 180, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 60, bottom: -60, width: 240, height: 240, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', color: 'rgba(255,255,255,0.7)', marginBottom: 10, textTransform: 'uppercase' }}>模板资源库</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>PPT 模版库全新上线 🎉</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', marginBottom: 20, lineHeight: 1.6, maxWidth: 440 }}>520+ 精选原创模板，涵盖职场汇报、创意主题、数据图表等多个分类，一键下载即用</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => { setSelectedCategory('ppt'); setCurrentView('ppt-templates'); }}
              style={{ padding: '10px 24px', backgroundColor: '#fff', color: theme.accent, border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              立即查看
            </button>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>· 免费下载</span>
          </div>
        </div>
        <div style={{ fontSize: 72, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>📊</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div style={{ backgroundColor: theme.cardBg, borderRadius: 6, border: 'none', boxShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>最近更新</h3>
            <button style={{ fontSize: 13, color: theme.accent, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              查看全部 <ChevronRight size={16} />
            </button>
          </div>
          <div>
            {assets.slice(0, 5).map((asset, i) => (
              <div
                key={asset.id}
                onClick={() => setPreviewAsset(asset)}
                style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < 4 ? `1px solid ${theme.border}` : 'none', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 5, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                    {renderAssetPreviewCompact(asset)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 4 }}>{asset.name}</div>
                    <div style={{ fontSize: 12, color: theme.textMuted, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{asset.format}</span><span>·</span><span>{asset.size}</span><span>·</span><span>v{asset.version}</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{asset.updatedAt}</div>
                  <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>{asset.updatedBy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: theme.cardBg, borderRadius: 6, border: 'none', boxShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>热门PPT模板</h3>
          </div>
          <div style={{ padding: '8px 16px' }}>
            {pptCompleteTemplates.slice(0, 4).map((template, i) => (
              <div key={template.id} style={{ padding: '14px 8px', borderBottom: i < 3 ? `1px solid ${theme.border}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 56, height: 36, borderRadius: 8, overflow: 'hidden', border: `1px solid ${theme.border}`, flexShrink: 0 }}>
                  {renderCompleteTemplatePreview(template)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: theme.text, fontWeight: 500, marginBottom: 2 }}>{template.name.substring(0, 15)}...</div>
                  <div style={{ fontSize: 11, color: theme.textMuted }}>{template.views}人阅读</div>
                </div>
                <span style={{ fontSize: 12, color: theme.accent, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Download size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
