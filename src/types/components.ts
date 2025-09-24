import type { CSSProperties, ReactNode } from 'react';

// Common component prop types
export interface WindowProps {
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
  style?: CSSProperties;
  showStatusBar?: boolean;
  statusText?: string;
  resizable?: boolean;
  hideTitle?: boolean;
}

export interface MenuBarItem {
  label: string;
  name?: string;
  shortcut?: string;
  checked?: boolean;
  disabled?: boolean;
  type?: 'separator';
}

export type MenuBarConfigItem = MenuBarItem | string;

export interface MenuBarItems {
  [menuName: string]: MenuBarConfigItem[];
}

export interface XPComponentProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export type DropdownValue = string | number;

export type DropdownOption = DropdownValue | {
  value?: DropdownValue;
  label?: ReactNode;
  disabled?: boolean;
};

export interface OptionGroupOption {
  value?: DropdownValue;
  label?: ReactNode;
  disabled?: boolean;
}

export type OptionGroupEntry = OptionGroupOption | DropdownValue;

export interface TreeViewItem {
  id?: string;
  label: ReactNode;
  icon?: ReactNode;
  expanded?: boolean;
  disabled?: boolean;
  onClick?: (item: TreeViewItem) => void;
  children?: TreeViewItem[];
}

export interface XPTabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

export type WindowDropDownSymbol = 'ie-paper' | 'ie-book' | 'folder' | 'check' | 'circle' | string;

export interface WindowDropDownPosition {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface WindowDropDownBase {
  text: string;
  disable?: boolean;
  hotkey?: string;
  symbol?: WindowDropDownSymbol;
}

export interface WindowDropDownItem extends WindowDropDownBase {
  type: 'item';
}

export interface WindowDropDownMenu extends WindowDropDownBase {
  type: 'menu';
  items: WindowDropDownEntry[];
  position?: WindowDropDownPosition;
}

export interface WindowDropDownSeparator {
  type: 'separator';
}

export type WindowDropDownEntry =
  | WindowDropDownItem
  | WindowDropDownMenu
  | WindowDropDownSeparator;

export type WindowDropDownCollection = Record<string, WindowDropDownEntry[]>;
