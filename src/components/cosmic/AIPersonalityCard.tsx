import React from 'react';
import { CosmicCard } from './CosmicCard';
import { AIStatusBadge } from './AIStatusBadge';

interface AIPersonalityCardProps {
  name: string;
  philosophy: string;
  confidence: number;
  currentTask: string;
  status?: 'ONLINE' | 'OFFLINE' | 'ANALYZING';
}

export const AIPersonalityCard: React.FC<AIPersonalityCardProps> = ({ 
  name, 
  philosophy, 
  confidence, 
  currentTask,
  status = 'ONLINE'
}) => {
  return (
    <CosmicCard hoverGlow={true} className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[var(--text-card-title)] font-bold text-white mb-1">🤖 {name}</h3>
          <p className="text-[10px] text-white opacity-50 uppercase tracking-widest">{philosophy}</p>
        </div>
        <AIStatusBadge status={status} />
      </div>

      <div className="space-y-4 mt-2">
        {/* Confidence Level */}
        <div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1.5">
            <span className="text-white opacity-60">Confidence</span>
            <span className="text-[var(--color-ai-cyan)] font-bold">{confidence}%</span>
          </div>
          <div className="w-full bg-black bg-opacity-50 h-[4px] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--color-ai-cyan)] opacity-80"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Current Task */}
        <div className="bg-black bg-opacity-30 border border-[var(--color-border)] rounded p-2 text-[12px]">
          <span className="text-white opacity-50 text-[10px] uppercase tracking-widest block mb-1">Current Task</span>
          <span className="text-white opacity-90">{currentTask}</span>
        </div>
      </div>
    </CosmicCard>
  );
};
