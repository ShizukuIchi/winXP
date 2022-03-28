import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { Context as AppContext } from './../../../WinXP';
import LegendFieldset from 'components/LegendFieldset';
import RadioGroup from 'components/RadioGroup';

import { DISPLAY_PROPERTIES } from '../../constants/actions';

function Pipes3DProperties({ onClose }) {
  const appContext = useContext(AppContext);
  const { displayProperties } = appContext.state;
  const handleCancel = onClose;

  /// Component state
  const {
    multiple,
    surfaceStyle,
    joints,
    speed,
  } = displayProperties.screenSaversSettings.Pipes3D;
  const [pipes3DState, setPipes3DState] = useState({
    multiple,
    surfaceStyle,
    joints,
    speed,
  });

  const handleApply = () => {
    appContext.dispatch({
      type: DISPLAY_PROPERTIES,
      payload: {
        ...displayProperties,
        screenSaversSettings: {
          ...displayProperties.screenSaversSettings,
          Pipes3D: pipes3DState,
        },
      },
    });
    onClose();
  };

  const handleChange = (field, value) => {
    setPipes3DState(prev => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = ({ groupName: field, value }) => {
    let booleanValue = value === 'true' ? true : false;
    setPipes3DState(prev => ({ ...prev, [field]: booleanValue }));
  };

  return (
    <>
      <Properties>
        <LegendFieldset>
          <legend>Pipes</legend>
          <RadioGroup
            groupName="multiple"
            /// groupName correlates with the properties (multiple, joints etc.)
            options={[
              {
                label: 'Single',
                id: 'single',
                value: false,
                checked: !pipes3DState.multiple,
              },
              {
                label: 'Multi',
                id: 'multi',
                value: true,
                checked: pipes3DState.multiple,
              },
            ]}
            cb={handleBooleanChange}
          />
        </LegendFieldset>
        <Buttons>
          <Button
            style={{
              marginRight: 4,
            }}
            onClick={handleApply}
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
  //

  fieldset {
    padding-left: 10px;
  }
  legend {
    font-size: 12px;
    margin-bottom: 12px;
    margin-left: 5px;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;
  width: 100%;
`;

export default Pipes3DProperties;
