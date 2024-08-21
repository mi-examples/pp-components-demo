import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { AppProvider } from '@/app-provider';
import ThemeProvider from '@/context/theme-context';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>,
);
