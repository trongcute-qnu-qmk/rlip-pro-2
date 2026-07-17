import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ variant = 'default', className = '', children, ...props }) => {
  return (
    <div className={`rlip-card variant-${variant} ${className}`} {...props}>
      {children}
    </div>
  );
};
