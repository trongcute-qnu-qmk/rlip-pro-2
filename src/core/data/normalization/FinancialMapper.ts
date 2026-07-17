import type { UnifiedFinancialModel } from '../models/UnifiedFinancialModel';

export class FinancialMapper {
  /**
   * Chuyển đổi dữ liệu thô từ các API khác nhau về một UnifiedFinancialModel.
   * Đây là nơi duy nhất xử lý logic ánh xạ tên trường.
   */
  static mapFromRawAPI(rawData: any, source: string): UnifiedFinancialModel {
    // Ví dụ minh hoạ: xử lý trường hợp API trả về profit_after_tax hoặc net_income
    const netIncome = rawData.net_income ?? rawData.profit_after_tax ?? rawData.PAT ?? 0;
    const revenue = rawData.revenue ?? rawData.sales ?? rawData.total_revenue ?? 0;

    return {
      ticker: rawData.ticker || 'UNKNOWN',
      year: rawData.year || new Date().getFullYear(),
      period: rawData.quarter ? 'QUARTERLY' : 'ANNUAL',
      quarter: rawData.quarter,
      incomeStatement: {
        revenue,
        costOfGoodsSold: rawData.cogs ?? 0,
        grossProfit: rawData.gross_profit ?? (revenue - (rawData.cogs ?? 0)),
        operatingExpenses: rawData.operating_expenses ?? 0,
        operatingIncome: rawData.operating_income ?? 0,
        interestExpense: rawData.interest_expense ?? 0,
        taxExpense: rawData.tax_expense ?? 0,
        netIncome,
        depreciationAndAmortization: rawData.depreciation ?? rawData.dna ?? 0,
        eps: rawData.eps ?? 0,
      },
      balanceSheet: {
        cashAndEquivalents: rawData.cash ?? 0,
        shortTermInvestments: rawData.short_term_investments ?? 0,
        receivables: rawData.receivables ?? 0,
        inventory: rawData.inventory ?? 0,
        currentAssets: rawData.current_assets ?? 0,
        propertyPlantEquipment: rawData.ppe ?? 0,
        totalAssets: rawData.total_assets ?? 0,
        accountsPayable: rawData.accounts_payable ?? 0,
        shortTermDebt: rawData.short_term_debt ?? 0,
        currentLiabilities: rawData.current_liabilities ?? 0,
        longTermDebt: rawData.long_term_debt ?? 0,
        totalLiabilities: rawData.total_liabilities ?? 0,
        retainedEarnings: rawData.retained_earnings ?? 0,
        totalEquity: rawData.total_equity ?? 0,
      },
      cashFlow: {
        operatingCashFlow: rawData.operating_cash_flow ?? rawData.ocf ?? 0,
        capitalExpenditures: rawData.capital_expenditures ?? rawData.capex ?? 0,
        freeCashFlow: rawData.free_cash_flow ?? rawData.fcf ?? 0,
        dividendsPaid: rawData.dividends_paid ?? 0,
        stockRepurchase: rawData.stock_repurchase ?? 0,
      },
      meta: {
        source,
        retrievedAt: Date.now(),
        currency: rawData.currency || 'VND',
        unit: rawData.unit || 1, // 1 for raw, 1e9 for billions
        version: 1
      }
    };
  }
}
