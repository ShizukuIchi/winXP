import React from 'react';
import styled from 'styled-components';

function Pipes3D() {
  return (
    <StyledPipes>
      <iframe title="pipes-3D" src="./pipes/index.html"></iframe>
    </StyledPipes>
  );
}

const StyledPipes = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
  background-color: black;
`;

export default Pipes3D;
