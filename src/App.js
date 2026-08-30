import React from 'react';

import WinXP from 'WinXP';
import { useClickSound } from 'hooks';

const App = () => {
  useClickSound();
  return <WinXP />;
};

export default App;
