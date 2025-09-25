import React from 'react';
import { XPContainer } from './XPContainer';

export interface XPGroupBoxProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactNode;
}

const XPGroupBox: React.FC<XPGroupBoxProps> = ({
  legend,
  children,
  className = '',
  ...rest
}) => {
  return (
    <XPContainer>
      <fieldset className={className} {...rest}>
        {legend && <legend>{legend}</legend>}
        {children}
      </fieldset>
    </XPContainer>
  );
};

export default XPGroupBox;
