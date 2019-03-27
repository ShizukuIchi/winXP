import React from 'react';

import WinXP from 'src/WinXP';
import { useGA } from 'src/hooks';

const App = () => {
  useGA('UA-135148027-3', 'winXP');
  return <WinXP />;
};

export default App;
