import React, { useState } from 'react';

const XPTabs = ({
  tabs = [],
  defaultActiveTab,
  onTabChange,
  className = '',
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={className} {...props}>
      <menu role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`xp-panel-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </menu>

      {tabs.map((tab) => (
        <article
          key={tab.id}
          role="tabpanel"
          id={`xp-panel-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </article>
      ))}
    </div>
  );
};

export default XPTabs;