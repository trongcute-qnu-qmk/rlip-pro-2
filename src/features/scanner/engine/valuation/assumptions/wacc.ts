export interface CostOfEquityInputs {
  riskFreeRate: number; // e.g. 0.03 for 3%
  beta: number; // e.g. 1.2
  marketRiskPremium: number; // e.g. 0.08 for 8%
}

export function calculateCostOfEquity(inputs: CostOfEquityInputs): number {
  return inputs.riskFreeRate + (inputs.beta * inputs.marketRiskPremium);
}

export interface WACCInputs {
  costOfEquity: number;
  totalEquityValue: number;
  totalDebtValue: number;
  interestExpense: number;
  effectiveTaxRate: number;
}

export function calculateWACC(inputs: WACCInputs): number {
  const { costOfEquity, totalEquityValue, totalDebtValue, interestExpense, effectiveTaxRate } = inputs;
  const totalCapital = totalEquityValue + totalDebtValue;
  
  if (totalCapital === 0) return costOfEquity;

  const weightOfEquity = totalEquityValue / totalCapital;
  const weightOfDebt = totalDebtValue / totalCapital;

  // Cost of debt is interest expense divided by total debt (simple approximation)
  const costOfDebt = totalDebtValue > 0 ? interestExpense / totalDebtValue : 0;
  
  const wacc = (weightOfEquity * costOfEquity) + (weightOfDebt * costOfDebt * (1 - effectiveTaxRate));
  
  return wacc;
}
