export interface MacroData {
  riskFreeRate: number; // e.g., 10-year government bond yield
  inflationRate: number; // CPI
  gdpGrowth: number;
  exchangeRateUsdVnd: number;
  meta: {
    source: string;
    retrievedAt: number;
  }
}

export interface IMacroProvider {
  getProviderName(): string;
  getMacroData(): Promise<MacroData>;
}
