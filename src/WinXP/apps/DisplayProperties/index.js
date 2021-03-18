import React from 'react';

import TabsMenu from '../TabsMenu';
import ThemeTab from './ThemeTab';
import AppearanceTab from './AppearanceTab';
import DesktopTab from './DesktopTab';
import ScreenSaverTab from './ScreenSaverTab';
import SettingsTab from './SettingsTab';
import styled from 'styled-components';

const tabs = [
  { title: 'Themes', content: ThemeTab },
  { title: 'Desktop', content: DesktopTab },
  { title: 'Screen Saver', content: ScreenSaverTab },
  { title: 'Appearance', content: AppearanceTab },
  { title: 'Settings', content: SettingsTab },
];

function DisplayProperties() {
  return (
    <Properties>
      <TabsMenu tabs={tabs} />
      <div className="buttons">
        <button>OK</button>
        <button>Cancel</button>
        <button>Apply</button>
      </div>
    </Properties>
  );
}

const Properties = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: rgb(236, 233, 218);
  padding: 10px;

  & .buttons {
    height: 80px;
  }
`;

export default DisplayProperties;
