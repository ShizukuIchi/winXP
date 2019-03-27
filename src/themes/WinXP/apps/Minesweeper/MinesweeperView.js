import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dead from 'src/assets/minesweeper/dead.png';
import smile from 'src/assets/minesweeper/smile.png';
import win from 'src/assets/minesweeper/win.png';
import ohh from 'src/assets/minesweeper/ohh.png';
import empty from 'src/assets/empty.png';
import open1 from 'src/assets/minesweeper/open1.png';
import open2 from 'src/assets/minesweeper/open2.png';
import open3 from 'src/assets/minesweeper/open3.png';
import open4 from 'src/assets/minesweeper/open4.png';
import open5 from 'src/assets/minesweeper/open5.png';
import open6 from 'src/assets/minesweeper/open6.png';
import open7 from 'src/assets/minesweeper/open7.png';
import open8 from 'src/assets/minesweeper/open8.png';
import flag from 'src/assets/minesweeper/flag.png';
import mine from 'src/assets/minesweeper/mine-ceil.png';
import mineDeath from 'src/assets/minesweeper/mine-death.png';
import misFlagged from 'src/assets/minesweeper/misflagged.png';
import question from 'src/assets/minesweeper/question.png';
import checked from 'src/assets/minesweeper/checked.png';
import digit0 from 'src/assets/minesweeper/digit0.png';
import digit1 from 'src/assets/minesweeper/digit1.png';
import digit2 from 'src/assets/minesweeper/digit2.png';
import digit3 from 'src/assets/minesweeper/digit3.png';
import digit4 from 'src/assets/minesweeper/digit4.png';
import digit5 from 'src/assets/minesweeper/digit5.png';
import digit6 from 'src/assets/minesweeper/digit6.png';
import digit7 from 'src/assets/minesweeper/digit7.png';
import digit8 from 'src/assets/minesweeper/digit8.png';
import digit9 from 'src/assets/minesweeper/digit9.png';
import digit_ from 'src/assets/minesweeper/digit-.png';

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
function renderDigits(number) {
  let numberStr;
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
          <img src={digits[n]} key={i} alt={n} />
        ))}
      </>
    );
  }

  numberStr = number < 999 ? String(number) : '999';
  if (number < 10) numberStr = '00' + numberStr;
  else if (number < 100) numberStr = '0' + numberStr;
  return numberStr
    .split('')
    .map((n, i) => <img key={i} src={digits[n]} alt={n} />);
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
}) {
  const face = useRef(null);
  const dropDown = useRef(null);
  const [mouseDownContent, setMouseDownContent] = useState(false);
  const [openOption, setOpenOption] = useState(null);
  const [openBehavior, setOpenBehavior] = useState({ index: -1, behavior: '' });
  function remainMines() {
    return (
      mines -
      ceils.filter(ceil => ceil.state === 'flag' || ceil.state === 'misflagged')
        .length
    );
  }
  function statusFace() {
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
  function onMouseDownContent(e) {
    if (e.button !== 0) return;
    if (
      face.current.contains(e.target) ||
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
  }, [openBehavior.index, openBehavior.behavior]);
  function onMouseDownCeils(e) {
    const index = Array.prototype.indexOf.call(
      e.currentTarget.children,
      e.target.closest('.mine__ceil'),
    );
    if (e.button === 2 && e.buttons === 2 && index !== -1) {
      changeCeilState(index);
    } else if (e.button === 0 && e.buttons === 1) {
      setOpenBehavior({
        index,
        behavior: 'single',
      });
    } else if (e.buttons === 3) {
      setOpenBehavior({
        index,
        behavior: 'multi',
      });
    }
  }
  function onMouseOverCeils(e) {
    const index = Array.prototype.indexOf.call(
      e.currentTarget.children,
      e.target.closest('.mine__ceil'),
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
  function hoverOption(option) {
    if (openOption) setOpenOption(option);
  }
  function onMouseUp(e) {
    setOpenBehavior({ index: -1, behavior: '' });
    setMouseDownContent(false);
    if (!dropDown.current.contains(e.target)) {
      setOpenOption('');
    }
  }
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return (
    <div className={className} onContextMenu={e => e.preventDefault()}>
      <div className="mine__drop-downs" ref={dropDown}>
        <div
          style={{ visibility: openOption === 'Game' ? 'visible' : 'hidden' }}
          className="mine__drop-down"
        >
          <div className="mine__drop-down__title">Game</div>
          <div className="mine__drop-down__menu">
            <div className="mine__drop-down__row" onMouseUp={() => onReset()}>
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">New</div>
              <span className="mine__drop-down__hot-key">F2</span>
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />
            <div
              className="mine__drop-down__row"
              onMouseUp={() => onReset('Beginner')}
            >
              <div className="mine__drop-down__check">
                {difficulty === 'Beginner' && (
                  <img src={checked} alt="checked" />
                )}
              </div>
              <span>Beginner</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div
              className="mine__drop-down__row"
              onMouseUp={() => onReset('Intermediate')}
            >
              <div className="mine__drop-down__check">
                {difficulty === 'Intermediate' && (
                  <img src={checked} alt="checked" />
                )}
              </div>
              <span>Intermediate</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div
              className="mine__drop-down__row"
              onMouseUp={() => onReset('Expert')}
            >
              <div className="mine__drop-down__check">
                {difficulty === 'Expert' && <img src={checked} alt="checked" />}
              </div>
              <span>Expert</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <span>Custom...</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check">
                <img src={checked} alt="checked" />
              </div>
              <span>Marks (?)</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check">
                <img src={checked} alt="checked" />
              </div>
              <span>Color</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <span>Sound</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <span>Best Times...</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />

            <div className="mine__drop-down__row" onMouseUp={onClose}>
              <div className="mine__drop-down__check" />
              <span>Exit</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
          </div>
        </div>
        <div
          style={{ visibility: openOption === 'Help' ? 'visible' : 'hidden' }}
          className="mine__drop-down"
        >
          <div className="mine__drop-down__title">Help</div>
          <div className="mine__drop-down__menu">
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">Contents</div>
              <span className="mine__drop-down__hot-key">F1</span>
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">Search for Help on...</div>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">Using Help</div>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">About Minesweeper...</div>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
          </div>
        </div>
      </div>
      <div className="mine__top-bar">
        <div
          onMouseDown={() => setOpenOption('Game')}
          onMouseOver={() => hoverOption('Game')}
          className="mine__top-bar__text"
        >
          Game
        </div>
        <div
          onMouseDown={() => setOpenOption('Help')}
          onMouseOver={() => hoverOption('Help')}
          className="mine__top-bar__text"
        >
          Help
        </div>
      </div>
      <section className="mine__content" onMouseDown={onMouseDownContent}>
        <div className="mine__score-bar">
          <div className="mine__digits__outer">
            {renderDigits(remainMines())}
          </div>
          <div className="mine__face__outer">
            <button ref={face} className="mine__face" onClick={() => onReset()}>
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
function getTextImg(index) {
  return [empty, open1, open2, open3, open4, open5, open6, open7, open8][index];
}
function Ceils({ ceils }) {
  function renderContent(ceil) {
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

  return ceils.map((ceil, index) => (
    <div key={index} className="mine__ceil">
      {renderContent(ceil)}
    </div>
  ));
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
const MinesAround = ({ mines }) => (
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

export default styled(MineSweeperView)`
  img {
    pointer-events: none;
  }
  .mine__drop-downs {
    position: absolute;
    display: flex;
    height: 20px;
  }
  .mine__drop-down {
    position: relative;
    z-index: 1;
  }
  .mine__drop-down__title {
    padding: 0 5px;
    height: 100%;
    line-height: 20px;
    font-size: 11px;
    color: white;
    background-color: #1660e8;
  }
  .mine__drop-down__menu {
    background-color: white;
    position: absolute;
    box-shadow: 2px 2px 1px rgb(100, 100, 100);
    border: 1px solid gray;
    padding: 2px;
    display: grid;
    grid-template-columns: 18px auto auto 15px;
    line-height: 18px;
    font-size: 11px;
  }
  .mine__drop-down__row {
    display: contents;
    &:hover > * {
      background: #e99f17;
      filter: invert(100%);
    }
  }
  .mine__drop-down__separator {
    grid-column: 1 / 5;
    height: 1px;
    background-color: gray;
    margin: 3px 1px;
  }
  .mine__drop-down__check {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mine__drop-down__arrow {
  }
  .mine__drop-down__hot-key {
    padding-left: 5px;
  }
  .mine__drop-down__text {
    white-space: nowrap;
  }
  .mine__top-bar {
    position: relative;
    display: flex;
    height: 20px;
    background-color: rgb(236, 233, 216);
  }
  .mine__top-bar__text {
    padding: 0 5px;
    height: 100%;
    line-height: 20px;
    font-size: 11px;
    &:hover {
      color: white;
      background-color: #084fd2;
    }
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
    grid-template-columns: repeat(${({ columns }) => columns}, 16px);
    grid-template-rows: repeat(${({ rows }) => rows}, 16px);
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
