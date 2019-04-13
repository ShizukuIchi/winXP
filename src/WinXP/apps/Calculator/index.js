import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { WindowDropdown } from 'src/components';
import dropDownData from './dropDownData';

export default function Calculator({ onClose }) {
  const dropDown = useRef(null);
  const [openOption, setOpenOption] = useState('');
  const [currentValue, setCurrentValue] = useState('0');

  function hoverOption(option) {
    if (openOption) setOpenOption(option);
  }
  function onMouseUp(e) {
    if (!dropDown.current.contains(e.target)) setOpenOption('');
  }
  function onClickOptionItem(item) {
    switch (item) {
      default:
    }
    setOpenOption('');
  }
  function onReset(e) {
    setCurrentValue('0');
  }
  function onClickNumber(e) {
    if (currentValue === '0') {
      setCurrentValue(`${e.target.innerText}`);
      return;
    }
    setCurrentValue(`${currentValue}${e.target.innerText}`);
  }
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <Div>
      <section className="cl__toolbar">
        <div className="cl__toolbar__drop-downs" ref={dropDown}>
          {'Edit,View,Help'.split(',').map(name => (
            <div
              className={`cl__toolbar__drop-down${
                openOption === name ? '--active' : ''
              }`}
              key={name}
            >
              <div className="cl__toolbar__drop-down__label">{name}</div>
              {openOption === name && (
                <WindowDropdown
                  onClick={onClickOptionItem}
                  items={dropDownData[name]}
                  position={{ top: '20px', left: '0' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="cl__toolbar__options">
          {'Edit,View,Help'.split(',').map(name => (
            <div
              key={name}
              onMouseDown={() => {
                setOpenOption(name);
              }}
              onMouseEnter={() => hoverOption(name)}
              className="cl__toolbar__option"
            >
              {name}
            </div>
          ))}
        </div>
      </section>
      <section>
        <div>
          <input class="cl__input" type="text" value={currentValue} />
        </div>
        <div class="cl__mem_buttons">
          <button class="cl__mem__status_button" disabled></button>
          <button class="cl__red">MC</button>
          <button class="cl__red">MR</button>
          <button class="cl__red">MS</button>
          <button class="cl__red">M+</button>
        </div>
        <div class="cl__control_buttons">
          <div class="cl__buttons__top">
            <button class="cl__red">Backspace</button>
            <button class="cl__red">CE</button>
            <button class="cl__red" onClick={onReset}>C</button>
          </div>
          <div class="cl__buttons__bottom">
            <button class="cl__blue" onClick={onClickNumber}>7</button>
            <button class="cl__blue" onClick={onClickNumber}>8</button>
            <button class="cl__blue" onClick={onClickNumber}>9</button>
            <button class="cl__red">/</button>
            <button class="cl__blue">srqt</button>
            <button class="cl__blue" onClick={onClickNumber}>4</button>
            <button class="cl__blue" onClick={onClickNumber}>5</button>
            <button class="cl__blue" onClick={onClickNumber}>6</button>
            <button class="cl__red">*</button>
            <button class="cl__blue">%</button>
            <button class="cl__blue" onClick={onClickNumber}>1</button>
            <button class="cl__blue" onClick={onClickNumber}>2</button>
            <button class="cl__blue" onClick={onClickNumber}>3</button>
            <button class="cl__red">-</button>
            <button class="cl__blue">1/x</button>
            <button class="cl__blue" onClick={onClickNumber}>0</button>
            <button class="cl__blue">+/-</button>
            <button class="cl__blue">.</button>
            <button class="cl__red">+</button>
            <button class="cl__red">=</button>
          </div>
        </div>
      </section>
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .cl__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
  .cl__toolbar__drop-downs {
    display: flex;
    height: 100%;
    position: absolute;
    border-bottom: 1px solid transparent;
  }
  .cl__toolbar__drop-down {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    background-color: #1660e8;
    position: relative;
    visibility: hidden;
  }
  .cl__toolbar__drop-down--active {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    visibility: visible;
    z-index: 1;
    background-color: #1660e8;
    position: relative;
  }
  .cl__toolbar__drop-down__label {
    padding: 0 7px;
    color: #fff;
  }
  .cl__toolbar__options {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }
  .cl__toolbar__option {
    font-size: 11px;
    line-height: 20px;
    height: 100%;
    padding: 0 7px;
    &:hover {
      background-color: #1660e8;
      color: #fff;
    }
  }
  .cl__input {
    width: calc(100% - 22px);
    height: 22px;
    margin: 3px 11px 13px;
    text-align: right;
    padding: 4px 6px;
  }
  button {
    background: #f2f3ed;
    border: 1px solid black;
    text-align: center;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #285a88;
    height: 28px;
  }
  .cl__blue {
    color: #2222ff;
  }
  .cl__red {
    color: #fd1e1e;
  }
  .cl__mem__status_button {
    border-radius: 0;
    width: 25px;
    height: 25px;
  }
  .cl__mem_buttons {
    width: 35px;
    float: left;
    margin: 0 10px 10px;
    button {
      width: 100%;
      margin-bottom: 6px;
    }
  }
  .cl__buttons__top {
    width: 190px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    button {
      width: 60px;
    }
  }
  .cl__buttons__bottom {
    display: flex;
    flex-wrap: wrap;
    button {
      width: 32px;
      height: 25px;
      margin-bottom: 8px;
      margin: 0px 0px 5px 5px;
    }
  }
`;
