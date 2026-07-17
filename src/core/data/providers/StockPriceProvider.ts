import type { IDataAdapter } from '../adapters/MockAdapter';

export class StockPriceProvider {
  private adapter: IDataAdapter;
  constructor(adapter: IDataAdapter) {
    this.adapter = adapter;
  }

  async getCurrentPrice(ticker: string) {
    try {
      const data = await this.adapter.fetchRealTimePrice(ticker);
      return data;
    } catch (error) {
      console.error(`Failed to fetch price for ${ticker}`, error);
      throw error;
    }
  }
}
