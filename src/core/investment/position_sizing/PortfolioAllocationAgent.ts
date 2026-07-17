export interface AllocationSuggestion {
  corePositionPct: number;
  maxPositionPct: number;
  stopReviewCondition: string;
}

export class PortfolioAllocationAgent {
  suggestAllocation(convictionScore: number, riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'): AllocationSuggestion {
    if (convictionScore < 60 || riskLevel === 'HIGH') {
      return { corePositionPct: 0, maxPositionPct: 2, stopReviewCondition: 'Thesis Break or Target Hit' };
    }
    
    if (convictionScore >= 85 && riskLevel === 'LOW') {
      return { corePositionPct: 8, maxPositionPct: 15, stopReviewCondition: 'Fundamental Deterioration' };
    }
    
    return { corePositionPct: 4, maxPositionPct: 8, stopReviewCondition: 'Quarterly Review' };
  }
}
