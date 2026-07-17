import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { Clock } from 'lucide-react';

export const ResearchTimeline: React.FC = () => {
  return (
    <Card variant="default">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Activity Log
      </h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-16 text-xs text-muted shrink-0 pt-1">Just now</div>
          <div className="flex-1 pb-4 border-b border-border-light">
            <p className="text-sm text-primary">Updated Thesis Confidence to 85%.</p>
            <span className="text-[10px] text-accent-blue bg-accent-blue/10 px-1 py-0.5 rounded mt-1 inline-block">System</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="w-16 text-xs text-muted shrink-0 pt-1">2 hrs ago</div>
          <div className="flex-1 pb-4 border-b border-border-light">
            <p className="text-sm text-primary">Added new Evidence [EV-003] from Bloomberg.</p>
            <span className="text-[10px] text-secondary bg-surface px-1 py-0.5 border border-border-light rounded mt-1 inline-block">Analyst 1</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="w-16 text-xs text-muted shrink-0 pt-1">Yesterday</div>
          <div className="flex-1 pb-4 border-b border-border-light">
            <p className="text-sm text-primary">Thesis transitioned from NEW to ACTIVE.</p>
            <span className="text-[10px] text-signal-warning bg-[rgba(245,158,11,0.1)] px-1 py-0.5 rounded mt-1 inline-block">Lifecycle Engine</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
