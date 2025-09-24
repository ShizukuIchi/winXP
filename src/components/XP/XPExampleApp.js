import React, { useState } from 'react';
import {
  XPThemeProvider,
  XPWindow,
  XPButton,
  XPCheckbox,
  XPTextBox,
  XPDropdown,
  XPTabs,
  XPGroupBox,
  XPSlider,
  XPOptionButton,
  XPOptionGroup,
  XPProgressBar,
  XPTreeView
} from './index';

// Example app demonstrating all XP components
const XPExampleApp = ({ onClose }) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [textValue, setTextValue] = useState('Hello Windows XP!');
  const [dropdownValue, setDropdownValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [radioValue, setRadioValue] = useState('option1');
  const [progressValue] = useState(75);

  const dropdownOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' }
  ];

  const radioOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const treeItems = [
    {
      id: 'folder1',
      label: 'My Documents',
      icon: '📁',
      expanded: true,
      children: [
        { id: 'file1', label: 'Document.txt', icon: '📄' },
        { id: 'file2', label: 'Picture.jpg', icon: '🖼️' }
      ]
    },
    {
      id: 'folder2',
      label: 'Desktop',
      icon: '📁',
      children: [
        { id: 'file3', label: 'Shortcut.lnk', icon: '🔗' }
      ]
    }
  ];

  const tabs = [
    {
      id: 'general',
      label: 'General',
      content: (
        <div>
          <XPGroupBox legend="Basic Controls">
            <XPCheckbox
              label="Enable notifications"
              checked={checkboxValue}
              onChange={(e) => setCheckboxValue(e.target.checked)}
            />
            <XPTextBox
              label="Username"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <XPDropdown
              options={dropdownOptions}
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              placeholder="Select a color"
            />
          </XPGroupBox>
        </div>
      )
    },
    {
      id: 'advanced',
      label: 'Advanced',
      content: (
        <div>
          <XPGroupBox legend="Advanced Settings">
            <XPSlider
              label={`Volume: ${sliderValue}%`}
              value={sliderValue}
              onChange={(e) => setSliderValue(e.target.value)}
            />
            <XPOptionGroup
              options={radioOptions}
              name="example-radio"
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <XPProgressBar value={progressValue} max={100} />
          </XPGroupBox>
        </div>
      )
    },
    {
      id: 'files',
      label: 'Files',
      content: (
        <XPTreeView
          items={treeItems}
          onItemClick={(item) => console.log('Clicked:', item.label)}
        />
      )
    }
  ];

  return (
    <XPThemeProvider>
      <XPWindow hideTitle showStatusBar statusText="Ready">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <XPTabs tabs={tabs} />
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <XPButton onClick={() => alert('XP Button Clicked!')}>
              Click Me!
            </XPButton>
          </div>
        </div>
      </XPWindow>
    </XPThemeProvider>
  );
};

export default XPExampleApp;