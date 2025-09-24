import React from 'react';
import { cn } from '@/lib/utils';

export interface XPWindowProps {
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const XPWindow: React.FC<XPWindowProps> = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
  children,
  className,
  style
}) => {
  return (
    <div className={cn('window', className)} style={style}>
      {title && (
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
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
      )}
      <div className="window-body">
        {children}
      </div>
    </div>
  );
};