import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ title = 'System Error', message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[rgba(244,63,94,0.05)] border border-[rgba(244,63,94,0.2)] rounded-lg">
      <AlertTriangle className="w-8 h-8 text-signal-bear mb-3" />
      <h3 className="text-base font-semibold text-signal-bear mb-1">{title}</h3>
      <p className="text-sm text-secondary mb-4 text-center">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
