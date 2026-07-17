export interface FinancialFeaturesV1 {
  revenueCagr5Y: number;
  roicTrend: 'INCREASING' | 'DECREASING' | 'STABLE';
  marginStabilityScore: number; // 0-100
  debtRiskScore: number; // 0-100
}
