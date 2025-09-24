import React from 'react';

interface WindowTitleProps {
  title: string;
  onClose?: () => void;
}

const WindowTitle: React.FC<WindowTitleProps> = ({ title, onClose }) => {
  return (
    <header className="w-[683px] h-[28px] absolute box-border left-1 top-0">
      <div className="w-[683px] h-[25px] shadow-[0_1px_0.5px_0_#3291FF_inset] absolute box-border rounded-[5px_5px_0_0] left-0 top-1" />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/f9cecbd23516d18a08ca43adba9ba72efdf63fd8?width=40"
        alt="Internet Explorer icon"
        className="box-border w-4 h-[14px] absolute left-[7px] top-2"
      />
      <div className="flex w-[600px] h-[28px] flex-col justify-center text-white text-[11px] font-normal absolute box-border left-[28px] top-0">
        <span className="font-normal text-[11px] text-white">{title}</span>
      </div>
      <button 
        onClick={onClose}
        className="window-close-button absolute right-1 top-1 w-[16px] h-[16px] group"
        aria-label="Close window"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-[16px] h-[16px]"
        >
          <g filter="url(#filter0_iiii_20_330)">
            <rect y="0.800003" width="19.2" height="19.2" rx="2.4" fill="url(#paint0_linear_20_330)" />
            <rect y="0.800003" width="19.2" height="19.2" rx="2.4" fill="#E13903" fillOpacity="0.25" />
          </g>
          <rect x="0.3" y="1.1" width="18.6" height="18.6" rx="2.1" stroke="white" strokeWidth="0.6" />
          <path d="M6 6.8L13.2 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 14L13.2 6.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <defs>
            <filter id="filter0_iiii_20_330" x="-2.4" y="-4" width="21.6" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-1.2" dy="-1.2" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.811765 0 0 0 0 0.184314 0 0 0 0 0.00392157 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_20_330" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="1.2" dy="1.2" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend mode="normal" in2="effect1_innerShadow_20_330" result="effect2_innerShadow_20_330" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-2.4" dy="-4.8" />
              <feGaussianBlur stdDeviation="2.4" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.843137 0 0 0 0 0.254902 0 0 0 0 0.0823529 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="effect2_innerShadow_20_330" result="effect3_innerShadow_20_330" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-2.4" dy="-2.4" />
              <feGaussianBlur stdDeviation="1.2" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_20_330" result="effect4_innerShadow_20_330" />
            </filter>
            <linearGradient id="paint0_linear_20_330" x1="2.4" y1="3.2" x2="16.8" y2="18.2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DE836D" />
              <stop offset="1" stopColor="#FF4000" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    </header>
  );
};

export default WindowTitle;
