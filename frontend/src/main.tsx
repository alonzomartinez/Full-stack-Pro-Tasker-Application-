import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './style.css';

// Find the root element from index.html
const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
       {/* BrowserRouter allows React Router to handle page navigation */}
      <BrowserRouter>
        {/* AuthProvider makes authentication available throughout the app */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
}