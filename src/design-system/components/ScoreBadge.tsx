import React from 'react';
import { Badge } from './Badge';

interface ScoreBadgeProps {
  score: number;
  maxScore?: number;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, maxScore = 100 }) => {
  const percentage = (score / maxScore) * 100;
  
  let variant: 'bull' | 'bear' | 'warning' | 'neutral' = 'neutral';
  if (percentage >= 80) variant = 'bull';
  else if (percentage <= 40) variant = 'bear';
  else if (percentage > 40 && percentage < 80) variant = 'warning';

  return (
    <Badge variant={variant}>
      {score}/{maxScore}
    </Badge>
  );
};
