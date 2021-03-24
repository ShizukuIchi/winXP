import React, { useState } from 'react';
import styled from 'styled-components';

import iconNone from '../../../assets/properties/displayProperties/icons/none.png';
import iconImage from '../../../assets/properties/displayProperties/icons/image.png';
import display from '../../../assets/properties/displayProperties/display.png';
import defaultBackground from '../../../assets/properties/displayProperties/backgrounds/default.jpg';
import reallyGood from '../../../assets/properties/displayProperties/backgrounds/really-good.png';

const backgrounds = [
  { id: 1, title: '(None)' },
  { id: 2, title: 'Ascent', background: defaultBackground },
  { id: 3, title: 'Really Good', background: reallyGood },
  { id: 4, title: 'Azul' },
  { id: 5, title: 'Bliss' },
  { id: 6, title: 'Blue Lace 16' },
  { id: 7, title: 'Coffee Day' },
];

function DesktopTab() {
  const [activeLi, setActiveLi] = useState(1);
  const [showColor, setShowColor] = useState(true);
  const [overlayColor, setOverlayColor] = useState('#2f71cd');
  const [overlayImage, setOverlayImage] = useState(null);
  const [imagePosition, setImagePosition] = useState('fill');
  const [disablePosition, setDisablePosition] = useState(true);

  const handleClick = (e, id, background) => {
    setActiveLi(id);

    if (e.target.innerText === '(None)') {
      setShowColor(true);
      setDisablePosition(true);
    } else {
      setDisablePosition(false);
      setShowColor(false);
      setOverlayImage(background);
    }
  };

  const handleColorChange = e => {
    setShowColor(true);
    setOverlayColor(e.target.value);
    setActiveLi(1);
    setDisablePosition(true);
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
              <label htmlFor="position">Position:</label>
              <select
                disabled={disablePosition}
                id="position"
                onChange={e => setImagePosition(e.target.value)}
              >
                <option value="fill">Fill</option>
                <option value="cover">Cover</option>
                <option value="contain">Fit</option>
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
    border: 1px solid blue;
    overflow-y: scroll;
    padding-left: 5px;

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
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 115px;

    & button,
    & select,
    & input {
      width: 80px;
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
