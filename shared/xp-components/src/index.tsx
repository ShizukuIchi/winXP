import React from 'react';

// Export WindowDropDowns
export { default as WindowDropDowns } from './WindowDropDowns';

// Export all XP components
export * from './XP';
export { default as XPButton } from './XP/XPButton';
export { default as XPCheckbox } from './XP/XPCheckbox';
export { default as XPTextBox } from './XP/XPTextBox';
export { default as XPDropdown } from './XP/XPDropdown';
export { default as XPWindow } from './XP/XPWindow';
export { default as XPMenuBar } from './XP/XPMenuBar';

// Simple demo component for standalone testing
const XPComponentsDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1>Windows XP Components Library</h1>
      <p>Federated component library for authentic Windows XP styling</p>
      <p>Available components:</p>
      <ul>
        <li>WindowDropDowns - Menu dropdowns for app toolbars</li>
        <li>XPButton - Authentic XP-styled buttons</li>
        <li>XPCheckbox - XP-styled checkboxes</li>
        <li>XPTextBox - XP-styled text inputs</li>
        <li>XPDropdown - XP-styled dropdown selects</li>
        <li>XPWindow - XP window container</li>
        <li>XPThemeProvider - XP theme context provider</li>
        <li>XPMenuBar - XP-styled menu bars</li>
      </ul>
    </div>
  );
};

export default XPComponentsDemo;