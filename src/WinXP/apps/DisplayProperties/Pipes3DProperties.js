import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { Context as AppContext } from './../../../WinXP';

import { DISPLAY_PROPERTIES } from '../../constants/actions';

function Pipes3DProperties({ onClose }) {
  const appContext = useContext(AppContext);
  const { displayProperties } = appContext.state;
  const handleCancel = onClose;

  /// Component state
  const {
    isMulti,
    surfaceStyle,
    jointType,
    speed,
  } = displayProperties.pipes3DSettings;
  const [pipes3DState, setPipes3DState] = useState({
    isMulti,
    surfaceStyle,
    jointType,
    speed,
  });

  const handleApply = () => {
    appContext.dispatch({
      type: DISPLAY_PROPERTIES,
      payload: { ...displayProperties, pipes3DSettings: pipes3DState },
    });
  };

  const testClick = e => {
    setPipes3DState(prev => ({ ...prev, isMulti: true }));
    handleApply();
  };

  return (
    <>
      <Properties>
        propertiess
        <button onClick={testClick}> clickme</button>
        <Buttons>
          <Button
            style={{
              marginRight: 4,
            }}
          >
            OK
          </Button>
          <Button
            style={{
              marginRight: 4,
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Buttons>
      </Properties>
    </>
  );
}

// TODO: make global- is also used in ./index
const Properties = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgb(236, 233, 218);
  padding: 10px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;
  width: 100%;
`;

export default Pipes3DProperties;
