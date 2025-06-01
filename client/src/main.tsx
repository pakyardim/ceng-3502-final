import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './App.tsx';
import queryClient from './queryClient';
import { SnackbarProvider } from './contexts/snackbarContext.tsx';
import { AuthProvider } from './contexts/authContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
