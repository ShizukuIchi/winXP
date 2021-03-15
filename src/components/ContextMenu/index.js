import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import styled from 'styled-components';
import ContextMenuItem from './ContextMenuItem';

function ContextMenu({ items, mousePos, parentRef, isToLeft, displayFocus }) {
  const [isVisible, setIsVisible] = useState(false);
  const [openToLeft, setOpenToLeft] = useState(false);
  const [checkedItem, setCheckedItem] = useState(0);
  const [menuRef, setRefPos] = useState(null);
  const [menuPosition, setMenuPosition] = useState({
    top: '',
    left: '',
  });
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    if (displayFocus || parentRef)
      setRefPos(elementRef.current.getBoundingClientRect());
  }, [displayFocus, parentRef]);

  const initializeMenuPosition = useCallback(
    (mousePos, menuRef, parentRef, isToLeft) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const offSetX = 10;
      const offSetY = 20;
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

        setMenuPosition({
          top: newMenuPos.top,
          left: newMenuPos.left,
        });
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
          newMenuPos.left = parentRef.width - offSetX;
        }

        //calculate bottom edge
        newMenuPos.top =
          menuRef.y + menuRef.height > windowHeight
            ? -menuRef.height + offSetY
            : 0;

        setMenuPosition({
          top: newMenuPos.top,
          left: newMenuPos.left,
        });
        setIsVisible(true);
        return;
      }
    },
    [],
  );

  useEffect(() => {
    initializeMenuPosition(mousePos, menuRef, parentRef);
  }, [mousePos, menuRef, parentRef, initializeMenuPosition]);

  return (
    <StyledContextList
      ref={elementRef}
      menuPos={menuPosition}
      isVisible={isVisible}
    >
      {items &&
        items.map((item, index) => (
          <ContextMenuItem
            key={index}
            item={item}
            index={index}
            parentRef={menuRef}
            isToLeft={openToLeft}
            checkedItem={checkedItem}
            setCheckedItem={setCheckedItem}
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
  box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.5);
  border: 1px solid darkgray;
  background: #fff;
  padding: 2px;
  color: black;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  width: max-content;
`;

export default React.memo(ContextMenu);
