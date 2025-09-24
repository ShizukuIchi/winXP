import React from 'react';
import { cn } from '@/lib/utils';

export interface XPTextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  stacked?: boolean;
  containerClassName?: string;
}

export const XPTextBox = React.forwardRef<HTMLInputElement, XPTextBoxProps>(
  ({ className, label, stacked = false, containerClassName, id, ...props }, ref) => {
    const inputId = id || `textbox-${Math.random().toString(36).substr(2, 9)}`;
    
    if (!label) {
      return (
        <input
          ref={ref}
          type="text"
          id={inputId}
          className={className}
          {...props}
        />
      );
    }

    return (
      <div className={cn(stacked ? 'field-row-stacked' : 'field-row', containerClassName)}>
        <label htmlFor={inputId}>{label}</label>
        <input
          ref={ref}
          type="text"
          id={inputId}
          className={className}
          {...props}
        />
      </div>
    );
  }
);

XPTextBox.displayName = 'XPTextBox';