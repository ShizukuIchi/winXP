import React from 'react';
import StartButton from './StartButton';
import TaskbarButton from './TaskbarButton';
import SystemTray from './SystemTray';

const Taskbar: React.FC = () => {
  return (
    <nav className="w-full h-[40px] absolute box-border left-0 bottom-0">
      <div className="w-full h-[40px] absolute box-border left-0 top-0">
        <div className="w-full h-[40px] shadow-[0_2px_2px_0_rgba(109,178,255,0.70)_inset,0_-2px_3px_0_rgba(0,0,0,0.22)_inset,0_4px_4px_0_#3888E9_inset] absolute box-border bg-gradient-to-b from-[#245DDB] to-[#1E4AB8] left-0 top-0" />
      </div>
      
      <StartButton />
      
      <TaskbarButton
        title="Projects"
        icon="https://api.builder.io/api/v1/image/assets/TEMP/5f58ca6fef090b38d2492017770a3d2efc41c7af?width=48"
        className="left-[114px] top-[4px]"
      />
      
      <TaskbarButton
        title="Music Playlist - Microsoft Internet Explorer"
        icon="https://api.builder.io/api/v1/image/assets/TEMP/dea86c1b6589bc004d8f70c40c0c0469b927c182?width=48"
        isPressed={true}
        className="left-[275px] top-[4px]"
      />
      
      <SystemTray />
    </nav>
  );
};

export default Taskbar;
