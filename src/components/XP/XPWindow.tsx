import React from 'react';
import { WindowProps } from 'types/components';

type DivAttributes = React.HTMLAttributes<HTMLDivElement>;

type XPWindowProps = WindowProps & Omit<DivAttributes, keyof WindowProps>;

const XPWindow: React.FC<XPWindowProps> = ({
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  className = '',
  style,
  showStatusBar = false,
  statusText = '',
  resizable = true,
  hideTitle = false,
  ...divProps
}) => {
  const wrapperStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    resize: resizable ? undefined : 'none',
    ...(style ?? {})
  };

  return (
    <div className={`window ${className}`.trim()} style={wrapperStyle} {...divProps}>
      {title && !hideTitle && (
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            {onMinimize && (
              <button aria-label="Minimize" onClick={onMinimize} type="button" />
            )}
            {onMaximize && (
              <button aria-label="Maximize" onClick={onMaximize} type="button" />
            )}
            {onClose && (
              <button aria-label="Close" onClick={onClose} type="button" />
            )}
          </div>
        </div>
      )}
      <div className="window-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      {showStatusBar && (
        <div className="status-bar">
          <div className="status-bar-field">{statusText}</div>
        </div>
      )}
    </div>
  );
};

export default XPWindow;
