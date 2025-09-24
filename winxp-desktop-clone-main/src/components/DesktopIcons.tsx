import React from 'react';

const DesktopIcons: React.FC = () => {
  return (
    <div className="w-[130px] h-[75px] absolute box-border left-[60px] top-[60px]">
      <button className="desktop-icon-button w-[130px] h-[75px] absolute box-border left-0 top-0 group hover:bg-blue-100 hover:bg-opacity-20 rounded">
        <div className="flex w-[130px] h-[15px] flex-col justify-center overflow-hidden text-white text-center text-ellipsis whitespace-nowrap text-[17px] font-normal absolute box-border left-0 top-[60px]">
          <span className="font-normal text-[17px] text-white box-border">Projects</span>
        </div>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/f6602d6c338e00f68b7ab5ab4c4473f88b78fb96?width=96"
          alt="Projects folder"
          className="box-border w-12 h-12 absolute left-[41px] top-0"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/02a3ac8e5e812169d3ff17acb4c9f3cc0df0527f?width=26"
          alt="Folder overlay"
          className="box-border w-[13px] h-3.5 absolute left-[34px] top-8"
        />
      </button>
    </div>
  );
};

export default DesktopIcons;
