import { LocalCache } from '../cache';
import type { FinancialStatement } from '@/features/scanner/engine/models';

export class FinancialRepository {
  /**
   * Lấy Báo cáo tài chính cho 1 Ticker.
   * Dùng API giả lập (Mock) chờ đấu nối API thực tế ở Epic sau.
   */
  async getFinancialStatement(ticker: string): Promise<FinancialStatement> {
    const cacheKey = `financials_${ticker}`;
    const cached = LocalCache.get<FinancialStatement>(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Giả lập mạng chậm
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock Data chuẩn Domain Model
    const mockData: FinancialStatement = {
      company: { ticker: ticker.toUpperCase(), name: 'Tập đoàn FPT', sector: 'Công nghệ', industry: 'Phần mềm' },
      years: [2022, 2023],
      balanceSheets: {
        2022: { year: 2022, totalAssets: 50000, currentAssets: 25000, totalLiabilities: 20000, currentLiabilities: 15000, longTermDebt: 5000, retainedEarnings: 15000, workingCapital: 10000, cashAndEquivalents: 8000, inventory: 2000, receivables: 5000, propertyPlantEquipment: 15000, accountsPayable: 10000, totalEquity: 30000 },
        2023: { year: 2023, totalAssets: 60000, currentAssets: 30000, totalLiabilities: 22000, currentLiabilities: 16000, longTermDebt: 4000, retainedEarnings: 20000, workingCapital: 14000, cashAndEquivalents: 10000, inventory: 2500, receivables: 6000, propertyPlantEquipment: 18000, accountsPayable: 11000, totalEquity: 38000 }
      },
      incomeStatements: {
        2022: { year: 2022, revenue: 40000, costOfGoodsSold: 20000, grossProfit: 20000, operatingIncome: 8000, netIncome: 6000, depreciation: 1500, interestExpense: 500, taxes: 1500, ebit: 8000 },
        2023: { year: 2023, revenue: 50000, costOfGoodsSold: 24000, grossProfit: 26000, operatingIncome: 11000, netIncome: 8500, depreciation: 1800, interestExpense: 400, taxes: 2100, ebit: 11000 }
      },
      cashFlows: {
        2022: { year: 2022, operatingCashFlow: 7000, capitalExpenditure: 2000, freeCashFlow: 5000, dividendsPaid: 2000, stockRepurchase: 0 },
        2023: { year: 2023, operatingCashFlow: 10000, capitalExpenditure: 3000, freeCashFlow: 7000, dividendsPaid: 2500, stockRepurchase: 500 }
      }
    };

    LocalCache.set(cacheKey, mockData, 24); // Cache 24h
    return mockData;
  }
}

export const financialRepository = new FinancialRepository();
