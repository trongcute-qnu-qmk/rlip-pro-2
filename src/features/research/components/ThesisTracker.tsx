import React, { useState } from 'react';
import { Card } from '../../../design-system/components/Card';
import { Badge } from '../../../design-system/components/Badge';

export const ThesisTracker: React.FC = () => {
  const [activeThesis] = useState({
    status: 'ACTIVE',
    title: 'AI + Cloud Growth Cycle',
    confidence: 85,
    horizon: '5 Years'
  });

  const stages = ['NEW', 'ACTIVE', 'CONFIRMED', 'CHALLENGED', 'BROKEN', 'ARCHIVED'];

  return (
    <Card variant="glass" className="mb-6">
      <div className="flex justify-between items-center mb-4 border-b border-border-light pb-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">Thesis Lifecycle Engine</h2>
        <Badge variant={activeThesis.status === 'ACTIVE' ? 'bull' : 'neutral'}>{activeThesis.status}</Badge>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary">{activeThesis.title}</h3>
        <div className="flex gap-4 text-sm mt-2 text-muted">
          <span>Confidence: <strong className="text-accent-blue">{activeThesis.confidence}%</strong></span>
          <span>Horizon: <strong>{activeThesis.horizon}</strong></span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-semibold text-muted">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage}>
            <div className={`flex flex-col items-center ${activeThesis.status === stage ? 'text-accent-blue scale-110' : ''}`}>
              <div className={`w-4 h-4 rounded-full mb-1 ${activeThesis.status === stage ? 'bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-border-light'}`} />
              {stage}
            </div>
            {idx < stages.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${stages.indexOf(activeThesis.status) > idx ? 'bg-accent-blue' : 'bg-border-light'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};
