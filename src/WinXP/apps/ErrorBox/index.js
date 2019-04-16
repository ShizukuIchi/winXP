import React, { useState } from 'react';
import styled from 'styled-components';
import Sound from 'react-sound';
import error from 'src/assets/windowsIcons/897(32x32).png';
import errorsound from "../../../assets/sounds/Windows_XP_Error.wav";

function lineBreak(str) {
    return str.split('\n').map((s, i) => (
        <p key={i} className="error__message">
            {s}
        </p>
    ));
}

function Error({ onClose, message = "Something's wrong!" }) {
    const [didSoundPlay, setDidSoundPlay] = useState(false);

    return (
        <Div>
            {!didSoundPlay &&
            <Sound
                url={errorsound}
                playStatus={Sound.status.PLAYING}
                playFromPosition={0}
                onLoad={() => setDidSoundPlay(true)}
            />
            }
            <div className="error__top">
                <img src={error} alt="error" className="error__img" />
                <div className="error__messages">{lineBreak(message)}</div>
            </div>
            <div className="error__bottom">
                <div onClick={onClose} className="error__button">
                    <span className="error__confirm">OK</span>
                </div>
            </div>
        </Div>
    );
}

const Div = styled.div`
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

export default Error;
