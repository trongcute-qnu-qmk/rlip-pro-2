export interface Position {
  id: string;
  ticker: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  
  // Market Value = quantity * currentPrice
  // Total Cost = quantity * averageCost
  // Unrealized PnL = Market Value - Total Cost
  
  qualityScore: number;
  riskScore: number;
  valuationScore: number;
  overallConviction: number;
  
  assetClass: 'EQUITY' | 'BOND' | 'CASH';
  sector?: string;
}

export const calculateMarketValue = (position: Position): number => {
  return position.quantity * position.currentPrice;
};

export const calculateUnrealizedPnL = (position: Position): number => {
  return calculateMarketValue(position) - (position.quantity * position.averageCost);
};

export const calculatePnLPercentage = (position: Position): number => {
  const cost = position.quantity * position.averageCost;
  if (cost === 0) return 0;
  return (calculateUnrealizedPnL(position) / cost) * 100;
};
