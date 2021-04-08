import React from 'react';
import styled from 'styled-components';

import arrowDown from '../../../assets/properties/displayProperties/icons/arrowDown.png';
import BackgroundView from '../../../components/BackgroundView';
import windowImage from '../../../assets/properties/displayProperties/window-image.png';
import trashImage from '../../../assets/properties/displayProperties/trash-image.png';

function ThemeTab({ state: { desktop } }) {
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
          <div className="background">
            <BackgroundView background={desktop} />
          </div>
          <img className="window-image" src={windowImage} alt="window" />
          <img className="trash-image" src={trashImage} alt="trash" />
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
    margin-top: 20px;

    .preview {
      position: relative;
      margin-top: 5px;
      height: 230px;
      box-shadow: 0px 0px 3px 1px grey inset;

      .background {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .window-image {
        position: absolute;
        top: 35px;
        left: 35px;
        width: 215px;
      }

      .trash-image {
        position: absolute;
        top: 190px;
        left: 295px;
        width: 35px;
      }
    }
  }
`;

export default ThemeTab;
