import React, { useMemo } from 'react';
import { FolderOpen, Grid, Moon, Sun, ChevronRight, LogOut, MessageSquare, Play, Presentation, Folder, Image } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';

export default function Sidebar() {
  const {
    darkMode, setDarkMode, currentView, setCurrentView,
    selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory,
    expandedCategories, setExpandedCategories,
    isAdmin, isSuperAdmin, currentUser, setCurrentUser, setIsLoggedIn, theme,
  } = useApp();

  const navItems = [
    { id: 'dashboard', name: '工作台', icon: Grid },
    { id: 'assets', name: '素材库', icon: FolderOpen },
    { id: 'ai-video', name: 'AI视频', icon: Play },
    { id: 'ppt-hub', name: 'PPT工具', icon: Presentation },
    { id: 'feedback', name: '功能反馈', icon: MessageSquare },
  ];

  // Build sidebar categories: exclude ppt (now in nav), merge brand+marketing
  const sidebarCategories = useMemo(() => {
    const all = categories.find(c => c.id === 'all');
    const brand = categories.find(c => c.id === 'brand');
    const marketing = categories.find(c => c.id === 'marketing');
    const rest = categories.filter(c => !['all', 'ppt', 'brand', 'marketing'].includes(c.id));

    const designMerged = {
      id: 'design',
      name: '设计素材',
      icon: Image,
      count: (brand?.count || 0) + (marketing?.count || 0),
      children: [
        ...(brand?.children || []),
        ...(marketing?.children || []),
      ],
    };

    return [all, designMerged, ...rest].filter(Boolean);
  }, []);

  const isNavActive = (id) => {
    if (id === 'ppt-hub') return currentView === 'ppt-hub' || currentView === 'ai-ppt' || currentView === 'ppt-templates';
    return currentView === id;
  };

  return (
    <aside style={{
      width: 240,
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
      <div style={{ padding: '18px 16px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34,
            background: darkMode ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : 'linear-gradient(135deg, #1260cc, #1478F0)',
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 16, flexShrink: 0,
            boxShadow: `0 2px 8px ${theme.accent}44`,
          }}>A</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: theme.text, letterSpacing: '-0.3px', lineHeight: 1.2 }}>Ankki Design</div>
            <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 2 }}>视觉素材管理平台</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {/* Main nav */}
        <div style={{ marginBottom: 20 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => {
                if (item.id === 'ppt-hub') setCurrentView('ppt-hub');
                else setCurrentView(item.id);
              }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', marginBottom: 2, border: 'none', borderRadius: 6, cursor: 'pointer',
                backgroundColor: isNavActive(item.id) ? theme.accentLight : 'transparent',
                color: isNavActive(item.id) ? theme.accent : theme.textSecondary,
                fontSize: 13.5, fontWeight: isNavActive(item.id) ? 500 : 400,
                transition: 'all 0.15s ease',
              }}
            >
              <item.icon size={16} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: theme.border, opacity: 0.5, marginBottom: 16, marginLeft: 10, marginRight: 10 }} />

        {/* Category section label */}
        <div style={{ fontSize: 10.5, fontWeight: 600, color: theme.textMuted, padding: '0 10px', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>素材分类</div>

        {sidebarCategories.map(cat => {
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
                  setCurrentView('assets');
                }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 10px', marginBottom: 2, border: 'none', borderRadius: 6, cursor: 'pointer',
                  backgroundColor: isActive ? theme.accentLight : 'transparent',
                  color: isActive ? theme.accent : theme.textSecondary,
                  fontSize: 13.5, transition: 'all 0.15s ease',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {hasChildren ? (
                    <ChevronRight size={13} style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'none', color: theme.textMuted, flexShrink: 0 }} />
                  ) : (
                    <span style={{ width: 13, flexShrink: 0 }} />
                  )}
                  <cat.icon size={15} />
                  {cat.name}
                </span>
                <span style={{ fontSize: 11, color: theme.textMuted, backgroundColor: theme.tagBg, padding: '1px 6px', borderRadius: 4 }}>{cat.count}</span>
              </button>

              {hasChildren && isExpanded && (
                <div style={{ marginLeft: 22, paddingLeft: 10, borderLeft: `1px solid ${theme.border}`, marginBottom: 4, opacity: 0.9 }}>
                  {cat.children.map(sub => (
                    <button
                      key={sub.id}
                      className="nav-item"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedSubCategory(sub.id);
                        setCurrentView('assets');
                      }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '7px 10px', marginBottom: 1, border: 'none', borderRadius: 5, cursor: 'pointer',
                        backgroundColor: selectedSubCategory === sub.id ? theme.accentLight : 'transparent',
                        color: selectedSubCategory === sub.id ? theme.accent : theme.textMuted,
                        fontSize: 12.5, transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <Folder size={13} />
                        {sub.name}
                        {sub.badge && (
                          <span style={{ fontSize: 9, padding: '1px 4px', backgroundColor: '#ef4444', color: '#fff', borderRadius: 3 }}>{sub.badge}</span>
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
      </nav>

      {/* Bottom user area */}
      <div style={{ padding: '12px 10px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 12px', borderRadius: 6, backgroundColor: theme.bgTertiary, marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: isSuperAdmin ? 'linear-gradient(135deg, #ef4444, #f97316)' : isAdmin ? 'linear-gradient(135deg, #8b5cf6, #a78bfa)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600,
            }}>{currentUser.name[0]}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: theme.text }}>{currentUser.name}</div>
              <div style={{ fontSize: 10, color: isSuperAdmin ? '#ef4444' : isAdmin ? '#8b5cf6' : theme.textMuted, fontWeight: 500 }}>
                {isSuperAdmin ? '超管' : isAdmin ? '管理员' : '普通用户'}
              </div>
            </div>
          </div>
          <LogOut size={15} style={{ color: theme.textMuted, cursor: 'pointer', flexShrink: 0 }} onClick={() => setIsLoggedIn(false)} />
        </div>

        {/* Role switcher for demo */}
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
            width: '100%', padding: '7px 10px',
            backgroundColor: theme.bgTertiary,
            border: `1px solid ${theme.border}`,
            borderRadius: 6,
            color: theme.textSecondary,
            fontSize: 12, cursor: 'pointer', outline: 'none', marginBottom: 8,
          }}
        >
          <option value="superadmin">超级管理员</option>
          <option value="admin">管理员</option>
          <option value="user">普通用户</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '7px 12px', backgroundColor: theme.bgTertiary,
            border: `1px solid ${theme.border}`, borderRadius: 6, cursor: 'pointer', color: theme.textSecondary, fontSize: 12,
          }}
        >
          {darkMode ? <Sun size={13} /> : <Moon size={13} />}
          {darkMode ? '浅色模式' : '深色模式'}
        </button>
      </div>
    </aside>
  );
}
