import React from 'react';
import { XPContainer } from './XPContainer';

const XPSlider = React.forwardRef(({
  label,
  min = 0,
  max = 100,
  value,
  onChange,
  step = 1,
  vertical = false,
  hasBoxIndicator = false,
  className = '',
  containerClassName = '',
  style,
  ...props
}, ref) => {
  const sliderId = `xp-slider-${Math.random().toString(36).substr(2, 9)}`;
  const sliderClass = `${hasBoxIndicator ? 'has-box-indicator' : ''} ${className}`;
  const containerClass = vertical ? 'is-vertical' : '';

  return (
    <XPContainer>
      <div className={`${containerClass} ${containerClassName}`} style={style}>
        {label && <label htmlFor={sliderId}>{label}</label>}
        <input
          ref={ref}
          type="range"
          id={sliderId}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          step={step}
          className={sliderClass}
          {...props}
        />
      </div>
    </XPContainer>
  );
});

XPSlider.displayName = 'XPSlider';

export default XPSlider;