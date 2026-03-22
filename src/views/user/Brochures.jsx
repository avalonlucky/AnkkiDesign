import React, { useState } from 'react';
import { BookOpen, Eye, Link2, Upload, X, ChevronLeft, ChevronRight, Copy, Check, ExternalLink, Search, Download, Lock, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShareLinkViewer } from '../admin/ShareLinks';

const CATEGORIES = ['全部', '产品手册', '企业画册', '解决方案', '白皮书', '案例集'];

// ─── Book Card ──────────────────────────────────────────────────────────────
function BookCard({ brochure, isAdmin, onView, onShare }) {
  const { theme } = useApp();
  const [hovered, setHovered] = useState(false);
  const [g0, g1] = brochure.gradient;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 8, overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.22)' : '0 4px 16px rgba(0,0,0,0.10)', transform: hovered ? 'translateY(-6px) scale(1.01)' : 'none', transition: 'all 0.25s ease', backgroundColor: theme.cardBg }}
    >
      {/* Cover */}
      <div
        onClick={() => onView(brochure)}
        style={{ height: 200, background: `linear-gradient(160deg, ${g0}, ${g1})`, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 16 }}
      >
        {/* Category badge */}
        <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(4px)' }}>
          {brochure.category}
        </span>
        {/* Page count */}
        <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>
          {brochure.pages} 页
        </span>
        {/* Title */}
        <div style={{ color: '#fff' }}>
          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 4, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{brochure.title}</div>
          <div style={{ fontSize: 11, opacity: 0.75 }}>{brochure.subtitle}</div>
        </div>
        {/* Hover overlay */}
        {hovered && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <button onClick={(e) => { e.stopPropagation(); onView(brochure); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', backgroundColor: '#fff', color: '#1f2937', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              <Eye size={14} /> 查看
            </button>
            <button onClick={(e) => { e.stopPropagation(); onShare(brochure); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500, backdropFilter: 'blur(4px)' }}>
              <Link2 size={14} /> 分享
            </button>
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{brochure.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: theme.textMuted }}>{brochure.uploadedBy} · {brochure.uploadedAt}</span>
          <span style={{ fontSize: 11, color: theme.textMuted, display: 'flex', alignItems: 'center', gap: 3 }}><Eye size={11} /> {brochure.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// ─── PDF Reader Modal ────────────────────────────────────────────────────────
function ReaderModal({ brochure, onClose, onShare }) {
  const { theme } = useApp();
  const [page, setPage] = useState(0);
  const hasRealPdf = !!brochure.fileUrl;
  const pages = brochure.previewPages;
  const cur = pages[page];
  const [g0, g1] = brochure.gradient;

  const handleDownload = () => {
    if (brochure.fileUrl) {
      const a = document.createElement('a');
      a.href = brochure.fileUrl;
      a.download = brochure.fileName || `${brochure.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div className="modal-content" style={{ width: hasRealPdf ? '92vw' : 860, height: hasRealPdf ? '92vh' : 'auto', maxHeight: '92vh', backgroundColor: theme.cardBg, borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BookOpen size={16} style={{ color: theme.accent }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{brochure.title}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{brochure.size} · {brochure.uploadedBy}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {hasRealPdf && (
              <button onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', backgroundColor: theme.bgTertiary, color: theme.textSecondary, border: `1px solid ${theme.border}`, borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
                <Download size={13} /> 下载
              </button>
            )}
            <button onClick={() => onShare(brochure)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', backgroundColor: theme.accentLight, color: theme.accent, border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
              <Link2 size={13} /> 分享
            </button>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: theme.bgTertiary, border: 'none', cursor: 'pointer', color: theme.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
          </div>
        </div>

        {/* Body */}
        {hasRealPdf ? (
          /* ── 真实 PDF：全屏 iframe ── */
          <iframe
            src={brochure.fileUrl}
            title={brochure.title}
            style={{ flex: 1, border: 'none', width: '100%', backgroundColor: '#525659' }}
          />
        ) : (
          /* ── Mock 数据：幻灯片预览 ── */
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Thumbnail sidebar */}
            <div style={{ width: 110, borderRight: `1px solid ${theme.border}`, overflowY: 'auto', padding: '10px 8px', flexShrink: 0, backgroundColor: theme.bgTertiary }}>
              {pages.map((p, i) => (
                <div key={i} onClick={() => setPage(i)} style={{ marginBottom: 8, cursor: 'pointer', borderRadius: 5, overflow: 'hidden', border: page === i ? `2px solid ${theme.accent}` : '2px solid transparent', transition: 'border-color 0.15s' }}>
                  <div style={{ height: 68, background: `linear-gradient(160deg, ${g0}, ${g1})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>
                    <div style={{ textAlign: 'center', color: '#fff' }}>
                      <div style={{ fontSize: 9, opacity: 0.8, marginBottom: 2 }}>P{i + 1}</div>
                      <div style={{ fontSize: 8, fontWeight: 600, lineHeight: 1.3 }}>{p.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main page */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: theme.bg }}>
              <div style={{ width: '100%', maxWidth: 520, aspectRatio: '16/10', background: `linear-gradient(160deg, ${g0}, ${g1})`, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, boxShadow: '0 12px 40px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 16, left: 20, fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{cur.label}</div>
                <div style={{ position: 'absolute', bottom: 14, right: 18, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{page + 1} / {pages.length}</div>
                <div style={{ width: 40, height: 3, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 2, marginBottom: 20 }} />
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.3, marginBottom: 14, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>{cur.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 1.6 }}>{cur.sub}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, cursor: page === 0 ? 'not-allowed' : 'pointer', color: page === 0 ? theme.textMuted : theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === 0 ? 0.4 : 1 }}>
                  <ChevronLeft size={16} />
                </button>
                <span style={{ fontSize: 13, color: theme.textMuted }}>{page + 1} / {pages.length}</span>
                <button onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))} disabled={page === pages.length - 1} style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, cursor: page === pages.length - 1 ? 'not-allowed' : 'pointer', color: page === pages.length - 1 ? theme.textMuted : theme.text, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === pages.length - 1 ? 0.4 : 1 }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Share Link Modal ────────────────────────────────────────────────────────
const EXPIRY_OPTIONS = [
  { label: '永久有效', value: '' },
  { label: '7 天', value: 7 },
  { label: '30 天', value: 30 },
  { label: '90 天', value: 90 },
];

function ShareModal({ brochure, onClose }) {
  const { theme, currentUser, shareLinks, setShareLinks } = useApp();
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [expiryDays, setExpiryDays] = useState('');
  const [generated, setGenerated] = useState(() => shareLinks.find(l => l.brochureId === brochure.id) || null);
  const [copied, setCopied] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const handleGenerate = () => {
    const code = `${brochure.shareCode || brochure.id}-${Date.now().toString(36)}`;
    const expiresAt = expiryDays ? new Date(Date.now() + expiryDays * 86400000).toISOString().split('T')[0] : null;
    const newLink = {
      id: `sl-${Date.now()}`,
      brochureId: brochure.id,
      brochureTitle: brochure.title,
      shareCode: code,
      url: `https://ankki.design/brochures/${code}`,
      password: usePassword ? password : '',
      expiresAt,
      views: 0,
      enabled: true,
      createdBy: currentUser.name,
      createdAt: new Date().toLocaleDateString('zh-CN'),
    };
    setShareLinks(prev => [newLink, ...prev]);
    setGenerated(newLink);
  };

  const handleCopy = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated.url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div className="modal-content" style={{ width: 500, backgroundColor: theme.cardBg, borderRadius: 10, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link2 size={16} style={{ color: theme.accent }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>分享彩页</span>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: theme.bgTertiary, border: 'none', cursor: 'pointer', color: theme.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={14} /></button>
        </div>

        <div style={{ padding: 24 }}>
          {/* Brochure info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', backgroundColor: theme.bgTertiary, borderRadius: 6, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: `linear-gradient(135deg, ${brochure.gradient[0]}, ${brochure.gradient[1]})`, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>{brochure.title}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{brochure.category} · {brochure.uploadedBy}</div>
            </div>
          </div>

          {!generated ? (
            /* ── 配置阶段 ── */
            <>
              {/* Password */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: usePassword ? 10 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Lock size={13} style={{ color: theme.textSecondary }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>访问密码</span>
                    <span style={{ fontSize: 11, color: theme.textMuted }}>（可选）</span>
                  </div>
                  <button onClick={() => setUsePassword(!usePassword)} style={{ width: 38, height: 20, borderRadius: 10, backgroundColor: usePassword ? theme.accent : theme.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background-color 0.2s' }}>
                    <span style={{ position: 'absolute', top: 2, left: usePassword ? 20 : 2, width: 16, height: 16, borderRadius: '50%', backgroundColor: '#fff', transition: 'left 0.2s' }} />
                  </button>
                </div>
                {usePassword && (
                  <input type="text" placeholder="输入访问密码" value={password} onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: `1px solid ${theme.border}`, borderRadius: 6, backgroundColor: theme.bg, color: theme.text, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                )}
              </div>

              {/* Expiry */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <Calendar size={13} style={{ color: theme.textSecondary }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>有效期</span>
                  <span style={{ fontSize: 11, color: theme.textMuted }}>（可选，默认永久）</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {EXPIRY_OPTIONS.map(opt => (
                    <button key={opt.label} onClick={() => setExpiryDays(opt.value)}
                      style={{ padding: '6px 14px', fontSize: 12, borderRadius: 6, border: `1px solid ${expiryDays === opt.value ? theme.accent : theme.border}`, backgroundColor: expiryDays === opt.value ? theme.accentLight : 'transparent', color: expiryDays === opt.value ? theme.accent : theme.textSecondary, cursor: 'pointer' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleGenerate} disabled={usePassword && !password}
                style={{ width: '100%', padding: '12px', backgroundColor: (usePassword && !password) ? theme.bgTertiary : theme.accent, color: (usePassword && !password) ? theme.textMuted : '#fff', border: 'none', borderRadius: 8, cursor: (usePassword && !password) ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 500 }}>
                生成分享链接
              </button>
            </>
          ) : (
            /* ── 已生成阶段 ── */
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <div style={{ flex: 1, padding: '10px 14px', backgroundColor: theme.bgTertiary, borderRadius: 6, border: `1px solid ${theme.border}`, fontSize: 12, color: theme.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                  {generated.url}
                </div>
                <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 14px', backgroundColor: copied ? '#10b981' : theme.accent, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500, flexShrink: 0, transition: 'background-color 0.2s' }}>
                  {copied ? <><Check size={12} />已复制</> : <><Copy size={12} />复制</>}
                </button>
              </div>

              {/* Link settings summary */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, backgroundColor: generated.password ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)', color: generated.password ? '#f59e0b' : '#10b981' }}>
                  {generated.password ? `🔒 有密码` : '🔓 无密码'}
                </span>
                <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, backgroundColor: theme.bgTertiary, color: theme.textSecondary }}>
                  {generated.expiresAt ? `⏱ 至 ${generated.expiresAt}` : '∞ 永久有效'}
                </span>
              </div>

              <div style={{ padding: 12, backgroundColor: theme.bgTertiary, borderRadius: 6, fontSize: 12, color: theme.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                <div>· 无密码用户直接点链接即可查看</div>
                <div>· 有密码用户需输入密码后查看</div>
                <div>· 可在后台「链接管理」停用或删除链接</div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setPreviewing(true)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '10px', backgroundColor: theme.bgTertiary, color: theme.textSecondary, border: `1px solid ${theme.border}`, borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
                  <ExternalLink size={13} /> 预览访问效果
                </button>
                <button onClick={() => setGenerated(null)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '10px', backgroundColor: 'transparent', color: theme.accent, border: `1px solid ${theme.accent}`, borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
                  重新配置
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {previewing && generated && (
        <ShareLinkViewer link={generated} brochure={brochure} onClose={() => setPreviewing(false)} />
      )}
    </div>
  );
}

// ─── Main View ───────────────────────────────────────────────────────────────
export default function Brochures() {
  const { theme, darkMode, isAdmin, setUploadOpen, brochures } = useApp();
  const [category, setCategory] = useState('全部');
  const [search, setSearch] = useState('');
  const [viewingBrochure, setViewingBrochure] = useState(null);
  const [sharingBrochure, setSharingBrochure] = useState(null);

  const filtered = brochures.filter(b => {
    const matchCat = category === '全部' || b.category === category;
    const matchSearch = !search || b.title.includes(search) || b.subtitle.toLowerCase().includes(search.toLowerCase()) || b.category.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <BookOpen size={22} style={{ color: theme.accent }} />
            <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text }}>产品彩页</h2>
          </div>
          <p style={{ fontSize: 14, color: theme.textSecondary }}>浏览并分享公司产品手册与企业画册</p>
        </div>
        {isAdmin && (
          <button onClick={() => setUploadOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', backgroundColor: theme.accent, color: '#fff', border: 'none', borderRadius: 7, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            <Upload size={14} /> 上传彩页
          </button>
        )}
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索彩页…" style={{ width: '100%', padding: '8px 12px 8px 30px', border: `1px solid ${theme.border}`, borderRadius: 6, backgroundColor: theme.bgSecondary, color: theme.text, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '6px 14px', fontSize: 13, border: `1px solid ${category === cat ? theme.accent : theme.border}`, borderRadius: 20, cursor: 'pointer', backgroundColor: category === cat ? theme.accent : 'transparent', color: category === cat ? '#fff' : theme.textSecondary, transition: 'all 0.15s' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20, fontSize: 13, color: theme.textMuted }}>
        <span>共 <strong style={{ color: theme.text }}>{filtered.length}</strong> 本</span>
        {category !== '全部' && <><span style={{ margin: '0 4px' }}>·</span><span>分类：{category}</span></>}
      </div>

      {/* Bookshelf grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: theme.textMuted, fontSize: 14 }}>
          <BookOpen size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <div>暂无彩页</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {filtered.map(b => (
            <BookCard key={b.id} brochure={b} isAdmin={isAdmin} onView={setViewingBrochure} onShare={setSharingBrochure} />
          ))}
          {/* Empty add slot for admin */}
          {isAdmin && (
            <div onClick={() => setUploadOpen(true)} style={{ borderRadius: 8, border: `2px dashed ${theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', minHeight: 248, color: theme.textMuted, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.color = theme.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textMuted; }}>
              <Upload size={22} />
              <span style={{ fontSize: 13 }}>上传彩页</span>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {viewingBrochure && <ReaderModal brochure={viewingBrochure} onClose={() => setViewingBrochure(null)} onShare={(b) => { setViewingBrochure(null); setSharingBrochure(b); }} />}
      {sharingBrochure && <ShareModal brochure={sharingBrochure} onClose={() => setSharingBrochure(null)} />}
    </div>
  );
}
