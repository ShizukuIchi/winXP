import React from 'react';
import styled from 'styled-components';

import display from '../../../assets/properties/displayProperties/display.png';

function DesktopTab() {
  return (
    <Desktop>
      <div className="preview">
        <img src={display} alt="display" />
      </div>
      <div className="settings">
        <div>Background:</div>
        <div className="preferences">
          <div className="List">
            <ul>
              <li>None</li>
              <li>Ascent</li>
              <li>Autumn</li>
              <li>Azul</li>
              <li>Bliss</li>
              <li>Blue Lace 16</li>
              <li>None</li>
              <li>Ascent</li>
              <li>Autumn</li>
              <li>Azul</li>
              <li>Bliss</li>
              <li>Blue Lace 16</li>
            </ul>
          </div>
          <div className="options">
            <button>Browse...</button>
            <div>
              <label for="position">Position:</label>
              <select id="position">
                <option value="Strech">Strech</option>
                <option value="Not Strech">Not Strech</option>
              </select>
            </div>
            <div>
              <label for="color">Position:</label>
              <input id="color" type="color" />
            </div>
          </div>
        </div>
        <button>Customize Desktop...</button>
      </div>
    </Desktop>
  );
}

const Desktop = styled.div`
  .preview {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }

  .preferences {
    display: flex;
    flex-direction: row;
    margin: 5px 0;
  }

  .List {
    flex-grow: 10;
    height: 130px;
    border: 1px solid blue;
    overflow-y: scroll;
    padding-left: 5px;
  }
  .options {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 135px;

    & button,
    & input {
      display: block;
      width: 80px;
    }

    & label {
      display: block;
    }
  }
`;

export default DesktopTab;
