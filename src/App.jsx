import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './views/user/Dashboard';
import Assets from './views/user/Assets';
import PPTHub from './views/user/PPTHub';
import AIVideo from './views/user/AIVideo';
import FeedbackView from './views/FeedbackView';
import AdminUsers from './views/admin/Users';
import AdminAudit from './views/admin/Audit';
import AdminStats from './views/admin/Stats';
import AdminSettings from './views/admin/Settings';

function renderView(currentView) {
  switch (currentView) {
    case 'dashboard': return <Dashboard />;
    case 'assets':
    case 'upload': return <Assets />;
    case 'ai-video': return <AIVideo />;
    case 'ppt-hub':
    case 'ai-ppt':
    case 'ppt-templates': return <PPTHub />;
    case 'feedback': return <FeedbackView />;
    case 'admin-users': return <AdminUsers />;
    case 'admin-audit': return <AdminAudit />;
    case 'admin-feedback': return <FeedbackView />;
    case 'admin-stats': return <AdminStats />;
    case 'admin-settings': return <AdminSettings />;
    default: return <Dashboard />;
  }
}

function AppShell() {
  const { currentView, theme, darkMode, isAdmin } = useApp();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      color: theme.text,
      display: 'flex',
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: ${theme.textMuted}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.textMuted}; }

        body, div, aside, header, main, section, article, nav, button, input, textarea, select, span, p, h1, h2, h3, h4, a {
          transition: background-color 0.25s ease, border-color 0.25s ease, color 0.2s ease;
        }

        button { transition: opacity 0.15s ease, background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease; }
        button:hover { opacity: 0.88; }
        button:active { transform: scale(0.97); }

        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease !important;
        }
        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px ${darkMode ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.12)'} !important;
          border-color: ${theme.accent}44 !important;
        }

        .ppt-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease !important;
        }
        .ppt-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px ${darkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'} !important;
          border-color: ${theme.accent}66 !important;
        }
        .ppt-card:hover .ppt-preview-overlay {
          opacity: 1 !important;
        }

        .nav-item:hover {
          background-color: ${theme.bgTertiary} !important;
          color: ${theme.text} !important;
        }

        .asset-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .asset-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px ${darkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'} !important;
        }
        .asset-card:hover .asset-overlay {
          opacity: 1 !important;
        }

        .table-row { transition: background-color 0.15s ease; }
        .table-row:hover { background-color: ${theme.bgTertiary} !important; }

        @keyframes pageIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .page-view { animation: pageIn 0.25s ease; }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 ${theme.accent}88; }
          50% { box-shadow: 0 0 0 4px ${theme.accent}22; }
        }
        .notification-pulse { animation: pulse 2s ease-in-out infinite; }

        @keyframes shimmer {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .ai-generating { animation: shimmer 1.5s ease-in-out infinite; }

        .tag-btn { transition: all 0.15s ease !important; }
        .tag-btn:hover {
          border-color: ${theme.accent} !important;
          color: ${theme.accent} !important;
          opacity: 1 !important;
        }

        .clickable { cursor: pointer; }
        .clickable:hover { opacity: 0.82; }

        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: ${theme.accent} !important;
          box-shadow: 0 0 0 3px ${theme.accent}22 !important;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-content { animation: modalIn 0.2s ease; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        * { scrollbar-width: thin; scrollbar-color: ${theme.border} transparent; }
      `}</style>

      <Sidebar />
      <TopBar />

      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh', paddingTop: isAdmin ? 48 : 0 }}>
        <div key={currentView} className="page-view">
          {renderView(currentView)}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
