export interface FinancialStatementRaw {
  ticker: string;
  period: string; // e.g., "2023-Q4", "2024-FY"
  source: string;
  metrics: Record<string, number>;
}

export interface FinancialDataProvider {
  getIncomeStatement(ticker: string): Promise<FinancialStatementRaw>;
  getBalanceSheet(ticker: string): Promise<FinancialStatementRaw>;
}
