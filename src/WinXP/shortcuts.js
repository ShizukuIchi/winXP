import degiro from 'assets/shortcuts/degiro.svg';
import x from 'assets/shortcuts/x.svg';
import youtube from 'assets/shortcuts/youtube.svg';
import instagram from 'assets/shortcuts/instagram.svg';
import strava from 'assets/shortcuts/strava.svg';
import linkedin from 'assets/shortcuts/linkedin.svg';
import github from 'assets/shortcuts/github.svg';

// External sites, shown as desktop shortcuts. Double clicking one opens it in
// a new tab instead of a window, since we can't frame other people's sites.
// To add a site: drop a 32-64px icon in assets/shortcuts and add an entry.
const shortcuts = [
  {
    title: 'DEGIRO',
    icon: degiro,
    link: 'https://www.degiro.nl',
  },
  {
    title: 'X',
    icon: x,
    link: 'https://x.com/MaartenSlebos',
  },
  {
    title: 'YouTube',
    icon: youtube,
    link: 'https://www.youtube.com/@MaartenSlebos',
  },
  {
    title: 'Instagram',
    icon: instagram,
    link: 'https://www.instagram.com/maarten.slebos/',
  },
  {
    title: 'Strava',
    icon: strava,
    link: 'https://www.strava.com/athletes/134615033',
  },
  {
    title: 'LinkedIn',
    icon: linkedin,
    link: 'https://www.linkedin.com/in/maarten-slebos/',
  },
  {
    title: 'GitHub',
    icon: github,
    link: 'https://github.com/MaartenSlebos',
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
