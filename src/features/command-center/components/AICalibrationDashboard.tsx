import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { BarChart } from '../../../design-system/charts';

export const AICalibrationDashboard: React.FC = () => {
  const agents = [
    { name: 'Financial Agent', accuracy: 84 },
    { name: 'Risk Agent', accuracy: 89 },
    { name: 'Valuation Agent', accuracy: 76 },
    { name: 'Macro Agent', accuracy: 62 },
  ];

  return (
    <Card variant="default">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2">
        AI Calibration Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-muted mb-4">Tracking historical accuracy of AI Committee predictions.</p>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.name} className="flex justify-between items-center text-sm">
                <span className="text-primary">{agent.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${agent.accuracy >= 80 ? 'bg-signal-bull' : agent.accuracy >= 70 ? 'bg-accent-blue' : 'bg-signal-warning'}`} 
                      style={{ width: `${agent.accuracy}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs w-8 text-right">{agent.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
           <BarChart title="Accuracy Distribution (Last 100 Predictions)" height="h-28" />
        </div>
      </div>
    </Card>
  );
};
