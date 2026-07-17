import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { Heatmap } from '../../../design-system/charts';

export const DecisionHeatmap: React.FC = () => {
  return (
    <Card variant="outline" className="border-border-light">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2">
        Decision Heatmap (Quality vs Valuation)
      </h2>
      
      <div className="relative pt-4 pl-4 pb-6 pr-2">
        {/* Y Axis Label */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted uppercase tracking-widest origin-center">
          Quality
        </div>
        
        <Heatmap height="h-48" />
        
        {/* X Axis Label */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted uppercase tracking-widest mt-2">
          Valuation (Cheap → Expensive)
        </div>
        
        {/* Mock Bubbles */}
        <div className="absolute top-[30%] left-[20%] w-6 h-6 bg-signal-bull rounded-full border-2 border-bg-base flex items-center justify-center shadow-lg cursor-pointer">
          <span className="text-[8px] font-bold text-white">FPT</span>
        </div>
        
        <div className="absolute top-[60%] left-[70%] w-4 h-4 bg-signal-warning rounded-full border-2 border-bg-base flex items-center justify-center shadow-lg cursor-pointer">
          <span className="text-[6px] font-bold text-black">VNM</span>
        </div>
      </div>
    </Card>
  );
};
