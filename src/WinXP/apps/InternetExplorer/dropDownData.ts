import type { WindowDropDownCollection, WindowDropDownEntry } from 'types/components';

const File: WindowDropDownEntry[] = [
  {
    type: 'menu',
    text: 'New',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px'
    },
    items: [
      { type: 'item', text: 'Window', hotkey: 'Ctrl+N' },
      { type: 'separator' },
      { type: 'item', text: 'Message' },
      { type: 'item', text: 'Post' },
      { type: 'item', text: 'Contact' },
      { type: 'item', text: 'Internet Call' }
    ]
  },
  { type: 'item', text: 'Open...', hotkey: 'Ctrl+O' },
  { type: 'item', text: 'Edit', disable: true },
  { type: 'item', disable: true, text: 'Save', hotkey: 'Ctrl+S' },
  { type: 'item', text: 'Save As...' },
  { type: 'separator' },
  { type: 'item', text: 'Page Setup...' },
  { type: 'item', text: 'Print...', hotkey: 'Ctrl+P' },
  { type: 'item', text: 'Print Preview...' },
  { type: 'separator' },
  {
    type: 'menu',
    text: 'Send',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px'
    },
    items: [
      { type: 'item', text: 'Page by E-mail...' },
      { type: 'item', text: 'Link by E-mail...' },
      { type: 'item', text: 'Shortcut to Desktop' }
    ]
  },
  { type: 'item', text: 'Import and Export...' },
  { type: 'separator' },
  { type: 'item', text: 'Properties' },
  { type: 'item', text: 'Work Offline' },
  { type: 'item', text: 'Close' }
];

const Edit: WindowDropDownEntry[] = [
  { type: 'item', disable: true, text: 'Cut', hotkey: 'Ctrl+X' },
  { type: 'item', disable: true, text: 'Copy', hotkey: 'Ctrl+C' },
  { type: 'item', disable: true, text: 'Paste', hotkey: 'Ctrl+V' },
  { type: 'item', text: 'Select All', hotkey: 'Ctrl+A' },
  { type: 'separator' },
  { type: 'item', text: 'Find (on This Page)...', hotkey: 'Ctrl+F' },
  { type: 'item', text: 'Find Next', disable: true },
  { type: 'item', text: 'Find Previous', disable: true },
  { type: 'item', text: 'Go To...', disable: true },
  { type: 'separator' },
  { type: 'item', text: 'Copy Shortcut' },
  { type: 'item', text: 'Copy Shortcut to Favorites' }
];

const View: WindowDropDownEntry[] = [
  { type: 'item', text: 'Toolbars' },
  {
    type: 'menu',
    text: 'Explorer Bar',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px'
    },
    items: [
      { type: 'item', text: 'Search' },
      { type: 'item', text: 'Favorites' },
      { type: 'item', text: 'Media' },
      { type: 'item', text: 'History' },
      { type: 'item', text: 'Folders' },
      { type: 'item', text: 'Tip of the Day' },
      { type: 'separator' },
      { type: 'item', text: 'Discuss' },
      { type: 'item', text: 'Translate' },
      { type: 'item', text: 'Encarta Encyclopedia' }
    ]
  },
  { type: 'separator' },
  { type: 'item', text: 'Status Bar', symbol: 'check' },
  { type: 'item', text: 'Full Screen', hotkey: 'F11' },
  { type: 'separator' },
  { type: 'item', text: 'Back', hotkey: 'Alt+Left Arrow' },
  { type: 'item', text: 'Forward', hotkey: 'Alt+Right Arrow' },
  { type: 'item', text: 'Stop', hotkey: 'Esc' },
  { type: 'item', text: 'Refresh', hotkey: 'F5' },
  { type: 'item', text: 'Home Page', hotkey: 'Alt+Home' }
];

const Favorites: WindowDropDownEntry[] = [
  {
    type: 'menu',
    text: 'Add to Favorites',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px'
    },
    items: [
      { type: 'item', text: 'Add to Favorites...' },
      { type: 'item', text: 'Organize Favorites...' }
    ]
  },
  { type: 'separator' },
  { type: 'item', text: 'MSN.com', symbol: 'ie-paper' },
  { type: 'item', text: 'Radio Station Guide', symbol: 'ie-paper' }
];

const Tools: WindowDropDownEntry[] = [
  {
    type: 'menu',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px'
    },
    text: 'Mail and News',
    items: [
      { type: 'item', text: 'Read Mail' },
      { type: 'item', text: 'New Message...' },
      { type: 'item', text: 'Send a Link...' },
      { type: 'item', text: 'Send Page...' },
      { type: 'separator' },
      { type: 'item', text: 'Read News' }
    ]
  },
  {
    type: 'menu',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px'
    },
    text: 'Pop-up Blocker',
    items: [
      { type: 'item', text: 'Turn Off Pop-up Blocker' },
      { type: 'item', text: 'Pop-up Blocker Settings...' }
    ]
  },
  { type: 'item', text: 'Manage Add-ons...' },
  { type: 'item', text: 'Synchronize...' },
  { type: 'item', text: 'Windows Update' },
  { type: 'separator' },
  { type: 'item', text: 'Windows Messenger' },
  { type: 'item', text: 'Diagnose Connection Problems...' },
  { type: 'separator' },
  { type: 'item', text: 'Internet Options...' }
];

const Help: WindowDropDownEntry[] = [
  { type: 'item', text: 'Contents and Index' },
  { type: 'item', text: 'Tip of the Day' },
  { type: 'item', text: 'For Netscape Users' },
  { type: 'item', text: 'Online Support' },
  { type: 'item', text: 'Send Feedback' },
  { type: 'separator' },
  { type: 'item', text: 'About Internet Explorer' }
];

const dropDownData: WindowDropDownCollection = {
  File,
  Edit,
  View,
  Favorites,
  Tools,
  Help
};

export default dropDownData;
