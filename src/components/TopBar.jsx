import React, { useState } from 'react';
import { Settings, Users, Shield, BarChart3, MessageSquare, ChevronDown, Moon, Sun, Upload, Link2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TopBar() {
  const { isAdmin, isSuperAdmin, theme, currentView, setCurrentView, darkMode, setDarkMode, setUploadOpen } = useApp();
  const [adminOpen, setAdminOpen] = useState(false);

  if (!isAdmin) return null;

  const adminItems = [
    { id: 'admin-users', name: '用户管理', icon: Users },
    { id: 'admin-audit', name: '审核管理', icon: Shield },
    { id: 'admin-links', name: '链接管理', icon: Link2 },
    { id: 'admin-feedback', name: '反馈管理', icon: MessageSquare },
    { id: 'admin-stats', name: '数据统计', icon: BarChart3 },
    ...(isSuperAdmin ? [{ id: 'admin-settings', name: '系统设置', icon: Settings }] : []),
  ];

  const isAdminView = currentView.startsWith('admin-');

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 240,
      right: 0,
      height: 48,
      backgroundColor: theme.bgSecondary,
      borderBottom: `1px solid ${theme.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8,
      padding: '0 20px',
      zIndex: 100,
    }}>
      {/* Upload button */}
      {isAdmin && (
        <button
          onClick={() => setUploadOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 6,
            border: 'none', backgroundColor: theme.accent,
            color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 500,
          }}
        >
          <Upload size={13} />
          上传素材
        </button>
      )}

      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, borderRadius: 6,
          border: 'none', backgroundColor: 'transparent',
          color: theme.textMuted, cursor: 'pointer',
        }}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Admin dropdown */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setAdminOpen(!adminOpen)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 10px', borderRadius: 6,
            border: isAdminView ? `1px solid ${theme.accent}` : `1px solid ${theme.border}`,
            backgroundColor: isAdminView ? theme.accentLight : theme.bgTertiary,
            color: isAdminView ? theme.accent : theme.textSecondary,
            cursor: 'pointer', fontSize: 13, fontWeight: 500,
          }}
        >
          <Settings size={13} />
          后台
          <ChevronDown size={11} style={{ transform: adminOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>

        {adminOpen && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 200 }} onClick={() => setAdminOpen(false)} />
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0, width: 160,
              backgroundColor: theme.bgSecondary, borderRadius: 8,
              border: `1px solid ${theme.border}`, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              overflow: 'hidden', zIndex: 300,
            }}>
              {adminItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); setAdminOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                    padding: '10px 14px', border: 'none',
                    backgroundColor: currentView === item.id ? theme.accentLight : 'transparent',
                    color: currentView === item.id ? theme.accent : theme.textSecondary,
                    cursor: 'pointer', fontSize: 13, textAlign: 'left',
                  }}
                >
                  <item.icon size={14} />
                  {item.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
