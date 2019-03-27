import React from 'react';
import styled from 'styled-components';

function Header({ className }) {
  return <header className={className} />;
}

export default styled(Header)`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 25px;
  border: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;
