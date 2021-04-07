import React from 'react';
import styled from 'styled-components';

function BackgroundView({ background }) {
  const { position, image, color } = background;
  return <Background position={position} image={image} color={color} />;
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  ${({ desktop: { image, color, position } }) => {
    return `background-image: url(${image});
      background-color: ${color}
      background-repeat: ${position === 'tile' ? 'repeat' : 'no-repeat'};
      background-position: ${position === 'tile' ? 'top left' : 'center'};
      background-size: ${position === 'stretch' ? '100% 100%' : ''}; 
    `;
  }}
`;

export default BackgroundView;
