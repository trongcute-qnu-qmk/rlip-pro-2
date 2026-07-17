import type { InvestmentMemo } from '../models/Memo';
import type { ResearchScore } from '../models/ResearchScore';
import type { Evidence } from '../models/Evidence';

export class ResearchQualityEngine {
  
  static evaluateMemo(memo: InvestmentMemo, _evidenceDb: Evidence[]): ResearchScore {
    // 1. Completeness: Check if structured fields exist
    let completeness = 50;
    if (memo.structured.theses.length > 0) completeness += 20;
    if (memo.structured.catalystsIds.length > 0) completeness += 15;
    if (memo.structured.riskTags.length > 0) completeness += 15;

    // 2. Evidence Quality
    let evidenceQuality = memo.evidenceIds.length > 3 ? 90 : (memo.evidenceIds.length * 20);

    // 3. Risk Coverage
    let riskCoverage = memo.structured.riskTags.length > 2 ? 85 : 40;

    // 4. Valuation Depth
    // Mock logic checking if narrative contains valuation keywords
    const valuationKeywords = ['DCF', 'P/E', 'Multiple', 'WACC', 'Growth Rate'];
    let valDepthScore = 30;
    valuationKeywords.forEach(kw => {
      if (memo.narrative.includes(kw)) valDepthScore += 15;
    });
    valDepthScore = Math.min(100, valDepthScore);

    const overallScore = (completeness + evidenceQuality + riskCoverage + valDepthScore) / 4;

    return {
      ticker: memo.ticker,
      overallScore: Math.round(overallScore),
      dimensions: {
        completeness,
        evidenceQuality,
        riskCoverage,
        valuationDepth: valDepthScore
      },
      aiFeedback: overallScore > 80 
        ? "Excellent research depth. Strong evidence backing." 
        : "Consider adding more risk coverage and explicit valuation models.",
      lastEvaluated: new Date().toISOString()
    };
  }
}
