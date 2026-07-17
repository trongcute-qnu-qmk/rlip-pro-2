export interface OwnerEarningsInputs {
  netIncome: number;
  depreciation: number;
  amortization: number;
  maintenanceCapEx: number; // CapEx required to maintain current business (not expansion)
  changeInWorkingCapital: number;
}

export function calculateOwnerEarnings(inputs: OwnerEarningsInputs): number {
  return inputs.netIncome 
    + inputs.depreciation 
    + inputs.amortization 
    - inputs.maintenanceCapEx 
    - inputs.changeInWorkingCapital; // If WC increases, it consumes cash
}

export function calculateBuffettQualityCheck(
  oeGrowth10Y: number,
  oeStabilityScore: number, // 0 to 10 scale
  roic: number,
  debtToEquity: number
): number {
  let score = 0;
  
  // Growth
  if (oeGrowth10Y > 0.15) score += 30;
  else if (oeGrowth10Y > 0.08) score += 20;
  else if (oeGrowth10Y > 0) score += 10;

  // Stability
  score += (oeStabilityScore / 10) * 20; // Max 20

  // ROIC (The Moat)
  if (roic > 0.15) score += 30;
  else if (roic > 0.10) score += 20;
  else if (roic > 0.05) score += 10;
  
  // Debt (Safety)
  if (debtToEquity < 0.5) score += 20;
  else if (debtToEquity < 1.0) score += 10;

  return score;
}
