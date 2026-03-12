import React, { useEffect, useRef } from 'react';
import Webamp from 'webamp';
import { initialTracks } from './config';

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
      initialSkin: {
        url: null, // Use default skin
      },
      enableHotkeys: false, // Disable hotkeys to avoid conflicts
    });
    
    webamp.current.renderWhenReady(target).then(() => {
      // Find the webamp element and move it into our container
      const webampEl = document.querySelector('#webamp');
      if (webampEl && target) {
        // Reset positioning to work within our container
        webampEl.style.position = 'relative';
        webampEl.style.left = 'auto';
        webampEl.style.top = 'auto';
        webampEl.style.transform = 'none';
        target.appendChild(webampEl);
      }
    });
    
    return () => {
      if (webamp.current) {
        webamp.current.dispose();
        webamp.current = null;
      }
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
        width: '100%', 
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
      ref={ref}
    />
  );
}

export default Winamp;
