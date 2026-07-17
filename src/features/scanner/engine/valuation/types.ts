export interface ValuationResult {
  intrinsicValue: number;
  currentPrice: number;
  marginOfSafety: number; // Percentage
  verdict: 'UNDERVALUED' | 'FAIRLY_VALUED' | 'OVERVALUED';
}
