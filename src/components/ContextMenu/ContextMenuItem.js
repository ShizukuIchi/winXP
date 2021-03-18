import React, { useState } from 'react';
import styled from 'styled-components';
import Properties from '../../WinXP/apps/DisplayProperties';

import ContextMenu from '.';

function ContextMenuItem({ item, parentRef, isToLeft, onClick }) {
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
  }

  switch (item.type) {
    case 'item':
      return (
        <StyledItem
          className={`${item.inactive ? 'inactive' : ''}`}
          onClick={() => {
            handleClick(item.action);
          }}
        >
          {item.text}
        </StyledItem>
      );
    case 'menu':
      return (
        <StyledItem
          className={`arrow`}
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
      return <StyledItem className={`separator`}></StyledItem>;
    default:
      return null;
  }
}

const StyledItem = styled.div`
  position: relative;
  min-width: 150px;
  height: 20px;
  background-color: inherit;
  padding: 0 30px 0 20px;
  text-overflow: ellipsis;

  &:hover {
    color: #fff;
    background-color: #2f71cd;
  }

  &.inactive {
    color: grey;
  }

  &.inactive:hover {
    background-color: initial;
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
