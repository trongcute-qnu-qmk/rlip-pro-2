import React from 'react';
import { CosmicCard } from './CosmicCard';

const mockAssets = [
  { symbol: 'FPT', value: '+2.4%', color: 'var(--color-success)', size: 'w-24 h-24', top: '10%', left: '20%' },
  { symbol: 'VNM', value: '-1.2%', color: 'var(--color-danger)', size: 'w-16 h-16', top: '40%', left: '50%' },
  { symbol: 'MWG', value: '+5.1%', color: 'var(--color-success)', size: 'w-20 h-20', top: '20%', left: '70%' },
  { symbol: 'VIC', value: '-0.5%', color: 'var(--color-danger)', size: 'w-14 h-14', top: '60%', left: '15%' },
  { symbol: 'MBB', value: '+1.1%', color: 'var(--color-success)', size: 'w-18 h-18', top: '70%', left: '80%' },
];

export const PortfolioUniverseMap: React.FC = () => {
  return (
    <CosmicCard className="h-[300px] flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 z-10">
        <h3 className="text-white text-[12px] uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="text-[var(--color-purple)]">◆</span> Portfolio Universe Map
        </h3>
        <div className="text-[10px] text-white opacity-50 uppercase tracking-widest">
          VN30 | US Stocks | Crypto
        </div>
      </div>

      <div className="flex-1 relative w-full border border-[var(--color-border)] rounded bg-black bg-opacity-20 overflow-hidden">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        ></div>

        {/* Floating Assets */}
        {mockAssets.map((asset, index) => (
          <div 
            key={index} 
            className={`absolute flex flex-col items-center justify-center rounded-full bg-black bg-opacity-60 border border-opacity-30 shadow-lg transition-transform hover:scale-110 cursor-pointer`}
            style={{ 
              width: asset.size.split(' ')[0].replace('w-', '') + 'px', // approximate
              top: asset.top, 
              left: asset.left,
              borderColor: asset.color,
              boxShadow: `0 0 10px ${asset.color}40`
            }}
          >
            <div className={`p-4 rounded-full ${asset.size} flex flex-col items-center justify-center`}>
               <span className="text-white font-bold text-[14px]">{asset.symbol}</span>
               <span className="text-[10px]" style={{ color: asset.color }}>{asset.value}</span>
            </div>
          </div>
        ))}
      </div>
    </CosmicCard>
  );
};
