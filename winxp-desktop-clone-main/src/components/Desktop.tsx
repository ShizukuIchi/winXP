import React from 'react';
import Wallpaper from './Wallpaper';
import Taskbar from './Taskbar/Taskbar';
import DesktopIcons from './DesktopIcons';
import WebBrowser from './WebBrowser/WebBrowser';
import XPDemoWindow from './XPDemoWindow';

const Desktop: React.FC = () => {
  return (
    <div className="w-screen h-screen relative overflow-hidden box-border bg-white">
      <Wallpaper />
      <Taskbar />
      <DesktopIcons />
      <WebBrowser />
      <XPDemoWindow />
    </div>
  );
};

export default Desktop;
