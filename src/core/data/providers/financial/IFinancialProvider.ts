import type { UnifiedFinancialModel } from '../../models/UnifiedFinancialModel';

export interface IFinancialProvider {
  getProviderName(): string;
  getAnnualFinancials(ticker: string, years: number): Promise<UnifiedFinancialModel[]>;
  getQuarterlyFinancials(ticker: string, quarters: number): Promise<UnifiedFinancialModel[]>;
}
