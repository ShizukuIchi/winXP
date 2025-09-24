import React, { useState, useRef, useEffect } from 'react';

const XPMenuBar = ({
  items = {},
  onClickItem,
  className = '',
  ...props
}) => {
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState('');

  const handleMenuClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? '' : menuName);
  };

  const handleMenuHover = (menuName) => {
    if (openMenu) {
      setOpenMenu(menuName);
    }
  };

  const handleItemClick = (itemName) => {
    setOpenMenu('');
    onClickItem?.(itemName);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        ...props.style
      }}
      {...props}
    >
      {Object.keys(items).map((menuName) => (
        <div key={menuName} style={{ position: 'relative', display: 'inline-block' }}>
          <button
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={openMenu === menuName}
            onClick={() => handleMenuClick(menuName)}
            onMouseEnter={() => handleMenuHover(menuName)}
            onMouseLeave={(e) => {
              if (openMenu !== menuName) {
                e.target.style.background = 'transparent';
                e.target.style.color = 'black';
              }
            }}
            onMouseOver={(e) => {
              if (openMenu !== menuName) {
                e.target.style.background = '#316AC5';
                e.target.style.color = 'white';
              }
            }}
            style={{
              border: 'none',
              background: openMenu === menuName ? '#316AC5' : 'transparent',
              color: openMenu === menuName ? 'white' : 'black',
              padding: '4px 8px',
              font: 'inherit',
              cursor: 'default',
              borderRadius: 0
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
                background: '#c0c7c8',
                border: '2px outset #c0c7c8'
              }}
            >
              {items[menuName].map((item, index) => (
                <div key={index}>
                  {item.type === 'separator' ? (
                    <hr
                      style={{
                        margin: '3px 2px',
                        border: 'none',
                        borderTop: '1px solid #808080',
                        borderBottom: '1px solid #ffffff'
                      }}
                    />
                  ) : (
                    <button
                      role="menuitem"
                      onClick={() => handleItemClick(item.name || item)}
                      disabled={item.disabled}
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        textAlign: 'left',
                        padding: '4px 20px 4px 8px',
                        font: 'inherit',
                        color: item.disabled ? '#808080' : 'inherit',
                        cursor: item.disabled ? 'default' : 'default',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        if (!item.disabled) {
                          e.target.style.background = '#316AC5';
                          e.target.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = item.disabled ? '#808080' : 'inherit';
                      }}
                    >
                      {item.label || item}
                      {item.checked && (
                        <span style={{ position: 'absolute', left: '2px' }}>✓</span>
                      )}
                      {item.shortcut && (
                        <span style={{ position: 'absolute', right: '8px', fontSize: '0.9em' }}>
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default XPMenuBar;