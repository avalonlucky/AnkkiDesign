import React from 'react';
import { Eye, Download, Users, FolderOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { assets } from '../../data/mockData';

export default function AdminStats() {
  const { theme, darkMode } = useApp();

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 4 }}>数据统计</h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>平台使用数据分析</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        {[
          { label: '总浏览量', value: '45,892', icon: Eye },
          { label: '总下载量', value: '12,456', icon: Download },
          { label: '活跃用户', value: '234', icon: Users },
          { label: '存储空间', value: '128 GB', icon: FolderOpen },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: theme.cardBg,
            borderRadius: 6,
            padding: 24,
            border: `1px solid ${theme.border}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 6,
              backgroundColor: theme.accentLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: theme.accent, marginBottom: 16,
            }}>
              <stat.icon size={22} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: theme.text, marginBottom: 4, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: theme.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: theme.cardBg,
        borderRadius: 6,
        border: `1px solid ${theme.border}`,
      }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>热门素材 TOP 5</h3>
        </div>
        {[...assets].sort((a, b) => b.downloads - a.downloads).slice(0, 5).map((asset, i) => (
          <div key={asset.id} style={{
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: i < 4 ? `1px solid ${theme.border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{
                width: 28, height: 28, borderRadius: 6,
                backgroundColor: i < 3 ? theme.accent : theme.bgTertiary,
                color: i < 3 ? '#fff' : theme.textMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600,
              }}>{i + 1}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  overflow: 'hidden', border: `1px solid ${theme.border}`,
                  backgroundColor: theme.accentLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: theme.accent,
                }}>
                  {asset.format}
                </div>
                <span style={{ fontSize: 14, color: theme.text, fontWeight: 500 }}>{asset.name}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: theme.textMuted, fontSize: 13 }}>
              <Download size={14} />
              {asset.downloads}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
