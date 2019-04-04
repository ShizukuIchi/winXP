import React, { useEffect, useRef } from 'react';
import Webamp from 'webamp';
import { initialTracks } from './config';

function Winamp({ onClose, onMinimize }) {
  const ref = useRef(null);
  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }
    const webamp = new Webamp({
      initialTracks,
    });
    webamp.renderWhenReady(target).then(() => {
      target.appendChild(document.querySelector('#webamp'));
    });
    webamp.onClose(onClose);
    webamp.onMinimize(onMinimize);
  }, []);
  return (
    <div
      style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0 }}
      ref={ref}
    />
  );
}

export default Winamp;
