import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { AttributionChart, RiskChart } from '../../../design-system/charts';

export const PortfolioAttribution: React.FC = () => {
  return (
    <Card variant="glass" className="border border-border-light">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2">
        Portfolio Attribution
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Return Attribution */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-primary">Return Contribution</span>
            <span className="text-sm font-bold text-signal-bull">+18.0%</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-secondary">FPT</span>
              <span className="text-signal-bull">+8.0%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">ACB</span>
              <span className="text-signal-bull">+4.0%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">MWG</span>
              <span className="text-signal-bull">+3.0%</span>
            </div>
          </div>
          <AttributionChart height="h-32" />
        </div>

        {/* Risk Attribution */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-primary">Risk Contribution</span>
            <span className="text-sm font-mono text-muted">Total: 100%</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-secondary">FPT</span>
              <span className="text-signal-warning">35%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Bank Sector</span>
              <span className="text-signal-warning">30%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Tech Sector</span>
              <span className="text-primary">20%</span>
            </div>
          </div>
          <RiskChart height="h-32" />
        </div>
      </div>
    </Card>
  );
};
