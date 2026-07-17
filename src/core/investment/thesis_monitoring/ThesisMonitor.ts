export interface ThesisThresholds {
  minRevenueGrowth?: number;
  minRoic?: number;
  maxDebtToEquity?: number;
}

export class ThesisMonitor {
  checkThesisBreak(_ticker: string, currentMetrics: any, thresholds: ThesisThresholds): boolean {
    if (thresholds.minRevenueGrowth && currentMetrics.revenueGrowth < thresholds.minRevenueGrowth) return true;
    if (thresholds.minRoic && currentMetrics.roic < thresholds.minRoic) return true;
    if (thresholds.maxDebtToEquity && currentMetrics.debtToEquity > thresholds.maxDebtToEquity) return true;
    
    return false; // Thesis remains intact
  }
}
