import React from 'react';
import Blank from './Blank';
import None from './None';
import WindowsXP from './WindowsXP';
import Pipes3D from './Pipes3D';

const getScreenSaver = value => {
  switch (value) {
    case 'WindowsXP':
      return WindowsXP;
    case 'Blank':
      return Blank;
    case 'Pipes3D':
      return Pipes3D;
    case '(None)':
      return None;
    default:
      return WindowsXP;
  }
};

function ScreenSaver({
  selectedScreenSaver,
  state,
  activatePreview = false,
  previewScreen = false,
}) {
  let Component = getScreenSaver(
    activatePreview ? activatePreview : selectedScreenSaver,
  );
  let previewProps = '';
  if (previewScreen) {
    previewProps = {
      WindowsXP: {
        winWidth: 170,
        winHeight: 118,
        imgWidth: 32,
        imgHeight: 23,
      },
      Blank: '',
      None: '',
      Pipes3D: '',
    };
  }

  return (
    <Component
      currentBackgroundColor={
        previewScreen && state.displayProperties.desktop.color
      }
      {...previewProps[selectedScreenSaver]}
    />
  );
}

export default ScreenSaver;
