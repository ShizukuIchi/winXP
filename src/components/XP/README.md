# XP Component Library

A comprehensive collection of Windows XP-styled React components using XP.css with proper CSS isolation to prevent conflicts with existing styled-components.

## Features

- ✅ Authentic Windows XP styling using XP.css
- ✅ CSS isolation prevents bleed with existing styled-components
- ✅ Easy to use for creating new apps
- ✅ Full TypeScript-like prop interfaces
- ✅ Accessibility features built-in
- ✅ Compatible with existing WinXP desktop architecture

## Quick Start

```jsx
import { XPThemeProvider, XPWindow, XPButton } from 'components/XP';

function MyApp() {
  return (
    <XPThemeProvider>
      <XPWindow title="My App" onClose={handleClose}>
        <XPButton onClick={handleClick}>Click Me!</XPButton>
      </XPWindow>
    </XPThemeProvider>
  );
}
```

## Available Components

### Core Components
- **XPButton** - Windows XP styled buttons
- **XPCheckbox** - Checkboxes with labels
- **XPTextBox** - Text inputs (single/multi-line)
- **XPDropdown** - Select dropdowns
- **XPSlider** - Range sliders (horizontal/vertical)
- **XPOptionButton** - Radio buttons with XPOptionGroup

### Layout Components
- **XPWindow** - Complete XP-styled windows with title bar
- **XPGroupBox** - Fieldset containers with legends

### Navigation Components
- **XPTabs** - Tab interfaces
- **XPTreeView** - Expandable tree structures
- **XPProgressBar** - Progress indicators

### Utilities
- **XPThemeProvider** - Provides XP.css global styles
- **XPContainer** - Isolation container for XP components

## Component Examples

### Basic Window App
```jsx
<XPThemeProvider>
  <XPWindow
    title="Calculator"
    onClose={onClose}
    showStatusBar
    statusText="Ready"
  >
    <XPButton onClick={handleCalculate}>Calculate</XPButton>
  </XPWindow>
</XPThemeProvider>
```

### Form with Multiple Components
```jsx
<XPGroupBox legend="User Settings">
  <XPTextBox
    label="Username"
    value={username}
    onChange={setUsername}
    stacked
  />
  <XPCheckbox
    label="Remember me"
    checked={remember}
    onChange={setRemember}
  />
  <XPDropdown
    options={[
      { value: 'admin', label: 'Administrator' },
      { value: 'user', label: 'Standard User' }
    ]}
    value={userType}
    onChange={setUserType}
  />
</XPGroupBox>
```

### Tabbed Interface
```jsx
<XPTabs
  tabs={[
    {
      id: 'general',
      label: 'General',
      content: <GeneralSettings />
    },
    {
      id: 'advanced',
      label: 'Advanced',
      content: <AdvancedSettings />
    }
  ]}
  onTabChange={handleTabChange}
/>
```

## Integration with Existing Apps

To add XP components to existing desktop apps:

1. Import the components you need
2. Wrap your app content in `<XPThemeProvider>`
3. Use XP components alongside existing styled-components
4. The CSS isolation prevents any conflicts

```jsx
// In your existing app (e.g., src/WinXP/apps/MyNewApp/index.js)
import React from 'react';
import { XPThemeProvider, XPWindow, XPButton } from 'components/XP';

export default function MyNewApp({ onClose }) {
  return (
    <XPThemeProvider>
      <XPWindow title="My New App" onClose={onClose}>
        <XPButton>Native XP Button</XPButton>
        {/* Mix with existing components - no conflicts! */}
      </XPWindow>
    </XPThemeProvider>
  );
}
```

## Architecture

- **CSS Isolation**: Each component is wrapped in `XPContainer` which isolates XP.css styles
- **No Global Pollution**: XP.css only affects components inside `XPThemeProvider`
- **Styled-Components Compatible**: Works alongside existing styled-components without conflicts
- **Semantic HTML**: Uses proper HTML elements for accessibility

## Best Practices

1. Always wrap XP component trees in `<XPThemeProvider>`
2. Use XP components for authentic Windows XP interface elements
3. Continue using styled-components for custom desktop UI elements
4. Test component isolation by mixing XP and styled components

## Example App

See `XPExampleApp.js` for a comprehensive demonstration of all components in action.