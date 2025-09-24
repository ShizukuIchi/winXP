import React from 'react';
import { cn } from '@/lib/utils';

export interface XPGroupBoxProps {
  legend?: string;
  children: React.ReactNode;
  className?: string;
}

export const XPGroupBox: React.FC<XPGroupBoxProps> = ({
  legend,
  children,
  className
}) => {
  return (
    <fieldset className={className}>
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
};