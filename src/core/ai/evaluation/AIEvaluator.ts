export interface AccuracyRecord {
  predictionId: string;
  aiPrediction: string;
  actualOutcome: string;
  accuracyScore: number; // 0-100
}

export class AIEvaluator {
  private records: AccuracyRecord[] = [];
  
  logEvaluation(record: AccuracyRecord) {
    this.records.push(record);
  }
}
