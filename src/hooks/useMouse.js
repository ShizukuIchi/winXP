import { useState, useEffect, useRef } from 'react';

const useMouse = ref => {
  const frame = useRef(0);
  const [state, setState] = useState({
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0,
  });

  useEffect(() => {
    const handler = event => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        if (ref && ref.current) {
          const {
            left,
            top,
            width,
            height,
          } = ref.current.getBoundingClientRect();
          const posX = left + window.scrollX;
          const posY = top + window.scrollY;

          setState({
            docX: event.pageX,
            docY: event.pageY,
            posX,
            posY,
            elX: event.pageX - posX,
            elY: event.pageY - posY,
            elH: height,
            elW: width,
          });
        }
      });
    };

    document.addEventListener('mousemove', handler);

    return () => {
      cancelAnimationFrame(frame.current);
      document.removeEventListener('mousemove', handler);
    };
  }, []);

  return state;
};

export default useMouse;
