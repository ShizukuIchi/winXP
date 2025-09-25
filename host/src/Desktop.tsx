import React, { useReducer, useRef, useCallback, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useMouse from 'react-use/lib/useMouse';

// Import constants and components from copied directories
import {
  ADD_APP,
  DEL_APP,
  FOCUS_APP,
  MINIMIZE_APP,
  TOGGLE_MAXIMIZE_APP,
  FOCUS_ICON,
  SELECT_ICONS,
  FOCUS_DESKTOP,
  START_SELECT,
  END_SELECT,
  POWER_OFF,
  CANCEL_POWER_OFF,
} from './constants/actions';
import { FOCUSING, POWER_STATE } from './constants';
import Modal from './Modal';
import Footer from './Footer';
import Windows from './Windows';
import Icons from './Icons';
import { DashedBox } from 'components';

// Import Module Federation functionality
import { loadApp, getAppManifest, APP_REGISTRY } from './api/app-registry';
import { HostAPI, WindowOptions } from './api/host-sdk';

// Legacy app imports that haven't been migrated yet
import InternetExplorer from './legacy-apps/InternetExplorer';
import Minesweeper from './legacy-apps/Minesweeper';
import ErrorBox from './legacy-apps/ErrorBox';
import MyComputer from './legacy-apps/MyComputer';
import Winamp from './legacy-apps/Winamp';
import Paint from './legacy-apps/Paint';
import XPExampleApp from 'components/XP/XPExampleApp';

// Legacy icons
import iePaper from 'assets/windowsIcons/ie-paper.png';
import ie from 'assets/windowsIcons/ie.png';
import mine from 'assets/minesweeper/mine-icon.png';
import errorIconSmall from 'assets/windowsIcons/897(16x16).png';
import computerSmall from 'assets/windowsIcons/676(16x16).png';
import computerLarge from 'assets/windowsIcons/676(32x32).png';
import notepadSmall from 'assets/windowsIcons/327(16x16).png';
import notepadLarge from 'assets/windowsIcons/327(32x32).png';
import winampIcon from 'assets/windowsIcons/winamp.png';
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paintSmall from 'assets/windowsIcons/680(16x16).png';
import xpDemo from 'assets/windowsIcons/300(32x32).png';

interface AppInstanceConfig {
  component: React.ComponentType<any>;
  header: {
    title: string;
    icon: string;
    invisible?: boolean;
    buttons?: Array<'close' | 'minimize' | 'maximize'>;
    noFooterWindow?: boolean;
  };
  defaultSize: { width: number; height: number };
  defaultOffset: { x: number; y: number };
  resizable: boolean;
  minimized: boolean;
  maximized: boolean;
  id?: number;
  zIndex?: number;
  iconLarge?: string;
  multiInstance?: boolean;
  isRemote?: boolean;
  appId?: string;
}

interface DesktopIconConfig {
  id: number;
  icon: string;
  title: string;
  component?: React.ComponentType<any>;
  appId?: string; // For remote apps
  isFocus: boolean;
  iconLarge?: string;
}

// Legacy apps that haven't been migrated
const legacyAppSettings: Record<string, AppInstanceConfig> = {
  'Internet Explorer': {
    component: InternetExplorer,
    header: {
      icon: iePaper,
      title: 'Internet Explorer'
    },
    defaultSize: { width: 1000, height: 700 },
    defaultOffset: { x: 60, y: 50 },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 1200 : false,
    multiInstance: true
  },
  Minesweeper: {
    component: Minesweeper,
    header: { icon: mine, title: 'Minesweeper' },
    defaultSize: { width: 300, height: 450 },
    defaultOffset: { x: 190, y: 180 },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true
  },
  Error: {
    component: ErrorBox,
    header: {
      icon: errorIconSmall,
      title: 'C:\\',
      buttons: ['close'],
      noFooterWindow: true
    },
    defaultSize: { width: 380, height: 0 },
    defaultOffset: {
      x: typeof window !== 'undefined' ? window.innerWidth / 2 - 190 : 0,
      y: typeof window !== 'undefined' ? window.innerHeight / 2 - 60 : 0
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true
  },
  'My Computer': {
    component: MyComputer,
    header: { icon: computerSmall, title: 'My Computer' },
    defaultSize: { width: 660, height: 500 },
    defaultOffset: { x: 260, y: 50 },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    multiInstance: false
  },
  Winamp: {
    component: Winamp,
    header: { icon: winampIcon, title: 'Winamp', invisible: true },
    defaultSize: { width: 0, height: 0 },
    defaultOffset: { x: 0, y: 0 },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false
  },
  Paint: {
    component: Paint,
    header: { icon: paintSmall, title: 'Untitled - Paint' },
    defaultSize: { width: 660, height: 500 },
    defaultOffset: { x: 280, y: 70 },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    multiInstance: true
  },
  'XP Components': {
    component: XPExampleApp,
    header: { icon: xpDemo, title: 'XP Component Demo' },
    defaultSize: { width: 500, height: 400 },
    defaultOffset: { x: 300, y: 80 },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    multiInstance: true
  }
};

const defaultAppState: AppInstanceConfig[] = [
  {
    component: InternetExplorer,
    header: { title: 'Internet Explorer', icon: iePaper },
    defaultSize: { width: 1200, height: 900 },
    defaultOffset: { x: 250, y: 30 },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 1200 : false,
    id: 0,
    zIndex: 0
  }
];

const defaultIconState: DesktopIconConfig[] = [
  {
    id: 0,
    icon: ie,
    title: 'Internet Explorer',
    component: InternetExplorer,
    isFocus: false,
    iconLarge: iePaper
  },
  {
    id: 1,
    icon: mine,
    title: 'Minesweeper',
    component: Minesweeper,
    isFocus: false
  },
  {
    id: 2,
    icon: computerSmall,
    title: 'My Computer',
    component: MyComputer,
    isFocus: false,
    iconLarge: computerLarge
  },
  {
    id: 3,
    icon: notepadSmall,
    title: 'Notepad',
    appId: 'app.notepad', // This will use the remote app
    isFocus: false,
    iconLarge: notepadLarge
  },
  {
    id: 4,
    icon: paintSmall,
    title: 'Paint',
    component: Paint,
    isFocus: false,
    iconLarge: paintLarge
  }
];

const initState = {
  apps: defaultAppState,
  nextAppID: defaultAppState.length,
  nextZIndex: defaultAppState.length,
  focusing: FOCUSING.WINDOW,
  icons: defaultIconState,
  selecting: false,
  powerState: POWER_STATE.START,
};

const reducer = (state: any, action: any = { type: '' }) => {
  switch (action.type) {
    case ADD_APP:
      const app = state.apps.find(
        (_app: any) => _app.component === action.payload.component ||
                      (_app.appId && _app.appId === action.payload.appId),
      );
      if (action.payload.multiInstance || !app) {
        return {
          ...state,
          apps: [
            ...state.apps,
            {
              ...action.payload,
              id: state.nextAppID,
              zIndex: state.nextZIndex,
            },
          ],
          nextAppID: state.nextAppID + 1,
          nextZIndex: state.nextZIndex + 1,
          focusing: FOCUSING.WINDOW,
        };
      }
      const apps = state.apps.map((app: any) =>
        (app.component === action.payload.component ||
         (app.appId && app.appId === action.payload.appId))
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    case DEL_APP:
      if (state.focusing !== FOCUSING.WINDOW) return state;
      return {
        ...state,
        apps: state.apps.filter((app: any) => app.id !== action.payload),
        focusing:
          state.apps.length > 1
            ? FOCUSING.WINDOW
            : state.icons.find((icon: any) => icon.isFocus)
            ? FOCUSING.ICON
            : FOCUSING.DESKTOP,
      };
    // ... other cases remain the same
    case FOCUS_APP: {
      const apps = state.apps.map((app: any) =>
        app.id === action.payload
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    }
    case MINIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map((app: any) =>
        app.id === action.payload ? { ...app, minimized: true } : app,
      );
      return { ...state, apps, focusing: FOCUSING.WINDOW };
    }
    case TOGGLE_MAXIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map((app: any) =>
        app.id === action.payload ? { ...app, maximized: !app.maximized } : app,
      );
      return { ...state, apps, focusing: FOCUSING.WINDOW };
    }
    case FOCUS_ICON: {
      const icons = state.icons.map((icon: any) => ({
        ...icon,
        isFocus: icon.id === action.payload,
      }));
      return { ...state, focusing: FOCUSING.ICON, icons };
    }
    case SELECT_ICONS: {
      const icons = state.icons.map((icon: any) => ({
        ...icon,
        isFocus: action.payload.includes(icon.id),
      }));
      return { ...state, icons, focusing: FOCUSING.ICON };
    }
    case FOCUS_DESKTOP:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map((icon: any) => ({ ...icon, isFocus: false })),
      };
    case START_SELECT:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map((icon: any) => ({ ...icon, isFocus: false })),
        selecting: action.payload,
      };
    case END_SELECT:
      return { ...state, selecting: null };
    case POWER_OFF:
      return { ...state, powerState: action.payload };
    case CANCEL_POWER_OFF:
      return { ...state, powerState: POWER_STATE.START };
    default:
      return state;
  }
};

function Desktop() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [loadingApps, setLoadingApps] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouse(ref as unknown as React.RefObject<HTMLElement>);
  const focusedAppId = getFocusedAppId();

  // Set up Host SDK API
  useEffect(() => {
    const hostAPI: HostAPI = {
      openWindow: (component: React.ComponentType<any>, options: WindowOptions) => {
        const appConfig: AppInstanceConfig = {
          component,
          header: {
            title: options.title,
            icon: options.icon || '',
            invisible: options.invisible,
            buttons: options.buttons,
            noFooterWindow: options.noFooterWindow,
          },
          defaultSize: options.defaultSize || { width: 500, height: 400 },
          defaultOffset: options.defaultOffset || { x: 100, y: 100 },
          resizable: options.resizable !== false,
          minimized: false,
          maximized: false,
          multiInstance: options.multiInstance !== false,
          isRemote: true,
        };

        dispatch({ type: ADD_APP, payload: appConfig });
        return `app-${Date.now()}`; // Return a unique window ID
      },

      closeWindow: (windowId: string) => {
        // Implementation for closing specific window by ID
        console.log('Close window:', windowId);
      },

      focusWindow: (windowId: string) => {
        // Implementation for focusing specific window by ID
        console.log('Focus window:', windowId);
      },

      minimizeWindow: (windowId: string) => {
        // Implementation for minimizing specific window by ID
        console.log('Minimize window:', windowId);
      },

      maximizeWindow: (windowId: string) => {
        // Implementation for maximizing specific window by ID
        console.log('Maximize window:', windowId);
      },

      updateWindowState: (windowId: string, windowState: any) => {
        // Implementation for updating window state
        console.log('Update window state:', windowId, windowState);
      },

      getWindowState: (windowId: string) => {
        // Implementation for getting window state
        console.log('Get window state:', windowId);
        return null;
      },

      showNotification: (message: string) => {
        // Implementation for showing notifications
        console.log('Notification:', message);
      },
    };

    window.__winxp_host_sdk = hostAPI;

    return () => {
      delete window.__winxp_host_sdk;
    };
  }, []);

  const onFocusApp = useCallback((id: number) => {
    dispatch({ type: FOCUS_APP, payload: id });
  }, []);

  const onMaximizeWindow = useCallback((id: number) => {
    if (focusedAppId === id) {
      dispatch({ type: TOGGLE_MAXIMIZE_APP, payload: id });
    }
  }, [focusedAppId]);

  const onMinimizeWindow = useCallback((id: number) => {
    if (focusedAppId === id) {
      dispatch({ type: MINIMIZE_APP, payload: id });
    }
  }, [focusedAppId]);

  const onCloseApp = useCallback((id: number) => {
    if (focusedAppId === id) {
      dispatch({ type: DEL_APP, payload: id });
    }
  }, [focusedAppId]);

  function onMouseDownFooterApp(id: number) {
    if (focusedAppId === id) {
      dispatch({ type: MINIMIZE_APP, payload: id });
    } else {
      dispatch({ type: FOCUS_APP, payload: id });
    }
  }

  function onMouseDownIcon(id: number) {
    dispatch({ type: FOCUS_ICON, payload: id });
  }

  async function onDoubleClickIcon(component: React.ComponentType<any> | undefined, appId?: string) {
    if (appId) {
      // Handle remote app
      if (loadingApps.has(appId)) {
        return; // Already loading
      }

      setLoadingApps(prev => new Set(prev).add(appId));

      try {
        const AppComponent = await loadApp(appId);
        const appManifest = getAppManifest(appId);

        if (AppComponent && appManifest) {
          const appSetting: AppInstanceConfig = {
            component: AppComponent,
            header: {
              title: appManifest.window.title,
              icon: appManifest.icon,
            },
            defaultSize: appManifest.window.defaultSize || { width: 500, height: 400 },
            defaultOffset: appManifest.window.defaultOffset || { x: 100, y: 100 },
            resizable: appManifest.window.resizable !== false,
            minimized: false,
            maximized: false,
            multiInstance: appManifest.multiInstance !== false,
            isRemote: true,
            appId,
          };

          dispatch({ type: ADD_APP, payload: appSetting });
        }
      } catch (error) {
        console.error(`Failed to load app ${appId}:`, error);
        // Show error dialog
        dispatch({
          type: ADD_APP,
          payload: {
            ...legacyAppSettings.Error,
            injectProps: { message: `Failed to load ${appId}\n${error}` },
          },
        });
      } finally {
        setLoadingApps(prev => {
          const newSet = new Set(prev);
          newSet.delete(appId);
          return newSet;
        });
      }
    } else if (component) {
      // Handle legacy app
      const appSetting = Object.values(legacyAppSettings).find(
        setting => setting.component === component,
      );
      if (appSetting) {
        dispatch({ type: ADD_APP, payload: appSetting });
      }
    }
  }

  function getFocusedAppId() {
    if (state.focusing !== FOCUSING.WINDOW) return -1;
    const focusedApp = [...state.apps]
      .sort((a: any, b: any) => b.zIndex - a.zIndex)
      .find((app: any) => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }

  function onMouseDownFooter() {
    dispatch({ type: FOCUS_DESKTOP });
  }

  async function onClickMenuItem(menuItem: string) {
    if (menuItem === 'Internet')
      dispatch({ type: ADD_APP, payload: legacyAppSettings['Internet Explorer'] });
    else if (menuItem === 'Minesweeper')
      dispatch({ type: ADD_APP, payload: legacyAppSettings.Minesweeper });
    else if (menuItem === 'My Computer')
      dispatch({ type: ADD_APP, payload: legacyAppSettings['My Computer'] });
    else if (menuItem === 'Notepad') {
      // Use remote Notepad app
      await onDoubleClickIcon(undefined, 'app.notepad');
    }
    else if (menuItem === 'Winamp')
      dispatch({ type: ADD_APP, payload: legacyAppSettings.Winamp });
    else if (menuItem === 'Paint')
      dispatch({ type: ADD_APP, payload: legacyAppSettings.Paint });
    else if (menuItem === 'XP Components')
      dispatch({ type: ADD_APP, payload: legacyAppSettings['XP Components'] });
    else if (menuItem === 'Log Off')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.LOG_OFF });
    else if (menuItem === 'Turn Off Computer')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.TURN_OFF });
    else
      dispatch({
        type: ADD_APP,
        payload: {
          ...legacyAppSettings.Error,
          injectProps: { message: 'C:\\\nApplication not found' },
        },
      });
  }

  function onMouseDownDesktop(e: React.MouseEvent) {
    if (e.target === e.currentTarget)
      dispatch({
        type: START_SELECT,
        payload: { x: mouse.docX, y: mouse.docY },
      });
  }

  function onMouseUpDesktop() {
    dispatch({ type: END_SELECT });
  }

  const onIconsSelected = useCallback(
    (iconIds: number[]) => {
      dispatch({ type: SELECT_ICONS, payload: iconIds });
    },
    [dispatch],
  );

  function onClickModalButton() {
    dispatch({ type: CANCEL_POWER_OFF });
    dispatch({ type: ADD_APP, payload: legacyAppSettings.Error });
  }

  function onModalClose() {
    dispatch({ type: CANCEL_POWER_OFF });
  }

  return (
    <Container
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      state={state.powerState}
    >
      <Icons
        icons={state.icons}
        onMouseDown={onMouseDownIcon}
        onDoubleClick={onDoubleClickIcon}
        displayFocus={state.focusing === FOCUSING.ICON}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashedBox startPos={state.selecting} mouse={mouse} />
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
      {state.powerState !== POWER_STATE.START && (
        <Modal
          onClose={onModalClose}
          onClickButton={onClickModalButton}
          mode={state.powerState}
        />
      )}
    </Container>
  );
}

  const powerOffAnimation = keyframes`
  0% { filter: brightness(1) grayscale(0); }
  30% { filter: brightness(1) grayscale(0); }
  100% { filter: brightness(0.6) grayscale(1); }
`;

const animation: Record<string, any> = {
  [POWER_STATE.START]: '',
  [POWER_STATE.TURN_OFF]: powerOffAnimation,
  [POWER_STATE.LOG_OFF]: powerOffAnimation,
};

const Container = styled.div<{ state: keyof typeof POWER_STATE | any}>`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans');
  font-family: Tahoma, 'Noto Sans', sans-serif;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: url(https://i.imgur.com/Zk6TR5k.jpg) no-repeat center center fixed;
  background-size: cover;
  animation: ${({ state }) => animation[state]} 5s forwards;
  *:not(input):not(textarea) {
    user-select: none;
  }
`;

export default Desktop;