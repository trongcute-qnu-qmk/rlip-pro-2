export interface Company {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
}

export interface BalanceSheet {
  year: number;
  totalAssets: number;
  currentAssets: number;
  totalLiabilities: number;
  currentLiabilities: number;
  longTermDebt: number;
  retainedEarnings: number;
  workingCapital: number;
  cashAndEquivalents: number;
  inventory: number;
  receivables: number;
  propertyPlantEquipment: number;
  accountsPayable: number;
  totalEquity: number;
}

export interface IncomeStatement {
  year: number;
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  depreciation: number;
  interestExpense: number;
  taxes: number;
  ebit: number;
}

export interface CashFlow {
  year: number;
  operatingCashFlow: number;
  capitalExpenditure: number;
  freeCashFlow: number;
  dividendsPaid: number;
  stockRepurchase: number;
}

export interface FinancialStatement {
  company: Company;
  balanceSheets: Record<number, BalanceSheet>;
  incomeStatements: Record<number, IncomeStatement>;
  cashFlows: Record<number, CashFlow>;
  years: number[]; // e.g. [2021, 2022, 2023] sorted ASC
}
