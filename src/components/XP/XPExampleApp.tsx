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
  XPTreeView,
  XPMenuBar
} from './index';
import type {
  DropdownOption,
  MenuBarItems,
  OptionGroupEntry,
  TreeViewItem,
  XPTabItem
} from 'types/components';

interface XPExampleAppProps {
  onClose?: () => void;
}

const XPExampleApp: React.FC<XPExampleAppProps> = ({ onClose }) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [textValue, setTextValue] = useState('Hello Windows XP!');
  const [dropdownValue, setDropdownValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [radioValue, setRadioValue] = useState<string | number>('option1');
  const [progressValue] = useState(75);

  const menuItems: MenuBarItems = {
    File: [
      { label: 'New', shortcut: 'Ctrl+N' },
      { label: 'Open...', shortcut: 'Ctrl+O' },
      { label: 'Save', shortcut: 'Ctrl+S' },
      { label: 'Save As...' },
      { type: 'separator', label: 'separator' },
      { label: 'Print...', shortcut: 'Ctrl+P' },
      { label: 'Print Preview' },
      { type: 'separator', label: 'separator' },
      { label: 'Exit', shortcut: 'Alt+F4', name: 'Exit' }
    ],
    Edit: [
      { label: 'Undo', shortcut: 'Ctrl+Z', disabled: true },
      { label: 'Redo', shortcut: 'Ctrl+Y', disabled: true },
      { type: 'separator', label: 'separator' },
      { label: 'Cut', shortcut: 'Ctrl+X' },
      { label: 'Copy', shortcut: 'Ctrl+C' },
      { label: 'Paste', shortcut: 'Ctrl+V' },
      { type: 'separator', label: 'separator' },
      { label: 'Select All', shortcut: 'Ctrl+A' }
    ],
    View: [
      { label: 'Toolbar', checked: true },
      { label: 'Status Bar', checked: true },
      { type: 'separator', label: 'separator' },
      { label: 'Zoom In', shortcut: 'Ctrl++' },
      { label: 'Zoom Out', shortcut: 'Ctrl+-' },
      { label: 'Normal Size', shortcut: 'Ctrl+0' }
    ],
    Help: [
      { label: 'Help Topics', shortcut: 'F1' },
      { type: 'separator', label: 'separator' },
      { label: 'About XP Demo', name: 'About XP Demo' }
    ]
  };

  const handleMenuClick = (itemName: string) => {
    // eslint-disable-next-line no-console
    console.log('Menu clicked:', itemName);
    if (itemName === 'Exit') {
      onClose?.();
    }
    if (itemName === 'About XP Demo') {
      window.alert('XP Component Demo\nBuilt with XP.css');
    }
  };

  const dropdownOptions: DropdownOption[] = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' }
  ];

  const radioOptions: OptionGroupEntry[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const treeItems: TreeViewItem[] = [
    {
      id: 'folder1',
      label: 'My Documents',
      icon: '[Folder]',
      expanded: true,
      children: [
        { id: 'file1', label: 'Document.txt', icon: '[File]' },
        { id: 'file2', label: 'Picture.jpg', icon: '[Image]' }
      ]
    },
    {
      id: 'folder2',
      label: 'Desktop',
      icon: '[Folder]',
      children: [{ id: 'file3', label: 'Shortcut.lnk', icon: '[Shortcut]' }]
    }
  ];

  const tabs: XPTabItem[] = [
    {
      id: 'general',
      label: 'General',
      content: (
        <div>
          <XPGroupBox legend="Basic Controls">
            <XPCheckbox
              label="Enable notifications"
              checked={checkboxValue}
              onChange={(event) => setCheckboxValue(event.target.checked)}
            />
            <XPTextBox
              label="Username"
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
            />
            <XPDropdown
              options={dropdownOptions}
              value={dropdownValue}
              onChange={(event) => setDropdownValue(event.target.value)}
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
              onChange={(event) => setSliderValue(Number(event.target.value))}
            />
            <XPOptionGroup
              options={radioOptions}
              name="example-radio"
              value={radioValue}
              onChange={(event) => setRadioValue(event.target.value)}
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
          onItemClick={(item) => {
            // eslint-disable-next-line no-console
            console.log('Clicked:', item.label);
          }}
        />
      )
    }
  ];

  return (
    <XPThemeProvider>
      <XPWindow hideTitle showStatusBar statusText="Ready">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <XPMenuBar
            items={menuItems}
            onClickItem={handleMenuClick}
            style={{
              background: '#ECE9D8',
              borderBottom: '1px solid #ACA899',
              padding: '2px 4px',
              margin: 0
            }}
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <XPTabs tabs={tabs} />
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <XPButton onClick={() => window.alert('XP Button Clicked!')}>
                Click Me!
              </XPButton>
            </div>
          </div>
        </div>
      </XPWindow>
    </XPThemeProvider>
  );
};

export default XPExampleApp;
