import React from 'react';
import styled from 'styled-components';

function Button(props) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  all: unset;
  font-size: 14px;
  text-align: center;
  line-height: 1.2;
  height: 20px;
  width: 70px;
  background-color: #f5f5f5;
  border: 1px solid grey;
  border-radius: 3px;

  &:hover {
    border-color: black;
    box-shadow: inset 0px 0px 0.5px 1.5px rgba(200, 100, 100, 0.5);
  }

  &:focus {
    box-shadow: inset 0px 0px 0.5px 1.5px rgba(100, 160, 255, 0.5);
  }

  &:disabled {
    pointer-events: none;
    color: rgba(128, 128, 128, 0.5);
    background-color: rgba(233, 233, 233, 0.5);
    border: 1px solid rgba(128, 128, 128, 0.5);
  }
`;

export default Button;
