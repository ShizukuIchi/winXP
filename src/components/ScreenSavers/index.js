import React from 'react';
import styled from 'styled-components';
import WindowsXP from './WindowsXP';

function ScreenSaver() {
  return (
    <StyledScreenSaver>
      <WindowsXP />
    </StyledScreenSaver>
  );
}

const StyledScreenSaver = styled.div``;

export default ScreenSaver;
