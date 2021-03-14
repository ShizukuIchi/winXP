import empty from '../../assets/empty.png';

export const contextMenuData = [
  {
    type: 'menu',
    icon: empty,
    text: 'Arrange Icon By',
    items: [
      {
        type: 'item',
        icon: empty,
        text: 'Name',
        checked: true,
      },
      {
        type: 'item',
        icon: empty,
        text: 'Date',
        checked: false,
      },
      {
        type: 'item',
        icon: empty,
        text: 'Size',
        checked: false,
      },
      {
        type: 'item',
        icon: empty,
        text: 'Created',
        checked: false,
      },
      {
        type: 'item',
        icon: empty,
        text: 'Modified',
        checked: false,
      },
    ],
  },
  {
    type: 'item',
    icon: empty,
    text: 'Refresh',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    icon: empty,
    text: 'Paste',
    inactive: true,
  },
  {
    type: 'item',
    icon: empty,
    text: 'Paste Shortcut',
    inactive: true,
  },
  {
    type: 'separator',
  },
  {
    type: 'menu',
    icon: empty,
    text: 'New',
    items: [
      {
        type: 'item',
        icon: empty,
        text: 'Folder',
      },
      {
        type: 'item',
        icon: empty,
        text: 'Shortcut',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        icon: empty,
        text: 'AutoHotkey Script',
      },
      {
        type: 'item',
        icon: empty,
        text: 'Contact',
      },
      {
        type: 'item',
        icon: empty,
        text: 'Microsoft Word Document',
      },
      {
        type: 'item',
        icon: empty,
        text: 'Journal Document',
      },
      {
        type: 'item',
        icon: empty,
        text: 'Microsoft PowerPoint Presentation',
      },
      {
        type: 'item',
        icon: empty,
        text: 'WinRAR Archive',
      },
      {
        type: 'item',
        icon: empty,
        text: 'Text Document',
      },
    ],
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    icon: empty,
    text: 'Properties',
    action: 'I am properties!',
  },
];
