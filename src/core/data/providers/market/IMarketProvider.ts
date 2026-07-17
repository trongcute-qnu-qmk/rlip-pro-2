export interface MarketData {
  ticker: string;
  currentPrice: number;
  marketCap: number;
  sharesOutstanding: number;
  volume: number;
  beta: number;
  dividendYield: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  meta: {
    source: string;
    retrievedAt: number;
  }
}

export interface IMarketProvider {
  getProviderName(): string;
  getMarketData(ticker: string): Promise<MarketData>;
  getHistoricalPrices(ticker: string, days: number): Promise<{date: string, close: number}[]>;
}
