import type { FinancialDataResponse } from '../adapters/MockAdapter';

export interface QualityReport {
  isValid: boolean;
  warnings: string[];
  provenanceScore: number;
}

export class DataQualityEngine {
  
  static calculateProvenanceScore(source: string): number {
    const s = source.toLowerCase();
    if (s.includes('audited') || s.includes('official')) return 95;
    if (s.includes('presentation') || s.includes('management')) return 70;
    if (s.includes('news')) return 60;
    if (s.includes('social') || s.includes('rumor')) return 20;
    return 50; // default unknown
  }

  checkAnomalies(data: FinancialDataResponse): QualityReport {
    const warnings: string[] = [];
    let isValid = true;

    // 1. Check Missing Data
    if (!data.metrics['Revenue'] && !data.metrics['Total Sales'] && !data.metrics['REVENUE']) {
      warnings.push('CRITICAL: Missing Revenue data');
      isValid = false;
    }

    // 2. Anomaly Check
    if (data.metrics['TotalAssets'] && data.metrics['TotalAssets'] < 0) {
      warnings.push('CRITICAL: Total Assets cannot be negative');
      isValid = false;
    }

    const provenanceScore = DataQualityEngine.calculateProvenanceScore(data.source);

    return { isValid, warnings, provenanceScore };
  }
}
