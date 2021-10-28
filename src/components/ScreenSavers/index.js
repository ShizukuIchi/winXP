import React from 'react';
import Blank from './Blank';
import None from './None';
import WindowsXP from './WindowsXP';

const getScreenSaver = value => {
  switch (value) {
    case 'WindowsXP':
      return WindowsXP;
    case 'Blank':
      return Blank;
    case '(None)':
      return None;
    default:
      return WindowsXP;
  }
};

function ScreenSaver({ selectedScreenSaver, previewScreen = false }) {
  const Component = getScreenSaver(selectedScreenSaver);
  let previewProps = '';
  if (previewScreen) {
    previewProps = {
      WindowsXP: {
        winWidth: 170,
        winHeight: 118,
        imgHeight: 35,
        imgWidth: 48,
      },
      Blank: '',
      None: '',
    };
  }

  return <Component {...previewProps[selectedScreenSaver]} />;
}

export default ScreenSaver;
