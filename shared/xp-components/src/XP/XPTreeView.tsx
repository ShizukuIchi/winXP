import React from 'react';
import { XPContainer } from './XPContainer';
import type { TreeViewItem } from 'types/components';

export interface XPTreeViewProps extends React.HTMLAttributes<HTMLUListElement> {
  items?: TreeViewItem[];
  onItemClick?: (item: TreeViewItem) => void;
}

const XPTreeView: React.FC<XPTreeViewProps> = ({
  items = [],
  className = '',
  onItemClick,
  ...rest
}) => {
  const renderTreeItem = (item: TreeViewItem): React.ReactNode => {
    const key = item.id ?? String(item.label);
    const hasChildren = Boolean(item.children && item.children.length);

    if (hasChildren && item.children) {
      return (
        <li key={key}>
          <details open={item.expanded}>
            <summary
              onClick={(event) => {
                if (item.onClick || onItemClick) {
                  event.preventDefault();
                  item.onClick?.(item);
                  onItemClick?.(item);
                }
              }}
            >
              {item.icon && <span className="tree-icon">{item.icon}</span>}
              {item.label}
            </summary>
            <ul>
              {item.children.map((child) => renderTreeItem(child))}
            </ul>
          </details>
        </li>
      );
    }

    const handleClick = () => {
      if (!item.disabled) {
        item.onClick?.(item);
        onItemClick?.(item);
      }
    };

    return (
      <li
        key={key}
        onClick={item.onClick || onItemClick ? handleClick : undefined}
        style={{ cursor: item.onClick || onItemClick ? 'pointer' : 'default', opacity: item.disabled ? 0.6 : 1 }}
        aria-disabled={item.disabled}
      >
        {item.icon && <span className="tree-icon">{item.icon}</span>}
        {item.label}
      </li>
    );
  };

  return (
    <XPContainer>
      <ul className={`tree-view ${className}`.trim()} {...rest}>
        {items.map((item) => renderTreeItem(item))}
      </ul>
    </XPContainer>
  );
};

export default XPTreeView;
