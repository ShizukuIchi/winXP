import React from 'react';
import { XPContainer } from './XPContainer';

const XPTreeView = ({
  items = [],
  className = '',
  onItemClick,
  ...props
}) => {
  const renderTreeItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <li key={item.id || item.label}>
          <details open={item.expanded}>
            <summary
              onClick={item.onClick || onItemClick ? (e) => {
                e.preventDefault();
                if (item.onClick) item.onClick(item);
                if (onItemClick) onItemClick(item);
              } : undefined}
            >
              {item.icon && <span className="tree-icon">{item.icon}</span>}
              {item.label}
            </summary>
            <ul>
              {item.children.map(child => renderTreeItem(child, level + 1))}
            </ul>
          </details>
        </li>
      );
    } else {
      return (
        <li
          key={item.id || item.label}
          onClick={item.onClick || onItemClick ? () => {
            if (item.onClick) item.onClick(item);
            if (onItemClick) onItemClick(item);
          } : undefined}
          style={{ cursor: item.onClick || onItemClick ? 'pointer' : 'default' }}
        >
          {item.icon && <span className="tree-icon">{item.icon}</span>}
          {item.label}
        </li>
      );
    }
  };

  return (
    <XPContainer>
      <ul className={`tree-view ${className}`} {...props}>
        {items.map(item => renderTreeItem(item))}
      </ul>
    </XPContainer>
  );
};

export default XPTreeView;