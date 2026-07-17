import React from 'react';

interface AIStatusBadgeProps {
  status: 'ONLINE' | 'OFFLINE' | 'ANALYZING';
}

export const AIStatusBadge: React.FC<AIStatusBadgeProps> = ({ status }) => {
  const isOnlineOrAnalyzing = status === 'ONLINE' || status === 'ANALYZING';
  const colorClass = isOnlineOrAnalyzing ? 'text-[var(--color-ai-cyan)]' : 'text-[var(--color-danger)]';
  const dotColorClass = isOnlineOrAnalyzing ? 'bg-[var(--color-ai-cyan)]' : 'bg-[var(--color-danger)]';
  
  return (
    <div className="flex items-center gap-[6px] uppercase tracking-widest text-[10px] font-bold">
      STATUS:
      <div className={`flex items-center gap-[6px] ${colorClass}`}>
        <span className={`w-2 h-2 rounded-full ${dotColorClass} ${isOnlineOrAnalyzing ? 'animate-pulse-status' : ''}`}></span>
        {status}
      </div>
    </div>
  );
};
