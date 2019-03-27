import React, { useRef } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import useElementResize from 'src/hooks/useElementResize';
import styled from 'styled-components';

function Windows({
  apps,
  onMouseDown,
  onClose,
  onMinimize,
  onMaximize,
  focusedAppId,
}) {
  return apps.map(app => (
    <StyledWindow
      show={!app.minimized}
      key={app.id}
      id={app.id}
      onMouseDown={onMouseDown}
      onMouseUpClose={onClose}
      onMouseUpMinimize={onMinimize}
      onMouseUpMaximize={onMaximize}
      isFocus={focusedAppId === app.id}
      {...app}
    >
      <app.component onClose={onClose.bind(null, app.id)} />
    </StyledWindow>
  ));
}

function Window({
  children,
  id,
  onMouseDown,
  onMouseUpClose,
  onMouseUpMinimize,
  onMouseUpMaximize,
  title,
  defaultSize,
  defaultOffset,
  resizable,
  headerIcon,
  maximized,
  className,
}) {
  function _onMouseDown() {
    onMouseDown(id);
  }
  function _onMouseUpClose() {
    onMouseUpClose(id);
  }
  function _onMouseUpMinimize() {
    onMouseUpMinimize(id);
  }
  function _onMouseUpMaximize() {
    if (resizable) onMouseUpMaximize(id);
  }
  const dragRef = useRef(null);
  const ref = useRef(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { offset, size } = useElementResize(ref, {
    dragRef,
    defaultOffset,
    defaultSize,
    boundary: {
      top: 1,
      right: windowWidth - 1,
      bottom: windowHeight - 31,
      left: 1,
    },
    resizable,
    resizeThreshold: 10,
  });
  let width, height, x, y;
  if (maximized) {
    width = windowWidth + 6;
    height = windowHeight - 24;
    x = -3;
    y = -3;
  } else {
    width = size.width;
    height = size.height;
    x = offset.x;
    y = offset.y;
  }
  return (
    <div
      className={className}
      ref={ref}
      onMouseDown={_onMouseDown}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
      }}
    >
      <div className="header__bg" />
      <header className="app__header" ref={dragRef}>
        <img src={headerIcon} alt={title} className="app__header__icon" />
        <div className="app__header__title">{title}</div>
        <div className="app__header__buttons">
          <button
            className="app__header__minimize"
            onMouseUp={_onMouseUpMinimize}
          />
          <button
            className={`app__header__maximize ${maximized ? 'maximized' : ''} ${
              resizable ? '' : 'disable'
            }`}
            onMouseUp={_onMouseUpMaximize}
          />
          <button className="app__header__close" onMouseUp={_onMouseUpClose} />
        </div>
      </header>
      <div className="app__content">{children}</div>
    </div>
  );
}

const StyledWindow = styled(Window)`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: absolute;
  padding: 3px;
  background-color: ${({ isFocus }) => (isFocus ? '#0831d9' : '#6582f5')};
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .header__bg {
    background: ${({ isFocus }) =>
      isFocus
        ? 'linear-gradient(to bottom,#0058ee 0%,#3593ff 4%,#288eff 6%,#127dff 8%,#036ffc 10%,#0262ee 14%,#0057e5 20%,#0054e3 24%,#0055eb 56%,#005bf5 66%,#026afe 76%,#0062ef 86%,#0052d6 92%,#0040ab 94%,#003092 100%)'
        : 'linear-gradient(to bottom, #7697e7 0%,#7e9ee3 3%,#94afe8 6%,#97b4e9 8%,#82a5e4 14%,#7c9fe2 17%,#7996de 25%,#7b99e1 56%,#82a9e9 81%,#80a5e7 89%,#7b96e1 94%,#7a93df 97%,#abbae3 100%)'};
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 28px;
    pointer-events: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }
  .header__bg:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    opacity: ${({ isFocus }) => (isFocus ? 1 : 0.3)};
    background: linear-gradient(to right, #1638e6 0%, transparent 100%);
    top: 0;
    bottom: 0;
    width: 15px;
  }
  .header__bg:after {
    content: '';
    opacity: ${({ isFocus }) => (isFocus ? 1 : 0.4)};
    display: block;
    position: absolute;
    right: 0;
    background: linear-gradient(to left, #1638e6 0%, transparent 100%);
    top: 0;
    bottom: 0;
    width: 15px;
  }
  .app__header {
    height: 25px;
    line-height: 25px;
    font-weight: 700;
    font-size: 12px;
    font-family: 'Noto Sans';
    text-shadow: 1px 1px #000;
    color: white;
    position: absolute;
    left: 3px;
    right: 3px;
    display: flex;
    align-items: center;
  }
  .app__header__icon {
    pointer-events: none;
    width: 15px;
    height: 15px;
    margin-left: 1px;
    margin-right: 3px;
  }
  .app__header__title {
    flex: 1;
    pointer-events: none;
    padding-right: 5px;
    letter-spacing: 0.5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .app__header__buttons {
    opacity: ${({ isFocus }) => (isFocus ? 1 : 0.6)};
    height: 22px;
    display: flex;
    align-items: center;
    margin-top: -1px;
    margin-right: 1px;
    button {
      margin-right: 1px;
      position: relative;
      width: 22px;
      height: 22px;
      border: 1px solid #fff;
      border-radius: 3px;
      &:hover {
        filter: brightness(120%);
      }
      &:hover:active {
        filter: brightness(90%);
      }
    }
  }
  .app__header__minimize {
    box-shadow: inset 0 -1px 2px 1px #4646ff;
    background-image: radial-gradient(
      circle at 90% 90%,
      #0054e9 0%,
      #2263d5 55%,
      #4479e4 70%,
      #a3bbec 90%,
      white 100%
    );
    &:before {
      content: '';
      position: absolute;
      left: 4px;
      top: 13px;
      height: 3px;
      width: 8px;
      background-color: white;
    }
  }
  .app__header__maximize {
    box-shadow: inset 0 -1px 2px 1px #4646ff;
    background-image: radial-gradient(
      circle at 90% 90%,
      #0054e9 0%,
      #2263d5 55%,
      #4479e4 70%,
      #a3bbec 90%,
      white 100%
    );
    &:before {
      content: '';
      position: absolute;
      display: block;
      left: 4px;
      top: 4px;
      box-shadow: inset 0 3px white, inset 0 0 0 1px white;
      height: 12px;
      width: 12px;
    }
  }
  .app__header__maximize.disable {
    outline: none;
    opacity: 0.5;
    &:hover {
      filter: brightness(100%);
    }
  }
  .app__header__maximize.maximized {
    &:before {
      content: '';
      position: absolute;
      display: block;
      left: 7px;
      top: 4px;
      box-shadow: inset 0 2px white, inset 0 0 0 1px white;
      height: 8px;
      width: 8px;
    }
    &:after {
      content: '';
      position: absolute;
      display: block;
      left: 4px;
      top: 7px;
      box-shadow: inset 0 2px white, inset 0 0 0 1px white, 1px -1px #136dff;
      height: 8px;
      width: 8px;
      background-color: #136dff;
    }
  }
  .app__header__close {
    box-shadow: inset 0 -1px 2px 1px #da4600;
    background-image: radial-gradient(
      circle at 90% 90%,
      #cc4600 0%,
      #dc6527 55%,
      #cd7546 70%,
      #ffccb2 90%,
      white 100%
    );
    &:before {
      content: '';
      position: absolute;
      left: 9px;
      top: 2px;
      transform: rotate(45deg);
      height: 16px;
      width: 2px;
      background-color: white;
    }
    &:after {
      content: '';
      position: absolute;
      left: 9px;
      top: 2px;
      transform: rotate(-45deg);
      height: 16px;
      width: 2px;
      background-color: white;
    }
  }
  .app__content {
    flex: 1;
    position: relative;
    margin-top: 25px;
    height: calc(100% - 25px);
  }
`;

export default Windows;
