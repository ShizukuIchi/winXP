import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import numberDown from './numberDown.png';

function NumberInput(props) {
  const { value, onChange, min = 1, max = 9999, disabled } = props;
  const [inputValue, setInputValue] = useState(value);
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
    if (!(value < min || value > max)) {
      setInputValue(value);
      onChange(value);
    }
  };

  return (
    <StyledNumberInput {...props}>
      <StyledArrow
        type="button"
        onClick={() => handleValueStepper(1)}
        onMouseDown={() =>
          setUpMouseClickStyle({
            boxShadow: 'inset -2px -4px 4px 1px rgb(85 108 165 / 56%)',
          })
        }
        onMouseUp={() => setUpMouseClickStyle({})}
        onMouseOut={() => setUpMouseClickStyle({})}
        style={upMouseClickStyle}
        disabled={disabled}
        up
      />
      <StyledArrow
        type="button"
        onClick={() => handleValueStepper(-1)}
        onMouseDown={() =>
          setDownMouseClickStyle({
            boxShadow: 'inset 2px 4px 4px 1px rgb(85 108 165 / 56%)',
          })
        }
        onMouseUp={() => setDownMouseClickStyle({})}
        onMouseOut={() => setDownMouseClickStyle({})}
        style={downMouseClickStyle}
        disabled={disabled}
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
        disabled={disabled}
      />
    </StyledNumberInput>
  );
}

const StyledNumberInput = styled.div`
  .numberInput {
    border-radius: 0;
    border: 1px solid gray;
    font-size: 13px;
    width: 49px;
    height: 21px;
    padding-bottom: 2px;
    padding-right: 2px;
    text-align: right;
    &:focus {
      outline: transparent;
    }
    &:disabled {
      color: #adaa9c;
    }
    &::selection {
      background: #2f71cd;
      color: white;
    }
  }
`;

const StyledArrow = styled.button`
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  top: 46px;
  left: 69px;
  width: 15px;
  height: 9px;
  background-image: url(${numberDown});
  z-index: 1;
  ${props =>
    props.up &&
    `
   transform: rotate(180deg);
   top: 38px;
   `}

  &:hover {
    filter: brightness(1.07);
  }

  &:disabled {
    filter: grayscale(100%);
    opacity: 0.3;
  }
`;

export default NumberInput;
