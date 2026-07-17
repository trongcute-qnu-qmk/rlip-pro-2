import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { FileText, FileBarChart2 } from 'lucide-react';
import { Badge } from '../../../design-system/components/Badge';

export const EvidenceLibrary: React.FC = () => {
  const evidenceList = [
    { id: 'EV-001', title: 'Q2 2026 Financial Statements', type: 'REPORT', confidence: 98, date: '2026-07-20' },
    { id: 'EV-002', title: 'Management Meeting Notes', type: 'MEETING', confidence: 85, date: '2026-08-01' },
    { id: 'EV-003', title: 'Bloomberg Industry Research', type: 'NEWS', confidence: 75, date: '2026-08-15' },
  ];

  return (
    <Card variant="default">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2 flex items-center gap-2">
        <FileBarChart2 className="w-4 h-4" />
        Evidence Library
      </h2>
      
      <div className="space-y-3">
        {evidenceList.map(ev => (
          <div key={ev.id} className="flex justify-between items-center p-3 border border-border-light rounded bg-surface-hover hover:border-accent-blue transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-secondary group-hover:text-accent-blue" />
              <div>
                <p className="text-sm font-semibold text-primary">{ev.title}</p>
                <p className="text-xs text-muted">{ev.id} • {ev.date}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <Badge variant="neutral">{ev.type}</Badge>
              <span className="text-[10px] text-muted">AI Conf: {ev.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 border border-dashed border-border-light rounded text-sm text-secondary hover:text-primary hover:border-secondary transition-colors">
        + Add New Evidence
      </button>
    </Card>
  );
};
