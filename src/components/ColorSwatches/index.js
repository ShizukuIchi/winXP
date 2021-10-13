import React, { useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import Button from 'components/Button';

function ColorSwatches({
  currentColor,
  setDesktopState,
  setOpenColorSwatches,
}) {
  const [customColor, setCustomColor] = useState(false);
  const [highlighted, setHighlighted] = useState(currentColor);
  ColorSwatches.handleClickOutside = () => setOpenColorSwatches(false);

  const colorsArray = [
    ['#ffffff', '#fa0000', '#00fc00', '#0602fd', '#bddbc3'],
    ['#000000', '#7c0001', '#027f00', '#040078', '#a3c9ee'],
    ['#bfbfc1', '#fcfb09', '#00fcfd', '#fd06f5', '#fcf9f0'],
    ['#818181', '#7f7e09', '#03807a', '#641c5c', '#a2a1a7'],
  ];

  useEffect(() => {
    const isSystemColor = colorsArray.flat().includes(currentColor);
    setCustomColor(isSystemColor ? false : currentColor);
  }, [currentColor, colorsArray]);

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
        {customColor && (
          <SampleBox
            sampleColor={customColor}
            highlighted={customColor === highlighted}
            onMouseEnter={() => setHighlighted(customColor)}
            onClick={() => handleColorSelect(customColor)}
          />
        )}
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
  box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.75);

  & .inline-grid {
    display: flex;
  }

  & hr {
    width: 88px;
    margin: -1px 0px 2px 2px;
  }

  &&& .customColorPicker {
    position: absolute;
    width: 61px;
    height: 18px;
    opacity: 0;
    left: 4px;
    bottom: 5px;
  }

  &&& button {
    width: 63px;
    margin: 1px 2px 0px 2px;
  }
`;

const SampleBox = styled.div`
  display: block;
  width: 17px;
  height: 17px;
  background-color: ${props => props.sampleColor};
  box-shadow: inset 2px 2px 2px 0px rgba(0, 0, 0, 0.5);
  margin: 3px 3px 7px 3px;
  outline-offset: 1px;
  outline: 1px solid rgba(255, 255, 255, 0.8);
  ${props =>
    props.highlighted &&
    `
    outline-offset: -1px;
    outline: 3px double rgba(0,0,0,0.6);
    box-shadow: inset 1px 2px 2px 0px rgba(0,0,0,0.5);
    `}
`;

const clickOutsideConfig = {
  handleClickOutside: () => ColorSwatches.handleClickOutside,
};

export default onClickOutside(ColorSwatches, clickOutsideConfig);
