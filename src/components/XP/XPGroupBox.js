import React from 'react';
import { XPContainer } from './XPContainer';

const XPGroupBox = ({
  legend,
  children,
  className = '',
  ...props
}) => {
  return (
    <XPContainer>
      <fieldset className={className} {...props}>
        {legend && <legend>{legend}</legend>}
        {children}
      </fieldset>
    </XPContainer>
  );
};

export default XPGroupBox;