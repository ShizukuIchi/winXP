import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import iePaper from 'assets/windowsIcons/ie-paper.png';
import ieBook from 'assets/windowsIcons/ie-book.png';
import check from 'assets/windowsIcons/checked.png';
import folder from 'assets/windowsIcons/folder.png';

import type {
  WindowDropDownEntry,
  WindowDropDownItem,
  WindowDropDownMenu,
  WindowDropDownPosition,
  WindowDropDownSymbol
} from 'types/components';

type WindowDropDownProps = {
  items: WindowDropDownEntry[];
  position?: WindowDropDownPosition;
  onClick: (name: string) => void;
};

type RowSymbolProps = {
  type?: WindowDropDownSymbol;
};

type StyledDropdownProps = WindowDropDownPosition;

const isItem = (entry: WindowDropDownEntry): entry is WindowDropDownItem => entry.type === 'item';
const isMenu = (entry: WindowDropDownEntry): entry is WindowDropDownMenu => entry.type === 'menu';

const RowSymbol: React.FC<RowSymbolProps> = ({ type }) => {
  switch (type) {
    case 'ie-paper':
      return <img className="drop-down__icon" src={iePaper} alt="" />;
    case 'ie-book':
      return <img className="drop-down__icon" src={ieBook} alt="" />;
    case 'folder':
      return <img className="drop-down__icon" src={folder} alt="" />;
    case 'check':
      return <img src={check} alt="" />;
    case 'circle':
      return (
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#000'
          }}
        />
      );
    default:
      return null;
  }
};

const Div = styled.div<StyledDropdownProps>`
  left: ${({ left }) => (left ? left : 'initial')};
  top: ${({ top }) => (top ? top : 'initial')};
  right: ${({ right }) => (right ? right : 'initial')};
  bottom: ${({ bottom }) => (bottom ? bottom : 'initial')};
  position: absolute;
  display: flex;
  font-size: 11px;
  border-bottom: 1px solid transparent;
  .drop-down__row {
    position: relative;
    display: contents;
    &:hover > *:not(:nth-child(5)) {
      background: #e99f17;
      filter: invert(100%);
    }
    &:hover > .drop-down__check > .drop-down__icon {
      filter: invert(100%);
    }
  }
  .drop-down__row--active {
    position: relative;
    display: contents;
    & > .drop-down__check > .drop-down__icon {
      filter: invert(100%);
    }
    & > *:not(:nth-child(5)) {
      background: #e99f17;
      filter: invert(100%);
    }
  }
  .drop-down__row--disable {
    display: contents;
    color: #8c8c8cb5;
    &:hover > * {
      background: #e99f17;
      filter: invert(100%);
    }
  }
  .drop-down__title {
    padding: 0 7px;
    height: 100%;
    line-height: 20px;
    color: white;
    background-color: #1660e8;
  }
  .drop-down__menu {
    background-color: #fff;
    z-index: 1;
    padding: 2px;
    line-height: 18px;
    display: grid;
    background-color: #fff;
    position: absolute;
    box-shadow: 2px 2px 1px rgb(100, 100, 100);
    border: 1px solid gray;
    grid-template-columns: 16px auto auto 15px 0px;
  }
  .drop-down__separator {
    grid-column: 1 / 5;
    height: 7px;
    padding: 3px 1px;
    background-color: rgba(0, 0, 0, 0.2);
    background-clip: content-box;
  }
  .drop-down__check {
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .drop-down__icon {
    max-width: 13px;
    max-height: 13px;
    transform: translateX(-2px);
  }
  .drop-down__text {
    white-space: nowrap;
    padding-right: 8px;
    grid-column: 2;
  }
  .drop-down__hot-key {
    white-space: nowrap;
    grid-column: 3;
    padding-right: 2px;
  }
  .drop-down__arrow {
    position: relative;
    grid-column: 4;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 3px 0 3px 3px;
      border-color: transparent transparent transparent #000;
      content: '';
      display: block;
    }
  }
  .drop-down__arrow--disable {
    grid-column: 4;
    width: 100%;
    height: 100%;
  }
`;

const WindowDropDown: React.FC<WindowDropDownProps> = ({ items, position, onClick }) => {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  const handleItemClick = useCallback(
    (itemText: string, disabled?: boolean) => {
      if (!disabled) {
        onClick(itemText);
      }
    },
    [onClick]
  );

  const dropdownPosition = useMemo<WindowDropDownPosition | undefined>(() => position, [position]);

  return (
    <Div {...dropdownPosition}>
      <div className="drop-down__menu">
        {items.map((entry, index) => {
          if (isItem(entry)) {
            const rowClass = `drop-down__row${entry.disable ? '--disable' : ''}`;
            return (
              <div
                key={`${entry.text}-${index}`}
                className={rowClass}
                onMouseEnter={() => setActiveOption(entry.text)}
                onClick={() => handleItemClick(entry.text, entry.disable)}
              >
                <div className="drop-down__check">
                  <RowSymbol type={entry.symbol} />
                </div>
                <div className="drop-down__text">{entry.text}</div>
                <span className="drop-down__hot-key">{entry.hotkey ?? ''}</span>
                <div className="drop-down__arrow--disable" />
              </div>
            );
          }

          if (isMenu(entry)) {
            const rowClass = `drop-down__row${activeOption === entry.text ? '--active' : ''}`;
            return (
              <div
                key={`${entry.text}-${index}`}
                className={rowClass}
                onMouseEnter={() => setActiveOption(entry.text)}
              >
                <div className="drop-down__check">
                  <RowSymbol type={entry.symbol} />
                </div>
                <div className="drop-down__text">{entry.text}</div>
                <span className="drop-down__hot-key">{entry.hotkey ?? ''}</span>
                <div className="drop-down__arrow" />
                <div style={{ position: 'relative' }}>
                  {activeOption === entry.text && (
                    <WindowDropDown
                      position={entry.position}
                      items={entry.items}
                      onClick={onClick}
                    />
                  )}
                </div>
              </div>
            );
          }

          return <div key={`separator-${index}`} className="drop-down__separator" />;
        })}
      </div>
    </Div>
  );
};

export default WindowDropDown;
