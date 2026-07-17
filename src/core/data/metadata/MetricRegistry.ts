export interface MetricMetadata {
  id: string;
  name: string;
  unit: 'VND' | '%' | 'Multiplier' | 'Ratio' | 'Count';
  formula?: string;
  frequency: 'Quarterly' | 'Yearly' | 'Daily' | 'Realtime';
  precision: number; // Decimal places
  description: string;
}

export class MetricRegistry {
  private static registry: Record<string, MetricMetadata> = {
    'REVENUE': {
      id: 'REVENUE',
      name: 'Net Revenue',
      unit: 'VND',
      frequency: 'Quarterly',
      precision: 0,
      description: 'Total revenue minus discounts and returns.'
    },
    'ROIC': {
      id: 'ROIC',
      name: 'Return on Invested Capital',
      unit: '%',
      formula: 'NOPAT / Invested Capital',
      frequency: 'Quarterly',
      precision: 2,
      description: 'Efficiency of allocating capital to profitable investments.'
    }
  };

  static getMetadata(metricId: string): MetricMetadata | undefined {
    return this.registry[metricId];
  }
}
