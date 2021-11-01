import React from 'react';
import styled from 'styled-components';

import display from '../../../assets/properties/displayProperties/display.png';

function ScreenSaverTab() {
  return (
    <ScreenSaver>
      <div className="preview">
        <img src={display} alt="display" />
        <div className="display-overlay"></div>
      </div>
      <form className="config">
        <fieldset>
          <legend>Screen saver</legend>
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

    & .display-overlay {
      position: absolute;
      top: 17px;
      left: 88px;
      width: 170px;
      height: 118px;
      background-color: #2f71cd;
    }
  }
  .config {
    margin: 3px 0px 0px 0px;
  }
`;

export default ScreenSaverTab;
