import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const getImageWidth = src => {
  const shadowImage = new Image();
  shadowImage.src = src;
  return shadowImage.width;
};

function BackgroundView({ background }) {
  const { position, image, color } = background;
  const [width, setWidth] = useState();
  const backgroundRef = useRef(null);

  const imagewidth = getImageWidth(image);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const backgroundWidth = backgroundRef.current.clientWidth;
    const windowWidth = window.innerWidth;

    if (backgroundWidth !== windowWidth && imagewidth > 0) {
      setWidth((imagewidth / windowWidth) * 100);
    }
  }, [image, imagewidth, position]);

  return (
    <Background
      ref={backgroundRef}
      position={position}
      image={image}
      color={color}
      size={width}
    />
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  ${({ image, color, position, size }) => {
    return `
      background-image: url(${image});
      background-color: ${color}
      background-repeat: ${position === 'tile' ? 'repeat' : 'no-repeat'};
      background-position: ${position === 'tile' ? 'top left' : 'center'};
      background-size: ${position === 'stretch' ? '100% 100%' : `${size}%`}; 
    `;
  }}
`;

export default BackgroundView;
