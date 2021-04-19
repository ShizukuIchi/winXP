import React, { useReducer, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Context as AppContext } from './../../../WinXP';
import Button from '../../../components/Button';

import TabsMenu from '../TabsMenu';

import ThemeTab from './ThemeTab';
import AppearanceTab from './AppearanceTab';
import DesktopTab from './DesktopTab';
import ScreenSaverTab from './ScreenSaverTab';
import SettingsTab from './SettingsTab';
import { DESKTOP, CHANGE, DISPLAY_PROPERTIES } from './utils';

const tabs = [
  { title: 'Themes', content: ThemeTab },
  { title: 'Desktop', content: DesktopTab },
  { title: 'Screen Saver', content: ScreenSaverTab },
  { title: 'Appearance', content: AppearanceTab },
  { title: 'Settings', content: SettingsTab },
];

function DisplayProperties({ onClose }) {
  const appContext = useContext(AppContext);
  const { displayProperties } = appContext.state;

  const reducer = (state, { type, payload }) => {
    switch (type) {
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
      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    displayProperties,
    hasChanges: false,
  });

  useEffect(() => {
    dispatch({
      type: CHANGE,
      payload:
        JSON.stringify(state.displayProperties) !==
        JSON.stringify(displayProperties),
    });
  }, [displayProperties, state.displayProperties]);

  const handleCancel = onClose;

  const handleApply = () =>
    appContext.dispatch({
      type: DISPLAY_PROPERTIES,
      payload: state.displayProperties,
    });

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
        <Button onClick={handleOk} width={70} marginRight={4}>
          OK
        </Button>
        <Button onClick={handleCancel} width={70} marginRight={4}>
          Cancel
        </Button>
        <Button onClick={handleApply} width={70} disabled={!state.hasChanges}>
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
