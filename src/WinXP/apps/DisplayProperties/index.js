import React, { useReducer, useContext } from 'react';
import { Context as AppContext } from './../../../WinXP';

import TabsMenu from '../TabsMenu';
import ThemeTab from './ThemeTab';
import AppearanceTab from './AppearanceTab';
import DesktopTab from './DesktopTab';
import ScreenSaverTab from './ScreenSaverTab';
import SettingsTab from './SettingsTab';
import styled from 'styled-components';

const tabs = [
  { id: 1, title: 'Themes', content: ThemeTab },
  { id: 2, title: 'Desktop', content: DesktopTab },
  { id: 3, title: 'Screen Saver', content: ScreenSaverTab },
  { id: 4, title: 'Appearance', content: AppearanceTab },
  { id: 5, title: 'Settings', content: SettingsTab },
];

function DisplayProperties({ onClose }) {
  const appContext = useContext(AppContext);
  const { background } = appContext.state;

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case 'DESKTOP':
        state.desktop = {
          ...state.desktop,
          ...payload,
        };
        return state;
      default:
        break;
    }
  };

  const initialState = {
    desktop: {
      type: background.type,
      size: background.size,
      background: background.background,
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCancel = () => {
    onClose();
  };

  const handleApply = () => {
    appContext.dispatch({ type: 'DISPLAY_PROPERTIES', payload: state });
  };

  const handleOk = () => {
    appContext.dispatch({ type: 'DISPLAY_PROPERTIES', payload: state });
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
        <button onClick={handleOk}>OK</button>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleApply}>Apply</button>
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

  button {
    width: 70px;
    margin-left: 5px;
  }

  button:first-child {
    margin-left: 0;
  }
`;

export default DisplayProperties;
