import type { ValidatedFinancialStatement } from '../contracts/FinancialStatementSchema';

export const mockFptData: ValidatedFinancialStatement = {
  ticker: 'FPT',
  period: '2025-FY',
  source: 'Audited Annual Report 2025',
  metrics: {
    'REVENUE': 52000000000,
    'NET_INCOME': 7000000000,
    'TOTAL_ASSETS': 60000000000,
    'TOTAL_EQUITY': 25000000000
  }
};
