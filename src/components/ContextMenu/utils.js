import checked from '../../assets/windowsIcons/checked.png';

export const contextMenuData = [
  {
    type: 'menu',
    text: 'Arrange Icon By',
    items: [
      {
        type: 'item',
        icon: checked,
        text: 'Name',
      },
      {
        type: 'item',
        icon: checked,
        text: 'Date',
      },
      {
        type: 'item',
        icon: checked,
        text: 'Size',
      },
      {
        type: 'item',
        icon: checked,
        text: 'Created',
      },
      {
        type: 'item',
        icon: checked,
        text: 'Modified',
      },
    ],
  },
  {
    type: 'item',
    text: 'Refresh',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Paste',
    inactive: true,
  },
  {
    type: 'item',
    text: 'Paste Shortcut',
    inactive: true,
  },
  {
    type: 'separator',
  },
  {
    type: 'menu',
    text: 'New',
    items: [
      {
        type: 'item',
        text: 'Folder',
      },
      {
        type: 'item',
        text: 'Shortcut',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        text: 'AutoHotkey Script',
      },
      {
        type: 'item',
        text: 'Contact',
      },
      {
        type: 'item',
        text: 'Microsoft Word Document',
      },
      {
        type: 'item',
        text: 'Journal Document',
      },
      {
        type: 'item',
        text: 'Microsoft PowerPoint Presentation',
      },
      {
        type: 'item',
        text: 'WinRAR Archive',
      },
      {
        type: 'item',
        text: 'Text Document',
      },
    ],
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Properties',
    action: 'I am properties!',
  },
];
