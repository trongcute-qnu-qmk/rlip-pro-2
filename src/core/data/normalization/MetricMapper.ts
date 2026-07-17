export class MetricMapper {
  private static dictionary: Record<string, string> = {
    'Revenue': 'REVENUE',
    'Total Sales': 'REVENUE',
    'Net Revenue': 'REVENUE',
    'NetIncome': 'NET_INCOME',
    'Profit': 'NET_INCOME',
    'TotalAssets': 'TOTAL_ASSETS',
    'TotalEquity': 'TOTAL_EQUITY'
  };

  static map(rawMetricName: string): string {
    return this.dictionary[rawMetricName] || rawMetricName.toUpperCase();
  }
}
