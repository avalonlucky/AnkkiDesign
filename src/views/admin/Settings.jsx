import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminSettings() {
  const { theme } = useApp();

  return (
    <div style={{ padding: 28, maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>系统设置</h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>管理平台基础配置</p>
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: 6,
        border: `1px solid ${theme.border}`,
        marginBottom: 24,
      }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>基本设置</h3>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>平台名称</label>
            <input
              type="text"
              defaultValue="Ankki Design"
              style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                borderRadius: 8, backgroundColor: theme.bg, color: theme.text,
                fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.text, marginBottom: 8 }}>公司名称</label>
            <input
              type="text"
              defaultValue="Ankki 科技有限公司"
              style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${theme.border}`,
                borderRadius: 8, backgroundColor: theme.bg, color: theme.text,
                fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: 6,
        border: `1px solid ${theme.border}`,
      }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>上传设置</h3>
        </div>
        <div style={{ padding: 24 }}>
          {[
            { label: '需要审核', desc: '新上传的素材需要管理员审核后才能发布', active: true },
            { label: '自动版本号', desc: '上传新版本时自动递增版本号', active: true },
          ].map((setting, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i === 0 ? 20 : 0 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 4 }}>{setting.label}</div>
                <div style={{ fontSize: 12, color: theme.textMuted }}>{setting.desc}</div>
              </div>
              <div style={{
                width: 48, height: 26, borderRadius: 6,
                backgroundColor: setting.active ? theme.accent : theme.bgTertiary,
                padding: 3, cursor: 'pointer',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', backgroundColor: '#fff',
                  marginLeft: setting.active ? 22 : 0, transition: 'margin-left 0.2s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
