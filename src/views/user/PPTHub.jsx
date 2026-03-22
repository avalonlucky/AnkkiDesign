import React from 'react';
import { Presentation, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AIPPT from './AIPPT';
import PPTTemplates from './PPTTemplates';

export default function PPTHub() {
  const { theme, pptTab, setPptTab } = useApp();

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        padding: '0 28px',
        borderBottom: `1px solid ${theme.border}`,
        backgroundColor: theme.bgSecondary,
      }}>
        {[
          { id: 'ai-gen', label: 'AI生成', icon: Presentation },
          { id: 'complete', label: '模版库', icon: Layers },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setPptTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '14px 20px',
              border: 'none',
              borderBottom: pptTab === tab.id ? `2px solid ${theme.accent}` : '2px solid transparent',
              backgroundColor: 'transparent',
              color: pptTab === tab.id ? theme.accent : theme.textSecondary,
              fontSize: 13.5,
              fontWeight: pptTab === tab.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              marginBottom: -1,
            }}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {pptTab === 'ai-gen' ? <AIPPT /> : <PPTTemplates />}
    </div>
  );
}
