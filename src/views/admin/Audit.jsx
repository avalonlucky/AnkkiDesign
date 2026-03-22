import React from 'react';
import { Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { assets } from '../../data/mockData';

export default function AdminAudit() {
  const { theme, darkMode } = useApp();

  // Compact asset preview for the audit list thumbnails
  const renderCompactPreview = (asset) => {
    const getBackground = () => {
      if (asset.pdfPreview?.pages?.length) return darkMode ? '#111827' : '#e2e8f0';
      if (asset.wordPreview?.sections?.length) return darkMode ? '#0f172a' : '#dbeafe';
      if (asset.pptPreview?.slides?.length) return asset.pptPreview.slides[0].color;
      if (asset.excelData?.headers?.length) return darkMode ? '#064e3b' : '#d1fae5';
      if (asset.imagePreview?.colors?.length) return darkMode ? '#111827' : '#f8fafc';
      if (asset.svgPreview?.variants?.length) return darkMode ? '#111827' : '#f8fafc';
      if (asset.zipPreview?.files?.length) return darkMode ? '#312e81' : '#c7d2fe';
      return theme.accent;
    };

    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: getBackground(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 700,
        color: '#fff',
        opacity: 0.9,
      }}>
        {asset.format}
      </div>
    );
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>审核管理</h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>审核待发布的素材内容</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: '待审核', value: 8, color: theme.warning },
          { label: '已通过', value: 156, color: theme.success },
          { label: '已驳回', value: 3, color: theme.textMuted },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: theme.cardBg,
            borderRadius: 6,
            padding: 20,
            border: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: stat.color, marginBottom: 4, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: 6,
        border: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}60` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>待审核列表</h3>
        </div>
        {assets.slice(0, 4).map((asset, i) => (
          <div key={asset.id} style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: i < 3 ? `1px solid ${theme.border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 5,
                overflow: 'hidden',
                border: `1px solid ${theme.border}`,
              }}>
                {renderCompactPreview(asset)}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: theme.text, marginBottom: 4 }}>{asset.name}</div>
                <div style={{ fontSize: 12, color: theme.textMuted }}>
                  上传者: {asset.updatedBy} · {asset.format} · {asset.size}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', backgroundColor: theme.success,
                border: 'none', borderRadius: 6, cursor: 'pointer', color: '#fff', fontSize: 13,
              }}>
                <Check size={16} />
                通过
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', backgroundColor: 'transparent',
                border: '1px solid #ef4444', borderRadius: 6, cursor: 'pointer', color: '#ef4444', fontSize: 13,
              }}>
                <X size={16} />
                驳回
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
