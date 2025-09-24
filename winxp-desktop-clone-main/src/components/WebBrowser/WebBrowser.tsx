import React, { useState } from 'react';
import WindowTitle from './WindowTitle';
import MenuBar from './MenuBar';
import AddressBar from './AddressBar';
import StatusBar from './StatusBar';

const WebBrowser: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <main className="w-[687px] h-[489px] absolute box-border left-[280px] top-[140px]">
      <div className="w-[687px] h-[489px] absolute box-border left-0 top-0">
        <div className="w-[687px] h-[489px] shadow-[0_2px_2px_0_rgba(109,178,255,0.70)_inset,0_-3px_4px_0_rgba(0,0,0,0.22)_inset,0_6px_5px_0_#3888E9_inset] absolute box-border bg-gradient-to-b from-[#0043E9] to-[#003BD1] rounded-[6px_6px_0_0] border-[1px] border-solid border-[#1A82FF] left-0 top-0" />
        
        <section className="w-[673px] h-[391px] shadow-[1px_1px_0.5px_0_rgba(113,111,100,0.50)_inset] absolute border-[0.5px] border-solid border-[rgba(113,111,100,0.50)] left-[7px] top-[71px] bg-white">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/184902f2cac4097622defb4eacdb5a41b639e384?width=1656"
            alt="Web page content"
            className="box-border w-full h-full object-cover"
          />
        </section>
      </div>
      
      <WindowTitle 
        title="Cool Music - Microsoft Internet Explorer" 
        onClose={handleClose}
      />
      <MenuBar />
      <AddressBar />
      <StatusBar />
    </main>
  );
};

export default WebBrowser;
