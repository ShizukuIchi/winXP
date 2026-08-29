import degiro from 'assets/shortcuts/degiro.png';

// External sites, shown as desktop shortcuts. Double clicking one opens it in
// a new tab instead of a window, since we can't frame other people's sites.
// To add a site: drop a 32-64px icon in assets/shortcuts and add an entry.
const shortcuts = [
  {
    title: 'DEGIRO',
    icon: degiro,
    link: 'https://www.degiro.nl',
  },
];

// Ids start at 100 so they can never collide with the built in apps, which
// number themselves from 0 in apps/index.js.
export const shortcutIconState = shortcuts.map((shortcut, index) => ({
  ...shortcut,
  id: 100 + index,
  isFocus: false,
}));

export default shortcuts;
