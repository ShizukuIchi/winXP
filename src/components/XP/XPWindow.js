import React from 'react';

const XPWindow = ({
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
  ...props
}) => {
  return (
    <div className={`window ${className}`} style={{ height: '100%', display: 'flex', flexDirection: 'column', ...style }} {...props}>
      {title && !hideTitle && (
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            {onMinimize && (
              <button
                aria-label="Minimize"
                onClick={onMinimize}
                type="button"
              />
            )}
            {onMaximize && (
              <button
                aria-label="Maximize"
                onClick={onMaximize}
                type="button"
              />
            )}
            {onClose && (
              <button
                aria-label="Close"
                onClick={onClose}
                type="button"
              />
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