import React from 'react';
import { XPContainer } from './XPContainer';

type SliderAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>;

export interface XPSliderProps extends SliderAttributes {
  label?: React.ReactNode;
  vertical?: boolean;
  hasBoxIndicator?: boolean;
  containerClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

const XPSlider = React.forwardRef<HTMLInputElement, XPSliderProps>((props, ref) => {
  const {
    label,
    min = 0,
    max = 100,
    step = 1,
    vertical = false,
    hasBoxIndicator = false,
    className = '',
    containerClassName = '',
    style,
    onChange,
    ...rest
  } = props;

  const sliderId = React.useMemo(() => `xp-slider-${Math.random().toString(36).slice(2, 11)}`, []);
  const sliderClassName = `${hasBoxIndicator ? 'has-box-indicator' : ''} ${className}`.trim();
  const wrapperClassName = `${vertical ? 'is-vertical' : ''} ${containerClassName}`.trim();

  return (
    <XPContainer>
      <div className={wrapperClassName} style={style}>
        {label && <label htmlFor={sliderId}>{label}</label>}
        <input
          {...rest}
          ref={ref}
          type="range"
          id={sliderId}
          min={min}
          max={max}
          step={step}
          className={sliderClassName}
          onChange={onChange}
        />
      </div>
    </XPContainer>
  );
});

XPSlider.displayName = 'XPSlider';

export default XPSlider;
