import React, { useReducer } from 'react';

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

const initialState = {
  desktop: {
    type: 'url', //'url' || 'color'
    background: '../../../assets/properties/displayProperties/preview.png', //'url string' / color (rgb || hex)
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'DESKTOP':
      return {
        ...state.desktop,
        type: action.url,
        background: action.background,
      };
    default:
      break;
  }
};

function DisplayProperties({ onClose }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCancel = () => {
    console.log('close without applying changes');
    onClose();
  };

  const handleApply = () => {
    console.log('apply changes');
  };

  const handleOk = () => {
    console.log('make changes and close');
    onClose();
  };

  return (
    <Properties>
      <TabsMenu tabs={tabs} />
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
