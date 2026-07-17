import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { EvidenceCard } from '../../../design-system/domain/EvidenceCard';

interface EvidenceExplorerProps {
  claim: string;
  evidences: Array<{ source: string; confidence: number; text: string; page?: string }>;
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({ claim, evidences }) => {
  return (
    <Card variant="glass" className="mt-4 border-l-4 border-l-accent-blue">
      <h4 className="text-sm font-semibold text-secondary mb-1">EVIDENCE FOR:</h4>
      <p className="text-base text-primary font-medium mb-4 italic">"{claim}"</p>
      
      <div className="space-y-2">
        {evidences.map((e, idx) => (
          <EvidenceCard key={idx} {...e} />
        ))}
      </div>
    </Card>
  );
};
