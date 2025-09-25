import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import WindowDropDown from './WindowDropDown';
import type { WindowDropDownCollection, WindowDropDownEntry } from 'types/components';

export interface WindowDropDownsProps {
  items: WindowDropDownCollection;
  onClickItem: (name: string) => void;
  className?: string;
  height?: number;
}

const WindowDropDownsComponent: React.FC<WindowDropDownsProps> = ({
  items,
  onClickItem,
  className = '',
  height = 20
}) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [openOption, setOpenOption] = useState<string | null>(null);

  const menuEntries = useMemo(() => Object.entries(items) as [string, WindowDropDownEntry[]][], [items]);

  const handleHoverOption = useCallback(
    (option: string) => {
      setOpenOption((current) => (current ? option : current));
    },
    []
  );

  const handleClickItem = useCallback(
    (name: string) => {
      setOpenOption(null);
      onClickItem(name);
    },
    [onClickItem]
  );

  const handleMouseUp = useCallback((event: MouseEvent) => {
    const container = dropDownRef.current;
    if (container && !container.contains(event.target as Node)) {
      setOpenOption(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div className={className} ref={dropDownRef}>
      {menuEntries.map(([menuName, menuItems]) => (
        <div className="drop-down" key={menuName}>
          <div
            onMouseDown={() => {
              setOpenOption(menuName);
            }}
            onMouseEnter={() => handleHoverOption(menuName)}
            className={`drop-down__label ${openOption === menuName ? 'drop-down__label--active' : ''}`}
          >
            {menuName}
          </div>
          {openOption === menuName && (
            <WindowDropDown
              onClick={handleClickItem}
              items={menuItems}
              position={{ top: `${height}px`, left: '0' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

interface StyledProps {
  height?: number;
}

const StyledWindowDropDowns = styled(WindowDropDownsComponent)<StyledProps>`
  display: inline-flex;
  height: ${({ height = 20 }) => height}px;
  line-height: ${({ height = 20 }) => height}px;
  position: relative;
  .drop-down {
    font-size: 11px;
    height: 100%;
    position: relative;
  }
  .drop-down__label--active {
    background-color: #1660e8;
    color: #fff;
  }
  .drop-down__label {
    padding: 0 6px;
    cursor: default;
    user-select: none;
    white-space: nowrap;
    &:hover {
      background-color: #1660e8;
      color: #fff;
    }
  }
`;

export const WindowDropDowns = WindowDropDownsComponent;

export default StyledWindowDropDowns;
