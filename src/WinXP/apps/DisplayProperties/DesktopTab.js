import React, { useState } from 'react';
import styled from 'styled-components';

import arrowDown from '../../../assets/properties/displayProperties/icons/arrowDown.png';
import iconNone from '../../../assets/properties/displayProperties/icons/none.png';
import iconImage from '../../../assets/properties/displayProperties/icons/image.png';
import display from '../../../assets/properties/displayProperties/display.png';
import bliss from '../../../assets/properties/displayProperties/backgrounds/bliss.jpeg';
import reallyGood from '../../../assets/properties/displayProperties/backgrounds/really-good.png';
import autumn from '../../../assets/properties/displayProperties/backgrounds/autumn.jpeg';
import azul from '../../../assets/properties/displayProperties/backgrounds/azul.jpeg';
import ascent from '../../../assets/properties/displayProperties/backgrounds/ascent.jpeg';
import blueLace from '../../../assets/properties/displayProperties/backgrounds/blue-lace-16.jpeg';
import crystal from '../../../assets/properties/displayProperties/backgrounds/crystal.jpeg';
import follow from '../../../assets/properties/displayProperties/backgrounds/follow.jpeg';
import coffeeBean from '../../../assets/properties/displayProperties/backgrounds/coffee-bean.jpeg';

const backgrounds = [
  { id: 1, title: '(None)' },
  { id: 2, title: 'Really Good', background: reallyGood },
  { id: 3, title: 'Ascent', background: ascent },
  { id: 4, title: 'Autumn', background: autumn },
  { id: 5, title: 'Azul', background: azul },
  { id: 6, title: 'Bliss', background: bliss },
  { id: 7, title: 'Blue Lace 16', background: blueLace },
  { id: 8, title: 'Coffee Bean', background: coffeeBean },
  { id: 9, title: 'Follow', background: follow },
  { id: 10, title: 'Crystal', background: crystal },
];

function DesktopTab({ state, dispatch }) {
  const [activeLi, setActiveLi] = useState(5);
  const [showColor, setShowColor] = useState(false);
  const [overlayColor, setOverlayColor] = useState('#2f71cd');
  const [overlayImage, setOverlayImage] = useState(bliss);
  const [imagePosition, setImagePosition] = useState('fill');
  const [disablePosition, setDisablePosition] = useState(false);

  // TODO: Convert this all handle function to one function that dispaches every change to DisplayProperties state
  const handleClick = (e, id, background) => {
    setActiveLi(id);

    if (e.target.innerText === '(None)') {
      setDisablePosition(true);
      setShowColor(true);
      setOverlayImage(null);
      dispatch({
        type: 'DESKTOP',
        payload: { type: 'color', background: overlayColor },
      });
      return;
    }
    setDisablePosition(false);
    setShowColor(false);
    setOverlayImage(background);

    dispatch({
      type: 'DESKTOP',
      payload: { type: 'url', size: imagePosition, background: background },
    });
  };

  const handleChange = e => {
    setImagePosition(e.target.value);
    dispatch({
      type: 'DESKTOP',
      payload: { size: imagePosition },
    });
  };

  const handleColorChange = e => {
    setShowColor(true);
    setOverlayColor(e.target.value);
    setActiveLi(1);
    setDisablePosition(true);
    dispatch({
      type: 'DESKTOP',
      payload: { type: 'color', background: overlayColor },
    });
  };

  return (
    <Desktop>
      <div className="preview">
        <img src={display} alt="display" />
        {showColor && (
          <div
            className="display-overlay color"
            style={{ backgroundColor: overlayColor }}
          />
        )}
        <img
          src={overlayImage}
          className="display-overlay"
          alt="background"
          style={{ objectFit: imagePosition, backgroundColor: overlayColor }}
        />
      </div>
      <div className="settings">
        <div>Background:</div>
        <div className="preferences">
          <div className="List">
            <ul>
              {backgrounds.map(({ title, id, background }) => (
                <li key={id}>
                  <img
                    className="icon"
                    src={id === 1 ? iconNone : iconImage}
                    alt="icon"
                  />
                  <span
                    className={activeLi === id ? 'active' : ''}
                    onClick={e => handleClick(e, id, background)}
                  >
                    {title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="options">
            <button>Browse...</button>
            <div>
              <img className="arrow-down" src={arrowDown} alt="arrow down" />
              <label htmlFor="position">Position:</label>
              <select
                disabled={disablePosition}
                id="position"
                onChange={handleChange}
              >
                <option value="fill">Stretch</option>
                <option value="contain">Fill</option>
                <option value="cover">Fit</option>
              </select>
            </div>
            <div>
              <label htmlFor="color">Color:</label>
              <input
                id="color"
                type="color"
                onChange={e => handleColorChange(e)}
                value={overlayColor}
              />
            </div>
          </div>
        </div>
        <button className="customize-button">Customize Desktop...</button>
      </div>
    </Desktop>
  );
}

const Desktop = styled.div`
  .preview {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 10px 0;

    & .display-overlay {
      position: absolute;
      top: 17px;
      left: 88px;
      width: 170px;
      height: 118px;
      background-color: #2f71cd;
    }

    & .color {
      z-index: 1;
    }
  }

  .preferences {
    display: flex;
    flex-direction: row;
    margin: 4px 0;
  }

  .List {
    flex-grow: 10;
    height: 111px;
    border: 1px solid #9b9b9b;
    overflow-y: scroll;
    padding-left: 5px;
    background-color: #fff;

    & li {
      display: flex;
    }

    & .icon {
      height: 17px;
    }

    & span {
      font-size: 12px;
      width: max-content;
      padding: 0 2px;
    }

    & .active {
      color: #fff;
      background-color: #2f71cd;
      border: 1px dotted grey;
    }
  }
  .options {
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 115px;
    font-size: 13px;

    & button,
    & select,
    & input {
      width: 80px;
    }

    .arrow-down {
      position: absolute;
      left: 70px;
      top: 48px;
      width: 16px;
      pointer-events: none;
    }

    & #position {
      border-radius: 0;
      border-color: grey;
    }

    & #color {
      position: relative;
      padding: 0 16px 0 2px;
      border-radius: 4px;
      height: 22px;

      &:before {
        content: '';
        position: absolute;
        top: 3px;
        right: 13px;
        width: 1px;
        height: 15px;
        background-color: darkgray;
      }

      &:after {
        content: '';
        position: absolute;
        top: 8px;
        right: 3px;
        border: 3.5px solid transparent;
        border-top-color: currentColor;
      }
    }

    & label {
      display: block;
    }
  }
  .customize-button {
    padding: 2px 9px;
  }
`;

export default DesktopTab;
