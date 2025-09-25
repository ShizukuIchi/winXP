import React from 'react';
import { XPContainer } from './XPContainer';
import type { DropdownOption, DropdownValue } from 'types/components';

export interface XPDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: DropdownOption[];
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const isOptionObject = (option: DropdownOption): option is Exclude<DropdownOption, DropdownValue> => {
  return typeof option === 'object' && option !== null && !Array.isArray(option);
};

const getOptionValue = (option: DropdownOption, fallback: string): DropdownValue | string => {
  if (isOptionObject(option)) {
    if (option.value !== undefined) {
      return option.value;
    }
    if (typeof option.label === 'string') {
      return option.label;
    }
    return fallback;
  }

  return option;
};

const getOptionLabel = (option: DropdownOption): React.ReactNode => {
  if (isOptionObject(option)) {
    return option.label ?? option.value;
  }

  return option;
};

const isOptionDisabled = (option: DropdownOption): boolean => {
  return Boolean(isOptionObject(option) && option.disabled);
};

const XPDropdown = React.forwardRef<HTMLSelectElement, XPDropdownProps>((props, ref) => {
  const {
    options = [],
    value,
    onChange,
    className = '',
    disabled,
    placeholder = 'Select an option',
    ...rest
  } = props;

  return (
    <XPContainer>
      <select
        {...rest}
        ref={ref}
        className={className}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => {
          const fallback = `option-${index}`;
          const optionValue = getOptionValue(option, fallback);
          const optionKey = `${optionValue ?? fallback}`;

          return (
            <option
              key={optionKey}
              value={optionValue ?? fallback}
              disabled={isOptionDisabled(option)}
            >
              {getOptionLabel(option)}
            </option>
          );
        })}
      </select>
    </XPContainer>
  );
});

XPDropdown.displayName = 'XPDropdown';

export default XPDropdown;
