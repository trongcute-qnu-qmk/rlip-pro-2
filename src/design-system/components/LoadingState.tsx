import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'AI is analyzing...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-secondary">
      <Loader2 className="w-8 h-8 animate-spin text-accent-blue mb-4" />
      <p className="text-sm font-medium animate-pulse">{message}</p>
    </div>
  );
};
