import React from 'react';

interface XPCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Checkbox label text */
  label: React.ReactNode;
  /** Additional CSS class names for the input */
  className?: string;
  /** Additional CSS class names for the container div */
  containerClassName?: string;
  /** Checkbox id (auto-generated if not provided) */
  id?: string;
  /** Whether checkbox is checked */
  checked?: boolean;
  /** Change event handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether checkbox is disabled */
  disabled?: boolean;
}

/**
 * Windows XP-styled checkbox component using XP.css
 * Provides authentic Windows XP checkbox appearance with label
 */
const XPCheckbox = React.forwardRef<HTMLInputElement, XPCheckboxProps>(({
  label,
  className = '',
  containerClassName = '',
  id,
  checked,
  onChange,
  disabled,
  ...props
}, ref) => {
  const checkboxId = id || `xp-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`field-row ${containerClassName}`}>
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        className={className}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <label htmlFor={checkboxId}>{label}</label>
    </div>
  );
});

XPCheckbox.displayName = 'XPCheckbox';

export default XPCheckbox;