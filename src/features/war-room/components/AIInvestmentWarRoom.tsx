import React, { useState, useEffect } from 'react';
import { AgentCard } from '../../../design-system/domain/AgentCard';
import { Card } from '../../../design-system/components/Card';
import { EvidenceExplorer } from './EvidenceExplorer';
import { ExplainabilityPanel } from './ExplainabilityPanel';
import { pipelineService } from '../../../services/InvestmentPipelineService';
import type { AIAnalysisResult } from '../../../services/InvestmentPipelineService';
import { SystemActivityFeed } from './SystemActivityFeed';

export const AIInvestmentWarRoom: React.FC = () => {
  const [activeClaim, setActiveClaim] = useState<string | null>(null);
  const [ticker, setTicker] = useState('FPT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);

  useEffect(() => {
    runAnalysis('FPT');
  }, []);

  const runAnalysis = async (targetTicker: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await pipelineService.analyzeTicker(targetTicker);
      setAnalysis(result);
    } catch (err: any) {
      console.error("Failed to run analysis:", err);
      setError(err.message || 'Failed to analyze ticker. Please check your network or try another ticker.');
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
    <div className="p-6 max-w-7xl mx-auto min-h-screen relative">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-primary mb-2 flex items-center justify-center gap-3">
          <span className="text-accent-cyan">RLIP</span> AI WAR ROOM
        </h1>
        <div className="flex items-center justify-center gap-2 text-secondary text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-signal-bull" style={{ animation: 'aiPulse 2s infinite' }}></span>
          <span className="tracking-widest uppercase text-xs">Mission Control Active</span>
        </div>

        <form onSubmit={handleSearch} className="flex justify-center items-center gap-2">
          <div className="relative">
            <input 
              type="text" 
              value={ticker} 
              onChange={e => setTicker(e.target.value)}
              className="bg-background-elevated bg-opacity-50 backdrop-blur-md border border-border rounded-md px-6 py-3 w-64 text-center text-xl font-bold uppercase focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
              placeholder="ENTER TICKER"
            />
          </div>
          <button type="submit" disabled={loading} className="bg-accent-cyan bg-opacity-20 text-accent-cyan border border-accent-cyan border-opacity-50 font-bold px-6 py-3 rounded-md hover:bg-opacity-30 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50 transition-all uppercase tracking-widest">
            {loading ? 'Scanning...' : 'Execute'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-signal-bear bg-opacity-10 border border-signal-bear text-signal-bear p-4 rounded-md mb-8 text-center max-w-2xl mx-auto animate-fade-in-up glow-danger">
          <p className="font-bold">SYSTEM ALERT: ANALYSIS FAILED</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* MISSION CONTROL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        
        {/* TOP LEFT: AI AGENT COUNCIL */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="text-accent-cyan">◆</span> AI Agent Council
            </h2>
          </div>
          
          <div className={loading ? "opacity-50 pointer-events-none" : ""}>
            <div onClick={() => analysis && handleClaimClick(analysis.bullCase)}>
              <AgentCard 
                agentName="Warren Buffett AI" 
                role="Fundamental Analysis Engine" 
                stance="BULL" 
                conclusion={analysis ? analysis.bullCase : "Awaiting ticker input to evaluate intrinsic value and economic moat."} 
                confidence={92}
              />
            </div>
            {activeClaim && activeClaim === analysis?.bullCase && (
              <div className="animate-fade-in-up">
                <EvidenceExplorer claim={activeClaim} evidences={mockEvidence} />
              </div>
            )}
          </div>
        </div>

        {/* TOP RIGHT: MARKET RADAR */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="text-accent-purple">◆</span> Market Radar
            </h2>
          </div>
          <Card variant="glass" className="h-[200px] flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Radar Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
               <div className="w-40 h-40 rounded-full border border-accent-cyan border-opacity-30 relative">
                  <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-accent-cyan origin-left" style={{ animation: 'radarScan 8s linear infinite' }}></div>
                  <div className="absolute inset-0 rounded-full border border-accent-cyan border-opacity-10 scale-150"></div>
               </div>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-xs text-secondary mb-2">Market Sentiment</div>
              <div className="text-3xl font-bold text-signal-bull glow-bull">GREED</div>
              <div className="text-xs text-secondary mt-2">Momentum: <span className="text-primary">+2.4%</span></div>
            </div>
          </Card>
        </div>

        {/* MIDDLE SPAN: PORTFOLIO INTELLIGENCE */}
        <div className="lg:col-span-2 space-y-4 mt-4">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="text-signal-warning">◆</span> Portfolio Intelligence
            </h2>
          </div>
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-center h-24 border border-dashed border-border-light rounded bg-black bg-opacity-20 text-secondary text-sm">
              [UNIVERSE MAP PLACEHOLDER - Visualizing VN30, US Stocks, Crypto]
            </div>
          </Card>
        </div>

        {/* BOTTOM LEFT: RISK ENGINE */}
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h2 className="text-sm font-semibold text-signal-bear uppercase tracking-widest flex items-center gap-2">
              <span className="text-signal-bear">◆</span> Risk AI Engine
            </h2>
          </div>
          <div className={loading ? "opacity-50 pointer-events-none" : ""}>
            <div onClick={() => analysis && handleClaimClick(analysis.bearCase)}>
              <AgentCard 
                agentName="Ray Dalio AI" 
                role="Macro & Vulnerability Analysis" 
                stance="BEAR" 
                conclusion={analysis ? analysis.bearCase : "Monitoring macroeconomic headwinds and systemic vulnerabilities."} 
                confidence={88}
              />
            </div>
            {activeClaim && activeClaim === analysis?.bearCase && (
              <div className="animate-fade-in-up">
                <EvidenceExplorer claim={activeClaim} evidences={mockEvidence} />
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM RIGHT: DECISION ENGINE */}
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-center border-b border-border pb-2 mb-4">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest">Committee Verdict</h2>
          </div>
          
          <Card variant="glass" glow={analysis?.decision === 'BUY' ? 'cyan' : analysis?.decision === 'SELL' ? 'danger' : 'none'} className="text-center p-6 min-h-[300px] flex flex-col justify-center">
            {loading ? (
              <div className="py-10 animate-pulse">
                <p className="text-accent-cyan text-sm uppercase tracking-widest font-bold mb-2">AI Neural Network Synchronizing...</p>
                <div className="w-full bg-black bg-opacity-50 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div className="bg-accent-cyan h-full" style={{ width: '87%', animation: 'aiPulse 1s infinite' }}></div>
                </div>
              </div>
            ) : analysis ? (
              <div className="animate-fade-in-up">
                <h3 className={`text-5xl font-bold mb-2 tracking-wider ${analysis.decision === 'BUY' ? 'text-signal-bull' : analysis.decision === 'SELL' ? 'text-signal-bear' : 'text-primary'}`}>
                  {analysis.decision}
                </h3>
                <p className="text-sm text-secondary mb-6 border-b border-border pb-4">Calculated Target ROIC: {(analysis.roic * 100).toFixed(2)}%</p>
                
                <ExplainabilityPanel 
                  totalScore={analysis.score} 
                  factors={[
                    { name: 'Capital Efficiency', score: Math.min(25, analysis.roic * 100), max: 25 },
                    { name: 'Financial Health', score: 23, max: 25 },
                    { name: 'Management', score: 18, max: 20 },
                    { name: 'Valuation', score: 15, max: 20 },
                    { name: 'Macro', score: 7, max: 10 }
                  ]} 
                />
                <div className="mt-6 p-4 bg-[rgba(34,211,238,0.05)] border border-[rgba(34,211,238,0.2)] rounded-md">
                  <h4 className="text-[10px] font-bold text-accent-cyan uppercase tracking-wider mb-1">Recommended Position Size</h4>
                  <p className="text-2xl font-semibold text-primary">8.0% NAV</p>
                </div>
              </div>
            ) : (
              <div className="py-10 text-secondary">
                <div className="text-4xl mb-4">🚀</div>
                <p className="font-bold text-primary mb-1">Awaiting Market Signal</p>
                <p className="text-sm">AI engine is monitoring 2,341 companies in real-time.</p>
              </div>
            )}
          </Card>
        </div>

      </div>

      <SystemActivityFeed />
    </div>
  );
};
