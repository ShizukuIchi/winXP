import React, { useState, useEffect } from 'react';
import useIdle from 'react-use/lib/useIdle';

import { useResettableTimeout } from 'src/hooks';
import { twoDigits, getDayStr, getMonthStr } from 'src/lib';
import Header from './Header';
import LoginContainer from './LoginContainer';
import Idle from './Idle';
import './style.css';

Ubuntu.defaultProps = {
  hintTimeout: 1300,
  idleTimeout: 5000,
};

function Ubuntu({ hintTimeout, idleTimeout }) {
  const [password, setPassword] = useState('');
  const [hint, setHint] = useState('');
  const [time, setTime] = useState('');
  const [dateString, setDateString] = useState('');
  const isIdle = useIdle(idleTimeout);
  const resetHintTimeout = useResettableTimeout(hintTimeout, setHint, '');
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  function onSubmit() {
    if (!password.length) return;
    setHint('Wrong password!');
    resetHintTimeout();
  }
  function onPasswordClear() {
    setPassword('');
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setDateString(formatDateStr(date));
      setTime([date.getHours(), date.getMinutes()].map(twoDigits).join(':'));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div
      style={{
        position: 'relative',
        fontFamily: 'Ubuntu',
        height: '100%',
      }}
    >
      <Header />
      <LoginContainer
        onPasswordChange={onPasswordChange}
        password={password}
        hint={hint}
        onSubmit={onSubmit}
        onPasswordClear={onPasswordClear}
      />
      <Idle show={isIdle} time={time} dateString={dateString} />
    </div>
  );
}

export function formatDateStr(date) {
  return `${getDayStr(date.getDay())}, ${getMonthStr(
    date.getMonth(),
  )} ${date.getDate()}`;
}

export default Ubuntu;
