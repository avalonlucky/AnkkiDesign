import React from 'react';
import { Upload, FolderOpen, Grid, Moon, Sun, ChevronRight, Bell, LogOut, BarChart3, Shield, MessageSquare, Play, Presentation, Settings, Users, Folder } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';

export default function Sidebar() {
  const {
    darkMode, setDarkMode, currentView, setCurrentView,
    selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory,
    expandedCategories, setExpandedCategories, setPptTab,
    isAdmin, isSuperAdmin, currentUser, setCurrentUser, setIsLoggedIn, theme,
  } = useApp();

  return (
    <aside style={{
      width: 260,
      backgroundColor: theme.bgSecondary,
      borderRight: `1px solid ${theme.border}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40,
            background: darkMode
              ? `linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)`
              : `linear-gradient(135deg, #1260cc 0%, #1478F0 100%)`,
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 18,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            boxShadow: `0 4px 12px ${theme.accent}55`, letterSpacing: '-0.5px', flexShrink: 0,
          }}>A</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: theme.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", letterSpacing: '-0.4px', lineHeight: 1.2 }}>Ankki Design</div>
            <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 3, letterSpacing: '0.3px' }}>视觉素材管理平台</div>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, padding: '0 8px', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>主菜单</div>
          {[
            { id: 'dashboard', name: '工作台', icon: Grid, show: true },
            { id: 'assets', name: '素材库', icon: FolderOpen, show: true },
            { id: 'ai-video', name: 'AI视频生成', icon: Play, show: true },
            { id: 'ai-ppt', name: 'PPT生成', icon: Presentation, show: true },
            { id: 'feedback', name: '功能反馈', icon: MessageSquare, show: true },
          ].filter(item => item.show).map(item => (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => setCurrentView(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', marginBottom: 4, border: 'none', borderRadius: 8, cursor: 'pointer',
                backgroundColor: currentView === item.id ? theme.accentLight : 'transparent',
                color: currentView === item.id ? theme.accent : theme.textSecondary,
                fontSize: 14, fontWeight: currentView === item.id ? 500 : 400,
                transition: 'all 0.15s ease',
              }}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, padding: '0 8px', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>素材分类</div>
          {categories.map(cat => {
            const isExpanded = expandedCategories.includes(cat.id);
            const hasChildren = cat.children && cat.children.length > 0;
            const isActive = selectedCategory === cat.id || (cat.children && cat.children.some(c => c.id === selectedSubCategory));

            return (
              <div key={cat.id}>
                <button
                  className="nav-item"
                  onClick={() => {
                    if (hasChildren) {
                      setExpandedCategories(prev =>
                        prev.includes(cat.id) ? prev.filter(id => id !== cat.id) : [...prev, cat.id]
                      );
                    }
                    setSelectedCategory(cat.id);
                    setSelectedSubCategory(null);
                    setCurrentView(cat.isSpecial ? 'ppt-templates' : 'assets');
                  }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 12px', marginBottom: 2, border: 'none', borderRadius: 8, cursor: 'pointer',
                    backgroundColor: isActive ? theme.accentLight : 'transparent',
                    color: isActive ? theme.accent : theme.textSecondary,
                    fontSize: 14, transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {hasChildren && (
                      <span style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s ease', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                        <ChevronRight size={14} />
                      </span>
                    )}
                    {!hasChildren && <span style={{ width: 14 }} />}
                    <cat.icon size={18} />
                    {cat.name}
                    {cat.isSpecial && (
                      <span style={{ fontSize: 9, padding: '2px 6px', backgroundColor: theme.accent, color: '#fff', borderRadius: 4, fontWeight: 600 }}>NEW</span>
                    )}
                  </span>
                  <span style={{ fontSize: 11, color: theme.textMuted, backgroundColor: theme.tagBg, padding: '2px 8px', borderRadius: 5 }}>{cat.count}</span>
                </button>

                {hasChildren && isExpanded && (
                  <div style={{ marginLeft: 24, marginBottom: 4, borderLeft: `2px solid ${theme.border}`, paddingLeft: 12 }}>
                    {cat.children.map(sub => (
                      <button
                        key={sub.id}
                        className="nav-item"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedSubCategory(sub.id);
                          if (sub.id === 'ppt-complete') {
                            setPptTab('complete');
                            setCurrentView('ppt-templates');
                          } else if (sub.id === 'ppt-single') {
                            setPptTab('single');
                            setCurrentView('ppt-templates');
                          } else {
                            setCurrentView('assets');
                          }
                        }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '8px 12px', marginBottom: 2, border: 'none', borderRadius: 6, cursor: 'pointer',
                          backgroundColor: selectedSubCategory === sub.id ? theme.accentLight : 'transparent',
                          color: selectedSubCategory === sub.id ? theme.accent : theme.textMuted,
                          fontSize: 13, transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Folder size={14} />
                          {sub.name}
                          {sub.badge && (
                            <span style={{ fontSize: 9, padding: '1px 5px', backgroundColor: '#ef4444', color: '#fff', borderRadius: 3, fontWeight: 500 }}>{sub.badge}</span>
                          )}
                        </span>
                        <span style={{ fontSize: 11, color: theme.textMuted }}>{sub.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, padding: '0 8px', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>管理后台</div>
          {[
            { id: 'admin-users', name: '用户管理', icon: Users, permission: 'admin' },
            { id: 'admin-audit', name: '审核管理', icon: Shield, permission: 'admin' },
            { id: 'admin-feedback', name: '反馈管理', icon: MessageSquare, permission: 'admin' },
            { id: 'admin-stats', name: '数据统计', icon: BarChart3, permission: 'admin' },
            { id: 'admin-settings', name: '系统设置', icon: Settings, permission: 'superadmin' },
          ].filter(item => item.permission === 'admin' ? isAdmin : isSuperAdmin).map(item => (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => setCurrentView(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', marginBottom: 4, border: 'none', borderRadius: 8, cursor: 'pointer',
                backgroundColor: currentView === item.id ? theme.accentLight : 'transparent',
                color: currentView === item.id ? theme.accent : theme.textSecondary,
                fontSize: 14, transition: 'all 0.15s ease',
              }}
            >
              <item.icon size={18} />
              {item.name}
              {item.permission === 'superadmin' && (
                <span style={{ marginLeft: 'auto', fontSize: 9, padding: '2px 6px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 4, fontWeight: 600 }}>超管</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* 底部用户信息 */}
      <div style={{ padding: '16px 12px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 12px', borderRadius: 5, backgroundColor: theme.bgTertiary,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: isSuperAdmin ? 'linear-gradient(135deg, #ef4444, #f97316)' : isAdmin ? 'linear-gradient(135deg, #8b5cf6, #a78bfa)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 14, fontWeight: 600,
            }}>{currentUser.name[0]}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>{currentUser.name}</div>
              <div style={{ fontSize: 10, color: isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.textMuted, fontWeight: 500 }}>
                {isSuperAdmin ? '超级管理员' : isAdmin ? '管理员' : '普通用户'}
              </div>
            </div>
          </div>
          <LogOut size={18} style={{ color: theme.textMuted, cursor: 'pointer' }} onClick={() => setIsLoggedIn(false)} />
        </div>

        {/* 角色切换器 - 用于演示 */}
        <div style={{ marginTop: 8 }}>
          <select
            value={currentUser.role}
            onChange={(e) => {
              const roles = {
                superadmin: { id: 1, name: '系统管理员', email: 'superadmin@ankki.com', role: 'superadmin', avatar: '👤' },
                admin: { id: 2, name: '张管理', email: 'zhangadmin@ankki.com', role: 'admin', avatar: '👤' },
                user: { id: 3, name: '王用户', email: 'wanguser@ankki.com', role: 'user', avatar: '👤' },
              };
              setCurrentUser(roles[e.target.value]);
              setCurrentView('dashboard');
            }}
            style={{
              width: '100%', padding: '8px 12px',
              backgroundColor: isSuperAdmin ? 'rgba(239, 68, 68, 0.1)' : isAdmin ? 'rgba(139, 92, 246, 0.1)' : theme.bgTertiary,
              border: `1px solid ${isSuperAdmin ? 'rgba(239, 68, 68, 0.3)' : isAdmin ? 'rgba(139, 92, 246, 0.3)' : theme.border}`,
              borderRadius: 8,
              color: isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.text,
              fontSize: 12, fontWeight: 500, cursor: 'pointer', outline: 'none',
            }}
          >
            <option value="superadmin">超级管理员</option>
            <option value="admin">管理员</option>
            <option value="user">普通用户</option>
          </select>
        </div>

        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', backgroundColor: theme.bgTertiary,
              border: `1px solid ${theme.border}`, borderRadius: 6, cursor: 'pointer', color: theme.textSecondary, fontSize: 12,
            }}
          >
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            {darkMode ? '浅色' : '深色'}
          </button>
        </div>
      </div>
    </aside>
  );
}
