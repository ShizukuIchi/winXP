import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import 'assets/clear.css';
import 'assets/font.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

serviceWorker.unregister();

declare const module: any;

if (module.hot && !window.frameElement) {
  console.log('HMR enabled');
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    if (container) {
      const root = createRoot(container);
      root.render(<NextApp />);
    }
  });
}