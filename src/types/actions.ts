// Action type definitions
export interface AddAppAction {
  type: 'ADD_APP';
  payload: {
    name: string;
    component: React.ComponentType<any>;
    icon: string;
    iconLarge?: string;
    multiInstance?: boolean;
    injectProps?: any;
    [key: string]: any;
  };
}

export interface DeleteAppAction {
  type: 'DEL_APP';
  payload: number;
}

export interface FocusAppAction {
  type: 'FOCUS_APP';
  payload: number;
}

export interface MinimizeAppAction {
  type: 'MINIMIZE_APP';
  payload: number;
}

export interface ToggleMaximizeAppAction {
  type: 'TOGGLE_MAXIMIZE_APP';
  payload: number;
}

export interface FocusIconAction {
  type: 'FOCUS_ICON';
  payload: number;
}

export interface SelectIconsAction {
  type: 'SELECT_ICONS';
  payload: number[];
}

export interface FocusDesktopAction {
  type: 'FOCUS_DESKTOP';
}

export interface StartSelectAction {
  type: 'START_SELECT';
  payload: { x: number; y: number } | null;
}

export interface EndSelectAction {
  type: 'END_SELECT';
}

export interface PowerOffAction {
  type: 'POWER_OFF';
  payload: string;
}

export interface CancelPowerOffAction {
  type: 'CANCEL_POWER_OFF';
}

export type DesktopAction =
  | AddAppAction
  | DeleteAppAction
  | FocusAppAction
  | MinimizeAppAction
  | ToggleMaximizeAppAction
  | FocusIconAction
  | SelectIconsAction
  | FocusDesktopAction
  | StartSelectAction
  | EndSelectAction
  | PowerOffAction
  | CancelPowerOffAction;