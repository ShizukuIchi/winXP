import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import logoXP from 'assets/properties/displayProperties/screenSaver/windows-xp-logo.png';

function WindowsXP() {
  const [logoPosition, setLogoPosition] = useState({ top: 0, left: 0 });

  const imgRef = useRef(null);
  let winWidth = window.innerWidth;
  let winHeight = window.innerHeight;

  useEffect(() => {
    randomizeLogoPosition();
    const id = setInterval(() => {
      randomizeLogoPosition();
    }, 10000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const randomizeLogoPosition = () => {
    const imgHeight = imgRef.current.offsetHeight || 175;
    const imgWidth = imgRef.current.offsetWidth || 240;
    let randomPosY = Math.random() * (winHeight - imgHeight);
    let randomPosX = Math.random() * (winWidth - imgWidth);
    setLogoPosition({
      top: randomPosY,
      left: randomPosX,
    });
  };

  return (
    <StyledWindowsXP posY={logoPosition.top} posX={logoPosition.left}>
      <img src={logoXP} alt="XP logo" ref={imgRef} />
    </StyledWindowsXP>
  );
}

const StyledWindowsXP = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: black;

  img {
    position: relative;
    top: ${props => `${props.posY}px`};
    left: ${props => `${props.posX}px`};
  }
`;
export default WindowsXP;
