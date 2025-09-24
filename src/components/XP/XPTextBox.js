import React from 'react';
import { XPContainer } from './XPContainer';

const XPTextBox = React.forwardRef(({
  label,
  multiline = false,
  stacked = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  id,
  value,
  onChange,
  placeholder,
  disabled,
  rows = 4,
  ...props
}, ref) => {
  const textboxId = id || `xp-textbox-${Math.random().toString(36).substr(2, 9)}`;
  const containerClass = stacked ? 'field-row-stacked' : 'field-row';

  const inputProps = {
    ref,
    id: textboxId,
    className,
    value,
    onChange,
    placeholder,
    disabled,
    ...props
  };

  return (
    <XPContainer>
      <div className={`${containerClass} ${containerClassName}`}>
        {label && (
          <label htmlFor={textboxId} className={labelClassName}>
            {label}
          </label>
        )}
        {multiline ? (
          <textarea rows={rows} {...inputProps} />
        ) : (
          <input type="text" {...inputProps} />
        )}
      </div>
    </XPContainer>
  );
});

XPTextBox.displayName = 'XPTextBox';

export default XPTextBox;