import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { Context as AppContext } from './../../../WinXP';
import LegendFieldset from 'components/LegendFieldset';
import RadioGroup from 'components/RadioGroup';
import SelectInput from 'components/SelectInput';

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

  const handleChange = (value, field) => {
    setPipes3DState(prev => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = (value, field) => {
    let booleanValue = value === 'true' ? true : false;
    setPipes3DState(prev => ({ ...prev, [field]: booleanValue }));
  };

  /// TODO: move all options to different file?

  const jointTypeOptions = [
    { label: 'Elbow', value: 'elbow' },
    { label: 'Ball', value: 'ball' },
    { label: 'Mixed', value: 'mixed' },
    { label: 'Cycle', value: 'cycle' },
  ];

  const surfaceStyleOptions = [
    {
      label: 'Solid',
      id: 'solid',
      value: 'solid',
      checked: pipes3DState.surfaceStyle === 'solid',
    },
    {
      label: 'Textured',
      id: 'textured',
      value: 'textured',
      checked: pipes3DState.surfaceStyle === 'textured',
    },
  ];

  const isMultipleOptions = [
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
  ];

  return (
    <>
      <Properties>
        <div className="pipes-settings-wrapper">
          <LegendFieldset>
            <legend>Pipes</legend>
            <RadioGroup
              groupName="multiple"
              /// groupName correlates with the properties (multiple, joints etc.)
              options={isMultipleOptions}
              cb={handleBooleanChange}
            />
          </LegendFieldset>
          <LegendFieldset>
            <legend>Pipe Style</legend>
            <p>Joint type:</p>
            <SelectInput
              value={
                jointTypeOptions.find(
                  option => option.value === pipes3DState.joints,
                ).value
              }
              options={jointTypeOptions}
              field="joints"
              cb={handleChange}
            />
          </LegendFieldset>
          <LegendFieldset>
            <legend>Surface Style</legend>
            <div className="surface-style-wrapper">
              <RadioGroup
                groupName="surfaceStyle"
                options={surfaceStyleOptions}
                cb={handleChange}
              />
              <Button disabled={pipes3DState.surfaceStyle !== 'textured'}>
                Choose Texture...
              </Button>
            </div>
          </LegendFieldset>

          <LegendFieldset>
            <legend>Speed</legend>
            speeed
          </LegendFieldset>
        </div>

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
  justify-content: space-between;
  height: 100%;
  background-color: rgb(236, 233, 218);
  padding: 10px;
  //

  .pipes-settings-wrapper {
    display: grid;
    grid-template-columns: 225px 225px;
    grid-row: auto auto;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
  }

  .surface-style-wrapper {
    position: relative;
    button {
      position: absolute;
      font-size: 12px;
      right: 30px;
      bottom: -5px;
      width: fit-content;
      padding: 0 4px;
    }
  }

  p {
    font-size: 12px;
  }

  fieldset {
    padding-left: 10px;
    height: 85px;
    margin-bottom: 5px;
  }
  legend {
    font-size: 12px;
    margin-bottom: 10px;
    margin-left: -3px;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;
  width: 100%;
`;

export default Pipes3DProperties;
