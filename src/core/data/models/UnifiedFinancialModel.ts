export interface UnifiedFinancialModel {
  ticker: string;
  year: number;
  quarter?: number;
  period: 'ANNUAL' | 'QUARTERLY';
  
  incomeStatement: {
    revenue: number;
    costOfGoodsSold: number;
    grossProfit: number;
    operatingExpenses: number;
    operatingIncome: number;
    interestExpense: number;
    taxExpense: number;
    netIncome: number;
    depreciationAndAmortization: number;
    eps: number;
  };

  balanceSheet: {
    cashAndEquivalents: number;
    shortTermInvestments: number;
    receivables: number;
    inventory: number;
    currentAssets: number;
    propertyPlantEquipment: number;
    totalAssets: number;

    accountsPayable: number;
    shortTermDebt: number;
    currentLiabilities: number;
    longTermDebt: number;
    totalLiabilities: number;

    retainedEarnings: number;
    totalEquity: number;
  };

  cashFlow: {
    operatingCashFlow: number;
    capitalExpenditures: number;
    freeCashFlow: number;
    dividendsPaid: number;
    stockRepurchase: number;
  };

  meta: {
    source: string;
    retrievedAt: number;
    currency: string;
    unit: number; // e.g., 1000000000 for Billions VND
    version: number;
  };
}
