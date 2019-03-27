import { useState, useEffect } from 'react';

function useIntersectionObserver(ref, ratio = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(
    () => {
      function callback(entries) {
        entries.forEach(entry => {
          setInView(entry.intersectionRatio >= ratio);
        });
      }
      const options = {
        threshold: ratio,
      };
      const observer = new IntersectionObserver(callback, options);
      const target = ref.current;
      if (!target) return;
      observer.observe(target);
      return () => {
        observer.disconnect();
      };
    },
    [ratio],
  );
  return inView;
}

export default useIntersectionObserver;
