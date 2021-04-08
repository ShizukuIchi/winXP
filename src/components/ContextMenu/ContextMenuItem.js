import React, { useState } from 'react';
import styled from 'styled-components';
import Properties from '../../WinXP/apps/DisplayProperties';

import ContextMenu from '.';

function ContextMenuItem({
  item,
  parentRef,
  isToLeft,
  index,
  checkedItem,
  setCheckedItem,
  onClick,
}) {
  const [renderMenu, setRenderMenu] = useState(false);

  function handleMouseEnter() {
    setRenderMenu(true);
  }

  function handleMouseLeave() {
    setRenderMenu(false);
  }

  function handleClick(action) {
    if (action) {
      onClick(Properties);
    }
    setCheckedItem(index);
  }

  switch (item.type) {
    case 'item':
      return (
        <StyledItem
          onClick={() => {
            handleClick(item.action);
          }}
          className={item.inactive ? 'inactive' : ''}
          showChecked={checkedItem === index}
        >
          {item.checked && (
            <img className="checked" src={item.checked} alt="checked" />
          )}
          {item.icon && <img className="icon" src={item.icon} alt="icon" />}
          {item.text}
        </StyledItem>
      );
    case 'menu':
      return (
        <StyledItem
          className="arrow"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.text}
          {renderMenu && (
            <ContextMenu
              items={item.items}
              parentRef={parentRef}
              isToLeft={isToLeft}
            />
          )}
        </StyledItem>
      );
    case 'separator':
      return <StyledItem className="separator" />;
    default:
      return null;
  }
}

const StyledItem = styled.div`
  position: relative;
  min-width: 150px;
  height: 20px;
  background-color: inherit;
  padding: 0 30px 0 22px;
  text-overflow: ellipsis;

  &:hover {
    color: #fff;
    background-color: #2f71cd;

    > .checked {
      filter: invert(100%);
    }
  }

  &.inactive {
    color: grey;
  }

  &.inactive:hover {
    background-color: initial;
  }

  .checked {
    visibility: ${({ showChecked }) => (showChecked ? 'visible' : 'hidden')};
    position: absolute;
    top: 6px;
    left: 6px;
  }

  .icon {
    height: 16px;
    position: absolute;
    top: 1px;
    left: 1px;
  }

  &.arrow:before {
    content: '';
    position: absolute;
    top: 6px;
    right: 3px;
    border: 4px solid transparent;
    border-left-color: currentColor;
  }

  &.separator {
    border-top: 1px solid darkgray;
    height: 5px;
    width: 100%;
    margin-top: 5px;
  }

  &.separator:hover {
    background-color: initial;
  }
`;

export default ContextMenuItem;
