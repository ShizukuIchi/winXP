export const Edit = [
  {
    type: 'item',
    text: 'Copy',
    hotkey: 'CTRL+C',
  },
  {
    type: 'item',
    text: 'Paste',
    hotkey: 'CTRL+V',
  },
];

const View = [
  {
    type: 'item',
    text: 'Standard',
    symbol: 'check',
  },
  {
    type: 'item',
    text: 'Scientific',
  },
];

const Help = [
  {
    type: 'item',
    text: 'Help topics',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'About Calculator',
  },
];
export default { Edit, View, Help };
