import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface SnackbarProps {
  message: string;
  visible: boolean;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const Snackbar = ({ message, type, visible, onClose, duration = 3000 }: SnackbarProps) => {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible) {
      setShouldRender(true);
      timer = setTimeout(() => {
        onClose();
      }, duration);
    } else {
      timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!shouldRender) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-[99] w-full max-w-sm',
        visible ? 'animate-slide-in-up' : 'animate-slide-out-down',
      )}
    >
      <div className={cn('rounded-lg p-4 shadow-lg', bgColor)}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-amber-100">{message}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Snackbar };
