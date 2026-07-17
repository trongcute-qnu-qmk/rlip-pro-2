import React from 'react';
import { InvestmentMemoEditor } from './InvestmentMemoEditor';
import { ThesisTracker } from './ThesisTracker';
import { CatalystCalendar } from './CatalystCalendar';
import { EvidenceLibrary } from './EvidenceLibrary';
import { ResearchScoreCard } from './ResearchScoreCard';
import { ResearchTimeline } from './ResearchTimeline';

export const CompanyResearchPage: React.FC = () => {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="mb-8 flex justify-between items-end border-b border-border-light pb-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">FPT Corporation</h1>
          <p className="text-secondary text-sm">Technology & Telecommunications | Analyst: Trong Nguyen</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted">Current Price</p>
          <p className="text-2xl font-bold text-primary">135,000 VND</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in fade-in">
        
        {/* Left Column (Main Content) */}
        <div className="xl:col-span-8 space-y-6">
          <ThesisTracker />
          <InvestmentMemoEditor />
          <CatalystCalendar />
        </div>

        {/* Right Column (Sidebar/Widgets) */}
        <div className="xl:col-span-4 space-y-6">
          <ResearchScoreCard />
          <EvidenceLibrary />
          <ResearchTimeline />
        </div>
        
      </div>
    </div>
  );
};
