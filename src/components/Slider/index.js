import React from 'react';
import styled from 'styled-components';

import sliderThumb from 'assets/sliderThumb.svg';

function Slider({ min, max, cb, field, value }) {
  return (
    <StyledSlider className="select-wrapper" sliderThumb={sliderThumb}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => cb(parseInt(e.target.value), field)}
      />
    </StyledSlider>
  );
}

const StyledSlider = styled.div`
  /* Hide slider first */
  input[type='range'] {
    -webkit-appearance: none;
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-ms-track {
    width: 100%;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  /// CSS properties taken from: https://botoxparty.github.io/XP.css/#slider
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    box-sizing: border-box;
    background: #ecebe4;
    border-right: 1px solid #f3f2ea;
    border-bottom: 1px solid #f3f2ea;
    border-radius: 2px;
    box-shadow: 1px 0 0 #fff, 1px 1px 0 #fff, 0 1px 0 #fff, -1px 0 0 #9d9c99,
      -1px -1px 0 #9d9c99, 0 -1px 0 #9d9c99, -1px 1px 0 #fff, 1px -1px #9d9c99;
  }

  input[type='range']::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #f9f9f5;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  input[type='range']::-webkit-slider-thumb {
    height: 21px;
    width: 11px;
    transform: translateY(-8px);
    ${({ sliderThumb }) => {
      return `
      background-image: url(${sliderThumb});
     
    `;
    }}
  }
`;

export default Slider;
