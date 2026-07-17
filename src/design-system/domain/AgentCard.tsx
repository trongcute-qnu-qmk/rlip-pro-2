import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

interface AgentCardProps {
  agentName: string;
  role: string;
  conclusion: string;
  stance: 'BULL' | 'BEAR' | 'NEUTRAL';
}

export const AgentCard: React.FC<AgentCardProps> = ({ agentName, role, conclusion, stance }) => {
  let badgeVariant: 'bull' | 'bear' | 'neutral' = 'neutral';
  if (stance === 'BULL') badgeVariant = 'bull';
  if (stance === 'BEAR') badgeVariant = 'bear';

  return (
    <Card variant="glass" className="mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-primary">{agentName}</h3>
          <p className="text-sm text-secondary">{role}</p>
        </div>
        <Badge variant={badgeVariant}>{stance}</Badge>
      </div>
      <div className="mt-3 p-3 bg-black bg-opacity-20 rounded-md border border-white border-opacity-5">
        <p className="text-sm italic">"{conclusion}"</p>
      </div>
    </Card>
  );
};
