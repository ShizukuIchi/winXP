import React, { useState } from 'react';
import {
  XPButton,
  XPCheckbox,
  XPTextBox,
  XPDropdown,
  XPWindow,
  XPGroupBox,
  XPProgressBar
} from '@/components/xp';

const XPDemoWindow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [checkboxState, setCheckboxState] = useState(false);
  const [progress, setProgress] = useState(60);

  const dropdownOptions = [
    { value: '5', label: '5 - Incredible!' },
    { value: '4', label: '4 - Great!' },
    { value: '3', label: '3 - Pretty good' },
    { value: '2', label: '2 - Not so great' },
    { value: '1', label: '1 - Unfortunate' }
  ];

  if (!isVisible) return null;

  return (
    <div className="absolute top-16 left-16 z-10">
      <XPWindow
        title="XP Components Showcase"
        onClose={() => setIsVisible(false)}
        style={{ width: '320px', minHeight: '280px' }}
      >
        <div className="space-y-4">
          <XPGroupBox legend="Demo Controls">
            <div className="space-y-3">
              <XPTextBox 
                label="Sample Input" 
                placeholder="Enter text..." 
                stacked 
              />
              
              <XPCheckbox 
                label="Enable notifications" 
                checked={checkboxState}
                onChange={(e) => setCheckboxState(e.target.checked)}
              />
              
              <div className="field-row">
                <label>Rating:</label>
                <XPDropdown options={dropdownOptions} defaultValue="3" />
              </div>
              
              <div>
                <label>Progress: {progress}%</label>
                <XPProgressBar value={progress} max={100} className="w-full mt-1" />
              </div>
              
              <div className="flex gap-2 mt-3">
                <XPButton onClick={() => setProgress(Math.max(0, progress - 20))}>
                  Decrease
                </XPButton>
                <XPButton onClick={() => setProgress(Math.min(100, progress + 20))}>
                  Increase
                </XPButton>
              </div>
            </div>
          </XPGroupBox>
          
          <div className="flex gap-2 justify-end">
            <XPButton>OK</XPButton>
            <XPButton onClick={() => setIsVisible(false)}>Close</XPButton>
          </div>
        </div>
      </XPWindow>
    </div>
  );
};

export default XPDemoWindow;