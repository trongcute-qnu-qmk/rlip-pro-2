import React, { useState } from 'react';
import { Card } from '../../../design-system/components/Card';
import { Badge } from '../../../design-system/components/Badge';
import { Button } from '../../../design-system/components/Button';
import { DataTable } from '../../../design-system/components/DataTable';
import { LineChart } from '../../../design-system/charts';

export const PortfolioOS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALLOCATION' | 'REBALANCING' | 'PERFORMANCE'>('ALLOCATION');

  const positions = [
    { ticker: 'FPT', sector: 'Tech', assetClass: 'EQUITY', weight: '35%', return: '+18.2%' },
    { ticker: 'VCB', sector: 'Bank', assetClass: 'EQUITY', weight: '20%', return: '+5.4%' },
    { ticker: 'MWG', sector: 'Retail', assetClass: 'EQUITY', weight: '15%', return: '-2.1%' },
    { ticker: 'CASH', sector: 'N/A', assetClass: 'CASH', weight: '30%', return: '0.0%' },
  ];

  const cols = [
    { key: 'ticker', header: 'Asset' },
    { key: 'sector', header: 'Sector' },
    { key: 'assetClass', header: 'Class' },
    { key: 'weight', header: 'Weight', align: 'right' as const },
    { key: 'return', header: 'Return', align: 'right' as const, render: (val: string) => (
      <span className={val.startsWith('+') ? 'text-signal-bull' : val.startsWith('-') ? 'text-signal-bear' : ''}>{val}</span>
    )},
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">Portfolio OS</h1>
        <p className="text-secondary">Manage asset allocation, simulate rebalancing, and track performance.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border-light pb-2 mb-6">
        <button 
          onClick={() => setActiveTab('ALLOCATION')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'ALLOCATION' ? 'text-accent-blue border-b-2 border-accent-blue' : 'text-secondary hover:text-primary'}`}
        >
          Asset Allocation
        </button>
        <button 
          onClick={() => setActiveTab('REBALANCING')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'REBALANCING' ? 'text-accent-blue border-b-2 border-accent-blue' : 'text-secondary hover:text-primary'}`}
        >
          Rebalancing Simulator
        </button>
        <button 
          onClick={() => setActiveTab('PERFORMANCE')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'PERFORMANCE' ? 'text-accent-blue border-b-2 border-accent-blue' : 'text-secondary hover:text-primary'}`}
        >
          Performance & AI Tracking
        </button>
      </div>

      {activeTab === 'ALLOCATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          <div className="lg:col-span-2 space-y-6">
            <Card variant="default">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2">Current Positions</h2>
              <DataTable columns={cols} data={positions} />
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card variant="glass" className="border-accent-blue border-opacity-30">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2">Allocation Strategy</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-muted mb-1">
                    <span>Equity Target</span>
                    <span>70% (Tactical: -10%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">60.0%</span>
                    <Badge variant="warning">Underweight</Badge>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted mb-1">
                    <span>Cash Target</span>
                    <span>30% (Tactical: +10%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">40.0%</span>
                    <Badge variant="bull">Overweight</Badge>
                  </div>
                </div>
                <div className="pt-4 mt-2 border-t border-border-light">
                  <span className="text-xs text-muted block mb-1">AI Recommendation</span>
                  <p className="text-sm">Maintain high cash position due to CAUTIOUS_BULL regime and rising macro risks.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'REBALANCING' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
          <Card variant="default">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2">Trade Entry</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input type="text" placeholder="Ticker (e.g. FPT)" className="bg-surface border border-border-light rounded px-3 py-2 text-sm w-1/3 text-primary" />
                <select className="bg-surface border border-border-light rounded px-3 py-2 text-sm w-1/3 text-primary">
                  <option>BUY</option>
                  <option>SELL</option>
                </select>
                <input type="number" placeholder="Quantity" className="bg-surface border border-border-light rounded px-3 py-2 text-sm w-1/3 text-primary" />
              </div>
              <Button variant="secondary" className="w-full">+ Add Trade to Simulation</Button>
            </div>
            
            <div className="mt-6">
               <h3 className="text-xs font-semibold text-muted uppercase mb-2">Pending Simulation Trades</h3>
               <div className="p-3 bg-surface-hover rounded border border-border-light flex justify-between items-center">
                  <span className="text-sm"><span className="text-signal-bear font-bold">SELL</span> 10,000 VCB</span>
                  <span className="text-xs text-muted">Est. 950,000,000 VND</span>
               </div>
            </div>
          </Card>
          
          <Card variant="glass" className="border-signal-warning border-opacity-30">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4 border-b border-border-light pb-2">Simulation Results: Before vs After</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-center w-1/3">
                  <p className="text-xs text-muted uppercase">Expected Return</p>
                  <p className="text-lg font-bold">14.5%</p>
                </div>
                <div className="w-1/3 text-center text-accent-blue font-bold">→</div>
                <div className="text-center w-1/3">
                  <p className="text-xs text-muted uppercase">Expected Return</p>
                  <p className="text-lg font-bold text-signal-bull">16.2%</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-center w-1/3">
                  <p className="text-xs text-muted uppercase">Risk Score</p>
                  <p className="text-lg font-bold">42/100</p>
                </div>
                <div className="w-1/3 text-center text-signal-warning font-bold">→</div>
                <div className="text-center w-1/3">
                  <p className="text-xs text-muted uppercase">Risk Score</p>
                  <p className="text-lg font-bold text-signal-bear">48/100</p>
                </div>
              </div>

              <div className="p-3 bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] rounded">
                <p className="text-sm"><strong>AI Analysis:</strong> Selling VCB increases overall portfolio upside potential, but reduces dividend stability and increases Beta to 1.15.</p>
              </div>
              
              <Button variant="primary" className="w-full">Execute Rebalance</Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'PERFORMANCE' && (
        <div className="grid grid-cols-1 gap-6 animate-in fade-in">
          <Card variant="default">
             <div className="flex justify-between items-center mb-4 border-b border-border-light pb-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">Performance vs Benchmarks</h2>
                <select className="bg-surface border border-border-light rounded px-2 py-1 text-xs text-primary">
                  <option>YTD</option>
                  <option>1 Year</option>
                </select>
             </div>
             
             <LineChart height="h-64" />
             
             <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-surface-hover rounded text-center border border-border-light">
                   <p className="text-xs text-muted uppercase">Portfolio</p>
                   <p className="text-xl font-bold text-accent-blue">+18.2%</p>
                </div>
                <div className="p-4 bg-surface-hover rounded text-center border border-border-light">
                   <p className="text-xs text-muted uppercase">VNIndex</p>
                   <p className="text-xl font-bold text-secondary">+12.4%</p>
                </div>
                <div className="p-4 bg-surface-hover rounded text-center border border-border-light">
                   <p className="text-xs text-muted uppercase">AI Expected</p>
                   <p className="text-xl font-bold text-signal-bull">+22.0%</p>
                </div>
             </div>
             
             <div className="mt-6 p-4 border border-border-light rounded bg-surface">
                <h3 className="text-sm font-semibold text-primary mb-2">Learning Loop Alert</h3>
                <p className="text-sm text-secondary">Portfolio underperformed AI expectations by 3.8%. Primary drag was MWG (-2.1%). AI Model has automatically logged this variance to adjust retail sector weighting algorithms in the next epoch.</p>
             </div>
          </Card>
        </div>
      )}

    </div>
  );
};
