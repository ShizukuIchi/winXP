import React from 'react';
import { XPContainer } from './XPContainer';
import type { DropdownValue, OptionGroupEntry } from 'types/components';

export interface XPOptionButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: React.ReactNode;
  containerClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: DropdownValue | string;
  checked?: boolean;
}

interface NormalizedOption {
  value: DropdownValue | string;
  label: React.ReactNode;
  disabled?: boolean;
}

const XPOptionButton = React.forwardRef<HTMLInputElement, XPOptionButtonProps>((props, ref) => {
  const {
    label,
    name,
    value,
    checked,
    onChange,
    disabled,
    className = '',
    containerClassName = '',
    id,
    ...rest
  } = props;

  const generatedId = React.useMemo(() => `xp-radio-${Math.random().toString(36).slice(2, 11)}`, []);
  const radioId = id ?? generatedId;

  return (
    <XPContainer>
      <div className={`field-row ${containerClassName}`.trim()}>
        <input
          {...rest}
          ref={ref}
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={className}
        />
        <label htmlFor={radioId}>{label}</label>
      </div>
    </XPContainer>
  );
});

XPOptionButton.displayName = 'XPOptionButton';

const normalizeOption = (option: OptionGroupEntry, index: number): NormalizedOption => {
  if (typeof option === 'object' && option !== null) {
    return {
      value: option.value ?? `option-${index}`,
      label: option.label ?? option.value ?? `Option ${index + 1}`,
      disabled: option.disabled
    };
  }

  return {
    value: option,
    label: option
  };
};

export interface XPOptionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: OptionGroupEntry[];
  name: string;
  value?: DropdownValue | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const XPOptionGroup: React.FC<XPOptionGroupProps> = ({
  options = [],
  name,
  value,
  onChange,
  className = '',
  ...rest
}) => {
  return (
    <XPContainer>
      <div className={className} {...rest}>
        {options.map((option, index) => {
          const normalized = normalizeOption(option, index);
          const optionValue = normalized.value ?? `option-${index}`;

          return (
            <XPOptionButton
              key={String(optionValue)}
              label={normalized.label}
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={onChange}
              disabled={normalized.disabled}
            />
          );
        })}
      </div>
    </XPContainer>
  );
};

export default XPOptionButton;
