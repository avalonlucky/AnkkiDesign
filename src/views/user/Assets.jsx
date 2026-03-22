import React from 'react';
import { ChevronRight, Filter, Grid, List, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { assets, categories } from '../../data/mockData';

function renderAssetPreview(asset, options = {}, { darkMode, theme }) {
  const { compact = false, statusBadge = true } = options;
  const previewHeight = compact ? 44 : 140;
  const baseRadius = compact ? 10 : 0;
  const labelStyle = { fontSize: compact ? 8 : 10, opacity: 0.72, letterSpacing: '0.5px' };

  const wrap = (children, background) => (
    <div style={{ width: '100%', height: previewHeight, borderRadius: baseRadius, background, overflow: 'hidden', position: 'relative' }}>
      {children}
      {statusBadge && !compact && (
        <span style={{
          position: 'absolute', top: 10, right: 10, fontSize: 10, fontWeight: 600, color: '#fff',
          backgroundColor: asset.status === 'approved' ? theme.success : theme.warning,
          padding: '3px 8px', borderRadius: 4,
        }}>
          {asset.status === 'approved' ? '已发布' : '待审核'}
        </span>
      )}
    </div>
  );

  if (asset.pdfPreview?.pages?.length) {
    const firstPage = asset.pdfPreview.pages[0];
    return wrap(
      <div style={{ height: '100%', padding: compact ? 8 : 16, background: darkMode ? '#f8fafc' : '#ffffff', color: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
        <div style={{ ...labelStyle, color: '#dc2626', opacity: 1 }}>PDF DOCUMENT</div>
        <div>
          <div style={{ fontSize: compact ? 9 : 18, fontWeight: 700, lineHeight: 1.3, whiteSpace: 'pre-line', marginBottom: compact ? 4 : 10, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>{firstPage.content}</div>
          <div style={{ fontSize: compact ? 7 : 11, color: '#64748b' }}>{asset.name}</div>
        </div>
        {!compact && <div style={{ width: 56, height: 4, backgroundColor: '#dc2626', borderRadius: 999 }} />}
      </div>,
      darkMode ? '#111827' : '#e2e8f0'
    );
  }

  if (asset.wordPreview?.sections?.length) {
    const firstSection = asset.wordPreview.sections[0];
    return wrap(
      <div style={{ height: '100%', padding: compact ? 8 : 16, background: darkMode ? '#f8fafc' : '#ffffff', color: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
        <div style={{ ...labelStyle, color: '#2563eb', opacity: 1 }}>DOCX FILE</div>
        <div>
          <div style={{ fontSize: compact ? 9 : 17, fontWeight: 700, lineHeight: 1.35, marginBottom: compact ? 4 : 8 }}>{asset.wordPreview.title}</div>
          <div style={{ fontSize: compact ? 7 : 11, color: '#475569', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: compact ? 2 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{firstSection.content}</div>
        </div>
        {!compact && <div style={{ width: 64, height: 4, backgroundColor: '#2563eb', borderRadius: 999 }} />}
      </div>,
      darkMode ? '#0f172a' : '#dbeafe'
    );
  }

  if (asset.pptPreview?.slides?.length) {
    const firstSlide = asset.pptPreview.slides[0];
    return wrap(
      <div style={{ height: '100%', padding: compact ? 8 : 16, color: '#fff', background: `linear-gradient(135deg, ${firstSlide.color}, ${darkMode ? '#0f172a' : '#93c5fd'})`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={labelStyle}>SLIDE 01</div>
        <div style={{ fontSize: compact ? 9 : 19, fontWeight: 700, lineHeight: 1.28, whiteSpace: 'pre-line', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>{firstSlide.content}</div>
        {!compact && <div style={{ fontSize: 11, opacity: 0.76 }}>{asset.pptPreview.totalSlides} 页演示文稿</div>}
      </div>,
      firstSlide.color
    );
  }

  if (asset.excelData?.headers?.length) {
    return wrap(
      <div style={{ height: '100%', padding: compact ? 8 : 12, background: darkMode ? '#0f172a' : '#ecfdf5', display: 'flex', flexDirection: 'column', gap: compact ? 3 : 6 }}>
        <div style={{ ...labelStyle, color: '#047857', opacity: 1 }}>XLSX TABLE</div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(asset.excelData.headers.length, compact ? 3 : 4)}, 1fr)`, gap: 4 }}>
          {asset.excelData.headers.slice(0, compact ? 3 : 4).map(header => (
            <div key={header} style={{ padding: compact ? '3px 4px' : '4px 6px', borderRadius: 4, backgroundColor: '#047857', color: '#fff', fontSize: compact ? 6 : 9, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{header}</div>
          ))}
        </div>
        {asset.excelData.rows.slice(0, compact ? 2 : 3).map((row, index) => (
          <div key={`${asset.id}-row-${index}`} style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(row.length, compact ? 3 : 4)}, 1fr)`, gap: 4 }}>
            {row.slice(0, compact ? 3 : 4).map((cell, cellIndex) => (
              <div key={`${asset.id}-cell-${index}-${cellIndex}`} style={{ padding: compact ? '2px 4px' : '4px 6px', borderRadius: 4, backgroundColor: darkMode ? '#1f2937' : '#ffffff', color: darkMode ? '#e5e7eb' : '#334155', fontSize: compact ? 6 : 8.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cell}</div>
            ))}
          </div>
        ))}
      </div>,
      darkMode ? '#064e3b' : '#d1fae5'
    );
  }

  if (asset.imagePreview?.colors?.length) {
    return wrap(
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: `repeat(${asset.imagePreview.colors.length}, 1fr)` }}>
        {asset.imagePreview.colors.map(color => (<div key={color.hex} style={{ backgroundColor: color.hex }} />))}
      </div>,
      darkMode ? '#111827' : '#f8fafc'
    );
  }

  if (asset.svgPreview?.variants?.length) {
    return wrap(
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: `repeat(${compact ? 2 : 3}, 1fr)`, gap: compact ? 4 : 8, padding: compact ? 6 : 10, backgroundColor: darkMode ? '#111827' : '#f8fafc' }}>
        {asset.svgPreview.variants.slice(0, compact ? 2 : 3).map(variant => (
          <div key={variant.name} style={{ borderRadius: compact ? 6 : 8, backgroundColor: variant.bg, border: '1px solid rgba(148,163,184,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: variant.color, fontWeight: 700, fontSize: compact ? 8 : 12 }}>A</div>
        ))}
      </div>,
      darkMode ? '#111827' : '#f8fafc'
    );
  }

  if (asset.zipPreview?.files?.length) {
    return wrap(
      <div style={{ height: '100%', padding: compact ? 8 : 14, background: darkMode ? '#1e1b4b' : '#eef2ff', color: darkMode ? '#e0e7ff' : '#312e81', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ ...labelStyle, color: darkMode ? '#c4b5fd' : '#4338ca', opacity: 1 }}>ARCHIVE PACKAGE</div>
        <div style={{ display: 'grid', gap: compact ? 3 : 5 }}>
          {asset.zipPreview.files.slice(0, compact ? 2 : 4).map(file => (
            <div key={file.name} style={{ padding: compact ? '3px 5px' : '5px 8px', borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.55)', fontSize: compact ? 6 : 9, color: '#312e81', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
          ))}
        </div>
        {!compact && <div style={{ fontSize: 10, opacity: 0.8 }}>共 {asset.zipPreview.totalFiles} 个文件</div>}
      </div>,
      darkMode ? '#312e81' : '#c7d2fe'
    );
  }

  if (asset.imagePreview?.dimensions || asset.imagePreview?.description) {
    return wrap(
      <div style={{ height: '100%', padding: compact ? 8 : 16, background: `linear-gradient(135deg, ${darkMode ? '#1e293b' : '#dbeafe'}, ${darkMode ? '#0f172a' : '#f8fafc'})`, color: darkMode ? '#e2e8f0' : '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={labelStyle}>IMAGE COVER</div>
        <div style={{ fontSize: compact ? 8 : 11, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: compact ? 2 : 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{asset.imagePreview.description || asset.name}</div>
        {!compact && <div style={{ fontSize: 10, opacity: 0.72 }}>{asset.imagePreview.dimensions || asset.imagePreview.colorMode}</div>}
      </div>,
      darkMode ? '#0f172a' : '#eff6ff'
    );
  }

  return wrap(
    <div style={{ height: '100%', padding: compact ? 8 : 16, background: `linear-gradient(135deg, ${theme.accent}, ${darkMode ? '#111827' : '#fde7db'})`, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={labelStyle}>{asset.format}</div>
      <div style={{ fontSize: compact ? 8 : 16, fontWeight: 700, lineHeight: 1.35, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>{asset.name}</div>
      {!compact && <div style={{ fontSize: 10, opacity: 0.76 }}>{asset.updatedBy}</div>}
    </div>,
    theme.accent
  );
}

export default function Assets() {
  const { theme, darkMode, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory, viewMode, setViewMode, setPreviewAsset } = useApp();

  const currentCategory = categories.find(c => c.id === selectedCategory);
  const currentSubCategory = currentCategory?.children?.find(s => s.id === selectedSubCategory);

  const filteredAssets = assets.filter(a => {
    if (selectedCategory === 'all') return true;
    if (selectedSubCategory) return a.category === selectedCategory || a.category === selectedSubCategory.split('-')[0];
    return a.category === selectedCategory;
  });

  const renderCtx = { darkMode, theme };

  return (
    <div style={{ padding: 28 }}>
      {/* 面包屑导航 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13, color: theme.textMuted }}>
        <span style={{ cursor: 'pointer' }} onClick={() => { setSelectedCategory('all'); setSelectedSubCategory(null); }}>全部素材</span>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: selectedSubCategory ? theme.textMuted : theme.text, cursor: 'pointer' }} onClick={() => setSelectedSubCategory(null)}>{currentCategory?.name}</span>
          </>
        )}
        {selectedSubCategory && currentSubCategory && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: theme.text }}>{currentSubCategory.name}</span>
          </>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
            {currentSubCategory?.name || currentCategory?.name || '全部素材'}
          </h2>
          <p style={{ fontSize: 14, color: theme.textSecondary }}>共 {filteredAssets.length} 个素材</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', backgroundColor: theme.bgTertiary, border: `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', color: theme.textSecondary, fontSize: 14 }}>
            <Filter size={16} />
            筛选
          </button>
          <div style={{ display: 'flex', backgroundColor: theme.bgTertiary, borderRadius: 8, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
            <button onClick={() => setViewMode('grid')} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: viewMode === 'grid' ? theme.accent : 'transparent', color: viewMode === 'grid' ? '#fff' : theme.textSecondary, border: 'none', cursor: 'pointer' }}><Grid size={18} /></button>
            <button onClick={() => setViewMode('list')} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: viewMode === 'list' ? theme.accent : 'transparent', color: viewMode === 'list' ? '#fff' : theme.textSecondary, border: 'none', cursor: 'pointer' }}><List size={18} /></button>
          </div>
        </div>
      </div>

      {/* 子分类标签 */}
      {currentCategory?.children && !selectedSubCategory && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24, padding: 16, backgroundColor: theme.bgTertiary, borderRadius: 5 }}>
          <span style={{ fontSize: 13, color: theme.textMuted, marginRight: 8 }}>子分类：</span>
          {currentCategory.children.map(sub => (
            <button key={sub.id} onClick={() => setSelectedSubCategory(sub.id)} style={{ padding: '6px 14px', fontSize: 13, backgroundColor: selectedSubCategory === sub.id ? theme.accent : theme.cardBg, color: selectedSubCategory === sub.id ? '#fff' : theme.textSecondary, border: `1px solid ${selectedSubCategory === sub.id ? theme.accent : theme.border}`, borderRadius: 6, cursor: 'pointer' }}>
              {sub.name}
              <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>({sub.count})</span>
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {filteredAssets.map(asset => (
          <div key={asset.id} className="card-hover" onClick={() => setPreviewAsset(asset)} style={{ backgroundColor: theme.cardBg, borderRadius: 6, border: 'none', boxShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ height: 140, position: 'relative', overflow: 'hidden' }}>
              {renderAssetPreview(asset, {}, renderCtx)}
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 11, padding: '3px 8px', backgroundColor: theme.bgTertiary, borderRadius: 4, color: theme.textSecondary }}>{asset.format}</span>
                <span style={{ fontSize: 11, padding: '3px 8px', backgroundColor: theme.accentLight, borderRadius: 4, color: theme.accent }}>v{asset.version}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 600 }}>{asset.updatedBy[0]}</div>
                <span style={{ fontSize: 12, color: theme.textSecondary }}>{asset.updatedBy}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: theme.textMuted }}>{asset.updatedAt}</span>
                <span style={{ fontSize: 11, color: theme.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><Download size={12} /> {asset.downloads}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Preview Modal */}
      {useApp().previewAsset && <AssetPreviewModal />}

    </div>
  );
}

function AssetPreviewModal() {
  const { previewAsset, setPreviewAsset, theme, darkMode } = useApp();
  if (!previewAsset) return null;

  const [currentPage, setCurrentPage] = React.useState(0);

  const isExcel = previewAsset.excelData;
  const isPDF = previewAsset.pdfPreview;
  const isWord = previewAsset.wordPreview;
  const isPPT = previewAsset.pptPreview;
  const isZip = previewAsset.zipPreview;
  const isColorCard = previewAsset.imagePreview?.colors;
  const isSVG = previewAsset.svgPreview;
  const isImage = previewAsset.imagePreview && !previewAsset.imagePreview.colors;

  const getFileColor = () => {
    switch(previewAsset.format) {
      case 'XLSX': return '#217346';
      case 'PDF': return '#DC2626';
      case 'DOCX': return '#2563EB';
      case 'PPTX': return '#D97706';
      case 'ZIP': return '#7C3AED';
      case 'PNG': case 'JPG': case 'SVG': return '#0891B2';
      default: return theme.accent;
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }} onClick={() => setPreviewAsset(null)}>
      <div style={{ width: isExcel || isPDF || isWord || isPPT ? 1000 : isZip ? 700 : 800, maxHeight: '90vh', backgroundColor: theme.cardBg, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>

        {/* 顶部标题栏 */}
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.bgTertiary, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: getFileColor(), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600 }}>{previewAsset.format}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>{previewAsset.name}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{previewAsset.format} · {previewAsset.size} · v{previewAsset.version}</div>
            </div>
          </div>
          <button onClick={() => setPreviewAsset(null)} style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, cursor: 'pointer', color: theme.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✕</button>
        </div>

        {isExcel && (
          <>
            <div style={{ padding: '8px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 16, backgroundColor: theme.bgSecondary, flexShrink: 0 }}>
              <div style={{ padding: '6px 12px', backgroundColor: '#217346', color: '#fff', borderRadius: 4, fontSize: 12, fontWeight: 500 }}>{previewAsset.excelData.sheetName}</div>
              <span style={{ fontSize: 12, color: theme.textMuted }}>{previewAsset.excelData.rows.length} 行 × {previewAsset.excelData.headers.length} 列</span>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', backgroundColor: '#217346', color: '#fff', fontWeight: 600, textAlign: 'center', border: '1px solid #1d6840', width: 50 }}>#</th>
                    {previewAsset.excelData.headers.map((header, i) => (<th key={i} style={{ padding: '12px 16px', backgroundColor: '#217346', color: '#fff', fontWeight: 600, textAlign: 'left', border: '1px solid #1d6840', minWidth: 100 }}>{header}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {previewAsset.excelData.rows.map((row, ri) => (
                    <tr key={ri} style={{ backgroundColor: ri % 2 === 0 ? theme.bgSecondary : theme.bgTertiary }}>
                      <td style={{ padding: '10px 16px', border: `1px solid ${theme.border}`, textAlign: 'center', color: theme.textMuted, backgroundColor: darkMode ? '#2d3748' : '#f0f4f8', fontWeight: 500 }}>{ri + 1}</td>
                      {row.map((cell, ci) => (<td key={ci} style={{ padding: '10px 16px', border: `1px solid ${theme.border}`, color: theme.text }}>{cell}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {isPDF && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: 200, borderRight: `1px solid ${theme.border}`, overflowY: 'auto', padding: 16, backgroundColor: theme.bgTertiary }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 12 }}>共 {previewAsset.pdfPreview.totalPages} 页</div>
              {previewAsset.pdfPreview.pages.map((page, i) => (
                <button key={i} onClick={() => setCurrentPage(i)} style={{ width: '100%', padding: 8, marginBottom: 8, backgroundColor: currentPage === i ? theme.accentLight : theme.bgSecondary, border: currentPage === i ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontSize: 10, color: theme.textMuted, marginBottom: 4 }}>第 {page.num} 页</div>
                  <div style={{ fontSize: 12, color: currentPage === i ? theme.accent : theme.text, fontWeight: 500 }}>{page.title}</div>
                </button>
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: darkMode ? '#1a1a1a' : '#f0f0f0' }}>
              <div style={{ width: '100%', maxWidth: 500, aspectRatio: '1/1.414', backgroundColor: '#fff', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, color: '#1a1a1a' }}>
                <div style={{ fontSize: 12, color: '#DC2626', marginBottom: 16, fontWeight: 600 }}>{previewAsset.pdfPreview.pages[currentPage]?.title}</div>
                <div style={{ fontSize: 18, fontWeight: 500, textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.8 }}>{previewAsset.pdfPreview.pages[currentPage]?.content}</div>
              </div>
            </div>
          </div>
        )}

        {isWord && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: 220, borderRight: `1px solid ${theme.border}`, overflowY: 'auto', padding: 16, backgroundColor: theme.bgTertiary }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 12 }}>目录 · 共 {previewAsset.wordPreview.totalPages} 页</div>
              {previewAsset.wordPreview.sections.map((section, i) => (
                <button key={i} onClick={() => setCurrentPage(i)} style={{ width: '100%', padding: 10, marginBottom: 6, backgroundColor: currentPage === i ? theme.accentLight : 'transparent', border: 'none', borderLeft: currentPage === i ? `3px solid ${theme.accent}` : `3px solid transparent`, borderRadius: 0, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontSize: 13, color: currentPage === i ? theme.accent : theme.text, fontWeight: 500 }}>{section.title}</div>
                </button>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 40, backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5' }}>
              <div style={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#fff', borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', padding: 48, minHeight: 500, color: '#1a1a1a' }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#2563EB', marginBottom: 24, borderBottom: '2px solid #2563EB', paddingBottom: 12 }}>{previewAsset.wordPreview.sections[currentPage]?.title}</h2>
                <div style={{ fontSize: 14, lineHeight: 2, whiteSpace: 'pre-line', color: '#333' }}>{previewAsset.wordPreview.sections[currentPage]?.content}</div>
              </div>
            </div>
          </div>
        )}

        {isPPT && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: 180, borderRight: `1px solid ${theme.border}`, overflowY: 'auto', padding: 12, backgroundColor: theme.bgTertiary }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, marginBottom: 12, padding: '0 4px' }}>共 {previewAsset.pptPreview.totalSlides} 页</div>
              {previewAsset.pptPreview.slides.map((slide, i) => (
                <button key={i} onClick={() => setCurrentPage(i)} style={{ width: '100%', aspectRatio: '16/9', marginBottom: 8, backgroundColor: slide.color, border: currentPage === i ? `3px solid ${theme.accent}` : `2px solid transparent`, borderRadius: 6, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 8, position: 'relative' }}>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)' }}>{slide.title}</span>
                  <span style={{ position: 'absolute', bottom: 4, right: 6, fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>{i + 1}</span>
                </button>
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: darkMode ? '#0a0a0a' : '#1a1a1a' }}>
              <div style={{ width: '100%', maxWidth: 640, aspectRatio: '16/9', backgroundColor: previewAsset.pptPreview.slides[currentPage]?.color, borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>{previewAsset.pptPreview.slides[currentPage]?.title}</div>
                <div style={{ fontSize: 28, fontWeight: 600, color: '#fff', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{previewAsset.pptPreview.slides[currentPage]?.content}</div>
              </div>
            </div>
          </div>
        )}

        {isZip && (
          <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
            <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 16 }}>压缩包包含 {previewAsset.zipPreview.totalFiles} 个文件</div>
            <div style={{ border: `1px solid ${theme.border}`, borderRadius: 8, overflow: 'hidden' }}>
              {previewAsset.zipPreview.files.map((file, i) => (
                <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: i % 2 === 0 ? theme.bgSecondary : theme.bgTertiary, borderBottom: i < previewAsset.zipPreview.files.length - 1 ? `1px solid ${theme.border}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{file.type === 'image' ? '🖼️' : file.type === 'text' ? '📄' : '📁'}</span>
                    <span style={{ fontSize: 13, color: theme.text }}>{file.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: theme.textMuted }}>{file.size}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: theme.textMuted, textAlign: 'center' }}>... 还有 {previewAsset.zipPreview.totalFiles - previewAsset.zipPreview.files.length} 个文件</div>
          </div>
        )}

        {isColorCard && (
          <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
            <div style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24 }}>品牌标准色彩规范</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
              {previewAsset.imagePreview.colors.map((color, i) => (
                <div key={i} style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                  <div style={{ height: 100, backgroundColor: color.hex }} />
                  <div style={{ padding: 12, backgroundColor: theme.bgTertiary }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 4 }}>{color.name}</div>
                    <div style={{ fontSize: 11, color: theme.textMuted }}>{color.hex}</div>
                    <div style={{ fontSize: 11, color: theme.textMuted }}>RGB: {color.rgb}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isSVG && (
          <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
            <div style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24 }}>Logo 变体预览</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {previewAsset.svgPreview.variants.map((variant, i) => (
                <div key={i} style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                  <div style={{ height: 160, backgroundColor: variant.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: variant.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: variant.bg, fontSize: 32, fontWeight: 700, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>A</div>
                  </div>
                  <div style={{ padding: 12, backgroundColor: theme.bgTertiary, textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>{variant.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isImage && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: darkMode ? '#0a0a0a' : '#f0f0f0' }}>
            <div style={{ width: '100%', maxWidth: 600, aspectRatio: '16/9', backgroundColor: theme.bgTertiary, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid ${theme.border}` }}>
              <span style={{ fontSize: 80 }}>{previewAsset.thumbnail}</span>
            </div>
            <div style={{ fontSize: 13, color: theme.textMuted }}>{previewAsset.imagePreview.dimensions} · {previewAsset.imagePreview.colorMode}</div>
            <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 8, textAlign: 'center', maxWidth: 400 }}>{previewAsset.imagePreview.description}</div>
          </div>
        )}

        {/* 底部操作栏 */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.bgTertiary, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: theme.textMuted }}>
            <span>上传者: {previewAsset.updatedBy}</span>
            <span>更新: {previewAsset.updatedAt}</span>
            <span>下载: {previewAsset.downloads}次</span>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', backgroundColor: getFileColor(), color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            <Download size={18} />
            下载文件
          </button>
        </div>
      </div>
    </div>
  );
}
