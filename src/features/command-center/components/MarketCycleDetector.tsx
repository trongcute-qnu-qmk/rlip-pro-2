import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { TrendingUp, AlertCircle } from 'lucide-react';

export const MarketCycleDetector: React.FC = () => {
  return (
    <Card variant="default" className="border-l-4 border-signal-warning">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Market Regime Engine
          </h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-signal-warning">CAUTIOUS BULL</span>
            <span className="text-sm font-mono text-secondary">Conf: 78%</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted block mb-1">Recommended Action</span>
          <span className="text-sm font-semibold text-primary bg-surface-hover px-2 py-1 rounded">Maintain Exposure</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 border-t border-border-light pt-4 mt-2">
        <div>
          <span className="block text-xs text-muted uppercase">Trend</span>
          <span className="text-sm font-semibold text-signal-bull">Positive</span>
        </div>
        <div>
          <span className="block text-xs text-muted uppercase">Liquidity</span>
          <span className="text-sm font-semibold text-signal-warning">Neutral</span>
        </div>
        <div>
          <span className="block text-xs text-muted uppercase flex items-center gap-1">Macro <AlertCircle className="w-3 h-3 text-signal-bear" /></span>
          <span className="text-sm font-semibold text-signal-bear">Warning</span>
        </div>
      </div>
    </Card>
  );
};
