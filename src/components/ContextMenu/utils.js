import checked from 'assets/windowsIcons/checked.png';
import briefcase from 'assets/contextMenuIcons/briefcase.png';
import folderZip from 'assets/contextMenuIcons/folder-zip.png';
import folder from 'assets/contextMenuIcons/folder.png';
import image from 'assets/contextMenuIcons/image.png';
import media from 'assets/contextMenuIcons/media.png';
import richText from 'assets/contextMenuIcons/rich-text.png';
import shortcut from 'assets/contextMenuIcons/shortcut.png';
import txt from 'assets/contextMenuIcons/txt.png';

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
        text: 'Size',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Type',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Modified',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        text: 'Show in Groups',
        inactive: true,
      },
      {
        type: 'item',
        checked: checked,
        text: 'Auto Arrange',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Align to Grid',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Show Desktop Icons',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Lock Web Items on Desktop',
      },
      {
        type: 'item',
        checked: checked,
        text: 'Run Desktop Cleanup Wizard',
      },
    ],
  },
  {
    type: 'item',
    text: 'Refresh',
    action: 'refresh',
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
        icon: shortcut,
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        text: 'Briefcase',
        icon: briefcase,
      },
      {
        type: 'item',
        text: 'Bitmap Image',
        icon: image,
      },
      {
        type: 'item',
        text: 'Bitmap Image',
        icon: media,
      },
      {
        type: 'item',
        text: 'Wordpad Document',
        icon: richText,
      },
      {
        type: 'item',
        text: 'Rich Text Document',
        icon: richText,
      },
      {
        type: 'item',
        text: 'Text Document',
        icon: txt,
      },
      {
        type: 'item',
        text: 'Wave Sound',
        icon: media,
      },
      {
        type: 'item',
        text: 'Compressed (zipped) Folder',
        icon: folderZip,
      },
    ],
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Properties',
    action: 'display properties',
  },
];
