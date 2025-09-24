import React from 'react';

interface TaskbarButtonProps {
  title: string;
  icon: string;
  isPressed?: boolean;
  className?: string;
}

const TaskbarButton: React.FC<TaskbarButtonProps> = ({ 
  title, 
  icon, 
  isPressed = false, 
  className = "" 
}) => {
  const buttonClass = isPressed 
    ? "w-[154px] h-[31px] rounded shadow-[-1px_-1px_0_0_#0E3CA2_inset,1.5px_1.5px_1px_0_#123D94_inset] absolute box-border border-[0.5px] border-solid border-[rgba(35,75,157,0.50)] left-0 top-0"
    : "w-[154px] h-[31px] rounded shadow-[1px_1px_1px_0_rgba(255,255,255,0.30)_inset,-1px_-1px_1px_0_rgba(0,0,0,0.15)_inset] absolute box-border bg-gradient-to-b from-[#4A90E2] to-[#2171B5] border-[0.5px] border-solid border-[rgba(35,75,157,0.50)] left-0 top-0";

  return (
    <button className={`taskbar-button w-[154px] h-[31px] absolute box-border ${className}`}>
      <div className="w-[154px] h-[31px] absolute box-border left-0 top-0">
        <div className={buttonClass} />
      </div>
      <div className="flex w-[110px] h-[31px] flex-col justify-center overflow-hidden text-white text-ellipsis whitespace-nowrap text-[11px] font-normal absolute box-border left-[30px] top-0">
        <span className="font-normal text-[11px] text-white">{title}</span>
      </div>
      <img
        src={icon}
        alt={`${title} icon`}
        className="box-border w-4 h-4 absolute left-2 top-2"
      />
    </button>
  );
};

export default TaskbarButton;
