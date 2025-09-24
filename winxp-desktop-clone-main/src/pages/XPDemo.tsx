import React, { useState } from 'react';
import {
  XPButton,
  XPCheckbox,
  XPTextBox,
  XPDropdown,
  XPWindow,
  XPGroupBox,
  XPTabs,
  XPProgressBar
} from '@/components/xp';
import '../components/xp-overrides.css';

const XPDemo: React.FC = () => {
  const [progress, setProgress] = useState(50);
  const [checkboxState, setCheckboxState] = useState(false);

  const dropdownOptions = [
    { value: '5', label: '5 - Incredible!' },
    { value: '4', label: '4 - Great!' },
    { value: '3', label: '3 - Pretty good' },
    { value: '2', label: '2 - Not so great' },
    { value: '1', label: '1 - Unfortunate' }
  ];

  const tabs = [
    {
      id: 'forms',
      label: 'Forms',
      content: (
        <div className="space-y-4">
          <XPGroupBox legend="User Information">
            <XPTextBox label="Name" placeholder="Enter your name" />
            <XPTextBox label="Email" stacked placeholder="Enter your email" containerClassName="mt-4" />
            <XPCheckbox 
              label="Subscribe to newsletter" 
              checked={checkboxState}
              onChange={(e) => setCheckboxState(e.target.checked)}
            />
            <div className="field-row mt-4">
              <label>Rating:</label>
              <XPDropdown options={dropdownOptions} defaultValue="3" />
            </div>
          </XPGroupBox>
          
          <div className="flex gap-2 mt-4">
            <XPButton>OK</XPButton>
            <XPButton>Cancel</XPButton>
          </div>
        </div>
      )
    },
    {
      id: 'progress',
      label: 'Progress',
      content: (
        <div className="space-y-4">
          <div>
            <label>Progress: {progress}%</label>
            <XPProgressBar value={progress} max={100} className="w-full mt-2" />
          </div>
          
          <div className="flex gap-2">
            <XPButton onClick={() => setProgress(Math.max(0, progress - 10))}>
              Decrease
            </XPButton>
            <XPButton onClick={() => setProgress(Math.min(100, progress + 10))}>
              Increase
            </XPButton>
          </div>
          
          <div>
            <label>Indeterminate Progress:</label>
            <XPProgressBar indeterminate className="w-full mt-2" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 xp-demo-container" style={{ fontFamily: 'MS Sans Serif, sans-serif' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-8">Windows XP Component Library Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <XPWindow
            title="XP Components Demo"
            style={{ width: '100%', minHeight: '400px' }}
          >
            <XPTabs tabs={tabs} />
          </XPWindow>
          
          <XPWindow
            title="Component Gallery"
            style={{ width: '100%', minHeight: '400px' }}
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Buttons</h3>
                <div className="flex gap-2">
                  <XPButton>Default</XPButton>
                  <XPButton disabled>Disabled</XPButton>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Form Controls</h3>
                <XPTextBox placeholder="Enter text here..." />
                <XPCheckbox label="Check me!" containerClassName="mt-2" />
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Dropdown</h3>
                <XPDropdown 
                  options={dropdownOptions} 
                  placeholder="Select rating..."
                />
              </div>
            </div>
          </XPWindow>
        </div>
      </div>
    </div>
  );
};

export default XPDemo;