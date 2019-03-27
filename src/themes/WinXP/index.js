import React, { useReducer, useRef } from 'react';
import Footer from 'src/themes/WinXP/Footer';
import styled from 'styled-components';
import ga from 'react-ga';

// import useMouse from 'src/hooks/useMouse';
import useMouse from 'react-use/lib/useMouse';
import { defaultIconState, defaultAppState, appSettings } from './apps';
import Windows from './Windows';
import Icons from './Icons';

const initState = {
  apps: defaultAppState,
  nextAppID: defaultAppState.length,
  focusing: 'window',
  icons: defaultIconState,
  selecting: false,
};
const reducer = (state, action = {}) => {
  ga.event({
    category: 'XP interaction',
    action: action.type,
  });
  switch (action.type) {
    case 'ADD_APP':
      return {
        ...state,
        apps: [...state.apps, { ...action.payload, id: state.nextAppID }],
        nextAppID: state.nextAppID + 1,
        focusing: 'window',
      };
    case 'DEL_APP':
      return {
        ...state,
        apps: state.apps.filter(app => app.id !== action.payload),
        focusing:
          state.apps.length > 1
            ? 'window'
            : state.icons.find(icon => icon.isFocus)
            ? 'icon'
            : 'desktop',
      };
    case 'FOCUS_APP': {
      const app = state.apps.find(app => app.id === action.payload);
      const restApps = [...state.apps.filter(app => app.id !== action.payload)];
      return {
        ...state,
        apps: app ? [...restApps, { ...app, minimized: false }] : restApps,
        focusing: 'window',
      };
    }
    case 'MINIMIZE_APP': {
      const app = state.apps.find(app => app.id === action.payload);
      const restApps = state.apps.filter(app => app.id !== action.payload);
      return {
        ...state,
        apps: app ? [...restApps, { ...app, minimized: true }] : restApps,
        focusing: 'window',
      };
    }
    case 'TOGGLE_MAXIMIZE_APP': {
      const app = state.apps.find(app => app.id === action.payload);
      const restApps = state.apps.filter(app => app.id !== action.payload);
      return {
        ...state,
        apps: app
          ? [...restApps, { ...app, maximized: !app.maximized }]
          : restApps,
        focusing: 'window',
      };
    }
    case 'FOCUS_ICON': {
      const icons = state.icons.map(icon => {
        if (icon.id === action.payload)
          return {
            ...icon,
            isFocus: true,
          };
        else
          return {
            ...icon,
            isFocus: false,
          };
      });
      return {
        ...state,
        focusing: 'icon',
        icons,
      };
    }
    case 'SELECT_ICONS': {
      const icons = state.icons.map(icon => {
        if (action.payload.includes(icon.id))
          return {
            ...icon,
            isFocus: true,
          };
        else
          return {
            ...icon,
            isFocus: false,
          };
      });
      return {
        ...state,
        icons,
        focusing: 'icon',
      };
    }
    case 'FOCUS_DESKTOP':
      return {
        ...state,
        focusing: 'desktop',
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
      };
    case 'START_SELECT':
      return {
        ...state,
        focusing: 'desktop',
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
        selecting: action.payload,
      };
    case 'END_SELECT':
      return {
        ...state,
        selecting: null,
      };
    default:
      return state;
  }
};
function WinXP() {
  const [state, dispatch] = useReducer(reducer, initState);
  const ref = useRef(null);
  const mouse = useMouse(ref);
  function onFocusApp(id) {
    dispatch({ type: 'FOCUS_APP', payload: id });
  }
  function onMaximizeWindow(id) {
    if (getFocusedAppId() === id && state.focusing === 'window') {
      dispatch({ type: 'TOGGLE_MAXIMIZE_APP', payload: id });
    }
  }
  function onMinimizeWindow(id) {
    if (getFocusedAppId() === id && state.focusing === 'window') {
      dispatch({ type: 'MINIMIZE_APP', payload: id });
    }
  }
  function onMouseDownFooterApp(id) {
    if (getFocusedAppId() === id) {
      dispatch({ type: 'MINIMIZE_APP', payload: id });
    } else {
      dispatch({ type: 'FOCUS_APP', payload: id });
    }
  }
  function onCloseApp(id) {
    if (getFocusedAppId() === id && state.focusing === 'window') {
      dispatch({ type: 'DEL_APP', payload: id });
    }
  }
  function onMouseDownIcon(id) {
    dispatch({ type: 'FOCUS_ICON', payload: id });
  }
  function onDoubleClickIcon(component) {
    const appSetting = Object.values(appSettings).find(
      setting => setting.component === component,
    );
    dispatch({ type: 'ADD_APP', payload: appSetting });
  }
  function getFocusedAppId() {
    const lastIndex = state.apps.map(app => app.minimized).lastIndexOf(false);
    return lastIndex >= 0 && state.focusing === 'window'
      ? state.apps[lastIndex].id
      : -1;
  }
  function onMouseDownFooter() {
    dispatch({ type: 'FOCUS_DESKTOP' });
  }
  function onClickMenuItem(o) {
    if (o === 'Internet')
      dispatch({ type: 'ADD_APP', payload: appSettings['Internet Explorer'] });
    else if (o === 'Minesweeper')
      dispatch({ type: 'ADD_APP', payload: appSettings.Minesweeper });
    else if (o === 'My Computer')
      dispatch({ type: 'ADD_APP', payload: appSettings['My Computer'] });
    else dispatch({ type: 'ADD_APP', payload: appSettings.Error });
  }
  function onMouseDownDesktop(e) {
    if (e.target === e.currentTarget)
      dispatch({
        type: 'START_SELECT',
        payload: { x: mouse.docX, y: mouse.docY },
      });
  }
  function onMouseUpDesktop(e) {
    dispatch({ type: 'END_SELECT' });
  }
  function onIconsSelected(iconIds) {
    dispatch({ type: 'SELECT_ICONS', payload: iconIds });
  }
  const focusedAppId = getFocusedAppId();
  return (
    <Container
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
    >
      <Icons
        icons={state.icons}
        onMouseDown={onMouseDownIcon}
        onDoubleClick={onDoubleClickIcon}
        displayFocus={state.focusing === 'icon'}
        appSettings={appSettings}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashBox startPos={state.selecting} mouse={mouse} />
      <Windows
        apps={state.apps}
        onMouseDown={onFocusApp}
        onClose={onCloseApp}
        onMinimize={onMinimizeWindow}
        onMaximize={onMaximizeWindow}
        focusedAppId={focusedAppId}
      />
      <Footer
        apps={state.apps}
        onMouseDownApp={onMouseDownFooterApp}
        focusedAppId={focusedAppId}
        onMouseDown={onMouseDownFooter}
        onClickMenuItem={onClickMenuItem}
      />
    </Container>
  );
}

const DashBox = ({ mouse, startPos }) => {
  function getRect() {
    return {
      x: Math.min(startPos.x, mouse.docX),
      y: Math.min(startPos.y, mouse.docY),
      w: Math.abs(startPos.x - mouse.docX),
      h: Math.abs(startPos.y - mouse.docY),
    };
  }
  if (startPos) {
    const { x, y, w, h } = getRect();
    return (
      startPos && (
        <div
          style={{
            transform: `translate(${x}px,${y}px)`,
            width: w,
            height: h,
            position: 'absolute',
            border: `1px dotted gray`,
          }}
        />
      )
    );
  }
  return null;
};

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans');
  font-family: Tahoma, 'Noto Sans', sans-serif;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: url(https://i.imgur.com/Zk6TR5k.jpg) no-repeat center center fixed;
  background-size: cover;
  * {
    user-select: none;
  }
  .icon__test {
    width: 60px;
    margin: 60px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    &__text {
      width: 100%;
      font-size: 10px;
      color: white;
      text-shadow: 0.5px 0.5px 1px black;
      text-align: center;
    }
  }
  .button__test {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: 0;
  }
`;

export default WinXP;
