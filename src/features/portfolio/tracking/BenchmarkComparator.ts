export interface AI_Forecast {
  ticker: string;
  dateForecasted: string;
  expectedReturn1Y: number;
  actualReturn: number;
}

export class BenchmarkComparator {
  
  static evaluateAIAccuracy(forecasts: AI_Forecast[]): number {
    if (forecasts.length === 0) return 0;
    
    let correctPredictions = 0;

    forecasts.forEach(f => {
      // Very simple logic: if it predicted positive and it was positive, count as correct
      const predictedDirection = f.expectedReturn1Y > 0 ? 1 : -1;
      const actualDirection = f.actualReturn > 0 ? 1 : -1;
      
      if (predictedDirection === actualDirection) {
        correctPredictions++;
      }
    });

    return (correctPredictions / forecasts.length) * 100;
  }
}
