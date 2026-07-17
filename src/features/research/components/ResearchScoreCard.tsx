import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { Target, CheckCircle2, AlertTriangle, Search } from 'lucide-react';

export const ResearchScoreCard: React.FC = () => {
  return (
    <Card variant="glass" className="border-accent-blue border-opacity-30">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary flex items-center gap-2">
            <Target className="w-4 h-4" /> AI Research Quality Score
          </h2>
          <p className="text-xs text-muted mt-1">Evaluated by Investment Committee AI</p>
        </div>
        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue font-display font-bold text-lg shadow-[0_0_10px_rgba(59,130,246,0.2)]">
          87
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-secondary flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-signal-bull" /> Completeness</span>
            <span className="font-semibold text-primary">90/100</span>
          </div>
          <div className="w-full bg-surface rounded-full h-1.5"><div className="bg-signal-bull h-1.5 rounded-full" style={{ width: '90%' }}></div></div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-secondary flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-signal-bull" /> Evidence Quality</span>
            <span className="font-semibold text-primary">95/100</span>
          </div>
          <div className="w-full bg-surface rounded-full h-1.5"><div className="bg-signal-bull h-1.5 rounded-full" style={{ width: '95%' }}></div></div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-secondary flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-signal-warning" /> Risk Coverage</span>
            <span className="font-semibold text-primary">75/100</span>
          </div>
          <div className="w-full bg-surface rounded-full h-1.5"><div className="bg-signal-warning h-1.5 rounded-full" style={{ width: '75%' }}></div></div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-secondary flex items-center gap-1"><Search className="w-3 h-3 text-signal-bull" /> Valuation Depth</span>
            <span className="font-semibold text-primary">85/100</span>
          </div>
          <div className="w-full bg-surface rounded-full h-1.5"><div className="bg-signal-bull h-1.5 rounded-full" style={{ width: '85%' }}></div></div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border-light">
        <p className="text-xs text-muted italic">"Memo viết rất tốt, có bằng chứng vững chắc, tuy nhiên phần Risk Coverage cần bổ sung phân tích độ nhạy (Sensitivity Analysis)."</p>
      </div>
    </Card>
  );
};
