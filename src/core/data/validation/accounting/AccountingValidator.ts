import type { UnifiedFinancialModel } from '../../models/UnifiedFinancialModel';

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0 to 100
  errors: string[];
}

export function validateAccountingIntegrity(data: UnifiedFinancialModel): ValidationResult {
  const errors: string[] = [];
  let score = 100;

  const bs = data.balanceSheet;
  const is = data.incomeStatement;

  // 1. Balance Sheet Equation
  const calculatedAssets = bs.totalLiabilities + bs.totalEquity;
  // allow 1% tolerance for rounding differences from API providers
  if (Math.abs(bs.totalAssets - calculatedAssets) / (bs.totalAssets || 1) > 0.01) {
    errors.push("Balance Sheet không cân (Assets != Liabilities + Equity)");
    score -= 30;
  }

  // 2. Gross Profit Logic
  if (is.grossProfit > is.revenue) {
    errors.push("Gross Profit lớn hơn Revenue vô lý");
    score -= 20;
  }

  // 3. Current Assets Check
  const currentAssetsSum = bs.cashAndEquivalents + bs.shortTermInvestments + bs.receivables + bs.inventory;
  if (currentAssetsSum > bs.currentAssets * 1.05) { // 5% tolerance
    errors.push("Tổng các Current Assets thành phần vượt quá Total Current Assets");
    score -= 10;
  }

  // 4. Net Income Check
  if (is.operatingIncome > is.grossProfit) {
    errors.push("Operating Income lớn hơn Gross Profit");
    score -= 15;
  }

  return {
    isValid: score >= 80, // strict threshold
    score,
    errors
  };
}
