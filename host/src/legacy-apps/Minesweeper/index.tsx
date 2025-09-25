import React, { useEffect, useReducer, useState } from 'react';
import sampleSize from 'lodash.samplesize';

import type { Difficulty, GameConfig } from './config';
import { Config } from './config';
import MinesweeperView from './MinesweeperView';

type CeilVisualState =
  | 'cover'
  | 'flag'
  | 'unknown'
  | 'open'
  | 'die'
  | 'mine'
  | 'misflagged';

type GameStatus = 'new' | 'started' | 'died' | 'won';

interface Ceil {
  state: CeilVisualState;
  minesAround: number;
  opening: boolean;
}

interface MinesweeperState {
  difficulty: Difficulty;
  status: GameStatus;
  rows: number;
  columns: number;
  mines: number;
  ceils: Ceil[];
}

type MinesweeperAction =
  | { type: 'CLEAR_MAP'; payload?: Difficulty }
  | { type: 'START_GAME'; payload: number }
  | { type: 'OPEN_CEIL'; payload: number }
  | { type: 'CHANGE_CEIL_STATE'; payload: number }
  | { type: 'GAME_OVER'; payload: number }
  | { type: 'WON' }
  | { type: 'OPENING_CEIL'; payload: number }
  | { type: 'OPENING_CEILS'; payload: number };

interface MinesweeperProps {
  defaultDifficulty?: Difficulty;
  onClose?: () => void;
}

interface GameBoard extends Pick<MinesweeperState, 'rows' | 'columns' | 'mines' | 'ceils'> {}

interface GameBoardWithExclude extends Pick<MinesweeperState, 'rows' | 'columns' | 'mines'> {
  exclude?: number;
}

const MINE_VALUE = -10;

const getInitState = (difficulty: Difficulty = 'Beginner'): MinesweeperState => ({
  difficulty,
  status: 'new',
  ...genGameConfig(Config[difficulty])
});

const reducer = (
  state: MinesweeperState,
  action: MinesweeperAction = { type: 'CLEAR_MAP' }
): MinesweeperState => {
  switch (action.type) {
    case 'CLEAR_MAP': {
      const difficulty = action.payload ?? state.difficulty;
      return getInitState(difficulty);
    }
    case 'START_GAME': {
      const exclude = action.payload;
      const difficultyConfig = Config[state.difficulty];
      return {
        ...state,
        ...insertMines(
          {
            rows: difficultyConfig.rows,
            columns: difficultyConfig.columns,
            mines: difficultyConfig.mines,
            exclude
          },
          state.ceils
        ),
        status: 'started'
      };
    }
    case 'OPEN_CEIL': {
      const indexes = autoCeils(state, action.payload);
      const ceils = [...state.ceils];
      indexes.forEach((ceilIndex) => {
        const ceil = ceils[ceilIndex];
        ceils[ceilIndex] = { ...ceil, state: 'open' };
      });
      return {
        ...state,
        ceils
      };
    }
    case 'CHANGE_CEIL_STATE': {
      const index = action.payload;
      const ceils = [...state.ceils];
      const ceil = state.ceils[index];
      let newState: CeilVisualState;
      switch (ceil.state) {
        case 'cover':
          newState = 'flag';
          break;
        case 'flag':
          newState = 'unknown';
          break;
        case 'unknown':
          newState = 'cover';
          break;
        default:
          throw new Error(`Unknown ceil state ${ceil.state}`);
      }
      ceils[index] = { ...ceil, state: newState };
      return {
        ...state,
        ceils
      };
    }
    case 'GAME_OVER': {
      const ceils: Ceil[] = state.ceils.map((ceil): Ceil => {
        if (ceil.minesAround < 0 && ceil.state !== 'flag') {
          return {
            ...ceil,
            state: 'mine'
          };
        }
        if (ceil.state === 'flag' && ceil.minesAround >= 0) {
          return {
            ...ceil,
            state: 'misflagged'
          };
        }
        return {
          ...ceil,
          opening: false
        };
      });
      ceils[action.payload] = {
        ...ceils[action.payload],
        state: 'die'
      };
      return {
        ...state,
        status: 'died',
        ceils
      };
    }
    case 'WON': {
      const ceils: Ceil[] = state.ceils.map((ceil): Ceil =>
        ceil.minesAround >= 0
          ? { ...ceil, state: 'open' }
          : { ...ceil, state: 'flag' }
      );
      return {
        ...state,
        status: 'won',
        ceils
      };
    }
    case 'OPENING_CEIL': {
      const ceils: Ceil[] = state.ceils.map((ceil, index): Ceil => ({
        ...ceil,
        opening: index === action.payload
      }));
      return {
        ...state,
        ceils
      };
    }
    case 'OPENING_CEILS': {
      const indexes = getNearIndexes(action.payload, state.rows, state.columns);
      const ceils: Ceil[] = state.ceils.map((ceil): Ceil => ({
        ...ceil,
        opening: false
      }));
      [...indexes, action.payload].forEach((index) => {
        const ceil = ceils[index];
        ceils[index] = { ...ceil, opening: true };
      });
      return {
        ...state,
        ceils
      };
    }
    default:
      return state;
  }
};

const MineSweeper: React.FC<MinesweeperProps> = ({ defaultDifficulty = 'Beginner', onClose }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(defaultDifficulty));
  const seconds = useTimer(state.status);

  const changeCeilState = (index: number) => {
    const ceil = state.ceils[index];
    if (ceil.state === 'open' || ['won', 'died'].includes(state.status)) {
      return;
    }
    dispatch({ type: 'CHANGE_CEIL_STATE', payload: index });
  };

  const openCeil = (index: number) => {
    switch (state.status) {
      case 'new':
        dispatch({ type: 'START_GAME', payload: index });
        dispatch({ type: 'OPEN_CEIL', payload: index });
        break;
      case 'started': {
        const ceil = state.ceils[index];
        if (['flag', 'open'].includes(ceil.state)) {
          break;
        }
        if (ceil.minesAround < 0) {
          dispatch({ type: 'GAME_OVER', payload: index });
        } else {
          dispatch({ type: 'OPEN_CEIL', payload: index });
        }
        break;
      }
      default:
        break;
    }
  };

  const openCeils = (index: number) => {
    const ceil = state.ceils[index];
    if (ceil.state !== 'open' || ceil.minesAround <= 0 || state.status !== 'started') {
      return;
    }
    const indexes = getNearIndexes(index, state.rows, state.columns);
    const nearCeils = indexes.map((i) => state.ceils[i]);
    if (nearCeils.filter((nearCeil) => nearCeil.state === 'flag').length !== ceil.minesAround) {
      return;
    }
    const mineIndex = indexes.find(
      (i) => state.ceils[i].minesAround < 0 && state.ceils[i].state !== 'flag'
    );
    if (mineIndex !== undefined) {
      dispatch({ type: 'GAME_OVER', payload: mineIndex });
    } else {
      indexes.forEach((i) => dispatch({ type: 'OPEN_CEIL', payload: i }));
    }
  };

  useEffect(() => {
    if (state.status === 'started' && checkRemains(state) === 0) {
      dispatch({ type: 'WON' });
    }
  });

  const onReset = (difficulty: Difficulty) => {
    dispatch({ type: 'CLEAR_MAP', payload: difficulty });
  };

  const openingCeil = (index: number) => {
    if (['died', 'won'].includes(state.status)) {
      return;
    }
    dispatch({ type: 'OPENING_CEIL', payload: index });
  };

  const openingCeils = (index: number) => {
    if (['died', 'won'].includes(state.status)) {
      return;
    }
    dispatch({ type: 'OPENING_CEILS', payload: index });
  };

  return (
    <MinesweeperView
      {...state}
      className=""
      onClose={onClose}
      changeCeilState={changeCeilState}
      openCeil={openCeil}
      openCeils={openCeils}
      onReset={onReset}
      seconds={seconds}
      openingCeil={openingCeil}
      openingCeils={openingCeils}
    />
  );
};

const genGameConfig = ({ rows, columns, mines }: GameConfig): GameBoard => {
  const ceils: Ceil[] = Array.from({ length: rows * columns }, () => ({
    state: 'cover',
    minesAround: 0,
    opening: false
  }));
  return {
    rows,
    columns,
    ceils,
    mines
  };
};

const insertMines = (
  config: GameBoardWithExclude,
  originCeils: Ceil[]
): GameBoard => {
  const { rows, columns, mines, exclude } = config;
  const ceils = originCeils.map((ceil) => ({ ...ceil }));
  if (rows * columns !== ceils.length) {
    throw new Error('rows and columns not equal to ceils');
  }
  const indexArray = Array.from({ length: rows * columns }, (_, i) => i);
  sampleSize(
    indexArray.filter((i) => i !== exclude),
    mines
  ).forEach((chosen) => {
    ceils[chosen].minesAround = MINE_VALUE;
    getNearIndexes(chosen, rows, columns).forEach((nearIndex) => {
      ceils[nearIndex].minesAround += 1;
    });
  });
  return {
    rows,
    columns,
    ceils,
    mines
  };
};

const autoCeils = (state: MinesweeperState, index: number): number[] => {
  const { rows, columns } = state;
  type WalkedCeil = Ceil & { walked: boolean };
  const ceils: WalkedCeil[] = state.ceils.map((ceil) => ({
    ...ceil,
    walked: false
  }));

  const walkCeils = (targetIndex: number): number[] => {
    const ceil = ceils[targetIndex];
    if (ceil.walked || ceil.minesAround < 0 || ceil.state === 'flag') {
      return [];
    }
    ceil.walked = true;
    if (ceil.minesAround > 0) {
      return [targetIndex];
    }
    return [
      targetIndex,
      ...getNearIndexes(targetIndex, rows, columns).reduce<number[]>(
        (acc, ceilIndex) => [...acc, ...walkCeils(ceilIndex)],
        []
      )
    ];
  };

  return walkCeils(index);
};

const getNearIndexes = (index: number, rows: number, columns: number): number[] => {
  if (index < 0 || index >= rows * columns) {
    return [];
  }
  const row = Math.floor(index / columns);
  const column = index % columns;
  return [
    index - columns - 1,
    index - columns,
    index - columns + 1,
    index - 1,
    index + 1,
    index + columns - 1,
    index + columns,
    index + columns + 1
  ].filter((_, arrayIndex) => {
    if (row === 0 && arrayIndex < 3) return false;
    if (row === rows - 1 && arrayIndex > 4) return false;
    if (column === 0 && [0, 3, 5].includes(arrayIndex)) return false;
    if (column === columns - 1 && [2, 4, 7].includes(arrayIndex)) return false;
    return true;
  });
};

const useTimer = (status: GameStatus): number => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    switch (status) {
      case 'started':
        timer = setInterval(() => setSeconds((sec) => sec + 1), 1000);
        break;
      case 'new':
        setSeconds(0);
        break;
      default:
        break;
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [status]);
  return seconds;
};

function checkRemains(state: MinesweeperState): number {
  return state.ceils
    .filter((ceil) => ceil.state !== 'open')
    .filter((ceil) => ceil.minesAround >= 0)
    .length;
}

export default MineSweeper;
