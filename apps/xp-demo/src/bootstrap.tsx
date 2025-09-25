import React from 'react';
import ReactDOM from 'react-dom';
import XPDemoApp from './XPDemoApp';

// For standalone development
if (process.env.NODE_ENV === 'development') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(<XPDemoApp />, rootElement);
  }
}

// Export for federated loading
export default XPDemoApp;