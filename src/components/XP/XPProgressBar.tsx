import React from 'react';
import { XPContainer } from './XPContainer';

export interface XPProgressBarProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  value?: number;
  max?: number;
}

const XPProgressBar: React.FC<XPProgressBarProps> = ({
  value,
  max = 100,
  className = '',
  ...rest
}) => {
  const percentage = value !== undefined && max ? Math.round((value / max) * 100) : undefined;

  return (
    <XPContainer>
      <progress value={value} max={max} className={className} {...rest}>
        {percentage !== undefined ? `${percentage}%` : 'Loading...'}
      </progress>
    </XPContainer>
  );
};

export default XPProgressBar;
