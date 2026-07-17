export interface PipelineMetric {
  jobId: string;
  timestamp: string;
  totalRecords: number;
  successCount: number;
  failedCount: number;
  durationMs: number;
  duplicateCount: number;
  validationErrorCount: number;
}

export class PipelineMetrics {
  private static metrics: PipelineMetric[] = [];

  static record(metric: PipelineMetric) {
    this.metrics.push(metric);
    console.log(`[PipelineMetrics] Job ${metric.jobId} completed in ${metric.durationMs}ms. Success: ${metric.successCount}/${metric.totalRecords}`);
  }

  static getLatest(): PipelineMetric | undefined {
    return this.metrics[this.metrics.length - 1];
  }
}
