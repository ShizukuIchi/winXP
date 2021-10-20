import React from 'react';
import styled from 'styled-components';

import display from '../../../assets/properties/displayProperties/display.png';

import arrowDown from 'assets/properties/displayProperties/icons/arrowDown.png';
import Button from 'components/Button';
import NumberInput from 'components/numberInput';
import CheckBox from 'components/checkBox';

function ScreenSaverTab() {
  return (
    <ScreenSaver>
      <div className="preview">
        <img src={display} alt="display" />
        <div className="display-overlay"></div>
      </div>
      <form className="config-area">
        <fieldset className="settings">
          <legend>Screen saver</legend>
          <img className="arrow-down" src={arrowDown} alt="arrow down" />
          <label htmlFor="screen-saver">
            <select id="screen-saver" className="position-input" autoFocus>
              <option value="(None)">(None)</option>
              <option value="Blank">Blank</option>
              <option value="Windows XP">Windows XP</option>
            </select>
          </label>
          <div className="button-group">
            <Button style={{ marginLeft: '7px' }}>Settings</Button>
            <Button style={{ marginLeft: '9px' }}>Preview</Button>
          </div>
          <div className="quickSettings">
            <label className="waitLabel">Wait:</label>
            <NumberInput defaultValue={5} />
            <p>minutes</p>
            <CheckBox
              className="check-box"
              label="On resume, password protect"
            />
          </div>
        </fieldset>
        <fieldset className="settings">
          <legend>Monitor power</legend>
        </fieldset>
      </form>
    </ScreenSaver>
  );
}

const ScreenSaver = styled.div`
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
