import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './router';
import { StoreProvider } from './context';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();