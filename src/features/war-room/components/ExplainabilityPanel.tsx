import React from 'react';
import { Card } from '../../../design-system/components/Card';

interface ExplainabilityPanelProps {
  totalScore: number;
  factors: Array<{ name: string; score: number; max: number }>;
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ totalScore, factors }) => {
  return (
    <Card variant="default" className="mt-4 p-4 border border-border-light bg-[rgba(255,255,255,0.02)]">
      <div className="flex justify-between items-center border-b border-border-light pb-3 mb-3">
        <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider">Conviction Score Breakdown</h4>
        <div className="text-2xl font-bold text-primary">{totalScore}/100</div>
      </div>
      
      <div className="space-y-3">
        {factors.map((f, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <span className="text-primary">{f.name}</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                <div 
                  className={`h-full ${f.score / f.max > 0.7 ? 'bg-signal-bull' : f.score / f.max < 0.4 ? 'bg-signal-bear' : 'bg-signal-warning'}`}
                  style={{ width: `${(f.score / f.max) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right text-muted">{f.score}/{f.max}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
