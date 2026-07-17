import type { FinancialStatement } from './models';
import { calculateRBQS, getInvestmentVerdict, type RBQSResult, type Verdict } from './rbqs';
import { evaluateRisks, type RiskFlag } from './risk';

export interface BusinessQualityReport {
  companyTicker: string;
  companyName: string;
  generatedAt: number;
  rbqs: RBQSResult;
  risks: RiskFlag[];
  verdict: Verdict;
}

export function generateReport(
  statement: FinancialStatement, 
  marketCap: number, 
  qualitativeInputs?: { managementScore: number; moatScore: number }
): BusinessQualityReport {
  const rbqs = calculateRBQS(statement, qualitativeInputs);
  const risks = evaluateRisks(statement, marketCap);
  const verdict = getInvestmentVerdict(rbqs);

  return {
    companyTicker: statement.company.ticker,
    companyName: statement.company.name,
    generatedAt: Date.now(),
    rbqs,
    risks,
    verdict
  };
}
