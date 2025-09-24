import React, { useEffect, useRef } from 'react';
import Webamp from 'webamp';

import { initialTracks } from './config';

interface WinampProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

const Winamp: React.FC<WinampProps> = ({ onClose, onMinimize }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const webampRef = useRef<Webamp | null>(null);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) {
      return;
    }

    const instance = new Webamp({ initialTracks });
    webampRef.current = instance;

    instance.renderWhenReady(target).then(() => {
      const webampElement = document.getElementById('webamp');
      if (webampElement && !target.contains(webampElement)) {
        target.appendChild(webampElement);
      }
    });

    return () => {
      instance.dispose();
      webampRef.current = null;
    };
  }, []);

  useEffect(() => {
    const instance = webampRef.current;
    if (!instance) {
      return;
    }

    if (onClose) {
      instance.onClose(onClose);
    }

    if (onMinimize) {
      instance.onMinimize(onMinimize);
    }
  }, [onClose, onMinimize]);

  return (
    <div
      style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0 }}
      ref={containerRef}
    />
  );
};

export default Winamp;
