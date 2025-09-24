import React, { useEffect } from 'react';
import styled from 'styled-components';

import errorSoundSrc from 'assets/sounds/error.wav';
import errorIcon from 'assets/windowsIcons/897(32x32).png';

interface ErrorBoxProps {
  onClose?: () => void;
  message?: string;
}

const getMessageLines = (value: string): React.ReactNode[] =>
  value.split('\n').map((line, index) => (
    <p key={`${index}-${line}`} className="error__message">
      {line}
    </p>
  ));

const ErrorBox: React.FC<ErrorBoxProps> = ({ onClose, message = "Something's wrong!" }) => {
  useEffect(() => {
    try {
      const audio = new Audio(errorSoundSrc);
      void audio.play();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  return (
    <StyledErrorBox>
      <div className="error__top">
        <img src={errorIcon} alt="error" className="error__img" />
        <div className="error__messages">{getMessageLines(message)}</div>
      </div>
      <div className="error__bottom">
        <div className="error__button" onClick={() => onClose?.()}>
          <span className="error__confirm">OK</span>
        </div>
      </div>
    </StyledErrorBox>
  );
};

const StyledErrorBox = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  font-size: 11px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  .error__top {
    display: flex;
    flex: 1;
  }
  .error__img {
    width: 30px;
    height: 30px;
  }
  .error__messages {
    padding: 2px 20px 12px;
  }
  .error__message {
    line-height: 16px;
  }
  .error__bottom {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .error__button {
    width: 80px;
    height: 22px;
    display: flex;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    box-shadow: inset -1px -1px 1px black;
    cursor: pointer;
    &:hover:active {
      box-shadow: inset 1px 1px 1px black;
      & > * {
        transform: translate(1px, 1px);
      }
    }
  }
  .error__confirm {
    line-height: 11px;
  }
`;

export default ErrorBox;
