import React from 'react';

interface ChartProps {
  title?: string;
  height?: string;
  data?: any[];
}

export const LineChart: React.FC<ChartProps> = ({ title, height = 'h-48' }) => (
  <div className="w-full">
    {title && <h4 className="text-xs font-semibold text-secondary mb-2">{title}</h4>}
    <div className={`w-full ${height} bg-surface-hover border border-border-light rounded flex items-center justify-center`}>
      <span className="text-muted text-sm font-mono">[ Line Chart ]</span>
    </div>
  </div>
);

export const BarChart: React.FC<ChartProps> = ({ title, height = 'h-48' }) => (
  <div className="w-full">
    {title && <h4 className="text-xs font-semibold text-secondary mb-2">{title}</h4>}
    <div className={`w-full ${height} bg-surface-hover border border-border-light rounded flex items-center justify-center`}>
      <span className="text-muted text-sm font-mono">[ Bar Chart ]</span>
    </div>
  </div>
);

export const Heatmap: React.FC<ChartProps> = ({ title, height = 'h-64' }) => (
  <div className="w-full">
    {title && <h4 className="text-xs font-semibold text-secondary mb-2">{title}</h4>}
    <div className={`w-full ${height} bg-surface-hover border border-border-light rounded flex items-center justify-center relative`}>
      {/* Mock Grid for visual representation */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-2 opacity-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="bg-accent-blue rounded-sm" />
        ))}
      </div>
      <span className="text-muted text-sm font-mono z-10">[ Decision Heatmap ]</span>
    </div>
  </div>
);

export const AttributionChart: React.FC<ChartProps> = ({ title, height = 'h-48' }) => (
  <div className="w-full">
    {title && <h4 className="text-xs font-semibold text-secondary mb-2">{title}</h4>}
    <div className={`w-full ${height} bg-surface-hover border border-border-light rounded flex items-center justify-center`}>
      <span className="text-muted text-sm font-mono">[ Attribution Waterfall ]</span>
    </div>
  </div>
);

export const RiskChart: React.FC<ChartProps> = ({ title, height = 'h-48' }) => (
  <div className="w-full">
    {title && <h4 className="text-xs font-semibold text-secondary mb-2">{title}</h4>}
    <div className={`w-full ${height} bg-surface-hover border border-border-light rounded flex items-center justify-center`}>
      <span className="text-muted text-sm font-mono">[ Risk Radar Chart ]</span>
    </div>
  </div>
);
