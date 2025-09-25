import React from 'react';

// XP Component Library
// A collection of Windows XP-styled components using XP.css
// with proper isolation to prevent CSS bleed

export { XPContainer, XPGlobalStyles } from './XPContainer';

// Core Input Components
export { default as XPButton } from './XPButton';
export { default as XPCheckbox } from './XPCheckbox';
export { default as XPTextBox } from './XPTextBox';
export { default as XPDropdown } from './XPDropdown';
export { default as XPSlider } from './XPSlider';
export { default as XPOptionButton, XPOptionGroup } from './XPOptionButton';

// Layout Components
export { default as XPWindow } from './XPWindow';
export { default as XPGroupBox } from './XPGroupBox';

// Navigation Components
export { default as XPTabs } from './XPTabs';
export { default as XPTreeView } from './XPTreeView';
export { default as XPProgressBar } from './XPProgressBar';
export { default as XPMenuBar } from './XPMenuBar';

export const XPThemeProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => <>{children}</>;
