import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { Badge } from '../../../design-system/components/Badge';

export const DecisionMemory: React.FC = () => {
  const history = [
    { date: 'Jan 2026', decision: 'BUY', reason: 'AI Growth accelerates', confidence: 82 },
    { date: 'Apr 2026', decision: 'HOLD', reason: 'Margin pressure detected', confidence: 88 },
    { date: 'Jul 2026', decision: 'BUY', reason: 'New contracts secured', confidence: 91 },
  ];

  return (
    <Card variant="glass" className="mt-4 border border-border-light">
      <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4 border-b border-border-light pb-2">Decision Memory & Confidence Evolution</h3>
      
      <div className="space-y-4">
        {history.map((h, i) => (
          <div key={i} className="flex justify-between items-center relative pl-4 border-l-2 border-border-light pb-4 last:pb-0">
            <div className={`absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full ${h.decision === 'BUY' ? 'bg-signal-bull' : 'bg-signal-warning'}`} />
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted">{h.date}</span>
                <Badge variant={h.decision === 'BUY' ? 'bull' : 'warning'}>{h.decision}</Badge>
              </div>
              <p className="text-sm text-primary">{h.reason}</p>
            </div>

            <div className="text-right">
              <span className="block text-xs text-secondary mb-1">Confidence</span>
              <span className={`text-base font-bold ${h.confidence >= 90 ? 'text-signal-bull' : 'text-primary'}`}>{h.confidence}/100</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
