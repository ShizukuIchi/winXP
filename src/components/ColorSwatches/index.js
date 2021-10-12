import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

function ColorSwatches({
  currentColor,
  setDesktopState,
  setOpenColorSwatches,
}) {
  const [customColor, setCustomColor] = useState(false);
  const [highlighted, setHighlighted] = useState(currentColor);

  const colorsArray = [
    ['#ffffff', '#fa0000', '#00fc00', '#0602fd', '#bddbc3'],
    ['#000000', '#7c0001', '#027f00', '#040078', '#a3c9ee'],
    ['#bfbfc1', '#fcfb09', '#00fcfd', '#fd06f5', '#fcf9f0'],
    ['#818181', '#7f7e09', '#03807a', '#641c5c', '#a2a1a7'],
  ];

  useEffect(() => {
    const isSystemColor = checkIfSystemColor(currentColor, colorsArray);
    setCustomColor(isSystemColor ? false : currentColor);
  }, [currentColor, colorsArray]);

  const checkIfSystemColor = (colorToCheck, systemColors) => {
    let existSystemColor = false;
    for (const colorCode of systemColors) {
      if (colorCode.includes(colorToCheck)) existSystemColor = true;
    }
    return existSystemColor;
  };

  const handleColorSelect = selectedColor => {
    setDesktopState(prev => ({ ...prev, color: selectedColor }));
    setOpenColorSwatches(false);
  };

  return (
    <Swatches>
      <section className="inline-grid">
        {colorsArray.map(column => (
          <div key={column[0]}>
            {column.map(color => (
              <SampleBox
                onClick={() => handleColorSelect(color)}
                key={color}
                sampleColor={color}
                highlighted={color === highlighted}
                onMouseEnter={() => setHighlighted(color)}
              />
            ))}
          </div>
        ))}
      </section>
      <hr />
      <section className="inline-grid">
        <Button>
          <input
            type="color"
            className="customColorPicker"
            onChange={e => handleColorSelect(e.target.value)}
          />
          Other...
        </Button>
        <SampleBox
          hidden={!customColor}
          sampleColor={customColor}
          highlighted={customColor === highlighted}
          onMouseEnter={() => setHighlighted(customColor)}
          onClick={() => handleColorSelect(customColor)}
        />
      </section>
    </Swatches>
  );
}

const Swatches = styled.div`
  position: absolute;
  width: 95px;
  height: 153px;
  padding-left: 1px;
  background-color: rgb(236, 233, 218);
  box-sizing: border-box;
  outline: 1px outset white;
  -webkit-box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.75);

  & .customColorPicker {
    position: absolute;
    width: 61px !important;
    height: 18px;
    opacity: 0;
    left: 4px;
    bottom: 5px;
  }

  & .inline-grid {
    display: flex;
  }

  & hr {
    width: 88px;
    margin: -1px 0px 2px 2px;
  }
  & button {
    width: 63px !important;
    margin: 1px 2px 0px 2px;
  }
`;

const SampleBox = styled.div`
  display: ${props => (props.hidden ? 'none' : 'block')}
  width: 17px;
  height: 17px;
  background-color: ${props => props.sampleColor}
  -webkit-box-shadow: inset 2px 2px 2px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: inset 2px 2px 2px 0px rgba(0,0,0,0.5);
  inset 2px 2px 2px 0px rgba(0,0,0,0.5);
  margin: 3px 3px 7px 3px
  outline-offset: 1px;
  outline: 1px solid rgba(255,255,255,0.8);
  border-radius: 1px;
  ${props =>
    props.highlighted &&
    `
    outline-offset: -1px;
    outline: 3px double rgba(0,0,0,0.6);
    -webkit-box-shadow: inset 1px 2px 2px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: inset 1px 2px 2px 0px rgba(0,0,0,0.5);
    inset 1px 2px 2px 0px rgba(0,0,0,0.5);
    `}
`;

export default ColorSwatches;
