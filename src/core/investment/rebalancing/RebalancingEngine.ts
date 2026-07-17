export class RebalancingEngine {
  evaluateAction(ticker: string, initialWeight: number, currentWeight: number, isValuationExpensive: boolean): string {
    if (currentWeight > initialWeight * 2 && isValuationExpensive) {
      return `TRIM: ${ticker} weight has doubled and valuation is expensive. Take some profits.`;
    }
    if (isValuationExpensive && currentWeight > 15) {
      return `TRIM: Position ${ticker} is too large while expensive. Reduce exposure.`;
    }
    return 'HOLD: No rebalancing required.';
  }
}
