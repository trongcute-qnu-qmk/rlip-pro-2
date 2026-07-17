export interface FinancialDataResponse {
  ticker: string;
  period: string; // e.g., "2025-Q1", "2025-FY"
  metrics: Record<string, number>;
  source: string;
}

export interface IDataAdapter {
  fetchFinancials(ticker: string, period: string): Promise<FinancialDataResponse>;
  fetchRealTimePrice(ticker: string): Promise<{ price: number, volume: number, timestamp: string }>;
}

export class MockAdapter implements IDataAdapter {
  async fetchFinancials(ticker: string, period: string): Promise<FinancialDataResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      ticker,
      period,
      source: 'Mock_Financial_System_v1',
      metrics: {
        'Revenue': 12000000000,
        'NetIncome': 2000000000,
        'TotalAssets': 45000000000,
        'TotalEquity': 18000000000
      }
    };
  }

  async fetchRealTimePrice(ticker: string) {
    return {
      price: ticker === 'FPT' ? 135000 : 85000,
      volume: 1500000,
      timestamp: new Date().toISOString()
    };
  }
}
