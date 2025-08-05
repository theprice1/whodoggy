import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Tailwind CSS global styles (preferred)
import './styles/global.css';

// If you have any unique CSS outside Tailwind, keep this; otherwise, remove it.
// import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("❌ Root element not found. Make sure there's a div with id='root' in your index.html");
}
