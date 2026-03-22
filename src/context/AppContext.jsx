import React, { createContext, useContext, useState, useCallback } from 'react';
import { initialVideoProjects, initialPptProjects, assets as initialAssets, initialBrochures } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewAsset, setPreviewAsset] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    id: 1, name: '系统管理员', email: 'superadmin@ankki.com', role: 'superadmin', avatar: '👤',
  });
  const [expandedCategories, setExpandedCategories] = useState(['ppt']);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [pptTab, setPptTab] = useState('complete');
  const [pptCompleteCategory, setPptCompleteCategory] = useState('workplace');
  const [pptCompleteSubCategory, setPptCompleteSubCategory] = useState('report');
  const [pptSingleCategory, setPptSingleCategory] = useState('essential');
  const [pptSingleSubCategory, setPptSingleSubCategory] = useState('cover');
  const [previewPPT, setPreviewPPT] = useState(null);
  const [previewPage, setPreviewPage] = useState(0);
  const [videoProjects, setVideoProjects] = useState(initialVideoProjects);
  const [selectedVideoProjectId, setSelectedVideoProjectId] = useState(101);
  const [videoGenerating, setVideoGenerating] = useState(false);
  const [videoError, setVideoError] = useState('');
  const [pptProjects, setPptProjects] = useState(initialPptProjects);
  const [selectedPptProjectId, setSelectedPptProjectId] = useState(201);
  const [pptGenerating, setPptGenerating] = useState(false);
  const [pptError, setPptError] = useState('');
  const [pptExporting, setPptExporting] = useState(false);
  const [pptExportError, setPptExportError] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [brochures, setBrochures] = useState(initialBrochures);
  const [shareLinks, setShareLinks] = useState([
    { id: 'sl-demo1', brochureId: 'b1', brochureTitle: '2024 产品手册', shareCode: 'prd-2024-catalog', url: 'https://ankki.design/brochures/prd-2024-catalog', password: '', expiresAt: null, views: 128, enabled: true, createdBy: '系统管理员', createdAt: '2024-03-15' },
    { id: 'sl-demo2', brochureId: 'b3', brochureTitle: '智能制造解决方案', shareCode: 'smart-mfg-solution', url: 'https://ankki.design/brochures/smart-mfg-solution', password: 'ankki2024', expiresAt: '2024-12-31', views: 56, enabled: true, createdBy: '张管理', createdAt: '2024-03-01' },
    { id: 'sl-demo3', brochureId: 'b4', brochureTitle: '金融科技产品白皮书', shareCode: 'fintech-whitepaper', url: 'https://ankki.design/brochures/fintech-whitepaper', password: '', expiresAt: '2024-06-30', views: 341, enabled: false, createdBy: '系统管理员', createdAt: '2024-01-20' },
  ]);
  const [auditItems, setAuditItems] = useState(
    initialAssets.slice(0, 8).map(a => ({ ...a, auditStatus: 'pending' }))
  );

  const hasPermission = useCallback((permission) => {
    const permissions = {
      superadmin: ['all', 'manage_admins', 'manage_users', 'upload', 'delete', 'edit', 'view', 'audit', 'settings', 'stats'],
      admin: ['upload', 'delete', 'edit', 'view', 'audit', 'stats'],
      user: ['view', 'download'],
    };
    return permissions[currentUser.role]?.includes(permission) || permissions[currentUser.role]?.includes('all');
  }, [currentUser.role]);

  const isSuperAdmin = currentUser.role === 'superadmin';
  const isAdmin = currentUser.role === 'superadmin' || currentUser.role === 'admin';

  const theme = darkMode ? {
    bg: '#111827', bgSecondary: '#1f2937', bgTertiary: '#374151',
    text: '#f9fafb', textSecondary: '#9ca3af', textMuted: '#6b7280',
    border: '#374151', accent: '#3b82f6', accentHover: '#2563eb',
    accentLight: 'rgba(59, 130, 246, 0.15)', success: '#34d399', warning: '#fbbf24',
    cardBg: '#1f2937', cardHover: '#263244', tagBg: '#374151',
  } : {
    bg: '#f5f6f7', bgSecondary: '#ffffff', bgTertiary: '#f0f2f5',
    text: '#1f2937', textSecondary: '#4b5563', textMuted: '#9ca3af',
    border: '#e5e7eb', accent: '#1478F0', accentHover: '#1260cc',
    accentLight: 'rgba(20, 120, 240, 0.08)', success: '#1F995C', warning: '#E58612',
    cardBg: '#ffffff', cardHover: '#f8f9fa', tagBg: '#f0f2f5',
  };

  const getGenerationStatusMeta = (status) => {
    const statusMap = {
      ready: { label: '已生成', color: theme.success, bg: darkMode ? 'rgba(74, 222, 128, 0.12)' : 'rgba(34, 197, 94, 0.1)' },
      generating: { label: '生成中', color: theme.warning, bg: darkMode ? 'rgba(251, 191, 36, 0.14)' : 'rgba(245, 158, 11, 0.12)' },
      queued: { label: '排队中', color: theme.textSecondary, bg: theme.bgTertiary },
    };
    return statusMap[status] || statusMap.queued;
  };

  const callGenerationApi = async (path, payload) => {
    const response = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || '生成失败，请稍后再试。');
    return data;
  };

  const downloadPptProject = async (project) => {
    if (!project || pptExporting) return;
    try {
      setPptExporting(true);
      setPptExportError('');
      const response = await fetch('/api/export/pptx', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(project) });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error || 'PPT 导出失败'); }
      const blob = await response.blob();
      const fileName = decodeURIComponent(response.headers.get('content-disposition')?.match(/filename="(.+)"/)?.[1] || `${project.title || 'ankki-deck'}.pptx`);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = fileName; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    } catch (error) { setPptExportError(error.message); }
    finally { setPptExporting(false); }
  };

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode, currentView, setCurrentView, viewMode, setViewMode,
      selectedCategory, setSelectedCategory, previewAsset, setPreviewAsset,
      isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser,
      expandedCategories, setExpandedCategories, selectedSubCategory, setSelectedSubCategory,
      pptTab, setPptTab, pptCompleteCategory, setPptCompleteCategory,
      pptCompleteSubCategory, setPptCompleteSubCategory,
      pptSingleCategory, setPptSingleCategory, pptSingleSubCategory, setPptSingleSubCategory,
      previewPPT, setPreviewPPT, previewPage, setPreviewPage,
      videoProjects, setVideoProjects, selectedVideoProjectId, setSelectedVideoProjectId,
      videoGenerating, setVideoGenerating, videoError, setVideoError,
      pptProjects, setPptProjects, selectedPptProjectId, setSelectedPptProjectId,
      pptGenerating, setPptGenerating, pptError, setPptError,
      pptExporting, setPptExporting, pptExportError, setPptExportError,
      uploadOpen, setUploadOpen,
      brochures, setBrochures,
      shareLinks, setShareLinks,
      auditItems, setAuditItems,
      hasPermission, isSuperAdmin, isAdmin, theme, getGenerationStatusMeta,
      callGenerationApi, downloadPptProject,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
