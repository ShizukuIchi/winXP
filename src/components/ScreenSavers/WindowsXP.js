import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import logoXP from 'assets/properties/displayProperties/screenSaver/windows-xp-logo.png';

function WindowsXP({
  winWidth = window.innerWidth,
  winHeight = window.innerHeight,
  imgHeight = 175,
  imgWidth = 240,
}) {
  const [logoPosition, setLogoPosition] = useState({ posY: 0, posX: 0 });

  const randomizeLogoPosition = useCallback(() => {
    let randomPosY = Math.random() * (winHeight - imgHeight);
    let randomPosX = Math.random() * (winWidth - imgWidth);
    setLogoPosition({
      posY: randomPosY,
      posX: randomPosX,
    });
  }, [winWidth, winHeight, imgHeight, imgWidth]);

  useEffect(() => {
    randomizeLogoPosition();
    const id = setInterval(() => {
      randomizeLogoPosition();
    }, 10000);
    return () => {
      clearInterval(id);
    };
  }, [randomizeLogoPosition]);

  return (
    <StyledWindowsXP {...logoPosition}>
      <img src={logoXP} alt="XP logo" width={imgWidth} height={imgHeight} />
    </StyledWindowsXP>
  );
}

const StyledWindowsXP = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: black;

  img {
    position: relative;
    top: ${props => `${props.posY}px`};
    left: ${props => `${props.posX}px`};
  }
`;
export default WindowsXP;
