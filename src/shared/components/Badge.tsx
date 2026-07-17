import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export const Badge = ({ children, variant = 'primary', className = '', ...props }: BadgeProps) => {
  return (
    <span 
      className={`badge ${className}`}
      style={{
        padding: 'var(--spacing-1) var(--spacing-2)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--font-xs)',
        fontWeight: 'bold',
        backgroundColor: `var(--color-${variant})`,
        color: 'var(--color-background)',
        display: 'inline-block'
      }}
      {...props}
    >
      {children}
    </span>
  );
};
