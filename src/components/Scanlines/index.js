import React from 'react';
import styled, { keyframes } from 'styled-components';

// Only 0% is declared on purpose. The browser synthesizes 100% from the
// element's resting style, so each animation runs back to its natural state.
const roll = keyframes`
  0% {
    transform: translate3d(0, 200000%, 0);
  }
`;

const flicker = keyframes`
  0% {
    background-position: 0 50%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2147483646;
  overflow: hidden;
  pointer-events: none;

  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    pointer-events: none;
  }

  /* the single bar that rolls up the screen */
  &:before {
    width: 100%;
    height: 1.1px;
    z-index: 2;
    background: rgba(0, 0, 0, 0.1);
    animation: ${roll} 6s linear infinite;
  }

  /* the fixed stripe texture */
  &:after {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 51%
    );
    background-size: 100% 2.2px;
    animation: ${flicker} 1s steps(50) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &:before {
      display: none;
    }
    &:after {
      animation: none;
    }
  }
`;

function Scanlines({ enabled = true }) {
  if (!enabled) return null;
  return <Overlay />;
}

export default Scanlines;
