import React from 'react';
import styled from 'styled-components';

import arrowDown from 'assets/properties/displayProperties/icons/arrowDown.png';

function SelectInput({ options, cb, value, field, disabled }) {
  return (
    <StyledSelect className="select-wrapper">
      <img className="arrow-down" src={arrowDown} alt="arrow down" />
      <select
        disabled={disabled}
        value={value}
        onChange={e => cb(e.target.value, field)}
        onKeyPress={e => e.preventDefault()}
        autoFocus
      >
        {options.map(option => (
          <option value={option.value} key={option.label + option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </StyledSelect>
  );
}

const StyledSelect = styled.div`
  position: relative;
  display: inline-block;
  select {
    border-radius: 0;
    border-color: grey;
    font-size: 12px;
    width: 167px;
    height: 22px;
    &:focus {
      color: #fff;
      background-color: #2f71cd;
      box-shadow: inset 0px 0px 0px 2px #fff;
      outline: none;
    }
  }

  .arrow-down {
    position: absolute;
    right: 2px;
    top: 2px;
    width: 16px;
    height: 18px;
    pointer-events: none;
  }
`;

export default SelectInput;
