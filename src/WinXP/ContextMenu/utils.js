import empty from '../../assets/empty.png';

export function calculatePositionX(pos) {
  const windowWidth = window.innerWidth;
  return pos.x > windowWidth - 150 ? pos.x - 150 : pos.x;
}

export function calculatePositionY(pos) {
  const WindowHeight = window.innerHeight;
  return pos.y > WindowHeight - 150 ? pos.y - 150 : pos.y;
}

export const contextMenuData = [
  {
    type: 'menu',
    icon: empty,
    text: 'View',
    items: [
      {
        type: 'item',
        icon: empty,
        text: 'Thumbnails',
        checked: true,
      },
      {
        type: 'item',
        icon: empty,
        text: 'Tiles',
        checked: false,
      },
      {
        type: 'item',
        icon: empty,
        text: 'Icons',
        checked: false,
      },
      {
        type: 'item',
        icon: empty,
        text: 'List',
        checked: false,
      },
      {
        type: 'item',
        icon: empty,
        text: 'Details',
        checked: false,
      },
    ],
  },
  {
    type: 'menu',
    icon: empty,
    text: 'Sort By',
    items: [
      {
        type: 'item',
        icon: empty,
        text: 'Name',
      },
      {
        type: 'item',
        icon: empty,
        text: 'Date',
      },
    ],
  },
  {
    type: 'item',
    icon: empty,
    text: 'Refresh Icons',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    icon: empty,
    text: 'Paste Here',
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
        text: 'File',
      },
      {
        type: 'item',
        icon: empty,
        text: 'Folder',
      },
    ],
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    icon: empty,
    text: 'Personalize',
  },
];
