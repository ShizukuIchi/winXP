import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

function Icons({
  icons,
  onMouseDown,
  onDoubleClick,
  displayFocus,
  mouse,
  selecting,
  setSelectedIcons,
}) {
  const [iconsRect, setIconsRect] = useState([]);
  function measure(rect) {
    if (iconsRect.find(r => r.id === rect.id)) return;
    setIconsRect(iconsRect => [...iconsRect, rect]);
  }
  useEffect(() => {
    if (!selecting) return;
    const sx = Math.min(selecting.x, mouse.docX);
    const sy = Math.min(selecting.y, mouse.docY);
    const sw = Math.abs(selecting.x - mouse.docX);
    const sh = Math.abs(selecting.y - mouse.docY);
    const selectedIds = iconsRect
      .filter(rect => {
        const { x, y, w, h } = rect;
        return x - sx < sw && sx - x < w && y - sy < sh && sy - y < h;
      })
      .map(icon => icon.id);
    setSelectedIcons(selectedIds);
  }, [iconsRect, setSelectedIcons, selecting, mouse.docX, mouse.docY]);
  return (
    <IconsContainer>
      {icons.map((icon, index) => (
        <StyledIcon
          key={icon.id}
          {...icon}
          displayFocus={displayFocus}
          onMouseDown={onMouseDown}
          onDoubleClick={onDoubleClick}
          measure={measure}
          gridPosition={{
            column: Math.floor(index / 5),
            row: index % 5
          }}
        />
      ))}
    </IconsContainer>
  );
}

function Icon({
  title,
  onMouseDown,
  onDoubleClick,
  icon,
  className,
  id,
  component,
  measure,
  gridPosition,
}) {
  const ref = useRef(null);
  function _onMouseDown() {
    onMouseDown(id);
  }
  function _onDoubleClick() {
    onDoubleClick(component);
  }
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const posX = left + window.scrollX;
    const posY = top + window.scrollY;
    measure({ id, x: posX, y: posY, w: width, h: height });
  }, [id, measure]);
  return (
    <div
      className={className}
      onMouseDown={_onMouseDown}
      onDoubleClick={_onDoubleClick}
      ref={ref}
      style={{
        gridColumn: gridPosition.column + 1,
        gridRow: gridPosition.row + 1,
      }}
    >
      <div className={`${className}__img__container`}>
        <img src={icon} alt={title} className={`${className}__img`} />
      </div>
      <div className={`${className}__text__container`}>
        <div className={`${className}__text`}>{title}</div>
      </div>
    </div>
  );
}

const IconsContainer = styled.div`
  position: absolute;
  margin-top: 40px;
  margin-left: 40px;
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-auto-columns: 105px;
  gap: 45px 30px;
  grid-auto-flow: column;
`;

const StyledIcon = styled(Icon)`
  width: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__text__container {
    width: 100%;
    font-size: 15px;
    color: white;
    text-shadow: 0 1px 1px black;
    margin-top: 8px;
    display: flex;
    justify-content: center;

    &:before {
      content: '';
      display: block;
      flex-grow: 1;
    }
    &:after {
      content: '';
      display: block;
      flex-grow: 1;
    }
  }
  &__text {
    padding: 0 5px 3px;
    background-color: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? '#0b61ff' : 'transparent'};
    text-align: center;
    flex-shrink: 1;
  }
  &__img__container {
    width: 45px;
    height: 45px;
    filter: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? 'drop-shadow(0 0 blue)' : ''};
  }
  &__img {
    width: 45px;
    height: 45px;
    opacity: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? 0.5 : 1};
  }
`;

export default Icons;
