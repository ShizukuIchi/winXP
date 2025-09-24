import React from 'react';

const StatusBar: React.FC = () => {
  return (
    <div className="w-[681px] h-[20px] absolute box-border left-1 top-[465px]">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/728e67d240674c060c5f00976c42e5fcccdd829c?width=1663"
        alt="Status bar background"
        className="box-border w-[681px] h-[20px] absolute left-0 top-0"
      />
      <div className="w-[681px] h-0 shadow-[0_1px_0_0_#F0EFE2_inset,0_2px_1px_0_rgba(149,147,133,0.75),0_1px_0_0_#959385] absolute box-border bg-white left-0 top-[19px]" />
      
      <div className="w-[64px] h-[14px] absolute box-border left-1 top-[3px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/04e03a836b37ce0772b32c018361acc7b6dd77a4?width=31"
          alt="Internet Explorer icon"
          className="box-border w-[13px] h-[13px] absolute left-0 top-0"
        />
        <div className="flex w-[47px] h-[13px] flex-col justify-center text-black text-[10px] font-normal absolute box-border left-4 top-px">
          <span className="font-normal text-[10px] text-black box-border">Done</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
