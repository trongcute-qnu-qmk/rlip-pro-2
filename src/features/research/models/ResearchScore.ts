export interface ResearchScore {
  ticker: string;
  overallScore: number; // 0 - 100
  
  dimensions: {
    completeness: number;
    evidenceQuality: number;
    riskCoverage: number;
    valuationDepth: number;
  };
  
  aiFeedback: string;
  lastEvaluated: string;
}
