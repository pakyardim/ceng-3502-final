import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './App.tsx';
import queryClient from './queryClient';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
