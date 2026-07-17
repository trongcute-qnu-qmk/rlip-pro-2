export interface InvestmentHorizon {
  shortTerm: boolean; // < 1 year
  mediumTerm: boolean; // 1-3 years
  longTerm: boolean; // > 3 years
}

export interface HorizonDecision {
  ticker: string;
  action: 'BUY' | 'HOLD' | 'SELL' | 'WATCHLIST';
  horizon: InvestmentHorizon;
  holdingPeriod: string;
  conviction: number; // 0-100
}
