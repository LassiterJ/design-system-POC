import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WindowClassProvider } from './components/consuming-app/smart/window-class/WindowClass';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <WindowClassProvider>
      <App />
    </WindowClassProvider>
  </React.StrictMode>
);
