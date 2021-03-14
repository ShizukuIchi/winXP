import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import ContextMenuItem from './ContextMenuItem';

function ContextMenu({
  items,
  mousePos,
  parentRef,
  isToLeft,
  displayFocus,
  onClick,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [openToLeft, setOpenToLeft] = useState(false);
  const [menuRef, setRefPos] = useState(null);
  const [menuPos, setMenuPos] = useState({
    top: '',
    left: '',
  });
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    if (displayFocus || parentRef)
      setRefPos(elementRef.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    initializeMenuPosition(mousePos, menuRef, parentRef);
  }, [mousePos, menuRef]);

  function initializeMenuPosition(mousePos, menuRef, parentRef) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const newMenuPos = {
      top: '',
      left: '',
    };

    if (mousePos && menuRef) {
      newMenuPos.top =
        mousePos.y + menuRef.height > windowHeight
          ? mousePos.y - menuRef.height
          : mousePos.y;

      newMenuPos.left =
        mousePos.x + menuRef.width > windowWidth
          ? mousePos.x - menuRef.width
          : mousePos.x;

      setMenuPos(prev => ({
        ...prev,
        top: newMenuPos.top,
        left: newMenuPos.left,
      }));
      setIsVisible(true);
      return;
    }

    if (menuRef && parentRef) {
      // recalculate position for sub-menu
      if (isToLeft) {
        newMenuPos.left = -menuRef.width;
        setOpenToLeft(true);
      } else if (menuRef.x + menuRef.width + parentRef.width > windowWidth) {
        newMenuPos.left = -menuRef.width;
        setOpenToLeft(true);
      } else {
        newMenuPos.left = parentRef.width - 10;
      }

      //calculate bottom edge
      newMenuPos.top =
        menuRef.y + menuRef.height > windowHeight ? -menuRef.height + 20 : 0;

      setMenuPos(prev => ({
        ...prev,
        top: newMenuPos.top,
        left: newMenuPos.left,
      }));
      setIsVisible(true);
      return;
    }
  }

  return (
    <StyledContextList ref={elementRef} menuPos={menuPos} isVisible={isVisible}>
      {items &&
        items.map((item, index) => (
          <ContextMenuItem
            key={index}
            item={item}
            index={index}
            parentRef={menuRef}
            isToLeft={openToLeft}
            onClick={onClick}
          />
        ))}
    </StyledContextList>
  );
}

const StyledContextList = styled.div`
  position: absolute;
  top: ${({ menuPos }) => `${menuPos.top}px`};
  left: ${({ menuPos }) => `${menuPos.left}px`};
  z-index: 1;
  font-size: 12px;
  line-height: 1.5;
  border: 1px solid darkgray;
  background: #fff;
  padding: 2px;
  color: black;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  width: max-content;
`;

export default React.memo(ContextMenu);
