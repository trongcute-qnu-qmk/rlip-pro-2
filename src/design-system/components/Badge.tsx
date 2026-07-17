import React from 'react';
import './Badge.css';

export type BadgeVariant = 'bull' | 'bear' | 'warning' | 'neutral' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', className = '', children, ...props }) => {
  return (
    <span className={`rlip-badge variant-${variant} ${className}`} {...props}>
      {children}
    </span>
  );
};
