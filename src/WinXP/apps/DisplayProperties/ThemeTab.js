import React, { useState } from 'react';
import styled from 'styled-components';

import BackgroundView from '../../../components/BackgroundView';
import Button from '../../../components/Button';

import arrowDown from '../../../assets/properties/displayProperties/icons/arrowDown.png';
import classicXP from '../../../assets/properties/displayProperties/classic-xp.png';
import windowImage from '../../../assets/properties/displayProperties/window-image.png';
import trashImage from '../../../assets/properties/displayProperties/trash-image.png';

import { getLocalStorage } from '../../utils';
import { DESKTOP, defaultDesktop } from './utils';

function ThemeTab({ state, dispatch }) {
  const [preview, setPreview] = useState(null);

  const handleSelectChange = e => {
    const { value } = e.target;

    switch (value) {
      case classicXP:
        setPreview(classicXP);
        break;
      case 'current':
        setPreview(null);
        const displayProps = getLocalStorage('displayProperties');

        dispatch({
          type: DESKTOP,
          payload: displayProps ? displayProps.desktop : defaultDesktop,
        });
        break;
      case 'xp':
        setPreview(null);
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
        <p>to help you personalize your computer with one click.</p>
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
          <Button
            style={{
              marginLeft: 4,
              width: 78,
            }}
          >
            Save As...
          </Button>
          <Button
            style={{
              marginLeft: 4,
              width: 78,
            }}
            disabled
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="sample">
        <p>Sample:</p>
        <div className="preview">
          <div className="background">
            {preview ? (
              <img className="background" src={classicXP} alt="classic" />
            ) : (
              <BackgroundView background={state.displayProperties.desktop} />
            )}
          </div>
          {!preview && (
            <>
              <img className="window-image" src={windowImage} alt="window" />
              <img className="trash-image" src={trashImage} alt="trash" />
            </>
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
      &:focus {
        color: #fff;
        background-color: #2f71cd;
        box-shadow: 0px 0px 0px 2px #fff inset;
        outline: none;
      }
    }
  }

  .sample {
    margin-top: 20px;

    .preview {
      position: relative;
      margin-top: 5px;
      height: 230px;

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-shadow: -0.5px -0.5px 1.5px 1px #262626;
      }

      .background {
        height: 100%;
        width: 100%;
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
