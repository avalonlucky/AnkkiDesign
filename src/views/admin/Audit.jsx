import React from 'react';
import { Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminAudit() {
  const { theme, darkMode, auditItems, setAuditItems } = useApp();

  const approve = (id) => setAuditItems(prev => prev.map(a => a.id === id ? { ...a, auditStatus: 'approved' } : a));
  const reject  = (id) => setAuditItems(prev => prev.map(a => a.id === id ? { ...a, auditStatus: 'rejected' } : a));

  const pending  = auditItems.filter(a => a.auditStatus === 'pending');
  const approved = auditItems.filter(a => a.auditStatus === 'approved');
  const rejected = auditItems.filter(a => a.auditStatus === 'rejected');

  const renderCompactPreview = (asset) => {
    const bg = (() => {
      if (asset.pdfPreview?.pages?.length) return darkMode ? '#111827' : '#e2e8f0';
      if (asset.wordPreview?.sections?.length) return darkMode ? '#0f172a' : '#dbeafe';
      if (asset.pptPreview?.slides?.length) return asset.pptPreview.slides[0].color;
      if (asset.excelData?.headers?.length) return darkMode ? '#064e3b' : '#d1fae5';
      if (asset.imagePreview?.colors?.length) return asset.imagePreview.colors[0].hex;
      if (asset.zipPreview?.files?.length) return darkMode ? '#312e81' : '#c7d2fe';
      return theme.accent;
    })();
    return (
      <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>
        {asset.format}
      </div>
    );
  };

  const statusBadge = (status) => {
    if (status === 'approved') return <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>已通过</span>;
    if (status === 'rejected') return <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 500 }}>已驳回</span>;
    return null;
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>审核管理</h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>审核待发布的素材内容</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: '待审核', value: pending.length, color: theme.warning },
          { label: '已通过', value: approved.length, color: theme.success },
          { label: '已驳回', value: rejected.length, color: '#ef4444' },
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: theme.cardBg, borderRadius: 6, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pending */}
      <div style={{ backgroundColor: theme.cardBg, borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: 20 }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}50` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>
            待审核
            {pending.length > 0 && <span style={{ marginLeft: 8, fontSize: 12, padding: '2px 8px', backgroundColor: 'rgba(245,158,11,0.12)', color: theme.warning, borderRadius: 4 }}>{pending.length}</span>}
          </h3>
        </div>
        {pending.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: theme.textMuted, fontSize: 14 }}>暂无待审核内容</div>
        ) : pending.map((asset, i) => (
          <div key={asset.id} style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < pending.length - 1 ? `1px solid ${theme.border}40` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 5, overflow: 'hidden', flexShrink: 0 }}>
                {renderCompactPreview(asset)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 3 }}>{asset.name}</div>
                <div style={{ fontSize: 12, color: theme.textMuted }}>上传者：{asset.updatedBy} · {asset.format} · {asset.size}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => approve(asset.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', backgroundColor: theme.success, border: 'none', borderRadius: 6, cursor: 'pointer', color: '#fff', fontSize: 13 }}
              >
                <Check size={14} /> 通过
              </button>
              <button
                onClick={() => reject(asset.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', backgroundColor: 'transparent', border: '1px solid #ef4444', borderRadius: 6, cursor: 'pointer', color: '#ef4444', fontSize: 13 }}
              >
                <X size={14} /> 驳回
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reviewed (approved + rejected) */}
      {(approved.length > 0 || rejected.length > 0) && (
        <div style={{ backgroundColor: theme.cardBg, borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}50` }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>已审核</h3>
          </div>
          {[...approved, ...rejected].map((asset, i, arr) => (
            <div key={asset.id} style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}40` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 5, overflow: 'hidden', flexShrink: 0 }}>
                  {renderCompactPreview(asset)}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: theme.text, marginBottom: 2 }}>{asset.name}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{asset.updatedBy} · {asset.format}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {statusBadge(asset.auditStatus)}
                <button
                  onClick={() => setAuditItems(prev => prev.map(a => a.id === asset.id ? { ...a, auditStatus: 'pending' } : a))}
                  style={{ fontSize: 12, color: theme.textMuted, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
                >撤销</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
