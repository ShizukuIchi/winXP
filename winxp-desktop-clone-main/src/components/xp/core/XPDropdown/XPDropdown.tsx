import React from 'react';
import { cn } from '@/lib/utils';

export interface XPDropdownOption {
  value: string;
  label: string;
}

export interface XPDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: XPDropdownOption[];
  placeholder?: string;
}

export const XPDropdown = React.forwardRef<HTMLSelectElement, XPDropdownProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={className}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

XPDropdown.displayName = 'XPDropdown';