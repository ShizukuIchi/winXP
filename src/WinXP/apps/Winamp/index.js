import React, { useEffect, useRef } from 'react';
import Webamp from 'webamp';
import { initialTracks } from './config';

// The desktop puts a CSS transform on every window, which makes that window the
// containing block for position:fixed children. So this layer can't measure the
// viewport with right/bottom:0 - it collapses to the window's 0x0 size, and
// webamp then centres its stack inside that empty box, landing top left.
// Sizing it in vw/vh is viewport relative regardless, so webamp centres for real.
const TASKBAR_HEIGHT = 30;

function Winamp({ onClose, onMinimize }) {
  const ref = useRef(null);
  const webamp = useRef(null);
  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }
    webamp.current = new Webamp({
      initialTracks,
    });
    webamp.current.renderWhenReady(target).then(() => {
      target.appendChild(document.querySelector('#webamp'));
    });
    return () => {
      webamp.current.dispose();
      webamp.current = null;
    };
  }, []);
  useEffect(() => {
    if (webamp.current) {
      webamp.current.onClose(onClose);
      webamp.current.onMinimize(onMinimize);
    }
  });
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
      }}
      ref={ref}
    />
  );
}

export default Winamp;
