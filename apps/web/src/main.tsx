import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';         // ❓ Only keep this if it has unique styles
import './styles/global.css'; // ✅ Tailwind-based global styles (preferred)

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
