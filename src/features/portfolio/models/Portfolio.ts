import { type Position, calculateMarketValue } from './Position';

export interface Portfolio {
  id: string;
  name: string;
  ownerId: string;
  baseCurrency: string;
  
  positions: Position[];
  cashBalance: number;
  
  createdAt: string;
  updatedAt: string;
}

export const calculateTotalNAV = (portfolio: Portfolio): number => {
  const positionsValue = portfolio.positions.reduce((total, pos) => total + calculateMarketValue(pos), 0);
  return positionsValue + portfolio.cashBalance;
};

export const calculateSectorExposure = (portfolio: Portfolio): Record<string, number> => {
  const totalNav = calculateTotalNAV(portfolio);
  if (totalNav === 0) return {};

  const exposure: Record<string, number> = {};
  
  portfolio.positions.forEach(pos => {
    if (pos.assetClass === 'EQUITY' && pos.sector) {
      const value = calculateMarketValue(pos);
      exposure[pos.sector] = (exposure[pos.sector] || 0) + (value / totalNav) * 100;
    }
  });

  return exposure;
};
