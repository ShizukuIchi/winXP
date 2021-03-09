import React, { useState, useRef } from 'react';
import styled from 'styled-components';

function calculatePositionX(pos) {
  const windowWidth = window.innerWidth;
  return pos.x > windowWidth - 150 ? pos.x - 150 : pos.x;
}

function calculatePositionY(pos) {
  const WindowHeight = window.innerHeight;
  return pos.y > WindowHeight - 150 ? pos.y - 150 : pos.y;
}

function ContextMenu({ data, pos, style, className }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const elementRef = useRef(null);

  return (
    <div style={{ ...style }} ref={elementRef} className={className}>
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
      return (
        <div className={`${className}-item ${item.inactive ? 'inactive' : ''}`}>
          {item.text}
        </div>
      );
    case 'menu':
      return (
        <div
          className={`${className}-item ${hover ? 'hover' : ''}`}
          onMouseEnter={handleMouseEnter}
        >
          {item.text}
          <div className={`${className}-arrow`}>
            {/* TODO: add positioning after finishing main component position */}
            {/* {hover && <StyledContextMenu data={item.items} pos={pos} />} */}
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
  left: ${({ pos }) => `${calculatePositionX(pos)}px`};
  top: ${({ pos }) => `${calculatePositionY(pos)}px`};
  z-index: 1;
  border: 1px solid darkgray;
  background: #fff;
  padding: 2px;

  &-item {
    position: relative;
    min-width: 150px;
    height: 20px;
    background-color: #fff;
    padding: 0 30px 0 20px;
  }

  &-item:hover {
    color: #fff;
    background-color: #2f71cd;
  }

  &-item.inactive {
    color: grey;
  }

  &-item.inactive:hover {
    background-color: initial;
  }

  &-item.hover > &-arrow {
    color: inherit;
    position: absolute;
    top: 0px;
    left: 200px;
    z-index: 2;
    width: 200px;
    height: 20px;
    border: 1px solid darkgray;
  }

  &-arrow:before {
    content: '';
    position: absolute;
    top: 6px;
    right: 5px;
    border: 4px solid transparent;
    border-left-color: currentColor;
  }

  &-separator {
    border-top: 1px solid darkgray;
    height: 5px;
    width: 100%;
    margin-top: 5px;
  }
`;

export default React.memo(StyledContextMenu);
