import type { ComponentType } from 'react';

import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import Notepad from './Notepad';
import Winamp from './Winamp';
import Paint from './Paint';
import XPExampleApp from '../../components/XP/XPExampleApp';
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

interface AppWindowSize {
  width: number;
  height: number;
}

interface AppWindowOffset {
  x: number;
  y: number;
}

interface AppHeaderConfig {
  title: string;
  icon: string;
  invisible?: boolean;
  buttons?: Array<'close' | 'minimize' | 'maximize'>;
  noFooterWindow?: boolean;
}

export interface AppInstanceConfig {
  component: ComponentType<any>;
  header: AppHeaderConfig;
  defaultSize: AppWindowSize;
  defaultOffset: AppWindowOffset;
  resizable: boolean;
  minimized: boolean;
  maximized: boolean;
  id?: number;
  zIndex?: number;
  iconLarge?: string;
  multiInstance?: boolean;
}

export interface DesktopIconConfig {
  id: number;
  icon: string;
  title: string;
  component: ComponentType<any>;
  isFocus: boolean;
  iconLarge?: string;
}

export type AppRegistry = Record<string, AppInstanceConfig>;

const gen = (): (() => number) => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

const genId = gen();
const genIndex = gen();

export const defaultAppState: AppInstanceConfig[] = [
  {
    component: InternetExplorer,
    header: {
      title: 'Internet Explorer',
      icon: iePaper
    },
    defaultSize: {
      width: 700,
      height: 500
    },
    defaultOffset: {
      x: 130,
      y: 20
    },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    id: genId(),
    zIndex: genIndex()
  },
  {
    component: Minesweeper,
    header: {
      title: 'Minesweeper',
      icon: mine
    },
    defaultSize: {
      width: 0,
      height: 0
    },
    defaultOffset: {
      x: 180,
      y: 170
    },
    resizable: false,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex()
  },
  {
    component: Winamp,
    header: {
      title: 'Winamp',
      icon: winampIcon,
      invisible: true
    },
    defaultSize: {
      width: 0,
      height: 0
    },
    defaultOffset: {
      x: 0,
      y: 0
    },
    resizable: false,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex()
  },
  {
    component: MyComputer,
    header: {
      title: 'My Computer',
      icon: computerSmall
    },
    defaultSize: {
      width: 660,
      height: 500
    },
    defaultOffset: {
      x: 250,
      y: 40
    },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    id: genId(),
    zIndex: genIndex()
  }
];

export const defaultIconState: DesktopIconConfig[] = [
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
    component: Notepad,
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

export const AppList: AppRegistry = {
  'Internet Explorer': {
    component: InternetExplorer,
    header: {
      icon: iePaper,
      title: 'Internet Explorer'
    },
    defaultSize: {
      width: 700,
      height: 500
    },
    defaultOffset: {
      x: 150,
      y: 40
    },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    multiInstance: true
  },
  Minesweeper: {
    component: Minesweeper,
    header: {
      icon: mine,
      title: 'Minesweeper'
    },
    defaultSize: {
      width: 300,
      height: 450
    },
    defaultOffset: {
      x: 190,
      y: 180
    },
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
    defaultSize: {
      width: 380,
      height: 0
    },
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
    header: {
      icon: computerSmall,
      title: 'My Computer'
    },
    defaultSize: {
      width: 660,
      height: 500
    },
    defaultOffset: {
      x: 260,
      y: 50
    },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    multiInstance: false
  },
  Notepad: {
    component: Notepad,
    header: {
      icon: notepadSmall,
      title: 'Untitled - Notepad'
    },
    defaultSize: {
      width: 660,
      height: 500
    },
    defaultOffset: {
      x: 270,
      y: 60
    },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    multiInstance: true
  },
  Winamp: {
    component: Winamp,
    header: {
      icon: winampIcon,
      title: 'Winamp',
      invisible: true
    },
    defaultSize: {
      width: 0,
      height: 0
    },
    defaultOffset: {
      x: 0,
      y: 0
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false
  },
  Paint: {
    component: Paint,
    header: {
      icon: paintSmall,
      title: 'Untitled - Paint'
    },
    defaultSize: {
      width: 660,
      height: 500
    },
    defaultOffset: {
      x: 280,
      y: 70
    },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    multiInstance: true
  },
  'XP Components': {
    component: XPExampleApp,
    header: {
      icon: xpDemo,
      title: 'XP Component Demo'
    },
    defaultSize: {
      width: 500,
      height: 400
    },
    defaultOffset: {
      x: 300,
      y: 80
    },
    resizable: true,
    minimized: false,
    maximized: typeof window !== 'undefined' ? window.innerWidth < 800 : false,
    multiInstance: true
  }
};

export const appSettings = AppList;

export {
  InternetExplorer,
  Minesweeper,
  ErrorBox,
  MyComputer,
  Notepad,
  Winamp,
  Paint,
  XPExampleApp
};






