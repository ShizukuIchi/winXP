import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import display from 'assets/properties/displayProperties/display.png';
import arrowDown from 'assets/properties/displayProperties/icons/arrowDown.png';
import Button from 'components/Button';
import LegendFieldset from 'components/LegendFieldset';

import NumberInput from 'components/NumberInput';
import CheckBox from 'components/CheckBox';
import ScreenSaver from 'components/ScreenSavers';
import { SCREEN_SAVER } from './utils';
import { ADD_APP, SCREEN_SAVER_PREVIEW } from 'WinXP/constants/actions';
import { appSettings } from '../';

function ScreenSaverTab({ state, dispatch, appContext }) {
  const { value, wait } = state.displayProperties.screenSaver;
  const [screenSaverState, setScreenSaverState] = useState({ value, wait });
  const [isNone, setIsNone] = useState(false);

  useEffect(() => {
    dispatch({ type: SCREEN_SAVER, payload: screenSaverState });
  }, [screenSaverState, dispatch]);

  useEffect(() => {
    setIsNone(screenSaverState.value === '(None)');
  }, [screenSaverState.value]);

  const handleSelectChange = e => {
    setScreenSaverState(prev => ({ ...prev, value: e.target.value }));
  };

  const handleWaitingTime = wait => {
    setScreenSaverState(prev => ({ ...prev, wait }));
  };

  const selectorRef = useRef(null);

  const handlePreviewOpen = e => {
    appContext.dispatch({
      type: SCREEN_SAVER_PREVIEW,
      payload: value,
    });
    selectorRef.current.focus();
  };

  const handleSettingsOpen = e => {
    /// Currently only supported for 3D pipes
    /// TODO: make a switch case in the future when there are more setting options
    if (value !== 'Pipes3D') return;
    appContext.dispatch({
      type: ADD_APP,
      payload: appSettings.Pipes3D,
    });
  };

  return (
    <ScreenSaverSettings>
      <div className="preview">
        <img src={display} alt="display" />
        <div className="display-overlay">
          <ScreenSaver
            selectedScreenSaver={value}
            state={appContext.state}
            previewScreen
          />
        </div>
      </div>
      <Config>
        <LegendFieldset>
          <legend>Screen saver</legend>
          <SelectionSettings height="65px">
            <img className="arrow-down" src={arrowDown} alt="arrow down" />
            <label htmlFor="screen-saver">
              <select
                value={value}
                id="screen-saver"
                className="position-input"
                onChange={handleSelectChange}
                ref={selectorRef}
                onKeyPress={e => e.preventDefault()}
                autoFocus
              >
                <option value="(None)">(None)</option>
                <option value="Blank">Blank</option>
                <option value="WindowsXP">Windows XP</option>
                <option value="Pipes3D">3D Pipes</option>
              </select>
            </label>
            <div className="button-group">
              <Button
                disabled={isNone}
                type="button"
                style={{ marginLeft: 7 }}
                onClick={handleSettingsOpen}
              >
                Settings
              </Button>
              <Button
                disabled={isNone}
                type="button"
                style={{ marginLeft: 9 }}
                onClick={handlePreviewOpen}
              >
                Preview
              </Button>
            </div>
            <div className={`quick-settings ${isNone ? 'disabled-text' : ''}`}>
              <label className="wait-label">Wait:</label>
              <NumberInput
                value={wait}
                onChange={handleWaitingTime}
                disabled={isNone}
              />
              <p>minutes</p>
              <CheckBox
                value={screenSaverState.value}
                className="check-box"
                label="On resume, password protect"
              />
            </div>
          </SelectionSettings>
        </LegendFieldset>
        <LegendFieldset>
          <legend>Monitor power</legend>
          <SelectionSettings height="65px" marginTop="4px">
            <p>
              To adjust monitor power settings and save energy, click Power.
            </p>
            <Button type="button" className="power-button">
              Power...
            </Button>
          </SelectionSettings>
        </LegendFieldset>
      </Config>
    </ScreenSaverSettings>
  );
}

const ScreenSaverSettings = styled.div`
  legend {
    font-size: 11px;
    margin-left: 9px;
  }

  .preview {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding: 0px 2px;
    .display-overlay {
      position: absolute;
      top: 17px;
      left: 88px;
      width: 170px;
      height: 118px;
      background-color: #2f71cd;
    }
  }
`;

const Config = styled.form`
  fieldset {
    margin-bottom: 5px;
  }
  margin-top: 4.5px;

  .position-input {
    border-radius: 0;
    border-color: grey;
    font-size: 12px;
    margin-left: 9px;
    margin-top: 6.5px;
    width: 167px;
    height: 22px;
    &:focus {
      color: #fff;
      background-color: #2f71cd;
      box-shadow: inset 0px 0px 0px 2px #fff;
      outline: none;
    }
  }

  .arrow-down {
    position: absolute;
    left: 159px;
    top: 7px;
    width: 16px;
    height: 20px;
    pointer-events: none;
  }

  .button-group {
    display: inline-block;
    position: absolute;
    top: 5px;
  }

  .quick-settings {
    display: flex;
    margin-top: 8px;

    .check-box {
      margin-top: 5.5px;
      margin-left: 6px;
    }

    & .wait-label {
      margin-top: 3.5px;
      margin-left: 8px;
      padding-right: 2.5px;
    }

    & p {
      margin-left: 5px;
      margin-top: 4px;
    }
  }
  .disabled-text {
    color: #adaa9c;
  }
`;

const SelectionSettings = styled.div`
  position: relative;
  font-size: 11px;
  height: ${props => props.height};
  margin-top: ${props => props.marginTop};

  & p {
    margin-left: 82px;
    margin-top: 7px;
  }

  & .power-button {
    position: absolute;
    right: 9px;
    top: 37px;
  }
`;

export default ScreenSaverTab;
