import React from 'react';

const MenuBar: React.FC = () => {
  const menuItems = [
    { label: 'File', underlineChar: 'F' },
    { label: 'Edit', underlineChar: 'E' },
    { label: 'View', underlineChar: 'V' },
    { label: 'Favorites', underlineChar: 'F' },
    { label: 'Tools', underlineChar: 'T' },
    { label: 'Help', underlineChar: 'H' }
  ];

  return (
    <div className="w-[679px] h-[22px] absolute box-border left-1 top-[28px]">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/796fbefe1931224211ea346fb4d2b95e32ce1a84?width=1661"
        alt="Menu bar background"
        className="box-border w-[679px] h-[22px] absolute left-0 top-0"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/21705bd7c3bb0a00ebfb08055733d8dd2504bc6d?width=77"
        alt="Menu bar end"
        className="box-border w-[31px] h-[22px] absolute left-[648px] top-0"
      />
      
      {menuItems.map((item, index) => {
        const positions = [11, 40, 70, 105, 155, 191];
        const widths = [14, 16, 20, 36, 21, 19];
        
        return (
          <button
            key={item.label}
            className="menu-bar-button flex items-center justify-center text-black text-[9px] font-normal absolute top-[2px] h-[18px] hover:bg-blue-100"
            style={{ left: `${positions[index]}px`, width: `${widths[index]}px` }}
          >
            <span className="font-normal text-[9px] text-black">
              <span className="underline">{item.underlineChar}</span>{item.label.substring(1)}
            </span>
          </button>
        );
      })}
      
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/6d18514446cad775aa29eef2eb7e4ab6fddf5ba4?width=41"
        alt="Help icon"
        className="box-border w-[16px] h-[15px] absolute left-[656px] top-[4px]"
      />
    </div>
  );
};

export default MenuBar;
