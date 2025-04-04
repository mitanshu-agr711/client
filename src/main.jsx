import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FileManagerProvider } from './context/stateContex.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FileManagerProvider>
      <App />
    </FileManagerProvider>
  </BrowserRouter>
);
