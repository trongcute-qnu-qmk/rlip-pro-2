import React from 'react';
import { Card } from '../components/Card';
import { AlertOctagon } from 'lucide-react';

interface RiskCardProps {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
}

export const RiskCard: React.FC<RiskCardProps> = ({ level, title, description }) => {
  const getColors = () => {
    switch (level) {
      case 'CRITICAL': return 'bg-signal-bear-bg text-signal-bear border-signal-bear';
      case 'HIGH': return 'bg-signal-warning-bg text-signal-warning border-signal-warning';
      case 'MEDIUM': return 'bg-surface-hover text-primary border-border';
      case 'LOW': return 'bg-signal-bull-bg text-signal-bull border-signal-bull';
      default: return 'bg-surface-hover text-secondary border-border';
    }
  };

  return (
    <Card variant="outline" className={`mb-3 border-opacity-30 ${getColors()}`}>
      <div className="flex items-start gap-3">
        <AlertOctagon className="w-5 h-5 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold mb-1">{title}</h4>
          <p className="text-xs opacity-80">{description}</p>
        </div>
      </div>
    </Card>
  );
};
