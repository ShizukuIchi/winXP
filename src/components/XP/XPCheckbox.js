import React from 'react';

const XPCheckbox = React.forwardRef(({
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