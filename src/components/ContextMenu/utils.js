import checked from '../../assets/windowsIcons/checked.png';
import folder from '../../assets/windowsIcons/folder.png';

export const contextMenuData = [
  {
    type: 'menu',
    text: 'Arrange Icons By',
    items: [
      {
        type: 'item',
        checked: checked,
        text: 'Name',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Date',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Size',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Created',
      },
      {
        type: 'item',
        checked: checked,
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
        icon: folder,
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
  },
];
