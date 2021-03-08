import React, { useState } from 'react';
import styled from 'styled-components';

function ContextMenu({ data, pos, style, className }) {
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <div style={{ ...style }} className={className}>
      {data.map((item, index) => (
        <ContextMenuItem
          key={index}
          item={item}
          index={index}
          pos={pos}
          className={className}
          onHover={setHoverIndex}
          hover={hoverIndex === index}
        />
      ))}
    </div>
  );
}

function ContextMenuItem({ item, index, pos, onHover, hover, className }) {
  function handleMouseEnter() {
    onHover(index);
  }
  switch (item.type) {
    case 'item':
      return <div className={`${className}-item`}>{item.text}</div>;
    case 'menu':
      return (
        <div
          className={`${className}-item ${hover ? 'hover' : ''}`}
          onMouseEnter={handleMouseEnter}
        >
          {item.text}
          <div className={`${className}-arrow`}>
            {hover && <StyledContextMenu data={item.items} pos={pos} />}
          </div>
        </div>
      );
    case 'separator':
      return <div className={`${className}-separator`}></div>;
    default:
      return null;
  }
}

const StyledContextMenu = styled(ContextMenu)`
  position: absolute;
  left: ${({ pos }) => `${pos.x}px`};
  top: ${({ pos }) => `${pos.y}px`};
  z-index: 1;
  border: 1px solid darkgray;
  background: #fff;
  padding: 2px;

  &-item {
    position: relative;
    width: 100%;
    height: 20px;
    background-color: #fff;
    padding: 0 30px 0 20px;
  }

  &-arrow.hover {
    position: absolute;
    top: 0px;
    left: 200px;
    z-index: 2;
    width: 200px;
    height: 20px;
    border: 1px solid darkgray;
  }

  &-item:hover {
    background-color: #2f71cd;
  }

  &-item:hover > &-arrow:before {
    border-left-color: #fff;
  }

  &-arrow:before {
    content: '';
    position: absolute;
    top: 6px;
    right: 5px;
    border: 4px solid transparent;
    border-left-color: #000;
  }

  &-separator {
    border-top: 1px solid darkgray;
    height: 5px;
    width: 100%;
    margin-top: 5px;
  }
`;

export default StyledContextMenu;
