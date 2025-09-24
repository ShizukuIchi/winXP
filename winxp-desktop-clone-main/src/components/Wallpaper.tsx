import React from 'react';

const Wallpaper: React.FC = () => {
  return (
    <div className="w-full h-full absolute box-border left-0 top-0">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/6617f28743fe46f125f465979ff403b3706db63a?width=3840"
        alt="Windows XP Wallpaper"
        className="box-border w-full h-full object-cover absolute left-0 top-0"
      />
    </div>
  );
};

export default Wallpaper;
