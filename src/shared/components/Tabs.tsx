import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export const Tabs = ({ tabs, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', borderBottom: '1px solid var(--color-surface)', marginBottom: 'var(--spacing-4)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              position: 'relative',
              padding: 'var(--spacing-2) var(--spacing-4)',
              fontSize: 'var(--font-sm)',
              fontWeight: 'bold',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
              transition: 'color 0.2s'
            }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px', backgroundColor: 'var(--color-primary)'
                }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
