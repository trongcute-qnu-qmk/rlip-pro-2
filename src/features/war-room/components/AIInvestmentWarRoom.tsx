import React, { useState, useEffect } from 'react';
import { pipelineService } from '../../../services/InvestmentPipelineService';
import type { AIAnalysisResult } from '../../../services/InvestmentPipelineService';
import { AIPersonalityCard } from '../../../components/cosmic/AIPersonalityCard';
import { RadarPanel } from '../../../components/cosmic/RadarPanel';
import { DecisionPanel } from '../../../components/cosmic/DecisionPanel';
import { ActivityFeed } from '../../../components/cosmic/ActivityFeed';
import { PortfolioUniverseMap } from '../../../components/cosmic/PortfolioUniverseMap';

export const AIInvestmentWarRoom: React.FC = () => {
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
      setError(err.message || 'Failed to analyze ticker.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) runAnalysis(ticker.toUpperCase());
  };

  return (
    <div className="p-[var(--space-3)] max-w-7xl mx-auto min-h-screen relative z-10">
      
      {/* TOP: HEADER & SYSTEM STATUS */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--color-border)] pb-4">
          <div>
            <h1 className="text-[var(--text-h1)] font-bold text-white mb-1">
              RLIP PRO <span className="text-[var(--color-ai-cyan)] opacity-80 text-[20px]">AI WAR ROOM</span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-60">
              Market Status: <span className="text-[var(--color-success)] font-bold">ONLINE</span>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <input 
              type="text" 
              value={ticker} 
              onChange={e => setTicker(e.target.value)}
              className="bg-[var(--color-panel)] border border-[var(--color-border)] rounded px-4 py-2 text-white font-bold uppercase focus:outline-none focus:border-[var(--color-ai-cyan)] w-full md:w-48 transition-colors"
              placeholder="ENTER TICKER"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[var(--color-ai-cyan)] bg-opacity-20 text-[var(--color-ai-cyan)] border border-[var(--color-ai-cyan)] border-opacity-50 font-bold px-6 py-2 rounded hover:bg-opacity-30 transition-all uppercase text-[12px] tracking-widest disabled:opacity-50"
            >
              EXECUTE
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="bg-[var(--color-danger)] bg-opacity-10 border border-[var(--color-danger)] text-[var(--color-danger)] p-4 rounded mb-6 text-sm">
          <strong>SYSTEM ALERT:</strong> {error}
        </div>
      )}

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-3)]">
        
        {/* MIDDLE: LEFT (AI AGENT COUNCIL) */}
        <div className="lg:col-span-8 flex flex-col gap-[var(--space-3)]">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
            <h2 className="text-[var(--text-section)] text-white font-bold uppercase tracking-widest">AI COUNCIL</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-3)]">
            <AIPersonalityCard 
              name="Buffett AI"
              philosophy="Value Investing"
              confidence={87}
              currentTask={loading ? `Analyzing ${ticker}...` : analysis ? `Evaluated ${ticker} intrinsic value.` : 'Standby'}
              status={loading ? 'ANALYZING' : 'ONLINE'}
            />
            <AIPersonalityCard 
              name="Dalio AI"
              philosophy="Macro Risk"
              confidence={91}
              currentTask={loading ? 'Monitoring headwinds...' : analysis ? `Assessed ${ticker} vulnerabilities.` : 'Standby'}
              status={loading ? 'ANALYZING' : 'ONLINE'}
            />
          </div>
        </div>

        {/* MIDDLE: RIGHT (MARKET RADAR) */}
        <div className="lg:col-span-4 flex flex-col gap-[var(--space-3)]">
           <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 opacity-0 select-none hidden lg:flex">
            <h2>Placeholder</h2>
          </div>
          <RadarPanel sentiment="GREED" momentum="+2.4%" isPositive={true} />
        </div>

        {/* CENTER: PORTFOLIO UNIVERSE */}
        <div className="lg:col-span-12 mt-4">
          <PortfolioUniverseMap />
        </div>

        {/* BOTTOM: RISK ENGINE & DECISION ENGINE */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-[var(--space-3)] mt-4">
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-[var(--space-3)]">
             <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
              <h2 className="text-[var(--text-section)] text-[var(--color-danger)] opacity-80 font-bold uppercase tracking-widest">RISK ENGINE</h2>
            </div>
            <AIPersonalityCard 
              name="Risk Control AI"
              philosophy="Capital Preservation"
              confidence={95}
              currentTask={loading ? 'Scanning market anomalies...' : analysis ? `Stress-tested ${ticker} vs VN-Index.` : 'Monitoring'}
              status="ONLINE"
            />
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-[var(--space-3)]">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
              <h2 className="text-[var(--text-section)] text-[var(--color-success)] opacity-80 font-bold uppercase tracking-widest">DECISION ENGINE</h2>
            </div>
            <DecisionPanel decision={analysis?.decision || null} roic={analysis?.roic || 0} loading={loading} />
          </div>
        </div>

      </div>

      <ActivityFeed />
    </div>
  );
};
