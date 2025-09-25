import React from 'react';

interface XPButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Windows XP-styled button component using XP.css
 * Provides authentic Windows XP button appearance and behavior
 */
const XPButton = React.forwardRef<HTMLButtonElement, XPButtonProps>(({
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