import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline';
  glow?: 'cyan' | 'danger' | 'bull' | 'none';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ variant = 'default', glow = 'none', className = '', children, ...props }) => {
  const glowClass = glow !== 'none' ? `glow-${glow}` : '';
  return (
    <div className={`rlip-card variant-${variant} ${glowClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
