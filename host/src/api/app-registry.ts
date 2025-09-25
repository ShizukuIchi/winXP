import React from 'react';
import { WindowOptions } from './host-sdk';

export interface RemoteEntry {
  url: string;
  scope: string;
  module: string;
}

export interface AppManifest {
  id: string;
  name: string;
  version: string;
  icon: string;
  iconLarge?: string;
  entry: RemoteEntry;
  window: WindowOptions;
  multiInstance?: boolean;
}

// Static registry for apps - in production this would come from a CDN/API
export const APP_REGISTRY: AppManifest[] = [
  {
    id: 'app.notepad',
    name: 'Notepad',
    version: '1.0.0',
    icon: 'assets/windowsIcons/327(16x16).png',
    iconLarge: 'assets/windowsIcons/327(32x32).png',
    entry: {
      scope: 'notepadApp',
      url: 'http://localhost:3105/remoteEntry.js',
      module: './App'
    },
    window: {
      title: 'Untitled - Notepad',
      defaultSize: { width: 660, height: 500 },
      defaultOffset: { x: 270, y: 60 },
      resizable: true
    },
    multiInstance: true
  },
  {
    id: 'app.minesweeper',
    name: 'Minesweeper',
    version: '1.0.0',
    icon: 'assets/minesweeper/mine-icon.png',
    iconLarge: 'assets/minesweeper/mine-icon.png',
    entry: {
      scope: 'minesweeperApp',
      url: 'http://localhost:3106/remoteEntry.js',
      module: './App'
    },
    window: {
      title: 'Minesweeper',
      defaultSize: { width: 300, height: 450 },
      defaultOffset: { x: 190, y: 180 },
      resizable: false
    },
    multiInstance: true
  }
];

// Runtime loader for Module Federation remotes
export async function loadRemote<T = any>({ url, scope, module }: RemoteEntry): Promise<T> {
  // Initialize sharing scope
  await __webpack_init_sharing__('default');

  // Load container
  const container = await loadContainer(url, scope);

  // Initialize container
  // @ts-ignore
  await container.init(__webpack_share_scopes__.default);

  // Get factory and create module
  const factory = await container.get(module);
  return factory();
}

function loadContainer(url: string, scope: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if ((window as any)[scope]) {
      return resolve((window as any)[scope]);
    }

    // Create script element
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      const proxy = (window as any)[scope];
      if (!proxy) {
        reject(new Error(`Container '${scope}' not found after loading script`));
        return;
      }
      resolve(proxy);
    };

    script.onerror = () => {
      reject(new Error(`Failed to load remote entry: ${url}`));
    };

    document.head.appendChild(script);
  });
}

// Cache for loaded apps
const appCache = new Map<string, React.ComponentType<any>>();

export async function loadApp(appId: string): Promise<React.ComponentType<any> | null> {
  // Check cache first
  if (appCache.has(appId)) {
    return appCache.get(appId)!;
  }

  // Find app in registry
  const appManifest = APP_REGISTRY.find(app => app.id === appId);
  if (!appManifest) {
    console.error(`App not found in registry: ${appId}`);
    return null;
  }

  try {
    console.log(`Loading app: ${appId}`);
    const AppModule = await loadRemote<any>(appManifest.entry);
    const AppComponent = AppModule.default || AppModule;

    // Cache the component
    appCache.set(appId, AppComponent);

    return AppComponent;
  } catch (error) {
    console.error(`Failed to load app ${appId}:`, error);
    return null;
  }
}

export function getAppManifest(appId: string): AppManifest | null {
  return APP_REGISTRY.find(app => app.id === appId) || null;
}