'use client';

import React, { useState, createContext, useContext } from 'react';
import { Snackbar } from '@/components/ui/snackbar';

interface SnackbarContextType {
  showSnackbar: (message: string, type: 'success' | 'error') => void;
}

const SnackbarContext = createContext<SnackbarContextType>(null!);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackbar({ message, type, visible: true });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        visible={snackbar.visible}
        onClose={handleClose}
        duration={3000}
      />
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
