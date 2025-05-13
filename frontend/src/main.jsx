// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

console.log('Rendering main.jsx');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div data-bs-theme="dark">
      <App />
    </div>
  </React.StrictMode>
);