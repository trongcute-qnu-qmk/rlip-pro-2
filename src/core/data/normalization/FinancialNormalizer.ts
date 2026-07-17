import type { FinancialDataResponse } from '../adapters/MockAdapter';
import type { FinancialFact } from '../models/FinancialFact';
import { MetricMapper } from './MetricMapper';

export class FinancialNormalizer {
  
  normalize(rawData: FinancialDataResponse): FinancialFact[] {
    const facts: FinancialFact[] = [];
    
    Object.entries(rawData.metrics).forEach(([rawKey, value]) => {
      const standardMetric = MetricMapper.map(rawKey);
      
      facts.push({
        id: `${rawData.ticker}-${rawData.period}-${standardMetric}-${Date.now()}`,
        ticker: rawData.ticker,
        metric: standardMetric,
        value: value,
        period: rawData.period,
        version: 1, // Handled by Repo later
        isLatest: true,
        lineage: {
          sourceId: rawData.source,
          calculatedBy: 'RLIP_Normalization_Engine',
          timestamp: new Date().toISOString()
        },
        confidenceScore: rawData.source.includes('Audited') ? 95 : 80 // Mock logic
      });
    });

    return facts;
  }
}
