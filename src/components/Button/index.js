import React from 'react';
import styled from 'styled-components';

function Button({
  style,
  children,
  disabled,
  onClick,
  width = 70,
  marginRight,
  marginLeft,
}) {
  return (
    <StyledButton
      style={style}
      onClick={onClick}
      className={disabled ? 'disabled' : ''}
      width={width}
      marginRight={marginRight}
      marginLeft={marginLeft}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${({ fontSize, width, marginRight, marginLeft }) => {
    return `
        all: unset;
        width: ${width}px;
        text-align: center;
        line-height: 1.2;
        background-color: #f5f5f5;
        border: 1px solid grey;
        border-radius: 3px;
        margin-right: ${marginRight}px;
        margin-left: ${marginLeft}px;

        &:hover {
            background-color: #e5e5e5;
            border-color: black;
        }

        &:focus {
            box-shadow: inset 0px 0px 0.5px 1.5px rgba(100, 160, 255, 0.5);
        }

        &.disabled {
            pointer-events: none;
            color: grey;
            background-color: #e9e9e9;
            opacity: 0.5;
        }
    `;
  }}
`;

export default Button;
