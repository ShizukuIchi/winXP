import React from 'react';

export interface WindowOptions {
  title: string;
  icon?: string;
  defaultSize?: { width: number; height: number };
  defaultOffset?: { x: number; y: number };
  resizable?: boolean;
  multiInstance?: boolean;
  buttons?: Array<'close' | 'minimize' | 'maximize'>;
  invisible?: boolean;
  noFooterWindow?: boolean;
}

export interface WindowState {
  id: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
}

export interface HostAPI {
  // Window management
  openWindow(component: React.ComponentType<any>, options: WindowOptions): string;
  closeWindow(windowId: string): void;
  focusWindow(windowId: string): void;
  minimizeWindow(windowId: string): void;
  maximizeWindow(windowId: string): void;

  // Window state
  updateWindowState(windowId: string, state: Partial<WindowState>): void;
  getWindowState(windowId: string): WindowState | null;

  // Desktop integration
  showNotification(message: string): void;

  // App lifecycle callbacks
  onWindowClose?: (windowId: string) => void;
  onWindowFocus?: (windowId: string) => void;
}

// Global Host SDK interface
declare global {
  interface Window {
    __winxp_host_sdk?: HostAPI;
  }
}

export function getHostAPI(): HostAPI | null {
  return window.__winxp_host_sdk || null;
}