import React, { useMemo } from 'react';
import styled from 'styled-components';

const Pipes3D = ({ settings }) => {
  if (!settings) settings = {};

  const encodedParams = useMemo(() => {
    let paramsString = JSON.stringify(settings).slice(1, -1);
    return encodeURIComponent(paramsString);
  }, [settings]);

  return (
    <StyledPipes>
      <iframe
        title="pipes-3D"
        src={`./pipes/index.html#{${encodedParams}}`}
      ></iframe>
    </StyledPipes>
  );
};

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
