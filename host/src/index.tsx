import React from 'react';
import ReactDOM from 'react-dom';
import Desktop from './Desktop';

function bootstrap() {
  // For React 16 typings in this project, use legacy render signature
  const root = document.getElementById('root') as HTMLElement;
  (ReactDOM as any).render(<Desktop />, root);
}

bootstrap();