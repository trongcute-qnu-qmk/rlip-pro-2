import React, { useState, useEffect } from 'react';
import { AgentCard } from '../../../design-system/domain/AgentCard';
import { Card } from '../../../design-system/components/Card';
import { Badge } from '../../../design-system/components/Badge';
import { EvidenceExplorer } from './EvidenceExplorer';
import { ExplainabilityPanel } from './ExplainabilityPanel';
import { DecisionMemory } from './DecisionMemory';
import { HumanDecisionPanel } from './HumanDecisionPanel';
import { pipelineService } from '../../../services/InvestmentPipelineService';
import type { AIAnalysisResult } from '../../../services/InvestmentPipelineService';

export const AIInvestmentWarRoom: React.FC = () => {
  const [activeClaim, setActiveClaim] = useState<string | null>(null);
  const [ticker, setTicker] = useState('FPT');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);

  useEffect(() => {
    runAnalysis('FPT');
  }, []);

  const runAnalysis = async (targetTicker: string) => {
    setLoading(true);
    try {
      const result = await pipelineService.analyzeTicker(targetTicker);
      setAnalysis(result);
    } catch (error) {
      console.error("Failed to run analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) runAnalysis(ticker.toUpperCase());
  };

  const handleClaimClick = (claim: string) => {
    setActiveClaim(activeClaim === claim ? null : claim);
  };

  const mockEvidence = [
    { source: 'Financial Data Source', page: 'Real-time', confidence: 95, text: `Calculated from normalized metrics in the data repository.` }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-display font-bold text-primary mb-2">INVESTMENT WAR ROOM</h1>
        <p className="text-secondary text-sm">AI Committee Debate in Progress</p>
        <form onSubmit={handleSearch} className="mt-6 flex justify-center items-center gap-2">
          <input 
            type="text" 
            value={ticker} 
            onChange={e => setTicker(e.target.value)}
            className="bg-background-elevated border border-border rounded-md px-4 py-2 focus:outline-none focus:border-accent-blue"
            placeholder="Enter Ticker (e.g. FPT)"
          />
          <button type="submit" disabled={loading} className="bg-accent-blue text-white px-4 py-2 rounded-md hover:bg-opacity-80 disabled:opacity-50 transition-colors">
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: BULL CASE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h2 className="text-lg font-semibold text-signal-bull uppercase tracking-widest">Bull Case</h2>
            <Badge variant="bull">Strong</Badge>
          </div>
          
          {analysis && (
            <div onClick={() => handleClaimClick(analysis.bullCase)} className="cursor-pointer transition-transform hover:scale-[1.02]">
              <AgentCard 
                agentName="Financial Agent" 
                role="Quantitative Analysis" 
                stance="BULL" 
                conclusion={analysis.bullCase} 
              />
            </div>
          )}

          {activeClaim && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <EvidenceExplorer claim={activeClaim} evidences={mockEvidence} />
            </div>
          )}
        </div>

        {/* MIDDLE COLUMN: VERDICT (DECISION ENGINE) */}
        <div className="space-y-4 lg:mt-0 mt-8">
          <div className="flex items-center justify-center border-b border-border pb-2 mb-4">
            <h2 className="text-lg font-semibold text-primary uppercase tracking-widest">Committee Verdict</h2>
          </div>
          
          <Card variant="glass" className="text-center p-6 border-accent-blue border-opacity-30">
            {loading ? (
              <p className="text-secondary py-10">Running ML Models...</p>
            ) : analysis ? (
              <>
                <h3 className={`text-4xl font-bold mb-2 ${analysis.decision === 'BUY' ? 'text-signal-bull' : analysis.decision === 'SELL' ? 'text-signal-bear' : 'text-primary'}`}>
                  {analysis.decision}
                </h3>
                <p className="text-sm text-secondary mb-6">Calculated ROIC: {(analysis.roic * 100).toFixed(2)}%</p>
                
                <ExplainabilityPanel 
                  totalScore={analysis.score} 
                  factors={[
                    { name: 'Capital Efficiency (ROIC)', score: Math.min(25, analysis.roic * 100), max: 25 },
                    { name: 'Financial Health', score: 23, max: 25 },
                    { name: 'Management', score: 18, max: 20 },
                    { name: 'Valuation', score: 15, max: 20 },
                    { name: 'Macro', score: 7, max: 10 }
                  ]} 
                />
              </>
            ) : null}
            
            <div className="mt-6 p-4 bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-md">
              <h4 className="text-xs font-bold text-signal-bull uppercase tracking-wider mb-1">Recommended Position Size</h4>
              <p className="text-2xl font-semibold text-primary">8.0% NAV</p>
            </div>
          </Card>

          {/* Epic 8.2.1: Human in the loop & Memory */}
          <HumanDecisionPanel />
          <DecisionMemory />
        </div>

        {/* RIGHT COLUMN: BEAR CASE */}
        <div className="space-y-4 lg:mt-0 mt-8">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h2 className="text-lg font-semibold text-signal-bear uppercase tracking-widest">Bear Case</h2>
            <Badge variant="bear">Moderate</Badge>
          </div>
          
          {analysis && (
            <div onClick={() => handleClaimClick(analysis.bearCase)} className="cursor-pointer transition-transform hover:scale-[1.02]">
              <AgentCard 
                agentName="Risk Agent" 
                role="Risk & Vulnerability Analysis" 
                stance="BEAR" 
                conclusion={analysis.bearCase} 
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
