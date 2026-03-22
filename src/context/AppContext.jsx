import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initialVideoProjects, initialPptProjects, assets as initialAssets, initialBrochures } from '../data/mockData';
import {
  dbFetchBrochures, dbInsertBrochure, dbUpdateBrochure, dbDeleteBrochure,
  dbFetchShareLinks, dbInsertShareLink, dbUpdateShareLink, dbDeleteShareLink,
  dbFetchAuditItems, dbInsertAuditItem, dbUpdateAuditItem,
  mapBrochure, mapShareLink, mapAuditItem,
  uploadBrochurePDF,
} from '../lib/db';

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

  // ── Supabase-backed state ─────────────────────────────────────────────────
  const [brochures, setBrochures] = useState(initialBrochures);
  const [shareLinks, setShareLinks] = useState([]);
  const [auditItems, setAuditItems] = useState(
    initialAssets.slice(0, 8).map(a => ({ ...a, auditStatus: 'pending' }))
  );
  const [dbReady, setDbReady] = useState(false);

  // Load all Supabase data on mount
  useEffect(() => {
    (async () => {
      const [bRes, slRes, aiRes] = await Promise.all([
        dbFetchBrochures(),
        dbFetchShareLinks(),
        dbFetchAuditItems(),
      ]);
      if (bRes.data && bRes.data.length > 0) {
        setBrochures(bRes.data.map(mapBrochure));
      }
      if (slRes.data) {
        setShareLinks(slRes.data.map(mapShareLink));
      }
      if (aiRes.data && aiRes.data.length > 0) {
        setAuditItems(aiRes.data.map(mapAuditItem));
      }
      setDbReady(true);
    })();
  }, []);

  // ── Brochure actions ──────────────────────────────────────────────────────
  const addBrochure = useCallback(async ({ file, meta }) => {
    const id = `b-${Date.now()}`;
    let fileUrl = null;
    let fileName = null;
    if (file) {
      try {
        fileUrl = await uploadBrochurePDF(file, id);
        fileName = file.name;
      } catch {
        // Storage not configured → fall back to blob URL (session only)
        fileUrl = URL.createObjectURL(file);
        fileName = file.name;
      }
    }
    const row = {
      id,
      title: meta.title,
      subtitle: meta.title,
      category: meta.category,
      gradient: meta.gradient,
      pages: 0,
      uploaded_by: meta.uploadedBy,
      size: meta.size,
      share_code: id,
      views: 0,
      description: meta.description || '',
      file_url: fileUrl,
      file_name: fileName,
    };
    const { data, error } = await dbInsertBrochure(row);
    const newItem = data && !error ? mapBrochure(data) : mapBrochure(row);
    setBrochures(prev => [newItem, ...prev]);
    return newItem;
  }, []);

  const removeBrochure = useCallback(async (id) => {
    await dbDeleteBrochure(id);
    setBrochures(prev => prev.filter(b => b.id !== id));
  }, []);

  // ── Share link actions ────────────────────────────────────────────────────
  const addShareLink = useCallback(async (linkData) => {
    const row = {
      id: linkData.id,
      brochure_id: linkData.brochureId,
      brochure_title: linkData.brochureTitle,
      share_code: linkData.shareCode,
      url: linkData.url,
      password: linkData.password || '',
      expires_at: linkData.expiresAt || null,
      views: 0,
      enabled: true,
      created_by: linkData.createdBy,
    };
    const { data, error } = await dbInsertShareLink(row);
    const newLink = data && !error ? mapShareLink(data) : linkData;
    setShareLinks(prev => [newLink, ...prev]);
    return newLink;
  }, []);

  const toggleShareLink = useCallback(async (id, enabled) => {
    await dbUpdateShareLink(id, { enabled });
    setShareLinks(prev => prev.map(l => l.id === id ? { ...l, enabled } : l));
  }, []);

  const removeShareLink = useCallback(async (id) => {
    await dbDeleteShareLink(id);
    setShareLinks(prev => prev.filter(l => l.id !== id));
  }, []);

  const incrementShareLinkViews = useCallback(async (id) => {
    setShareLinks(prev => prev.map(l => {
      if (l.id !== id) return l;
      const views = (l.views || 0) + 1;
      dbUpdateShareLink(id, { views });
      return { ...l, views };
    }));
  }, []);

  // ── Audit item actions ────────────────────────────────────────────────────
  const addAuditItem = useCallback(async (item) => {
    const row = {
      id: item.id,
      name: item.name,
      format: item.format,
      size: item.size,
      version: item.version,
      category: item.category,
      sub_category: item.subCategory,
      updated_by: item.updatedBy,
      submitted_at: item.updatedAt,
      audit_status: 'pending',
    };
    const { data, error } = await dbInsertAuditItem(row);
    const newItem = data && !error ? mapAuditItem(data) : item;
    setAuditItems(prev => [newItem, ...prev]);
  }, []);

  const updateAuditStatus = useCallback(async (id, status) => {
    await dbUpdateAuditItem(id, { audit_status: status });
    setAuditItems(prev => prev.map(a => a.id === id ? { ...a, auditStatus: status } : a));
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

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
      // Supabase-backed
      brochures, addBrochure, removeBrochure,
      shareLinks, addShareLink, toggleShareLink, removeShareLink, incrementShareLinkViews,
      auditItems, addAuditItem, updateAuditStatus,
      dbReady,
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
