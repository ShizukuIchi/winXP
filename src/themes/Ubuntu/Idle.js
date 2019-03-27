import React from 'react';
import styled from 'styled-components';

import ubuntuBackground from 'src/assets/ubuntu1804.jpg';

function Idle({ className, time, dateString }) {
  return (
    <div className={className}>
      <div className="time-container">
        <div className="content">
          <div className="time">{time}</div>
          <div className="date">{dateString}</div>
        </div>
      </div>
    </div>
  );
}

Idle.defaultProps = {
  time: '22:22',
  dateString: 'Tuesday, February 2',
};

export default styled(Idle)`
  transition: transform 1s;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-100%)')};
  height: 100%;
  width: 100%;
  background: url(${ubuntuBackground});
  background-size: cover;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    height: 100%;
    color: #fff;
    padding-bottom: 20px;
  }
  .time {
    text-shadow: -1px 2px 4px rgb(50, 50, 50);
    text-align: center;
    font-size: 6rem;
    font-weight: 600;
    margin-bottom: 7px;
  }
  .date {
    text-shadow: -1px 1px rgb(50, 50, 50);
    font-size: 2.3rem;
    font-weight: 100;
    text-align: center;
  }
`;
