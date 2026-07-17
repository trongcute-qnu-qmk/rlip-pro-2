export interface AlphaScoreInputs {
  businessQualityScore: number; // Max 30
  financialHealthScore: number; // Max 20
  managementScore: number; // Max 15
  growthScore: number; // Max 15
  valuationScore: number; // Max 15 (e.g. high margin of safety = 15)
  riskControlScore: number; // Max 5
}

export function calculateRLIPAlphaScore(inputs: AlphaScoreInputs) {
  const totalScore = inputs.businessQualityScore 
    + inputs.financialHealthScore 
    + inputs.managementScore 
    + inputs.growthScore 
    + inputs.valuationScore 
    + inputs.riskControlScore;

  let recommendation = 'AVOID';
  if (totalScore >= 85) recommendation = 'HIGH_CONVICTION_BUY';
  else if (totalScore >= 70) recommendation = 'ACCUMULATE';
  else if (totalScore >= 50) recommendation = 'WATCHLIST';

  return {
    totalScore,
    recommendation,
    components: inputs
  };
}
