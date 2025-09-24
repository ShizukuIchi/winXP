import React from 'react';
import { XPContainer } from './XPContainer';

const XPProgressBar = ({
  value,
  max = 100,
  className = '',
  ...props
}) => {
  return (
    <XPContainer>
      <progress
        value={value}
        max={max}
        className={className}
        {...props}
      >
        {value !== undefined ? `${Math.round((value / max) * 100)}%` : 'Loading...'}
      </progress>
    </XPContainer>
  );
};

export default XPProgressBar;