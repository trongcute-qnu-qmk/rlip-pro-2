import React from 'react';
import { CosmicCard } from './CosmicCard';

interface RadarPanelProps {
  sentiment: string;
  momentum: string;
  isPositive: boolean;
}

export const RadarPanel: React.FC<RadarPanelProps> = ({ sentiment, momentum, isPositive }) => {
  return (
    <CosmicCard className="h-full flex flex-col items-center justify-center relative overflow-hidden group">
      {/* Radar Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
        <div className="w-48 h-48 rounded-full border border-[var(--color-ai-cyan)] border-opacity-30 relative">
          <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-ai-cyan)] animate-radar"></div>
          <div className="absolute inset-0 rounded-full border border-[var(--color-ai-cyan)] border-opacity-10 scale-[1.5]"></div>
          <div className="absolute inset-0 rounded-full border border-[var(--color-ai-cyan)] border-opacity-5 scale-[2]"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h3 className="text-[var(--color-purple)] uppercase tracking-widest text-xs mb-4">Market Radar</h3>
        <div className="text-[12px] opacity-70 mb-2 uppercase tracking-widest">Sentiment</div>
        <div className={`text-[32px] font-bold ${isPositive ? 'text-[var(--color-success)] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-[var(--color-danger)] drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}>
          {sentiment}
        </div>
        <div className="text-[12px] opacity-70 mt-4 uppercase tracking-widest">
          Momentum: <span className="text-white ml-1 font-bold">{momentum}</span>
        </div>
      </div>
    </CosmicCard>
  );
};
