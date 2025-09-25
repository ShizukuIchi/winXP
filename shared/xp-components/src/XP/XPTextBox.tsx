import React from 'react';
import { XPContainer } from './XPContainer';

type InputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>;

export interface XPTextBoxProps extends InputAttributes {
  label?: React.ReactNode;
  multiline?: boolean;
  stacked?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const XPTextBox = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, XPTextBoxProps>((props, ref) => {
  const {
    label,
    multiline = false,
    stacked = false,
    className = '',
    containerClassName = '',
    labelClassName = '',
    id,
    rows = 4,
    onChange,
    ...rest
  } = props;

  const generatedId = React.useMemo(() => `xp-textbox-${Math.random().toString(36).slice(2, 11)}`, []);
  const textboxId = id ?? generatedId;
  const containerClass = stacked ? 'field-row-stacked' : 'field-row';
  const inputAttributes = rest as React.InputHTMLAttributes<HTMLInputElement>;
  const textAreaAttributes = rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>;

  return (
    <XPContainer>
      <div className={`${containerClass} ${containerClassName}`}>
        {label && (
          <label htmlFor={textboxId} className={labelClassName}>
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            {...textAreaAttributes}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={textboxId}
            className={className}
            rows={rows}
            onChange={onChange}
          />
        ) : (
          <input
            {...inputAttributes}
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            id={textboxId}
            className={className}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          />
        )}
      </div>
    </XPContainer>
  );
});

XPTextBox.displayName = 'XPTextBox';

export default XPTextBox;
