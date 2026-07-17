import React, { useState } from 'react';
import { Card } from '../../../design-system/components/Card';
import { Button } from '../../../design-system/components/Button';

export const HumanDecisionPanel: React.FC = () => {
  const [decision, setDecision] = useState<'ACCEPT' | 'MODIFY' | 'REJECT' | null>(null);

  return (
    <Card variant="default" className="mt-6 border border-accent-blue bg-[rgba(59,130,246,0.05)]">
      <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider mb-3">Portfolio Manager Decision</h3>
      <p className="text-sm text-secondary mb-4">You have the final say. Your feedback trains the AI's future models.</p>
      
      <div className="flex gap-3 mb-4">
        <Button 
          variant={decision === 'ACCEPT' ? 'primary' : 'secondary'} 
          onClick={() => setDecision('ACCEPT')}
          className="flex-1"
        >
          ACCEPT
        </Button>
        <Button 
          variant={decision === 'MODIFY' ? 'primary' : 'secondary'} 
          onClick={() => setDecision('MODIFY')}
          className="flex-1"
        >
          MODIFY
        </Button>
        <Button 
          variant={decision === 'REJECT' ? 'danger' : 'secondary'} 
          onClick={() => setDecision('REJECT')}
          className="flex-1"
        >
          REJECT
        </Button>
      </div>

      {decision && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
          
          {(decision === 'REJECT' || decision === 'MODIFY') && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-secondary mb-2 uppercase">Reason Tags:</p>
              <div className="flex flex-wrap gap-2">
                {['Valuation too high', 'Macro risk', 'Management concern', 'Better opportunity exists'].map(tag => (
                  <label key={tag} className="flex items-center gap-1.5 text-xs text-primary bg-surface border border-border-light px-2 py-1 rounded cursor-pointer hover:bg-surface-hover">
                    <input type="checkbox" className="accent-accent-blue" />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
          )}

          <textarea 
            className="w-full bg-surface border border-border-light rounded-md p-3 text-sm text-primary placeholder-muted focus:outline-none focus:border-accent-blue transition-colors"
            rows={3}
            placeholder="Additional notes... (Optional but recommended for AI learning)"
          />
          <div className="flex justify-end mt-2">
            <Button variant="primary" size="sm">Submit Decision</Button>
          </div>
        </div>
      )}
    </Card>
  );
};
