import React, { useReducer, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Context as AppContext } from './../../../WinXP';
import Button from '../../../components/Button';

import TabsMenu from '../TabsMenu';

import ThemeTab from './ThemeTab';
import DesktopTab from './DesktopTab';
import ScreenSaverTab from './ScreenSaverTab';
// import AppearanceTab from './AppearanceTab';
// import SettingsTab from './SettingsTab';
import {
  DESKTOP,
  CHANGE,
  DISPLAY_PROPERTIES,
  FIRST_CHANGE,
  RESET_FIRST_CHANGE,
  SCREEN_SAVER,
} from './utils';

const tabs = [
  { title: 'Themes', content: ThemeTab },
  { title: 'Desktop', content: DesktopTab },
  { title: 'Screen Saver', content: ScreenSaverTab },
  // { title: 'Appearance', content: AppearanceTab },
  // { title: 'Settings', content: SettingsTab },
];

function DisplayProperties({ onClose }) {
  const appContext = useContext(AppContext);
  const { displayProperties } = appContext.state;

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case RESET_FIRST_CHANGE:
        return {
          ...state,
          firstChange: false,
        };
      case FIRST_CHANGE:
        return {
          ...state,
          firstChange: true,
        };
      case CHANGE:
        return {
          ...state,
          hasChanges: payload,
        };
      case DESKTOP:
        return {
          ...state,
          displayProperties: {
            ...displayProperties,
            desktop: {
              ...state.displayProperties.desktop,
              ...payload,
            },
          },
        };
      case SCREEN_SAVER:
        return {
          ...state,
          displayProperties: {
            ...displayProperties,
            screenSaver: {
              ...state.displayProperties.screenSaver,
              ...payload,
            },
          },
        };
      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    displayProperties,
    hasChanges: false,
    firstChange: false,
  });

  useEffect(() => {
    const hasChanged =
      JSON.stringify(state.displayProperties) !==
      JSON.stringify(displayProperties);

    if (hasChanged) {
      dispatch({
        type: CHANGE,
        payload: hasChanged,
      });

      dispatch({
        type: FIRST_CHANGE,
      });
    }
  }, [displayProperties, state.displayProperties]);

  const handleCancel = onClose;

  const handleApply = () => {
    appContext.dispatch({
      type: DISPLAY_PROPERTIES,
      payload: state.displayProperties,
    });

    dispatch({
      type: RESET_FIRST_CHANGE,
    });
  };

  const handleOk = () => {
    handleApply();
    onClose();
  };

  return (
    <Properties>
      <TabsMenu
        tabs={tabs}
        state={state}
        dispatch={dispatch}
        appContext={appContext}
      />
      <Buttons>
        <Button
          onClick={handleOk}
          style={{
            marginRight: 4,
          }}
        >
          OK
        </Button>
        <Button
          onClick={handleCancel}
          style={{
            marginRight: 4,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleApply}
          style={{
            width: 70,
          }}
          disabled={!state.firstChange}
        >
          Apply
        </Button>
      </Buttons>
    </Properties>
  );
}

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

export default DisplayProperties;
