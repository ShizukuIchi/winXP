import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import numberDown from '../../assets/properties/displayProperties/icons/numberDown.png';

function NumberInput({ defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [upMouseClickStyle, setUpMouseClickStyle] = useState({});
  const [downMouseClickStyle, setDownMouseClickStyle] = useState({});

  const inputRef = useRef(null);

  const handleValueStepper = action => {
    if (inputValue > 1) setInputValue(prev => +prev + action);
    else if (action === -1 || inputValue < 1) setInputValue(1);
    else setInputValue(2);
    setTimeout(() => {
      inputRef.current.select();
    }, 0);
  };

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') {
      setDownMouseClickStyle({
        boxShadow: 'inset 2px 4px 4px 1px rgb(85 108 165 / 56%)',
      });
      if (inputValue < 3) setInputValue(2);
    }
    if (e.key === 'ArrowUp') {
      setUpMouseClickStyle({
        boxShadow: 'inset -2px -4px 4px 1px rgb(85 108 165 / 56%)',
      });
      if (inputValue < 0) setInputValue(1);
    }
  };

  const handleKeyUp = () => {
    setUpMouseClickStyle({});
    setDownMouseClickStyle({});
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
        onChange={e => setInputValue(e.target.value)}
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
    font-size: 12px;
    margin-left: 32px;
    margin-top: 6px;
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
    top: 36px;
    left: 64px;
    width: 15px;
    height: 9px;
    transform: rotate(180deg);
    background-image: url(${numberDown});
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
    top: 44.5px;
    left: 64px;
    width: 15px;
    height: 9px;
    background-image: url(${numberDown});
    &:hover {
      filter: brightness(1.07);
    }
  }
`;

export default NumberInput;
