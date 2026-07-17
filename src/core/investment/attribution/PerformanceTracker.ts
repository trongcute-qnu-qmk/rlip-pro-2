export interface PredictionRecord {
  ticker: string;
  predictedAction: 'BUY' | 'SELL';
  predictedDriver: string;
  dateMade: Date;
  actualOutcome?: string;
  isCorrect?: boolean;
  rootCauseAnalysis?: string;
}

export class PerformanceTracker {
  private history: PredictionRecord[] = [];

  logPrediction(record: PredictionRecord) {
    this.history.push(record);
  }

  evaluatePrediction(ticker: string, isCorrect: boolean, cause: string) {
    const record = this.history.find(r => r.ticker === ticker);
    if (record) {
      record.isCorrect = isCorrect;
      record.rootCauseAnalysis = cause;
    }
  }
}
