import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { Badge } from '../../../design-system/components/Badge';
import { ScoreBadge } from '../../../design-system/components/ScoreBadge';
import { DataTable } from '../../../design-system/components/DataTable';
import { MarketCycleDetector } from './MarketCycleDetector';
import { PortfolioAttribution } from './PortfolioAttribution';
import { DecisionHeatmap } from './DecisionHeatmap';
import { AICalibrationDashboard } from './AICalibrationDashboard';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InvestmentCommandCenter: React.FC = () => {
  // Mock Data
  const holdingsData = [
    { ticker: 'FPT', conviction: 91, position: '8.0%', action: 'HOLD' },
    { ticker: 'VCB', conviction: 84, position: '6.5%', action: 'TRIM' },
    { ticker: 'MWG', conviction: 76, position: '4.0%', action: 'REVIEW' },
  ];

  const holdingsCols = [
    { key: 'ticker', header: 'Ticker', render: (val: string) => <span className="font-bold">{val}</span> },
    { key: 'conviction', header: 'Conviction', align: 'center' as const, render: (val: number) => <ScoreBadge score={val} /> },
    { key: 'position', header: 'Position', align: 'right' as const },
    { key: 'action', header: 'AI Action', align: 'right' as const, render: (val: string) => (
      <Badge variant={val === 'HOLD' ? 'neutral' : val === 'TRIM' ? 'warning' : 'bear'}>{val}</Badge>
    )}
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">Command Center</h1>
        <p className="text-secondary">Welcome back. Here is your portfolio overview for today.</p>
      </div>

      {/* Top Row: Market Regime & Portfolio Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <MarketCycleDetector />
        <PortfolioAttribution />
      </div>

      {/* Epic 8.3.1 Row 2: Heatmap & Calibration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DecisionHeatmap />
        <AICalibrationDashboard />
      </div>

      {/* Epic 8.3 Row: AI Alerts & Today's Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <Card variant="outline" className="border-signal-bear border-opacity-30">
          <div className="flex items-center justify-between mb-4 border-b border-border-light pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-signal-bear" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-signal-bear">AI Alert Center</h2>
            </div>
            <Badge variant="bear">3 Active</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-[rgba(244,63,94,0.05)] rounded-md border border-[rgba(244,63,94,0.1)]">
              <div className="mt-0.5"><div className="w-2 h-2 rounded-full bg-signal-bear animate-pulse" /></div>
              <div>
                <p className="text-sm font-semibold text-primary">Thesis Break Alert: FPT</p>
                <p className="text-xs text-secondary mt-1">Margin decline detected in Q4 results. Below acceptable threshold.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[rgba(245,158,11,0.05)] rounded-md border border-[rgba(245,158,11,0.1)]">
              <div className="mt-0.5"><div className="w-2 h-2 rounded-full bg-signal-warning" /></div>
              <div>
                <p className="text-sm font-semibold text-primary">Valuation Warning: VCB</p>
                <p className="text-xs text-secondary mt-1">P/B ratio has exceeded historical mean + 2SD.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="default">
          <div className="flex items-center gap-2 mb-4 border-b border-border-light pb-2">
            <CheckCircle2 className="w-5 h-5 text-accent-blue" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">Today's Action</h2>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-center gap-3 group">
              <input type="checkbox" className="w-4 h-4 accent-accent-blue cursor-pointer" />
              <span className="text-sm text-primary flex-1">Review FPT margin decline in War Room</span>
              <Link to="/war-room" className="text-xs text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity">Open War Room →</Link>
            </li>
            <li className="flex items-center gap-3 group">
              <input type="checkbox" className="w-4 h-4 accent-accent-blue cursor-pointer" />
              <span className="text-sm text-primary flex-1">Decide on VCB TRIM recommendation</span>
              <span className="text-xs text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Rebalance →</span>
            </li>
            <li className="flex items-center gap-3 group">
              <input type="checkbox" className="w-4 h-4 accent-accent-blue cursor-pointer" />
              <span className="text-sm text-primary flex-1">Update MWG investment thesis</span>
            </li>
          </ul>
        </Card>

      </div>

      {/* Bottom Row: Watchlist / Holdings Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Top Holdings & Watchlist</h2>
          <span className="text-xs text-accent-blue cursor-pointer hover:underline">View Full Portfolio</span>
        </div>
        <DataTable columns={holdingsCols} data={holdingsData} />
      </div>

    </div>
  );
};
