import React, { useState, useEffect } from 'react';

const SystemTray: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-[137px] h-[40px] absolute box-border right-0 top-0">
      <div className="w-[137px] h-[40px] shadow-[-1px_0_1px_0_rgba(0,0,0,0.30),2px_2px_2px_0_#16ACF0_inset,-1px_-2px_8px_0_rgba(0,0,0,0.15)_inset] absolute box-border bg-gradient-to-b from-[#0D9BEF] to-[#0B85CF] right-0 top-0" />
      <div className="flex w-[55px] h-[15px] flex-col justify-center text-white text-right text-[11px] font-normal absolute box-border right-6 top-[12px]">
        <span className="font-normal text-[11px] text-white">
          {formatTime(currentTime)}
        </span>
      </div>
      <div className="flex w-[24px] h-[15px] flex-col justify-center text-white text-right text-[10px] font-normal absolute box-border left-2 top-[12px]">
        <span className="font-normal text-[10px] text-white">EN</span>
      </div>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/a0c25be533baaaacb52157a5379526f4c2478cfc?width=54"
        alt="Network icon"
        className="box-border w-[18px] h-[18px] absolute right-[80px] top-[11px]"
      />
    </div>
  );
};

export default SystemTray;
