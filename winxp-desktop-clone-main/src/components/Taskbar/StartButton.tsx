import React from 'react';

const StartButton: React.FC = () => {
  return (
    <button className="start-button w-[106px] h-[40px] absolute box-border left-0 top-0 group">
      <div className="w-[106px] h-[40px] absolute box-border left-0 top-0">
        <div className="w-[106px] h-[40px] shadow-[2px_0_2px_0_rgba(0,0,0,0.07),-2px_-2px_2px_0_rgba(0,0,0,0.10)_inset,0_4px_8px_0_rgba(255,255,255,0.15)_inset,1.5px_1.5px_1px_0_rgba(255,255,255,0.25)_inset] absolute box-border bg-gradient-to-r from-[#2e7b2e] to-[#5cb85c] rounded-r-[20px] border-[0.5px] border-solid border-[rgba(0,0,0,0.30)] left-0 top-0" />
        <div className="w-[85px] h-[40px] absolute top-0 box-border rounded-[0_20px_20px_0] bg-gradient-to-r from-[#3e8b3e] to-[#6cc86c] left-0" />
      </div>
      <div className="flex w-[66px] h-[40px] flex-col justify-center text-white text-xl italic font-bold absolute box-border left-[33px] top-0">
        <span className="font-bold text-xl text-white drop-shadow-sm">start</span>
      </div>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/35a638ec5bb9dc89862324fead58d15c45557048?width=70"
        alt="Windows Logo"
        className="box-border w-[24px] h-[24px] absolute left-2 top-2"
      />
    </button>
  );
};

export default StartButton;
