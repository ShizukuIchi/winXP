import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Webamp from 'webamp';
import { initialTracks } from './config';

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
  return <Layer ref={ref} />;
}

// Sized in vw/vh rather than right/bottom:0 because every desktop window
// carries a CSS transform, which makes it the containing block for
// position:fixed children. With right/bottom the layer collapsed to the
// window's 0x0 size and webamp centred its stack into the top left corner.
//
// Covering the viewport means this layer would otherwise swallow every click
// on the desktop behind it, breaking icon selection and drag to select, so it
// ignores pointer events and hands them back to webamp's own windows.
const Layer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: calc(100vh - ${TASKBAR_HEIGHT}px);
  pointer-events: none;

  #webamp {
    pointer-events: auto;
  }
`;

export default Winamp;
