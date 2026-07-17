import React from 'react';

export const ChartPlaceholder: React.FC<{ type: string; height?: string }> = ({ type, height = 'h-48' }) => (
  <div className={`w-full ${height} bg-surface-hover border border-dashed border-border-light rounded flex items-center justify-center text-muted text-sm`}>
    [{type} Chart Placeholder]
  </div>
);
