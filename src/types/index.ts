// Core application types
export interface AppConfig {
  name: string;
  component: React.ComponentType<any>;
  icon: string;
  iconLarge?: string;
  multiInstance?: boolean;
  injectProps?: any;
  [key: string]: any;
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
  multiInstance?: boolean;
  injectProps?: any;
  [key: string]: any;
}

export interface IconState {
  id: number;
  name: string;
  icon: string;
  iconLarge: string;
  component?: React.ComponentType<any>;
  isFocus?: boolean;
  [key: string]: any;
}

export interface WinXPState {
  apps: AppState[];
  nextAppID: number;
  nextZIndex: number;
  focusing: string;
  icons: IconState[];
  selecting: { x: number; y: number } | false | null;
  powerState: string;
}

export interface MousePosition {
  docX: number;
  docY: number;
  posX: number;
  posY: number;
  elX: number;
  elY: number;
  elH: number;
  elW: number;
}