export interface ScenarioSnapshot {
  ticker: string;
  dateCreated: number;
  baseCaseRevenueGrowth: number;
  baseCaseMargin: number;
  targetPrice: number;
  actualPriceAtTime: number;
}
