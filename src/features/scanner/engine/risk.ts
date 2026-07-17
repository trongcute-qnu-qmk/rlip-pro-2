import type { FinancialStatement } from './models';
import { calculateAltmanZScore, calculateBeneishMScore } from './formulas';

export type FlagSeverity = 'RED' | 'YELLOW' | 'GREEN';

export interface RiskFlag {
  id: string;
  severity: FlagSeverity;
  title: string;
  description: string;
}

export function evaluateRisks(statement: FinancialStatement, marketCap: number): RiskFlag[] {
  const flags: RiskFlag[] = [];
  const years = statement.years;
  if (years.length < 2) return flags;

  const currentYear = years[years.length - 1];
  const prevYear = years[years.length - 2];

  const currentBs = statement.balanceSheets[currentYear];
  const prevBs = statement.balanceSheets[prevYear];
  const currentIs = statement.incomeStatements[currentYear];
  const prevIs = statement.incomeStatements[prevYear];
  const currentCf = statement.cashFlows[currentYear];

  // Bankruptcy Risk (Altman Z-Score)
  const zScore = calculateAltmanZScore(currentIs, currentBs, marketCap);
  if (zScore < 1.81) {
    flags.push({ id: 'altman_z', severity: 'RED', title: 'Nguy cơ phá sản cao', description: `Altman Z-Score ở mức nguy hiểm (${zScore.toFixed(2)})` });
  } else if (zScore < 2.99) {
    flags.push({ id: 'altman_z', severity: 'YELLOW', title: 'Vùng cảnh báo', description: `Altman Z-Score ở vùng xám (${zScore.toFixed(2)})` });
  } else {
    flags.push({ id: 'altman_z', severity: 'GREEN', title: 'Tài chính an toàn', description: `Z-Score an toàn (${zScore.toFixed(2)})` });
  }

  // Earnings Manipulation (Beneish M-Score)
  const mScore = calculateBeneishMScore(currentBs, prevBs, currentIs, prevIs);
  if (mScore > -1.78) {
    flags.push({ id: 'beneish_m', severity: 'RED', title: 'Rủi ro thao túng BCTC', description: `M-Score cao bất thường (${mScore.toFixed(2)})` });
  } else {
    flags.push({ id: 'beneish_m', severity: 'GREEN', title: 'Không có dấu hiệu thao túng', description: `M-Score an toàn (${mScore.toFixed(2)})` });
  }

  // Cash Flow to Net Income
  if (currentCf.operatingCashFlow < currentIs.netIncome) {
    flags.push({ id: 'cf_quality', severity: 'YELLOW', title: 'Chất lượng lợi nhuận thấp', description: 'Dòng tiền HĐKD nhỏ hơn Lợi nhuận sau thuế' });
  }

  return flags;
}
