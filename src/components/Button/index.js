import React from 'react';
import styled from 'styled-components';

function Button({
  style,
  children,
  disabled,
  onClick,
  width,
  height,
  marginRight,
  marginLeft,
  fontSize,
}) {
  return (
    <StyledButton
      style={style}
      onClick={onClick}
      className={disabled ? 'disabled' : ''}
      width={width}
      marginRight={marginRight}
      marginLeft={marginLeft}
      fontSize={fontSize}
      height={height}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${({ fontSize, width, height, marginRight, marginLeft }) => {
    return `
        all: unset;
        font-size: ${fontSize}px;
        height: ${height}px;
        width: ${width}px;
        text-align: center;
        line-height: 1.2;
        background-color: #f5f5f5;
        border: 1px solid grey;
        border-radius: 3px;
        margin-right: ${marginRight}px;
        margin-left: ${marginLeft}px;

        &:hover {
            border-color: black;
            box-shadow: inset 0px 0px 0.5px 1.5px rgba(200, 100, 100, 0.5);
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
