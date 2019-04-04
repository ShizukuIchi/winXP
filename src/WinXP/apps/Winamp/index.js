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
    webamp.renderWhenReady(target);
    webamp.onClose(onClose);
    webamp.onMinimize(onMinimize);
    return () => {
      webamp.dispose();
    };
  }, []);
  return <div ref={ref} />;
}

export default Winamp;
