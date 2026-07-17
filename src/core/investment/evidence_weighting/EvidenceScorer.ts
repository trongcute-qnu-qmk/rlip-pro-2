export type EvidenceSource = 'FINANCIAL_REPORT' | 'MANAGEMENT_INTERVIEW' | 'NEWS' | 'SOCIAL_SENTIMENT';

export interface Evidence {
  id: string;
  source: EvidenceSource;
  materiality: number; // 0 to 1
  recencyDays: number;
}

export class EvidenceScorer {
  private baseWeights: Record<EvidenceSource, number> = {
    FINANCIAL_REPORT: 0.95,
    MANAGEMENT_INTERVIEW: 0.70,
    NEWS: 0.50,
    SOCIAL_SENTIMENT: 0.30
  };

  calculateConfidence(evidence: Evidence): number {
    const baseScore = this.baseWeights[evidence.source];
    // Penalty for old news (naive linear decay)
    const recencyPenalty = Math.max(0, 1 - (evidence.recencyDays / 365));
    
    return baseScore * evidence.materiality * recencyPenalty;
  }
}
