import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface XPTabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface XPTabsProps {
  tabs: XPTabItem[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export const XPTabs: React.FC<XPTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  className
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      <menu role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </menu>
      
      {tabs.map((tab) => (
        <article
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </article>
      ))}
    </div>
  );
};