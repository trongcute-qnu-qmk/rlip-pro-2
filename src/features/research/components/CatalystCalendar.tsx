import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { Badge } from '../../../design-system/components/Badge';
import { Calendar, AlertCircle } from 'lucide-react';

export const CatalystCalendar: React.FC = () => {
  const catalysts = [
    { id: '1', date: 'Q3/2026', title: 'Earnings Release', impact: 'HIGH', direction: 'POSITIVE' },
    { id: '2', date: 'Q4/2026', title: 'New Data Center Open', impact: 'MEDIUM', direction: 'POSITIVE' },
    { id: '3', date: 'H1/2027', title: 'Tax Exemption Ends', impact: 'MEDIUM', direction: 'NEGATIVE' }
  ];

  return (
    <Card variant="default">
      <div className="flex justify-between items-center mb-4 border-b border-border-light pb-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Catalyst Timeline
        </h2>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-light before:to-transparent">
        {catalysts.map((cat) => (
          <div key={cat.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border-light bg-surface text-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <AlertCircle className={`w-4 h-4 ${cat.direction === 'POSITIVE' ? 'text-signal-bull' : 'text-signal-bear'}`} />
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border-light bg-surface-hover shadow">
              <div className="flex items-center justify-between mb-1">
                <div className="font-bold text-accent-blue text-sm">{cat.date}</div>
                <Badge variant={cat.impact === 'HIGH' ? 'warning' : 'neutral'}>{cat.impact} IMPACT</Badge>
              </div>
              <div className="text-sm text-primary font-semibold">{cat.title}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
