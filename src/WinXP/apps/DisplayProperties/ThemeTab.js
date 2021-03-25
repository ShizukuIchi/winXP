import React from 'react';
import styled from 'styled-components';

import preview from '../../../assets/properties/displayProperties/preview.png';
import arrowDown from '../../../assets/properties/displayProperties/icons/arrowDown.png';

function ThemeTab() {
  return (
    <ThemesPage>
      <div className="description">
        <p>
          A theme is a background plus a set of sounds, icons and other elements
        </p>
        <p> to help you personalize your computer with one click.</p>
      </div>
      <div className="theme">
        <div className="options">
          <img className="arrow-down" src={arrowDown} alt="arrow down" />
          <label className="label" htmlFor="theme-picker">
            Theme:
          </label>
          <select className="select" id="theme-picker">
            <option value="Windows-xp">Windows XP</option>
            <option value="pink">Pink</option>
          </select>
        </div>
        <div className="buttons">
          <button>Save As...</button>
          <button>Delete</button>
        </div>
      </div>
      <div className="sample">
        <p>Sample:</p>
        <div className="preview">
          <img src={preview} alt="preview" />
        </div>
      </div>
    </ThemesPage>
  );
}

const ThemesPage = styled.div`
  font-size: 10px;

  .theme {
    margin-top: 15px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .label {
    display: block;
  }

  .options {
    position: relative;

    & .arrow-down {
      position: absolute;
      left: 163px;
      top: 18px;
      width: 16px;
      pointer-events: none;
    }

    & .select {
      margin-top: 5px;
      width: 180px;
      border-radius: 0;
      border-color: grey;
    }
  }

  & .buttons {
    button {
      width: 80px;
    }

    button:first-child {
      margin-right: 4px;
    }
  }

  .sample {
    margin-top: 15px;

    .preview {
      margin-top: 5px;
      height: 2px;
      height: 235px;

      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
  }
`;

export default ThemeTab;
