import React from 'react';
import styled from 'styled-components';

import error from 'src/assets/windowsIcons/897(32x32).png';

function Error({ onClose, className }) {
  return (
    <div className={className}>
      <div className="error__top">
        <img src={error} alt="error" className="error__img" />
        <div className="error__messages">
          <div className="error__message">C:\</div>
          <div className="error__message">Application not found</div>
        </div>
      </div>
      <div className="error__bottom">
        <div onClick={onClose} className="error__button">
          <span>OK</span>
        </div>
      </div>
    </div>
  );
}

export default styled(Error)`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  font-size: 11px;
  padding: 12px;
  .error__top {
    display: flex;
  }
  .error__img {
    width: 30px;
    height: 30px;
  }
  .error__messages {
    padding-top: 3px;
    line-height: 11px;
  }
  .error__message {
    margin-bottom: 9px;
    margin-left: 20px;
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
      box-shadow: inset 1px 1px 1px -1px black;
      & > * {
        transform: translate(1px, 1px);
      }
    }
  }
`;
