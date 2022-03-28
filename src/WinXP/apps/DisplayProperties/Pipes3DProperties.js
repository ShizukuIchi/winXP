import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { Context as AppContext } from './../../../WinXP';
import LegendFieldset from 'components/LegendFieldset';

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
    onClose();
  };

  const handleChange = (field, value) => {
    setPipes3DState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Properties>
        <GroupBox>
          <LegendFieldset>
            <legend>Pipes</legend>
            <form
              onChange={e => {
                handleChange('isMulti', e.target.value === 'multi');
              }}
            >
              <label className="container">
                Single
                <input
                  id="single"
                  value="single"
                  type="radio"
                  name="isMulti"
                  checked={!pipes3DState.isMulti}
                />
                <span className="checkmark"></span>
              </label>

              <label className="container">
                Multiple
                <input
                  id="multi"
                  value="multi"
                  type="radio"
                  name="isMulti"
                  checked={pipes3DState.isMulti}
                />
                <span className="checkmark"></span>
              </label>
            </form>
          </LegendFieldset>
        </GroupBox>
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
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;
  width: 100%;
`;

// TODO: make global/ make a groupbox component which receives options as props
const GroupBox = styled.div`
  /* The container */
  .container {
    display: block;
    position: relative;
    padding-left: 17px;
    margin-bottom: 12px;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default radio button */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 13px;
    width: 13px;
    background: linear-gradient(135deg, #dcdcd7, #fff);
    border: 1px solid #1d5281;
    border-radius: 50%;
  }

  /* On hover, add shadow */
  .container:hover input ~ .checkmark {
    box-shadow: inset -2px -2px #f8b636, inset 2px 2px #fedf9c;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  .container .checkmark:after {
    /* position: absolute; */
    top: 3px;
    left: 3px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    /* background: url('public/radioIndicatior.svg'); */
    /* TODO: change to svg */
    background: linear-gradient(90deg, rgb(77 207 67) 0%, rgb(39 129 27) 90%);
  }
`;

export default Pipes3DProperties;
