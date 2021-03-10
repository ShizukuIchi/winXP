import React, { useState } from 'react';
import styled from 'styled-components';

import ContextMenu from './';

function ContextMenuItem({ item, index }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  function handleMouseEnter() {
    setHoverIndex(index);
  }

  function handleMouseLeave() {
    setHoverIndex(null);
  }

  switch (item.type) {
    case 'item':
      return (
        <StyledItem className={`${item.inactive ? 'inactive' : ''}`}>
          {item.text}
        </StyledItem>
      );
    case 'menu':
      return (
        <StyledItem
          className={`arrow ${hoverIndex === index ? 'reveal-sub-menu' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.text}
          {hoverIndex && <ContextMenu items={item.items} />}
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
