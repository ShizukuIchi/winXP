import React from 'react';
import { cn } from '@/lib/utils';

export interface XPProgressBarProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  indeterminate?: boolean;
}

export const XPProgressBar = React.forwardRef<HTMLProgressElement, XPProgressBarProps>(
  ({ className, indeterminate = false, value, max = 100, ...props }, ref) => {
    if (indeterminate) {
      return (
        <progress
          ref={ref}
          className={className}
          {...props}
        />
      );
    }

    return (
      <progress
        ref={ref}
        className={className}
        max={max}
        value={value}
        {...props}
      />
    );
  }
);

XPProgressBar.displayName = 'XPProgressBar';