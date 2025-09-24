import React from 'react';
import { cn } from '@/lib/utils';

export interface XPCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

export const XPCheckbox = React.forwardRef<HTMLInputElement, XPCheckboxProps>(
  ({ className, label, containerClassName, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={cn('field-row', containerClassName)}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={className}
          {...props}
        />
        <label htmlFor={checkboxId}>{label}</label>
      </div>
    );
  }
);

XPCheckbox.displayName = 'XPCheckbox';