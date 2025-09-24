import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';
import dead from 'assets/minesweeper/dead.png';
import smile from 'assets/minesweeper/smile.png';
import win from 'assets/minesweeper/win.png';
import ohh from 'assets/minesweeper/ohh.png';
import empty from 'assets/empty.png';
import open1 from 'assets/minesweeper/open1.png';
import open2 from 'assets/minesweeper/open2.png';
import open3 from 'assets/minesweeper/open3.png';
import open4 from 'assets/minesweeper/open4.png';
import open5 from 'assets/minesweeper/open5.png';
import open6 from 'assets/minesweeper/open6.png';
import open7 from 'assets/minesweeper/open7.png';
import open8 from 'assets/minesweeper/open8.png';
import flag from 'assets/minesweeper/flag.png';
import mine from 'assets/minesweeper/mine-ceil.png';
import mineDeath from 'assets/minesweeper/mine-death.png';
import misFlagged from 'assets/minesweeper/misflagged.png';
import question from 'assets/minesweeper/question.png';
import digit0 from 'assets/minesweeper/digit0.png';
import digit1 from 'assets/minesweeper/digit1.png';
import digit2 from 'assets/minesweeper/digit2.png';
import digit3 from 'assets/minesweeper/digit3.png';
import digit4 from 'assets/minesweeper/digit4.png';
import digit5 from 'assets/minesweeper/digit5.png';
import digit6 from 'assets/minesweeper/digit6.png';
import digit7 from 'assets/minesweeper/digit7.png';
import digit8 from 'assets/minesweeper/digit8.png';
import digit9 from 'assets/minesweeper/digit9.png';
import digit_ from 'assets/minesweeper/digit-.png';

const digits = [
  digit0,
  digit1,
  digit2,
  digit3,
  digit4,
  digit5,
  digit6,
  digit7,
  digit8,
  digit9,
];

type CeilState = 'open' | 'flag' | 'misflagged' | 'mine' | 'die' | 'unknown' | 'cover';
type GameStatus = 'playing' | 'won' | 'died';
type Difficulty = 'Beginner' | 'Intermediate' | 'Expert';

interface Ceil {
  state: CeilState;
  minesAround: number;
  opening: boolean;
}

interface OpenBehavior {
  index: number;
  behavior: 'single' | 'multi' | '';
}

interface MineSweeperViewProps {
  ceils: Ceil[];
  className?: string;
  changeCeilState: (index: number) => void;
  onReset: (difficulty: Difficulty) => void;
  openCeil: (index: number) => void;
  openCeils: (index: number) => void;
  mines: number;
  status: GameStatus;
  seconds: number;
  onClose?: () => void;
  difficulty: Difficulty;
  openingCeil: (index: number) => void;
  openingCeils: (index: number) => void;
  columns?: number;
  rows?: number;
}

function renderDigits(number: number): React.ReactElement {
  let numberStr: string;
  if (number < 0) {
    const _number = -number % 100;
    if (_number === 0) {
      numberStr = '00';
    } else if (_number < 10) {
      numberStr = '0' + _number;
    } else {
      numberStr = String(_number);
    }
    return (
      <>
        <img src={digit_} alt="-" />
        {numberStr.split('').map((n, i) => (
          <img src={digits[parseInt(n)]} key={i} alt={n} />
        ))}
      </>
    );
  }

  numberStr = number < 999 ? String(number) : '999';
  if (number < 10) numberStr = '00' + numberStr;
  else if (number < 100) numberStr = '0' + numberStr;
  return (
    <>
      {numberStr
        .split('')
        .map((n, i) => <img key={i} src={digits[parseInt(n)]} alt={n} />)}
    </>
  );
}

function genDropDownData(difficulty: Difficulty) {
  let _Game = [...dropDownData.Game];
  // Type assertion needed due to complex dropdown type structure
  ((_Game[2] as any).symbol) = difficulty === 'Beginner' ? 'check' : undefined;
  ((_Game[3] as any).symbol) = difficulty === 'Intermediate' ? 'check' : undefined;
  ((_Game[4] as any).symbol) = difficulty === 'Expert' ? 'check' : undefined;
  return { Game: _Game, Help: dropDownData.Help };
}

function MineSweeperView({
  ceils,
  className,
  changeCeilState,
  onReset,
  openCeil,
  openCeils,
  mines,
  status,
  seconds,
  onClose,
  difficulty,
  openingCeil,
  openingCeils,
}: MineSweeperViewProps) {
  const face = useRef<HTMLButtonElement>(null);
  const [mouseDownContent, setMouseDownContent] = useState<boolean>(false);
  const [openBehavior, setOpenBehavior] = useState<OpenBehavior>({ index: -1, behavior: '' });

  function remainMines(): number {
    return (
      mines -
      ceils.filter(ceil => ceil.state === 'flag' || ceil.state === 'misflagged')
        .length
    );
  }

  function statusFace(): React.ReactElement {
    if (mouseDownContent) return <img alt="ohh" src={ohh} />;
    switch (status) {
      case 'died':
        return <img alt="dead" src={dead} />;
      case 'won':
        return <img alt="win" src={win} />;
      default:
        return <img alt="smile" src={smile} />;
    }
  }

  function onMouseDownContent(e: React.MouseEvent) {
    if (e.button !== 0) return;
    if (
      face.current?.contains(e.target as Node) ||
      status === 'won' ||
      status === 'died'
    )
      return;
    setMouseDownContent(true);
  }

  useEffect(() => {
    const { index, behavior } = openBehavior;
    switch (behavior) {
      case 'single':
        return openingCeil(index);
      case 'multi':
        return openingCeils(index);
      default:
        openingCeil(-1);
    }
    // eslint-disable-next-line
  }, [openBehavior.index, openBehavior.behavior]);

  function onMouseDownCeils(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const ceilElement = target.closest('.mine__ceil') as HTMLElement;
    const index = Array.prototype.indexOf.call(
      (e.currentTarget as HTMLElement).children,
      ceilElement,
    );

    if (e.button === 2 && (e as any).buttons === 2 && index !== -1) {
      changeCeilState(index);
    } else if (e.button === 0 && (e as any).buttons === 1) {
      setOpenBehavior({
        index,
        behavior: 'single',
      });
    } else if ((e as any).buttons === 3) {
      setOpenBehavior({
        index,
        behavior: 'multi',
      });
    }
  }

  function onMouseOverCeils(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const ceilElement = target.closest('.mine__ceil') as HTMLElement;
    const index = Array.prototype.indexOf.call(
      (e.currentTarget as HTMLElement).children,
      ceilElement,
    );
    setOpenBehavior({
      index,
      behavior: openBehavior.behavior,
    });
  }

  function onMouseUpCeils() {
    const { behavior, index } = openBehavior;
    if (index === -1) return;
    if (behavior === 'single') {
      openCeil(index);
    } else if (behavior === 'multi') {
      openCeils(index);
    }
  }

  function onClickOptionItem(item: string) {
    switch (item) {
      case 'Exit':
        onClose?.();
        break;
      case 'Beginner':
      case 'Intermediate':
      case 'Expert':
        onReset(item as Difficulty);
        break;
      case 'New':
        onReset(difficulty); // Use current difficulty for reset
        break;
      default:
    }
  }

  function onMouseUp() {
    setOpenBehavior({ index: -1, behavior: '' });
    setMouseDownContent(false);
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className={className} onContextMenu={e => e.preventDefault()}>
      <div className="mine__options">
        <WindowDropDowns
          items={genDropDownData(difficulty)}
          onClickItem={onClickOptionItem}
        />
      </div>
      <section className="mine__content" onMouseDown={onMouseDownContent}>
        <div className="mine__score-bar">
          <div className="mine__digits__outer">
            {renderDigits(remainMines())}
          </div>
          <div className="mine__face__outer">
            <button ref={face} className="mine__face" onClick={() => onReset(difficulty)}>
              {statusFace()}
              <img alt="smile" src={smile} />
            </button>
          </div>
          <div className="mine__digits__outer">{renderDigits(seconds)}</div>
        </div>
        <div
          className="mine__content__inner"
          onMouseDown={onMouseDownCeils}
          onMouseOver={onMouseOverCeils}
          onMouseUp={onMouseUpCeils}
        >
          <Ceils ceils={ceils} />
        </div>
      </section>
    </div>
  );
}

function getTextImg(index: number): string {
  return [empty, open1, open2, open3, open4, open5, open6, open7, open8][index];
}

interface CeilsProps {
  ceils: Ceil[];
}

function Ceils({ ceils }: CeilsProps) {
  function renderContent(ceil: Ceil): React.ReactElement {
    const { state, minesAround, opening } = ceil;
    switch (state) {
      case 'open':
        return <MinesAround mines={minesAround} />;
      case 'flag':
        return <Flag />;
      case 'misflagged':
        return <MisFlagged />;
      case 'mine':
        return <Mine />;
      case 'die':
        return <Die />;
      case 'unknown':
        return opening ? <QuestionOpen /> : <Question />;
      default:
        return opening ? <CeilBackgroundOpen /> : <CeilBackgroundCover />;
    }
  }

  return (
    <>
      {ceils.map((ceil, index) => (
        <div key={index} className="mine__ceil">
          {renderContent(ceil)}
        </div>
      ))}
    </>
  );
}

const Die = () => (
  <>
    <CeilBackgroundOpen />
    <img alt="death" src={mineDeath} />
  </>
);

const MisFlagged = () => (
  <>
    <CeilBackgroundOpen />
    <img alt="misFlagged" src={misFlagged} />
  </>
);

const Flag = () => (
  <>
    <CeilBackgroundCover />
    <img alt="flag" src={flag} />
  </>
);

interface MinesAroundProps {
  mines: number;
}

const MinesAround = ({ mines }: MinesAroundProps) => (
  <>
    <CeilBackgroundOpen />
    <img alt="mines-around" src={getTextImg(mines)} />
  </>
);

const Question = () => (
  <>
    <CeilBackgroundCover />
    <img alt="question" src={question} />
  </>
);

const QuestionOpen = () => (
  <>
    <CeilBackgroundOpen />
    <img alt="question" src={question} />
  </>
);

const Mine = () => (
  <>
    <CeilBackgroundOpen />
    <img alt="mine" src={mine} />
  </>
);

const CeilBackgroundCover = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-left: rgb(245, 245, 245) solid 2px;
  border-top: rgb(245, 245, 245) solid 2px;
  border-right: rgb(128, 128, 128) solid 2px;
  border-bottom: rgb(128, 128, 128) solid 2px;
`;

const CeilBackgroundOpen = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-left: rgb(128, 128, 128) solid 1px;
  border-top: rgb(128, 128, 128) solid 1px;
`;

interface StyledProps {
  columns?: number;
  rows?: number;
}

export default styled(MineSweeperView)<StyledProps>`
  img {
    pointer-events: none;
  }
  .mine__options {
    height: 20px;
    background: rgb(236, 233, 216);
  }
  .mine__content {
    border-left: rgb(245, 245, 245) solid 3px;
    border-top: rgb(245, 245, 245) solid 3px;
    background-color: rgb(192, 192, 192);
    padding: 5px;
  }
  .mine__score-bar {
    height: 34px;
    border-radius: 1px;
    border-top: rgb(128, 128, 128) solid 2px;
    border-left: rgb(128, 128, 128) solid 2px;
    border-right: rgb(245, 245, 245) solid 2px;
    border-bottom: rgb(245, 245, 245) solid 2px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 7px 3px 4px;
  }
  .mine__digits__outer {
    width: 40px;
    height: 24px;
    border-width: 0 1px 1px 0;
    border-style: solid;
    border-color: #fff;
    text-align: right;
  }
  .mine__face__outer {
    width: 24px;
    height: 24px;
    border-top: 1px solid rgb(128, 128, 128);
    border-left: 1px solid rgb(128, 128, 128);
    border-radius: 2px;
    transform: translateX(1px);
  }
  .mine__face {
    border-radius: 2px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(192, 192, 192);
    border-width: 2px;
    border-style: solid;
    border-color: rgb(245, 245, 245) rgb(128, 128, 128) rgb(128, 128, 128)
      rgb(245, 245, 245);
    outline: none;
    &:active:hover {
      border-width: 1px;
      border-color: rgb(128, 128, 128);
      img {
        transform: translate(1px, 1px);
      }
      img:nth-child(1) {
        display: none;
      }
      img:nth-child(2) {
        display: block;
      }
    }
    img:nth-child(2) {
      display: none;
    }
  }
  .mine__content__inner {
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns || 9}, 16px);
    grid-template-rows: repeat(${({ rows }) => rows || 9}, 16px);
    border-top: rgb(128, 128, 128) solid 3px;
    border-left: rgb(128, 128, 128) solid 3px;
    border-right: rgb(245, 245, 245) solid 3px;
    border-bottom: rgb(245, 245, 245) solid 3px;
  }
  .mine__ceil {
    position: relative;
    img {
      position: absolute;
      width: 16px;
      height: 16px;
    }
  }
`;