import React from 'react';
import { Card } from '../components/Card';

interface ThesisCardProps {
  ticker: string;
  date: string;
  action: 'BUY' | 'HOLD' | 'SELL' | 'TRIM' | 'ADD';
  reason: string;
}

export const ThesisCard: React.FC<ThesisCardProps> = ({ ticker, date, action, reason }) => {
  const isPositive = action === 'BUY' || action === 'ADD';
  const isNegative = action === 'SELL' || action === 'TRIM';
  
  return (
    <div className="flex relative pl-6 border-l-2 border-border-light pb-6 last:pb-0">
      <div className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full ${isPositive ? 'bg-signal-bull' : isNegative ? 'bg-signal-bear' : 'bg-signal-warning'}`} />
      <Card variant="default" className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-muted">{date}</span>
          <span className={`text-xs font-bold px-2 py-1 rounded ${isPositive ? 'bg-signal-bull-bg text-signal-bull' : isNegative ? 'bg-signal-bear-bg text-signal-bear' : 'bg-signal-warning-bg text-signal-warning'}`}>
            {action}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-primary mb-1">{ticker} Thesis Update</h4>
        <p className="text-sm text-secondary">{reason}</p>
      </Card>
    </div>
  );
};
