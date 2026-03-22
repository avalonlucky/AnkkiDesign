import React, { useState } from 'react';
import { Link2, Eye, EyeOff, Copy, Check, Trash2, ToggleLeft, ToggleRight, Lock, Calendar, ExternalLink, X, AlertCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// ─── Link Access Previewer ───────────────────────────────────────────────────
export function ShareLinkViewer({ link, brochure, onClose }) {
  const { theme, incrementShareLinkViews } = useApp();
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [unlocked, setUnlocked] = useState(!link.password);

  const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();
  const isDisabled = !link.enabled;

  const handleUnlock = () => {
    if (pwInput === link.password) {
      setUnlocked(true);
      setPwError(false);
      incrementShareLinkViews(link.id);
    } else {
      setPwError(true);
    }
  };

  React.useEffect(() => {
    if (unlocked && !link.password) {
      incrementShareLinkViews(link.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderGate = () => {
    if (isDisabled) return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <AlertCircle size={48} style={{ color: theme.textMuted, margin: '0 auto 16px' }} />
        <div style={{ fontSize: 18, fontWeight: 600, color: theme.text, marginBottom: 8 }}>链接已停用</div>
        <div style={{ fontSize: 14, color: theme.textMuted }}>此分享链接已被管理员停用，请联系相关人员获取访问权限。</div>
      </div>
    );
    if (isExpired) return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <Clock size={48} style={{ color: theme.textMuted, margin: '0 auto 16px' }} />
        <div style={{ fontSize: 18, fontWeight: 600, color: theme.text, marginBottom: 8 }}>链接已过期</div>
        <div style={{ fontSize: 14, color: theme.textMuted }}>此链接有效期至 {link.expiresAt}，已超出有效期。</div>
      </div>
    );
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: theme.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Lock size={24} style={{ color: theme.accent }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: theme.text, marginBottom: 6 }}>需要访问密码</div>
        <div style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24 }}>请输入密码后查看《{link.brochureTitle}》</div>
        <div style={{ display: 'flex', gap: 8, maxWidth: 300, margin: '0 auto' }}>
          <input
            type="password" placeholder="输入访问密码" value={pwInput}
            onChange={e => { setPwInput(e.target.value); setPwError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
            style={{ flex: 1, padding: '10px 14px', border: `1px solid ${pwError ? '#ef4444' : theme.border}`, borderRadius: 6, backgroundColor: theme.bg, color: theme.text, fontSize: 14, outline: 'none' }}
          />
          <button onClick={handleUnlock} style={{ padding: '10px 18px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>确认</button>
        </div>
        {pwError && <div style={{ fontSize: 12, color: '#ef4444', marginTop: 8 }}>密码错误，请重试</div>}
      </div>
    );
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div className="modal-content" style={{ width: unlocked && !isDisabled && !isExpired ? '92vw' : 480, height: unlocked && !isDisabled && !isExpired ? '92vh' : 'auto', backgroundColor: theme.cardBg, borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link2 size={15} style={{ color: theme.accent }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{link.brochureTitle}</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, backgroundColor: isDisabled ? 'rgba(239,68,68,0.1)' : isExpired ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)', color: isDisabled ? '#ef4444' : isExpired ? '#f59e0b' : '#10b981' }}>
              {isDisabled ? '已停用' : isExpired ? '已过期' : '访问预览'}
            </span>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: theme.bgTertiary, border: 'none', cursor: 'pointer', color: theme.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={14} /></button>
        </div>
        {unlocked && !isDisabled && !isExpired && brochure?.fileUrl ? (
          <iframe src={brochure.fileUrl} title={link.brochureTitle} style={{ flex: 1, border: 'none', width: '100%', backgroundColor: '#525659' }} />
        ) : (
          <div style={{ backgroundColor: theme.bg }}>{renderGate()}</div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Share Links View ──────────────────────────────────────────────────
export default function AdminShareLinks() {
  const { theme, shareLinks, toggleShareLink, removeShareLink, brochures } = useApp();
  const [previewLink, setPreviewLink] = useState(null);

  const totalViews = shareLinks.reduce((s, l) => s + l.views, 0);
  const activeCount = shareLinks.filter(l => l.enabled).length;

  const toggleEnabled = (id, current) => toggleShareLink(id, !current);
  const deleteLink = (id) => removeShareLink(id);

  const copyUrl = (url) => navigator.clipboard.writeText(url).catch(() => {});

  const isExpired = (l) => l.expiresAt && new Date(l.expiresAt) < new Date();

  const statusBadge = (l) => {
    if (!l.enabled) return <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>已停用</span>;
    if (isExpired(l)) return <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>已过期</span>;
    return <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981' }}>有效</span>;
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>链接管理</h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>管理产品彩页的分享链接，查看访问情况</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: '总链接数', value: shareLinks.length, color: theme.accent },
          { label: '有效链接', value: activeCount, color: theme.success },
          { label: '累计访问', value: totalViews, color: theme.warning },
        ].map((s, i) => (
          <div key={i} style={{ backgroundColor: theme.cardBg, borderRadius: 6, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 28, fontWeight: 600, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ backgroundColor: theme.cardBg, borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}50` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>分享链接列表</h3>
        </div>
        {shareLinks.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: theme.textMuted, fontSize: 14 }}>暂无分享链接</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '22%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '8%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '16%' }} />
            </colgroup>
            <thead>
              <tr style={{ backgroundColor: theme.bgTertiary }}>
                {['彩页名称', '访问链接', '密码', '有效期', '访问量', '状态', '操作'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 500, color: theme.textSecondary, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shareLinks.map((link, i) => {
                const bro = brochures.find(b => b.id === link.brochureId);
                return (
                  <tr key={link.id} className="table-row" style={{ borderBottom: i < shareLinks.length - 1 ? `1px solid ${theme.border}40` : 'none' }}>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: theme.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.brochureTitle}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>/{link.shareCode}</span>
                        <button onClick={() => copyUrl(link.url)} title="复制链接" style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted, display: 'flex', padding: 2 }}><Copy size={12} /></button>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      {link.password ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: theme.warning }}><Lock size={11} /> 已设置</span>
                      ) : (
                        <span style={{ fontSize: 12, color: theme.textMuted }}>无</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: link.expiresAt ? (isExpired(link) ? '#ef4444' : theme.text) : theme.textMuted, whiteSpace: 'nowrap' }}>
                      {link.expiresAt || '永久'}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500, color: theme.text, whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Eye size={12} style={{ color: theme.textMuted }} />{link.views}</span>
                    </td>
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>{statusBadge(link)}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button onClick={() => setPreviewLink(link)} title="预览访问效果" style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted, display: 'flex', padding: 3 }}><ExternalLink size={14} /></button>
                        <button onClick={() => toggleEnabled(link.id, link.enabled)} title={link.enabled ? '停用' : '启用'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: link.enabled ? theme.success : theme.textMuted, display: 'flex', padding: 3 }}>
                          {link.enabled ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                        </button>
                        <button onClick={() => deleteLink(link.id)} title="删除" style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted, display: 'flex', padding: 3 }}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {previewLink && (
        <ShareLinkViewer
          link={previewLink}
          brochure={brochures.find(b => b.id === previewLink.brochureId)}
          onClose={() => setPreviewLink(null)}
        />
      )}
    </div>
  );
}
