import { useEffect } from 'react';
import ga from 'react-ga';

function useGA(id, route) {
  useEffect(() => {
    ga.initialize(id);
    ga.pageview(route);
  }, []);
}

export default useGA;
