import React from 'react';
import styled from 'styled-components';

function Blank() {
  return <StyledWindowsXP />;
}

const StyledWindowsXP = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: black;
`;

export default Blank;
