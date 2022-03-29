import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import BackgroundView from 'components/BackgroundView';
import Button from 'components/Button';

import SelectInput from 'components/SelectInput';
import classicXP from 'assets/properties/displayProperties/classic-xp.png';
import windowImage from 'assets/properties/displayProperties/window-image.png';
import trashImage from 'assets/properties/displayProperties/trash-image.png';

import { getLocalStorage } from '../../utils';
import { DESKTOP, defaultDesktop } from './utils';

function ThemeTab({ state, dispatch }) {
  const [preview, setPreview] = useState(null);

  const themeOptions = useMemo(() => {
    let options = [
      { value: 'current', label: 'My Current Theme' },
      { value: 'xp', label: 'Windows XP' },
      { value: 'classicXP', label: 'Windows Classic' },
      { value: 'more', label: 'More themes online...' },
      { value: 'browse', label: 'Browse...' },
    ];

    if (state.hasChanges) {
      options = [
        { value: 'current', label: 'Windows XP (Modified)' },
        ...options,
      ];
    }
    return options;
  }, [state.hasChanges]);

  const handleSelectChange = value => {
    switch (value) {
      case 'classicXP':
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
        <div>
          <label>Theme:</label>
          <SelectInput options={themeOptions} cb={handleSelectChange} />
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
  select {
    width: 185px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  .buttons {
    display: flex;
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
