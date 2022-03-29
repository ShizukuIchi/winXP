import React from 'react';
import styled from 'styled-components';

function LegendFieldset(props) {
  return <StyledLegendFieldset {...props} />;
}

const StyledLegendFieldset = styled.fieldset`
  border: 1px solid #e1e1d4;
  border-radius: 5px;

  legend {
    color: #255fd5;
    position: relative;
  }
`;

export default LegendFieldset;
