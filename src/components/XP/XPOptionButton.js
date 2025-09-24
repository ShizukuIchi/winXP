import React from 'react';
import { XPContainer } from './XPContainer';

const XPOptionButton = React.forwardRef(({
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
  className = '',
  containerClassName = '',
  id,
  ...props
}, ref) => {
  const radioId = id || `xp-radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <XPContainer>
      <div className={`field-row ${containerClassName}`}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={className}
          {...props}
        />
        <label htmlFor={radioId}>{label}</label>
      </div>
    </XPContainer>
  );
});

XPOptionButton.displayName = 'XPOptionButton';

// Group component for radio buttons
const XPOptionGroup = ({
  options = [],
  name,
  value,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <XPContainer>
      <div className={className} {...props}>
        {options.map((option, index) => (
          <XPOptionButton
            key={option.value || index}
            label={option.label || option}
            name={name}
            value={option.value || option}
            checked={value === (option.value || option)}
            onChange={onChange}
            disabled={option.disabled}
          />
        ))}
      </div>
    </XPContainer>
  );
};

export default XPOptionButton;
export { XPOptionGroup };