export interface HistoricalValuationInputs {
  currentPE: number;
  averagePE5Y: number;
  currentPB: number;
  averagePB5Y: number;
}

export function calculateHistoricalPremium(inputs: HistoricalValuationInputs) {
  const pePremium = inputs.averagePE5Y > 0 ? (inputs.currentPE - inputs.averagePE5Y) / inputs.averagePE5Y : 0;
  const pbPremium = inputs.averagePB5Y > 0 ? (inputs.currentPB - inputs.averagePB5Y) / inputs.averagePB5Y : 0;

  return {
    pePremium,
    pbPremium,
    isOvervaluedHistorically: pePremium > 0.1 || pbPremium > 0.1, // >10% premium means overvalued vs history
    isUndervaluedHistorically: pePremium < -0.1 || pbPremium < -0.1,
  };
}
