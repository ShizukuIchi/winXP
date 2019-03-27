import { useState, useEffect } from 'react';

const useResettableTimeout = (ms = 0, fn = () => {}, args = []) => {
  const [timeout, setTimeoutVal] = useState();
  function reset() {
    clearTimeout(timeout);
    setTimeoutVal(setTimeout(fn.bind(null, args), ms));
  }
  useEffect(() => {
    reset();
    return () => clearTimeout(timeout);
  }, []);
  return reset;
};

export default useResettableTimeout;
