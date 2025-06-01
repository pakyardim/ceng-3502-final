import { cn } from '@/lib/utils';
import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-10 h-10',
  };

  return (
    <div
      className={cn(
        'self-center inline-block border-4 border-t-transparent border-solid rounded-full animate-spin',
        sizeClasses[size],
      )}
      role="status"
      aria-label="Loading"
    />
  );
};
