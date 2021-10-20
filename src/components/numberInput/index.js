import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import numberDown from '../../assets/properties/displayProperties/icons/numberDown.png';

function NumberInput({ defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [upMouseClickStyle, setUpMouseClickStyle] = useState({});
  const [downMouseClickStyle, setDownMouseClickStyle] = useState({});

  const inputRef = useRef(null);

  const handleValueStepper = action => {
    const nextValue = +inputValue + action;
    checkAndSetInput(nextValue);
    setTimeout(() => {
      inputRef.current.select();
    }, 0);
  };

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') {
      setDownMouseClickStyle({
        boxShadow: 'inset 2px 4px 4px 1px rgb(85 108 165 / 56%)',
      });
    }
    if (e.key === 'ArrowUp') {
      setUpMouseClickStyle({
        boxShadow: 'inset -2px -4px 4px 1px rgb(85 108 165 / 56%)',
      });
    }
  };

  const handleKeyUp = () => {
    setUpMouseClickStyle({});
    setDownMouseClickStyle({});
  };

  const checkAndSetInput = value => {
    if (!(value < 1 || value > 9999)) setInputValue(value);
  };

  return (
    <StyledNumberInput>
      <button
        type="button"
        className="arrowUp"
        onClick={() => handleValueStepper(1)}
        onMouseDown={() =>
          setUpMouseClickStyle({
            boxShadow: 'inset -2px -4px 4px 1px rgb(85 108 165 / 56%)',
          })
        }
        onMouseUp={() => setUpMouseClickStyle({})}
        onMouseOut={() => setUpMouseClickStyle({})}
        style={upMouseClickStyle}
      />
      <button
        type="button"
        className="arrowDown"
        onClick={() => handleValueStepper(-1)}
        onMouseDown={() =>
          setDownMouseClickStyle({
            boxShadow: 'inset 2px 4px 4px 1px rgb(85 108 165 / 56%)',
          })
        }
        onMouseUp={() => setDownMouseClickStyle({})}
        onMouseOut={() => setDownMouseClickStyle({})}
        style={downMouseClickStyle}
      />
      <input
        type="number"
        className="numberInput"
        ref={inputRef}
        value={inputValue}
        onChange={e => checkAndSetInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={e => e.target.select()}
      />
    </StyledNumberInput>
  );
}

const StyledNumberInput = styled.div`
  .numberInput {
    border-radius: 0;
    border-color: grey;
    border: 1px solid grey;
    font-size: 13px;
    width: 49px;
    height: 21px;
    padding-bottom: 2px;
    padding-right: 2px;
    text-align: right;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    -webkit-appearance: none;
    &:focus {
      outline: transparent;
    }
    &::selection {
      background: #2f71cd;
      color: white;
    }
  }

  .arrowUp {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    position: absolute;
    top: 38px;
    left: 69px;
    width: 15px;
    height: 9px;
    transform: rotate(180deg);
    background-image: url(${numberDown});
    z-index: 1;
    &:hover {
      filter: brightness(1.07);
    }
  }

  .arrowDown {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    position: absolute;
    position: absolute;
    top: 46.5px;
    left: 69px;
    width: 15px;
    height: 9px;
    background-image: url(${numberDown});
    z-index: 1;
    &:hover {
      filter: brightness(1.07);
    }
  }
`;

export default NumberInput;
