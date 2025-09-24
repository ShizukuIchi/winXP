// Core application types
export interface AppConfig {
  id: number;
  name: string;
  component: React.ComponentType<any>;
  icon: string;
  iconLarge?: string;
  singleInstance?: boolean;
  notShowInTaskbar?: boolean;
}

export interface AppState {
  id: number;
  name: string;
  component: React.ComponentType<any>;
  icon: string;
  iconLarge?: string;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  resizable?: boolean;
}

export interface DesktopState {
  apps: AppState[];
  nextAppID: number;
  nextZIndex: number;
  icons: IconState[];
  focusedAppId: number;
  selectedIconsId: number[];
  focusingItem: string;
  powerState: PowerState;
  startMenuVisible: boolean;
  selectBox: SelectBox | null;
}

export interface IconState {
  id: number;
  name: string;
  icon: string;
  iconLarge: string;
  component?: React.ComponentType<any>;
  singleInstance?: boolean;
  notShowInTaskbar?: boolean;
}

export interface SelectBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type PowerState = 'on' | 'off' | 'turning_off';
export type FocusingItem = 'desktop' | 'taskbar' | 'start_menu';