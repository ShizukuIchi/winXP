import React from 'react';

const XPButton = React.forwardRef(({
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
  style,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
});

XPButton.displayName = 'XPButton';

export default XPButton;