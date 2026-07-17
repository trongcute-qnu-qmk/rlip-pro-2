import type { BalanceSheet, IncomeStatement, CashFlow } from './models';

// 1. Piotroski F-Score (Khả năng phục hồi tài chính)
export function calculatePiotroskiFScore(
  currentBs: BalanceSheet, prevBs: BalanceSheet,
  currentIs: IncomeStatement, prevIs: IncomeStatement,
  currentCf: CashFlow
): number {
  let score = 0;
  // Profitability
  const roa = currentIs.netIncome / currentBs.totalAssets;
  if (roa > 0) score++;
  if (currentCf.operatingCashFlow > 0) score++;
  if (roa > (prevIs.netIncome / prevBs.totalAssets)) score++;
  if (currentCf.operatingCashFlow > currentIs.netIncome) score++;

  // Leverage & Liquidity
  if ((currentBs.longTermDebt / currentBs.totalAssets) < (prevBs.longTermDebt / prevBs.totalAssets)) score++;
  if ((currentBs.currentAssets / currentBs.currentLiabilities) > (prevBs.currentAssets / prevBs.currentLiabilities)) score++;
  score++; // Simplified: No new shares issued

  // Operating Efficiency
  if ((currentIs.grossProfit / currentIs.revenue) > (prevIs.grossProfit / prevIs.revenue)) score++;
  if ((currentIs.revenue / currentBs.totalAssets) > (prevIs.revenue / prevBs.totalAssets)) score++;

  return score;
}

// 2. ROIC (Return on Invested Capital)
export function calculateROIC(is: IncomeStatement, bs: BalanceSheet): number {
  const nopat = is.operatingIncome * (1 - (is.taxes / is.ebit || 0.2)); // assumed 20% tax if ebit is 0
  const investedCapital = bs.totalAssets - bs.currentLiabilities + bs.cashAndEquivalents;
  return nopat / investedCapital;
}

// 3. Free Cash Flow
export function calculateFCF(cf: CashFlow): number {
  return cf.operatingCashFlow - Math.abs(cf.capitalExpenditure);
}

// 4. Altman Z-Score (Nguy cơ phá sản)
export function calculateAltmanZScore(is: IncomeStatement, bs: BalanceSheet, marketCap: number): number {
  const t1 = (bs.currentAssets - bs.currentLiabilities) / bs.totalAssets; // Working Capital / Total Assets
  const t2 = bs.retainedEarnings / bs.totalAssets; // Retained Earnings / Total Assets
  const t3 = is.ebit / bs.totalAssets; // EBIT / Total Assets
  const t4 = marketCap / bs.totalLiabilities; // Market Value of Equity / Total Liabilities
  const t5 = is.revenue / bs.totalAssets; // Sales / Total Assets

  return (1.2 * t1) + (1.4 * t2) + (3.3 * t3) + (0.6 * t4) + (0.999 * t5);
}

// 5. Beneish M-Score (Khả năng thao túng báo cáo tài chính)
// Simplified version for demonstration
export function calculateBeneishMScore(currentBs: BalanceSheet, prevBs: BalanceSheet, currentIs: IncomeStatement, prevIs: IncomeStatement): number {
  const dsri = (currentBs.receivables / currentIs.revenue) / (prevBs.receivables / prevIs.revenue);
  const gmi = (prevIs.grossProfit / prevIs.revenue) / (currentIs.grossProfit / currentIs.revenue);
  const aqi = (1 - (currentBs.currentAssets + currentBs.propertyPlantEquipment) / currentBs.totalAssets) / 
              (1 - (prevBs.currentAssets + prevBs.propertyPlantEquipment) / prevBs.totalAssets);
  const sgi = currentIs.revenue / prevIs.revenue;
  
// M-Score formula (8-variable model simplified)
  return -4.84 + (0.92 * dsri) + (0.528 * gmi) + (0.404 * aqi) + (0.892 * sgi);
}

// 6. Sloan Ratio (Chất lượng lợi nhuận qua Accruals)
export function calculateSloanRatio(is: IncomeStatement, cf: CashFlow, bs: BalanceSheet): number {
  // Sloan Ratio = (Net Income - Operating Cash Flow) / Total Assets
  // Ratio > 0.1 or < -0.1 indicates low earnings quality
  return (is.netIncome - cf.operatingCashFlow) / bs.totalAssets;
}

// 7. Cash Conversion Cycle (CCC)
export function calculateCCC(currentBs: BalanceSheet, prevBs: BalanceSheet, is: IncomeStatement): number {
  const avgInventory = (currentBs.inventory + prevBs.inventory) / 2;
  const avgReceivables = (currentBs.receivables + prevBs.receivables) / 2;
  const avgPayables = ((currentBs.accountsPayable || 0) + (prevBs.accountsPayable || 0)) / 2;

  const dio = (avgInventory / (is.costOfGoodsSold || 1)) * 365;
  const dso = (avgReceivables / (is.revenue || 1)) * 365;
  const dpo = (avgPayables / (is.costOfGoodsSold || 1)) * 365;

  return dio + dso - dpo;
}
