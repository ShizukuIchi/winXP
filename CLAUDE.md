# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

WinXP — a browser recreation of the Windows XP desktop (drag/resize windows, start menu, Minesweeper, Internet Explorer, My Computer, Notepad, Winamp, Paint). Create React App (react-scripts 5) + React 16 hooks + styled-components 4. No TypeScript, no Redux, no router.

## Commands

```bash
yarn start        # dev server on :3000 (HMR is wired manually in src/index.js)
yarn build        # production bundle to build/
yarn lint         # eslint src — prettier violations surface as lint errors
yarn test         # react-scripts test (jest watch mode)
```

There are no test files in the repo; `yarn test` currently has nothing to run. Both `yarn.lock` and `package-lock.json` are committed — prefer yarn to match the lockfile that upstream maintains.

ESLint config lives in `package.json` (`eslintConfig`: react-app + prettier); formatting rules are in `.prettierrc` (single quotes, trailing commas everywhere).

## Absolute imports

`jsconfig.json` sets `baseUrl: src`, so imports are written from `src/`: `import { WindowDropDowns } from 'components'`, `import ie from 'assets/windowsIcons/ie.png'`, `import { POWER_STATE } from 'WinXP/constants'`. Barrel files exist at `src/components/index.js` and `src/hooks/index.js`.

## Architecture

### One reducer runs the whole OS

`src/WinXP/index.js` holds all desktop state in a single `useReducer`: the open `apps` array, `icons`, `focusing`, `selecting`, `powerState`, plus monotonic `nextAppID`/`nextZIndex` counters. Action types are in `WinXP/constants/actions.js`; the `FOCUSING` and `POWER_STATE` enums in `WinXP/constants/index.js`. Everything below (`Icons`, `Windows`, `Footer`, `Modal`) is presentational and receives callbacks that dispatch.

Key invariants:
- **Focus is derived, not stored.** `getFocusedAppId()` = highest-`zIndex` non-minimized app, and only when `focusing === FOCUSING.WINDOW`. Focusing bumps `zIndex` to `nextZIndex++`.
- `DEL_APP` / `MINIMIZE_APP` / `TOGGLE_MAXIMIZE_APP` are **no-ops unless the target is the focused window** — both in the reducer and again in the `useCallback` wrappers in `WinXP()`.

### The app registry

`src/WinXP/apps/index.js` is the single place apps are declared, via three exports:
- `defaultAppState` — windows already open on boot (carry concrete `id`/`zIndex` from module-level generators).
- `defaultIconState` — desktop icons; double-click looks up `appSettings` by matching `component` identity.
- `appSettings` — keyed templates (`appSettings['My Computer']`) that `ADD_APP` clones. `multiInstance: false` makes `ADD_APP` refocus and un-minimize the existing window instead of opening a second one.

Each entry supplies `component`, `header` (`title`, `icon`, optional `buttons`, `invisible`, `noFooterWindow`), `defaultSize`, `defaultOffset`, `resizable`, `maximized`. Note `window.innerWidth` is read at module evaluation time for the `maximized` defaults — it is not reactive.

**To add an app:** create `src/WinXP/apps/<Name>/index.js`, register it in `appSettings` (and `defaultIconState` if it needs a desktop icon), and add the start-menu label to the `onClickMenuItem` string switch in `src/WinXP/index.js`. Unmatched menu strings intentionally open the `Error` app with an "Application not found" message.

### Window chrome and the component-call gotcha

`src/WinXP/Windows/index.js` draws the XP title bar and gradients, and renders app content as **`component({ onClose, onMinimize, isFocus, ...injectProps })` — a plain function call, not JSX**. Consequences to keep in mind: app components' hooks run as part of the memoized `Window`'s render, they get no element identity of their own, and class components will not work as apps. `injectProps` is how per-instance data reaches an app (e.g. the error message text).

Geometry comes from `src/hooks/useElementResize.js` — pass the window `ref` plus a `dragRef` for the header, `defaultOffset`/`defaultSize`, and a `boundary`; it attaches window-level mouse handlers and inserts a fixed-position cover `div` during drag so iframes don't swallow the mouse. When `maximized` is true, `Windows` overrides its output rather than telling the hook.

### Desktop rubber-band selection

`WinXP()` tracks the pointer with `react-use`'s `useMouse` on the desktop container. `START_SELECT` stores the origin; `Icons` measures each icon's rect on mount and intersects it against the live drag rect, calling `setSelectedIcons`; `components/DashedBox` draws the marquee.

### Menus are string-driven

`components/WindowDropDowns` takes an `items` object of `menuName -> [{ type: 'item' | 'menu' | 'separator', text, hotkey, symbol, disable }]`, defined in a colocated `dropDownData.js` per app. Clicking sends the item's **`text` string** back to the app's `onClickOptionItem` switch (see `apps/Notepad/index.js`). The start menu works the same way: `Footer/FooterMenu.js` + `FooterMenuData.js` funnel a label string into `onClickMenuItem`. Renaming a menu label breaks its handler.

### Third-party app integrations

- **Winamp** wraps the `webamp` npm package: instantiated in an effect, rendered into a ref, then the `#webamp` DOM node is moved into the window; `onClose`/`onMinimize` are re-registered on every render. Its window uses `header.invisible` so Webamp draws its own chrome.
- **Paint** is an `<iframe>` to `jspaint.app`, with a transparent overlay `div` rendered whenever `!isFocus` to intercept mouse events. Any new iframe-based app needs that same overlay, or dragging/focus breaks.
- **Internet Explorer** is not a real browser — it renders the fake `components/Google` search page and swaps between `main`/`search` routes in local state.
- **Minesweeper** keeps its own `useReducer` game state in `apps/Minesweeper/index.js` and splits rendering into `MinesweeperView.js`; board sizes are in `config.js`.

### Styling

styled-components v4 throughout, no CSS-in-file except `src/index.css`, `assets/clear.css`, `assets/font.css`. The prevailing pattern is a plain function component that takes `className`, with a `styled(Component)` default export holding BEM-ish nested selectors — this is what lets the XP gradients depend on props like `isFocus` and `header.invisible`. Icons are hundreds of PNGs in `src/assets/windowsIcons/`, named by their original resource id and size (`676(32x32).png`).

## Deployment

`now.json` configures a Zeit/Vercel v2 static build (`now-build` → `react-scripts build`, `distDir: build`) aliased to `winxp.now.sh`. The service worker in `src/serviceWorker.js` is generated by CRA but explicitly **unregistered** in `src/index.js`.

## Known dead code

`src/hooks/useGA.js` imports `react-ga`, which was removed from `package.json`. Nothing imports it and it is not in the `hooks` barrel — don't wire it up without re-adding the dependency.
