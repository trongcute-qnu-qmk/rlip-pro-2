import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

interface AgentCardProps {
  agentName: string;
  role: string;
  conclusion: string;
  stance: 'BULL' | 'BEAR' | 'NEUTRAL';
  confidence?: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agentName, role, conclusion, stance, confidence = 85 }) => {
  const [isHovered, setIsHovered] = useState(false);

  let badgeVariant: 'bull' | 'bear' | 'neutral' = 'neutral';
  if (stance === 'BULL') badgeVariant = 'bull';
  if (stance === 'BEAR') badgeVariant = 'bear';

  return (
    <Card 
      variant="glass" 
      glow="cyan"
      className="mb-4 transition-all duration-300 ease-in-out cursor-pointer hover:border-accent-cyan hover:bg-opacity-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-primary">{agentName}</h3>
          <div className="flex items-center gap-1 bg-[rgba(34,211,238,0.1)] px-2 py-0.5 rounded-full border border-[rgba(34,211,238,0.2)]">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" style={{ animation: 'aiPulse 2s infinite' }}></span>
            <span className="text-[10px] text-accent-cyan font-bold tracking-widest uppercase">Online</span>
          </div>
        </div>
        <Badge variant={badgeVariant}>{stance}</Badge>
      </div>
      
      <p className="text-sm text-secondary mb-3">{role}</p>

      {/* Default State */}
      <div className="p-3 bg-black bg-opacity-20 rounded-md border border-white border-opacity-5">
        <p className="text-sm italic">"{conclusion}"</p>
      </div>

      {/* Hover Expansion */}
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isHovered ? '200px' : '0px', opacity: isHovered ? 1 : 0, marginTop: isHovered ? '12px' : '0px' }}
      >
        <div className="pt-3 border-t border-white border-opacity-10 text-sm">
          <p className="text-secondary mb-1">Analyzing:</p>
          <ul className="list-disc pl-5 mb-3 text-primary opacity-80">
            <li>ROE & Margins</li>
            <li>Economic Moat</li>
            <li>Free Cash Flow</li>
          </ul>
          <div className="flex justify-between items-center text-xs">
            <span className="text-secondary">Confidence Level</span>
            <span className="text-accent-cyan font-bold">{(confidence + (isHovered ? 3 : 0))}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
