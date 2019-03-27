import { useState, useEffect } from 'react';

const useMediaStyles = queries => {
  const [state, setState] = useState(() => {
    const queryName = Object.keys(queries).find(
      q => window.matchMedia(q).matches,
    );
    return queries[queryName];
  });

  useEffect(
    () => {
      const listeners = Object.keys(queries).map(query => {
        const mq = window.matchMedia(query);
        mq.addListener(onChange);
        return mq;
      });
      function onChange(e) {
        if (e.matches) setState(queries[e.media]);
      }
      return () => {
        listeners.forEach(l => l.removeListener(onChange));
      };
    },
    [queries],
  );

  return state;
};

export default useMediaStyles;
