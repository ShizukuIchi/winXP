import React from 'react';
import { cn } from '@/lib/utils';

export interface XPButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Render a plain button so XP.css can fully style it.
export const XPButton = React.forwardRef<HTMLButtonElement, XPButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(className)} {...props}>
        {children}
      </button>
    );
  }
);

XPButton.displayName = 'XPButton';