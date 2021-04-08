import React, { useState } from 'react';
import styled from 'styled-components';

import BackgroundView from '../../../components/BackgroundView';

import arrowDown from '../../../assets/properties/displayProperties/icons/arrowDown.png';
import classicXP from '../../../assets/properties/displayProperties/classic-xp.png';
import windowImage from '../../../assets/properties/displayProperties/window-image.png';
import trashImage from '../../../assets/properties/displayProperties/trash-image.png';

import { getLocalStorage } from '../../utils';
import { DESKTOP } from './utils';

const defaultDesktop = {
  id: 5,
  position: 'stretch',
  image: '/static/media/bliss.bf876f9a.jpeg',
  color: '#2f71cd',
};

function ThemeTab({ state, dispatch }) {
  const [preview, setpreview] = useState(null);

  const handleSelectChange = e => {
    const { value } = e.target;

    switch (value) {
      case classicXP:
        setpreview(classicXP);
        break;
      case 'current':
        setpreview(null);
        const displayProps = getLocalStorage('display properties');

        dispatch({
          type: DESKTOP,
          payload: displayProps ? displayProps.desktop : defaultDesktop,
        });
        break;
      case 'xp':
        setpreview(null);
        dispatch({ type: DESKTOP, payload: defaultDesktop });
        break;
      default:
        break;
    }
  };

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
          <select
            className="select"
            id="theme-picker"
            onChange={handleSelectChange}
          >
            {state.hasChanges && (
              <option value="current">Windows XP (Modified)</option>
            )}
            <option value="current">My Current Theme</option>
            <option value="xp">Windows XP</option>
            <option value={classicXP}>Windows Classic</option>
            <option value="more">More themes online...</option>
            <option value="browse">Browse...</option>
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
            {preview && (
              <img className="background" src={classicXP} alt="classic" />
            )}
            <BackgroundView background={state.displayProperties.desktop} />
          </div>
          {!preview && (
            <img className="window-image" src={windowImage} alt="window" />
          )}
          {!preview && (
            <img className="trash-image" src={trashImage} alt="trash" />
          )}
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
        top: 185px;
        left: 295px;
        width: 33px;
      }
    }
  }
`;

export default ThemeTab;
