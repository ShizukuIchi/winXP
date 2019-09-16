import React from 'react';

import WinXP from 'WinXP';
import { useGA } from 'hooks';

const App = () => {
  useGA('UA-135148027-3', 'winXP');
  return <WinXP />;
};

export default App;
