# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint on src directory

**Build Output:**
- Production builds go to `build/` directory
- Uses Create React App build system

## Architecture Overview

This is a **Windows XP desktop recreation** built with React. The app simulates the Windows XP operating system interface in a web browser.

### Core Architecture

**State Management:**
- Uses React's `useReducer` hook for global state management in `src/WinXP/index.js`
- Central reducer handles all window/app lifecycle, focus management, and desktop interactions
- Action constants defined in `src/WinXP/constants/actions.js`

**Main Components Structure:**
- `src/App.js` - Entry point that renders the main WinXP component
- `src/WinXP/index.js` - Core desktop environment with state management
- `src/WinXP/apps/` - Individual applications (Minesweeper, Internet Explorer, Paint, etc.)
- `src/WinXP/Windows/` - Window management system
- `src/WinXP/Footer/` - Taskbar/start menu
- `src/WinXP/Icons/` - Desktop icons
- `src/components/` - Reusable UI components

### Key Systems

**Window Management:**
- Each app is a React component with standardized props (size, position, focus state)
- Windows support drag, resize, minimize, maximize, close operations
- Z-index management for layering
- Focus system distinguishes between window, icon, and desktop focus states

**Application System:**
- Apps defined in `src/WinXP/apps/index.js` with default configurations
- Each app specifies: component, header (title/icon), default size/position, resize capability
- Some apps support multiple instances (multiInstance flag)
- Apps include: Internet Explorer, Minesweeper, Notepad, My Computer, Winamp, Paint

**Desktop Environment:**
- Desktop icons that can be selected and launched
- Start menu in footer/taskbar
- Icon selection with drag selection box
- Power off/log off modal system

### Styling

- Uses `styled-components` for CSS-in-JS styling
- Windows XP visual theme with authentic fonts, colors, and UI elements
- Responsive design that adapts to screen size (mobile-friendly)
- Background image and authentic Windows XP styling throughout

### Assets

- Extensive icon library in `src/assets/windowsIcons/`
- Minesweeper game assets in `src/assets/minesweeper/`
- Sound effects in `src/assets/sounds/`
- CSS and font files in `src/assets/`

### Key Dependencies

- React 16.8+ with hooks
- styled-components for styling
- react-use for utility hooks (especially useMouse for desktop interactions)
- webamp for Winamp functionality
- lodash.samplesize for utility functions

### XP Component Library

A comprehensive set of authentic Windows XP-styled components is available at `src/components/XP/`:

**Available Components:**
- XPButton, XPCheckbox, XPTextBox, XPDropdown, XPSlider, XPOptionButton
- XPWindow, XPGroupBox, XPTabs, XPTreeView, XPProgressBar
- XPThemeProvider - wraps apps to enable XP.css styling

**Usage for New Apps:**
```javascript
import { XPThemeProvider, XPWindow, XPButton } from 'components/XP';

export default function MyApp({ onClose }) {
  return (
    <XPThemeProvider>
      <XPWindow title="My App" onClose={onClose}>
        <XPButton>Authentic XP Button</XPButton>
      </XPWindow>
    </XPThemeProvider>
  );
}
```

**CSS Isolation:** XP components use XP.css with proper isolation to prevent conflicts with existing styled-components. Always wrap XP component trees in `<XPThemeProvider>`.

### Development Notes

- Uses absolute imports configured through Create React App
- ESLint configured with react-app and prettier rules
- The project aims for authentic Windows XP behavior and visual fidelity
- Mobile responsiveness handled through conditional maximization based on screen width
- XP.css library integrated for authentic Windows XP component styling