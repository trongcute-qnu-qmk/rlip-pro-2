import React from 'react';
import { CosmicCard } from './CosmicCard';

interface DecisionPanelProps {
  decision: 'BUY' | 'SELL' | 'HOLD' | null;
  roic: number;
  loading: boolean;
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({ decision, roic, loading }) => {
  if (loading) {
    return (
      <CosmicCard className="h-full flex flex-col items-center justify-center min-h-[300px]">
        <h3 className="text-[var(--color-ai-cyan)] text-[12px] uppercase tracking-[0.2em] font-bold mb-4">AI Neural Network Synchronizing...</h3>
        <div className="w-full bg-black bg-opacity-50 h-2 rounded-full overflow-hidden max-w-xs mx-auto border border-[var(--color-border)]">
          <div className="bg-[var(--color-ai-cyan)] h-full animate-pulse-status" style={{ width: '87%' }}></div>
        </div>
      </CosmicCard>
    );
  }

  if (!decision) {
    return (
      <CosmicCard className="h-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-4xl mb-4 opacity-50">📡</div>
        <p className="font-bold text-white mb-2 text-[16px] uppercase tracking-widest">Awaiting Market Signal</p>
        <p className="text-[12px] opacity-60">AI engine is monitoring 2,341 companies in real-time.</p>
      </CosmicCard>
    );
  }

  const isBuy = decision === 'BUY';
  const isSell = decision === 'SELL';
  const colorClass = isBuy ? 'text-[var(--color-success)] drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]' : isSell ? 'text-[var(--color-danger)] drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-white';
  const glowBorder = isBuy ? 'border-[var(--color-success)]' : isSell ? 'border-[var(--color-danger)]' : 'border-white';

  return (
    <CosmicCard className="h-full flex flex-col items-center justify-center min-h-[300px] text-center" hoverGlow={false}>
      <h3 className="text-white opacity-70 text-[12px] uppercase tracking-[0.2em] font-bold mb-6">Committee Verdict</h3>
      
      <h2 className={`text-[64px] font-bold mb-2 tracking-wider leading-none ${colorClass}`}>
        {decision}
      </h2>
      
      <div className="flex items-center gap-2 mb-8">
        <span className="text-[12px] uppercase tracking-widest opacity-60">Target ROIC:</span>
        <span className="text-[16px] font-bold text-white">{(roic * 100).toFixed(2)}%</span>
      </div>
      
      <div className={`mt-auto w-full p-[var(--space-2)] bg-black bg-opacity-40 border border-opacity-20 rounded ${glowBorder}`}>
        <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-70">Recommended Position Size</h4>
        <p className="text-[24px] font-bold text-white">8.0% NAV</p>
      </div>
    </CosmicCard>
  );
};
