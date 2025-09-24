import React, { useState } from 'react';

const AddressBar: React.FC = () => {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=BYpKQ65DugI');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would navigate to the URL
    console.log('Navigating to:', url);
  };

  return (
    <div className="w-[679px] h-[21px] absolute box-border left-1 top-[50px]">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/f9991e39d3ae753690c7e72cd6afab5181f698f5?width=1661"
        alt="Address bar background"
        className="box-border w-[679px] h-[21px] absolute left-0 top-0"
      />
      <div className="w-[679px] h-0 shadow-[0_1px_0_0_#D8D2BD_inset] absolute box-border bg-white left-0 top-0.5" />
      <div className="w-[21px] h-0 shadow-[1px_1px_0_0_#D8D2BD_inset] absolute box-border bg-white left-[638px] top-px" />
      
      <div className="flex w-[47px] h-5 flex-col justify-center text-[#7F7C73] text-left text-[8px] font-normal absolute box-border left-0 top-0.5">
        <span className="font-normal text-[8px] text-[rgba(127,124,115,1)]">
          <span className="underline">A</span>ddress
        </span>
      </div>
      
      <div className="flex w-[34px] h-[19px] flex-col justify-center text-[#7F7C73] text-[10px] font-normal absolute box-border left-[647px] top-1">
        <span className="font-normal text-[10px] text-[rgba(127,124,115,1)] box-border">Links</span>
      </div>
      
      <form onSubmit={handleSubmit} className="contents">
        <div className="w-[538px] h-4 absolute box-border bg-white border-[0.7px] border-solid border-[#7F9DB9] left-[47px] top-1">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/424143ac69629988776542eaa2b078f2dacedace?width=31"
            alt="Internet Explorer icon"
            className="box-border w-[13px] h-[11px] absolute left-[2px] top-[2px]"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-[505px] h-[15px] absolute left-[19px] top-0 bg-transparent border-none outline-none text-black text-[8px] font-normal"
            aria-label="Website address"
          />
        </div>
        
        <button
          type="submit"
          className="go-button flex w-5 h-5 flex-col justify-center text-black text-center text-[11px] font-normal absolute box-border left-[607px] top-0.5 hover:bg-gray-100"
          aria-label="Go to address"
        >
          <span className="font-normal text-[11px] text-black box-border">Go</span>
        </button>
      </form>
      
      <div className="w-[11px] h-[13px] absolute box-border left-[571px] top-1">
        <div className="w-[11px] h-[13px] absolute box-border rounded-[1px] border-[0.5px] border-solid border-[#ADC3F6] left-0 top-0" />
        <svg width="6" height="2" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[3px] top-[6px]">
          <path d="M0.599976 0.871994L4.19998 4.03999L7.79998 0.871994" stroke="#4D6185" strokeWidth="1.5" />
        </svg>
      </div>
      
      <div className="w-[16px] h-[16px] absolute box-border left-[590px] top-[3px]">
        <div className="w-[16px] h-[16px] shadow-[-2px_-2px_2px_0_rgba(0,0,0,0.18)_inset,-2px_-4px_4px_0_#15B115_inset,1px_1px_0_0_rgba(0,0,0,0.20)_inset,-1px_-1px_0_0_#017B01_inset] absolute box-border rounded-[2px] border-[0.5px] border-solid border-white left-0 top-0" />
        <svg width="9" height="8" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1 top-1">
          <path d="M11.9303 6.13034C12.2232 5.83744 12.2232 5.36257 11.9303 5.06968L7.15733 0.296705C6.86444 0.00381129 6.38957 0.00381133 6.09667 0.296705C5.80378 0.589598 5.80378 1.06447 6.09667 1.35737L10.3393 5.60001L6.09668 9.84265C5.80378 10.1355 5.80378 10.6104 6.09668 10.9033C6.38957 11.1962 6.86444 11.1962 7.15734 10.9033L11.9303 6.13034ZM0.599976 6.35001L11.4 6.35001L11.4 4.85001L0.599976 4.85001L0.599976 6.35001Z" fill="white" />
        </svg>
      </div>
      
      <svg width="5" height="3" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[635px] top-[9px]">
        <path d="M1.19995 0.535995L3.59995 2.648L1.19995 4.76" stroke="black" strokeWidth="1" />
        <path d="M4.80005 0.535995L7.20005 2.648L4.80005 4.76" stroke="black" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default AddressBar;
