// Action type definitions
export interface AddAppAction {
  type: 'ADD_APP';
  payload: {
    name: string;
    component: React.ComponentType<any>;
    icon: string;
    iconLarge?: string;
  };
}

export interface DeleteAppAction {
  type: 'DEL_APP';
  payload: {
    id: number;
  };
}

export interface FocusAppAction {
  type: 'FOCUS_APP';
  payload: {
    id: number;
  };
}

export interface MinimizeAppAction {
  type: 'MINIMIZE_APP';
  payload: {
    id: number;
  };
}

export interface ToggleMaximizeAppAction {
  type: 'TOGGLE_MAXIMIZE_APP';
  payload: {
    id: number;
  };
}

export type DesktopAction =
  | AddAppAction
  | DeleteAppAction
  | FocusAppAction
  | MinimizeAppAction
  | ToggleMaximizeAppAction;