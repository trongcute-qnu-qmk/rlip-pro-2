import React from 'react';

interface CosmicCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export const CosmicCard: React.FC<CosmicCardProps> = ({ children, className = '', hoverGlow = false }) => {
  return (
    <div 
      className={`
        bg-[var(--color-panel)]
        border border-[var(--color-border)]
        backdrop-blur-md 
        rounded-lg
        p-[var(--space-3)]
        transition-all duration-300 ease-in-out
        ${hoverGlow ? 'hover-glow cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
