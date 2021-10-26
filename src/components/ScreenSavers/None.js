import React from 'react';
import styled from 'styled-components';
import nonePreview from '../../assets/properties/displayProperties/screenSaver/none-preview.png';

function None() {
  return (
    <StyledWindowsXP>
      <img src={nonePreview} alt="XP logo" width="100%" height="100%" />
    </StyledWindowsXP>
  );
}

const StyledWindowsXP = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export default None;
