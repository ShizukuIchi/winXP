import React from 'react';

import WinXP from 'WinXP';
import { Scanlines } from 'components';
import { useClickSound } from 'hooks';

const App = () => {
  useClickSound();
  return (
    <>
      <WinXP />
      <Scanlines />
    </>
  );
};

export default App;
