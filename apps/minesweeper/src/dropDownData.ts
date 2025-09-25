import type { WindowDropDownCollection, WindowDropDownEntry } from 'types/components';

type GameDifficulty = 'Beginner' | 'Intermediate' | 'Expert' | 'Custom...';
const createDifficultyItem = (text: GameDifficulty): WindowDropDownEntry => ({
  type: 'item',
  text
});

export const Game: WindowDropDownEntry[] = [
  { type: 'item', text: 'New', hotkey: 'F2' },
  { type: 'separator' },
  createDifficultyItem('Beginner'),
  createDifficultyItem('Intermediate'),
  createDifficultyItem('Expert'),
  createDifficultyItem('Custom...'),
  { type: 'separator' },
  { type: 'item', text: 'Marks (?)', symbol: 'check' },
  { type: 'item', text: 'Color', symbol: 'check' },
  { type: 'item', text: 'Sound' },
  { type: 'separator' },
  { type: 'item', text: 'Best Times...' },
  { type: 'separator' },
  { type: 'item', text: 'Exit' }
];

export const Help: WindowDropDownEntry[] = [
  { type: 'item', text: 'Contents', hotkey: 'F1' },
  { type: 'item', text: 'Search for Help on...' },
  { type: 'item', text: 'Using Help' },
  { type: 'separator' },
  { type: 'item', text: 'About Minesweeper' }
];

const dropDownData: WindowDropDownCollection = { Game, Help };

export default dropDownData;
