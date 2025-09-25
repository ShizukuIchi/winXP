import type { WindowDropDownCollection, WindowDropDownEntry } from 'types/components';

const File: WindowDropDownEntry[] = [
  { type: 'item', text: 'Create Shortcut', disable: true },
  { type: 'item', text: 'Delete', disable: true },
  { type: 'item', text: 'Rename', disable: true },
  { type: 'item', text: 'Properties', disable: true },
  { type: 'separator' },
  { type: 'item', text: 'Close' }
];

const Edit: WindowDropDownEntry[] = [
  { type: 'item', text: 'Undo', hotkey: 'Ctrl+Z', disable: true },
  { type: 'separator' },
  { type: 'item', text: 'Cut', hotkey: 'Ctrl+X', disable: true },
  { type: 'item', text: 'Copy', hotkey: 'Ctrl+C', disable: true },
  { type: 'item', text: 'Paste', hotkey: 'Ctrl+V', disable: true },
  { type: 'item', text: 'Paste Shortcut', disable: true },
  { type: 'separator' },
  { type: 'item', text: 'Copy To Folder...', disable: true },
  { type: 'item', text: 'Move To Folder...', disable: true },
  { type: 'separator' },
  { type: 'item', text: 'Select All', hotkey: 'Ctrl+A' },
  { type: 'item', text: 'Invert Selection' }
];

const ToolbarsMenu: WindowDropDownEntry = {
  type: 'menu',
  text: 'Toolbars',
  position: {
    left: 'calc(100% - 4px)',
    top: '-3px'
  },
  items: [
    { type: 'item', symbol: 'check', text: 'Standard Buttons' },
    { type: 'item', symbol: 'check', text: 'Address Bar' },
    { type: 'item', symbol: 'check', text: 'Links' },
    { type: 'separator' },
    { type: 'item', symbol: 'check', text: 'Lock the Toolbars' },
    { type: 'item', text: 'Customize...' }
  ]
};

const ExplorerBarMenu: WindowDropDownEntry = {
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
};

const GoToMenu: WindowDropDownEntry = {
  type: 'menu',
  text: 'Go To',
  position: {
    left: 'calc(100% - 4px)',
    top: '-3px'
  },
  items: [
    { type: 'item', text: 'Back', hotkey: 'Alt+Left Arrow' },
    { type: 'item', text: 'Forward', hotkey: 'Alt+Right Arrow' },
    { type: 'item', text: 'Up One Level' },
    { type: 'separator' },
    { type: 'item', text: 'Home Page', hotkey: 'Alt+Home' },
    { type: 'separator' },
    { type: 'item', text: 'My Computer', symbol: 'check' }
  ]
};

const View: WindowDropDownEntry[] = [
  ToolbarsMenu,
  ExplorerBarMenu,
  { type: 'separator' },
  { type: 'item', text: 'Status Bar', symbol: 'check' },
  { type: 'item', text: 'Explorer Bar' },
  { type: 'item', text: 'Explorer Bar History' },
  { type: 'item', text: 'Explorer Bar Folders' },
  { type: 'item', text: 'Explorer Bar Search' },
  { type: 'item', text: 'Explorer Bar Media' },
  { type: 'item', text: 'Explorer Bar Tip of the Day' },
  { type: 'item', text: 'Thumbnails' },
  { type: 'item', text: 'Tiles' },
  { type: 'item', text: 'Icons' },
  { type: 'item', text: 'List' },
  { type: 'item', text: 'Details' },
  { type: 'separator' },
  { type: 'item', text: 'Arrange Icons by' },
  { type: 'item', text: 'Line Up Icons' },
  { type: 'separator' },
  GoToMenu,
  { type: 'item', text: 'Refresh' }
];

const FavoritesLinksMenu: WindowDropDownEntry = {
  type: 'menu',
  symbol: 'folder',
  text: 'Links',
  position: {
    left: 'calc(100% - 4px)',
    top: '-3px'
  },
  items: [
    { type: 'item', text: 'Customize Links', symbol: 'ie-paper' },
    { type: 'item', text: 'Free Hotmail', symbol: 'ie-paper' },
    { type: 'item', text: 'Windows', symbol: 'ie-paper' },
    { type: 'item', text: 'Windows Marketplace', symbol: 'ie-book' },
    { type: 'item', text: 'Windows Media', symbol: 'ie-paper' }
  ]
};

const Favorites: WindowDropDownEntry[] = [
  { type: 'item', text: 'Add to Favorites...' },
  { type: 'item', text: 'Organize Favorites...' },
  { type: 'separator' },
  FavoritesLinksMenu,
  { type: 'item', text: 'MSN.com', symbol: 'ie-paper' },
  { type: 'item', text: 'Radio Station Guide', symbol: 'ie-paper' }
];

const Tools: WindowDropDownEntry[] = [
  { type: 'item', text: 'Map Network Drive...' },
  { type: 'item', text: 'Disconnect Network Drive...' },
  { type: 'item', text: 'Synchronize...' },
  { type: 'separator' },
  { type: 'item', text: 'Folder Options...' }
];

const Help: WindowDropDownEntry[] = [
  { type: 'item', text: 'Help and Support Center' },
  { type: 'separator' },
  { type: 'item', text: 'Is this copy of Windows legal?' },
  { type: 'item', text: 'About Windows' }
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
