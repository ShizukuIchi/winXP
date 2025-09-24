import React from 'react';
import { cn } from '@/lib/utils';

export interface XPTitleBarProps {
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onHelp?: () => void;
  className?: string;
}

export const XPTitleBar: React.FC<XPTitleBarProps> = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
  onHelp,
  className
}) => {
  return (
    <div className={cn('title-bar', className)}>
      <div className="title-bar-text">{title}</div>
      <div className="title-bar-controls">
        {onHelp && (
          <button aria-label="Help" onClick={onHelp}></button>
        )}
        {onMinimize && (
          <button aria-label="Minimize" onClick={onMinimize}></button>
        )}
        {onMaximize && (
          <button aria-label="Maximize" onClick={onMaximize}></button>
        )}
        {onClose && (
          <button aria-label="Close" onClick={onClose}></button>
        )}
      </div>
    </div>
  );
};