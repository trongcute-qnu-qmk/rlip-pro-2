import React from 'react';
import { Card } from '../components/Card';
import { ScoreBadge } from '../components/ScoreBadge';

interface EvidenceCardProps {
  source: string;
  confidence: number;
  text: string;
  page?: string;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ source, confidence, text, page }) => {
  return (
    <Card variant="outline" className="my-2 hover:bg-surface-hover transition-colors cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">{source}</span>
          {page && <span className="text-xs text-secondary bg-surface px-2 py-1 rounded">Page {page}</span>}
        </div>
        <ScoreBadge score={confidence} maxScore={100} />
      </div>
      <p className="text-sm text-primary">{text}</p>
    </Card>
  );
};
