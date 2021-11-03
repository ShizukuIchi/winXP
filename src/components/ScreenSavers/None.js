import React from 'react';
import styled from 'styled-components';
import windowImg from '../../assets/properties/displayProperties/screenSaver/preview-window.png';
import footerImg from '../../assets/properties/displayProperties/screenSaver/preview-footer.png';
import trashImg from '../../assets/properties/displayProperties/trash-image.png';

function None({ currentBackgroundColor }) {
  return (
    <StyledWindowsXP color={currentBackgroundColor}>
      <img src={windowImg} alt="preview-window" className="window" />
      <img src={footerImg} alt="preview-footer" className="footer" />
      <img src={trashImg} alt="preview-trash" className="trash" />
    </StyledWindowsXP>
  );
}

const StyledWindowsXP = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};

  .window {
    position: absolute;
    width: 89px;
    height: 70px;
    top: 16px;
    left: 42px;
  }

  .footer {
    position: absolute;
    width: 100%;
    height: 8px;
    top: 110px;
  }

  .trash {
    position: absolute;
    width: 8px;
    height: 9px;
    top: 98px;
    right: 5px;
  }
`;

export default None;
