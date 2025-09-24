import React from 'react';
import { XPContainer } from './XPContainer';

const XPDropdown = React.forwardRef(({
  options = [],
  value,
  onChange,
  className = '',
  disabled,
  placeholder = 'Select an option',
  ...props
}, ref) => {
  return (
    <XPContainer>
      <select
        ref={ref}
        className={className}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option
            key={option.value || index}
            value={option.value || option}
            disabled={option.disabled}
          >
            {option.label || option}
          </option>
        ))}
      </select>
    </XPContainer>
  );
});

XPDropdown.displayName = 'XPDropdown';

export default XPDropdown;