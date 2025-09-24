import React from 'react';
import { MenuBarItem, MenuBarItems, MenuBarConfigItem } from 'types/components';

interface XPMenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: MenuBarItems;
  onClickItem?: (itemName: string) => void;
}

interface NormalizedMenuItem extends MenuBarItem {
  name: string;
}

const normalizeMenuItem = (item: MenuBarConfigItem, index: number): NormalizedMenuItem => {
  if (typeof item === 'string') {
    return {
      label: item,
      name: item
    };
  }

  return {
    label: item.label ?? item.name ?? `Item ${index + 1}`,
    name: item.name ?? item.label ?? `item-${index}`,
    shortcut: item.shortcut,
    checked: item.checked,
    disabled: item.disabled,
    type: item.type
  };
};

const XPMenuBar: React.FC<XPMenuBarProps> = ({
  items = {},
  onClickItem,
  className = '',
  style,
  ...rest
}) => {
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const handleMenuClick = (menuName: string) => {
    setOpenMenu((current) => (current === menuName ? null : menuName));
  };

  const handleMenuHover = (menuName: string) => {
    setOpenMenu((current) => (current ? menuName : current));
  };

  const handleItemClick = (itemName: string) => {
    setOpenMenu(null);
    onClickItem?.(itemName);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuEntries = Object.entries(items);

  return (
    <div
      role="menubar"
      className={className}
      ref={menuRef}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        height: 'auto',
        ...(style ?? {})
      }}
      {...rest}
    >
      {menuEntries.map(([menuName, menuItems]) => (
        <div key={menuName} style={{ position: 'relative' }}>
          <button
            role="menuitem"
            type="button"
            aria-haspopup="true"
            aria-expanded={openMenu === menuName}
            onClick={() => handleMenuClick(menuName)}
            onMouseEnter={() => handleMenuHover(menuName)}
            onMouseLeave={(event) => {
              if (openMenu !== menuName) {
                const target = event.currentTarget;
                target.style.background = 'transparent';
                target.style.color = 'black';
                  target.style.outline = 'none';
                  target.style.boxShadow = 'none';
              }
            }}
            onMouseOver={(event) => {
              if (openMenu !== menuName) {
                const target = event.currentTarget;
                target.style.background = '#316AC5';
                target.style.color = 'white';
                  target.style.outline = 'none';
                  target.style.boxShadow = 'none';
              }
            }}
              onFocus={(event) => {
                const target = event.currentTarget;
                target.style.outline = 'none';
                target.style.boxShadow = 'none';
              }}
            style={{
              border: 'none',
              background: openMenu === menuName ? '#316AC5' : 'transparent',
              color: openMenu === menuName ? 'white' : 'black',
              // Tighten spacing between top-level menu entries
              padding: '2px 6px',
              minWidth: 0,
              marginRight: '2px',
                outline: 'none',
                boxShadow: 'none',
              font: 'inherit',
              cursor: 'default',
              borderRadius: 0,
              width: 'auto'
            }}
          >
            {menuName}
          </button>

          {openMenu === menuName && (
            <div
              role="menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                zIndex: 1000,
                minWidth: '120px',
                margin: 0,
                padding: '2px',
                // Lighter XP-style menu background
                background: '#fff',
                border: '1px solid #808080',
                boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #dfdfdf'
              }}
            >
              {menuItems.map((menuItem, index) => {
                const normalized = normalizeMenuItem(menuItem, index);

                if (normalized.type === 'separator') {
                  return (
                    <hr
                      key={`separator-${menuName}-${index}`}
                      style={{
                        margin: '3px 2px',
                        border: 'none',
                        borderTop: '1px solid #808080',
                        borderBottom: '1px solid #ffffff'
                      }}
                    />
                  );
                }

                const itemKey = `${menuName}-${normalized.name}-${index}`;

                return (
                  <button
                    key={itemKey}
                    role="menuitem"
                    type="button"
                    onClick={() => handleItemClick(normalized.name)}
                    disabled={normalized.disabled}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      padding: '4px 20px 4px 8px',
                      font: 'inherit',
                      color: normalized.disabled ? '#808080' : 'inherit',
                      cursor: 'default',
                      position: 'relative'
                    }}
                    onMouseEnter={(event) => {
                      if (!normalized.disabled) {
                        const target = event.currentTarget;
                        target.style.background = '#316AC5';
                        target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(event) => {
                      const target = event.currentTarget;
                      target.style.background = 'transparent';
                      target.style.color = normalized.disabled ? '#808080' : 'inherit';
                    }}
                  >
                    {normalized.checked && (
                      <span style={{ position: 'absolute', left: '2px' }}>[x]</span>
                    )}
                    {normalized.label}
                    {normalized.shortcut && (
                      <span style={{ position: 'absolute', right: '8px', fontSize: '0.9em' }}>
                        {normalized.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default XPMenuBar;
