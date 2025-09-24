import React from 'react';
import type { XPTabItem } from 'types/components';

export interface XPTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: XPTabItem[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
}

const XPTabs: React.FC<XPTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  className = '',
  ...rest
}) => {
  const initialTab = React.useMemo(() => {
    return defaultActiveTab ?? tabs[0]?.id ?? '';
  }, [defaultActiveTab, tabs]);

  const [activeTab, setActiveTab] = React.useState<string>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={className} {...rest}>
      <menu role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.id}
            aria-controls={`xp-panel-${tab.id}`}
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
