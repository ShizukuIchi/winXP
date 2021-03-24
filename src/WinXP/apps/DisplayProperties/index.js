import React from 'react';

import TabsMenu from '../TabsMenu';
import ThemeTab from './ThemeTab';
import AppearanceTab from './AppearanceTab';
import DesktopTab from './DesktopTab';
import ScreenSaverTab from './ScreenSaverTab';
import SettingsTab from './SettingsTab';
import styled from 'styled-components';

const tabs = [
  { id: 1, title: 'Themes', content: ThemeTab },
  { id: 2, title: 'Desktop', content: DesktopTab, defaultTab: true },
  { id: 3, title: 'Screen Saver', content: ScreenSaverTab },
  { id: 4, title: 'Appearance', content: AppearanceTab },
  { id: 5, title: 'Settings', content: SettingsTab },
];

function DisplayProperties() {
  return (
    <Properties>
      <TabsMenu tabs={tabs} />
      <Buttons>
        <button>OK</button>
        <button>Cancel</button>
        <button>Apply</button>
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
