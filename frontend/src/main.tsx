import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/global.css';
import '../styles/theme.css';
import App from './App';
import './i18n';
import { ToastProvider } from "./contexts/ToastContext";
import { ToastContainer } from "./components/common/Toast/ToastContainer";

createRoot( document.getElementById( 'root' ) ! ).render(
  <StrictMode>
      <ToastProvider>
          <ToastContainer />
          <App />
      </ToastProvider>
  </StrictMode>,
)
