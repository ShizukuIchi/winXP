import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import display from 'assets/properties/displayProperties/display.png';
import arrowDown from 'assets/properties/displayProperties/icons/arrowDown.png';
import Button from 'components/Button';
import NumberInput from 'components/NumberInput';
import CheckBox from 'components/CheckBox';
import { SCREEN_SAVER } from './utils';
import ScreenSaver from 'components/ScreenSavers';

function ScreenSaverTab({ state, dispatch }) {
  const { value, wait } = state.displayProperties.screenSaver;
  const [screenSaverState, setScreenSaverState] = useState({ value, wait });

  useEffect(() => {
    dispatch({ type: SCREEN_SAVER, payload: screenSaverState });
  }, [screenSaverState, dispatch]);

  const handleSelectChange = e => {
    setScreenSaverState(prev => ({ ...prev, value: e.target.value }));
  };

  const handleWaitingTime = wait => {
    setScreenSaverState(prev => ({ ...prev, wait }));
  };

  return (
    <ScreenSaverSettings>
      <div className="preview">
        <img src={display} alt="display" />
        <div className="display-overlay">
          <ScreenSaver selectedScreenSaver={value} previewScreen={true} />
        </div>
      </div>
      <form className="config-area">
        <fieldset className="settings">
          <legend>Screen saver</legend>
          <img className="arrow-down" src={arrowDown} alt="arrow down" />
          <label htmlFor="screen-saver">
            <select
              value={value}
              id="screen-saver"
              className="position-input"
              onChange={handleSelectChange}
              autoFocus
            >
              <option value="(None)">(None)</option>
              <option value="Blank">Blank</option>
              <option value="WindowsXP">Windows XP</option>
            </select>
          </label>
          <div className="button-group">
            <Button
              disabled={screenSaverState.value === '(None)'}
              type="button"
              style={{ marginLeft: '7px' }}
            >
              Settings
            </Button>
            <Button
              disabled={screenSaverState.value === '(None)'}
              type="button"
              style={{ marginLeft: '9px' }}
            >
              Preview
            </Button>
          </div>
          <div
            className="quickSettings"
            style={{ color: screenSaverState.value === '(None)' && '#adaa9c' }}
          >
            <label className="waitLabel">Wait:</label>
            <NumberInput
              value={screenSaverState.value}
              defaultValue={wait}
              handleWaitingTime={handleWaitingTime}
            />
            <p>minutes</p>
            <CheckBox
              value={screenSaverState.value}
              className="check-box"
              label="On resume, password protect"
            />
          </div>
        </fieldset>
        <fieldset className="settings">
          <legend>Monitor power</legend>
          <p>To adjust monitor power settings and save energy, click Power.</p>
          <Button type="button" className="power-button">
            Power...
          </Button>
        </fieldset>
      </form>
    </ScreenSaverSettings>
  );
}

const ScreenSaverSettings = styled.div`
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
  .config-area {
    margin-top: 4.5px;
  }

  .settings {
    position: relative;
    border: 1px solid #e1e1d4;
    border-radius: 5px;
    font-size: 11px;
    height: 80px;

    & p {
      margin-left: 82px;
      margin-top: 7px;
    }

    & .power-button {
      position: absolute;
      right: 9px;
      top: 45px;
    }
  }

  .settings:nth-child(2) {
    height: 87.5px;
    margin-top: 4px;
  }

  legend {
    margin-left: 9px;
  }

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

  .quickSettings {
    display: flex;
    margin-top: 8px;

    .check-box {
      margin-top: 5.5px;
      margin-left: 6px;
    }

    & .waitLabel {
      margin-top: 3.5px;
      margin-left: 8px;
      padding-right: 2.5px;
    }

    & p {
      margin-left: 5px;
      margin-top: 4px;
    }
  }
`;

export default ScreenSaverTab;
