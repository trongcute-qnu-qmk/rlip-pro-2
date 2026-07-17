export interface ExplanationResult {
  decision: string;
  primaryReasons: string[];
  supportingData: Record<string, any>;
  keyRisks: string[];
}

export class ExplainabilityEngine {
  static formatExplanation(
    decision: string, 
    reasons: string[], 
    data: Record<string, any>, 
    risks: string[]
  ): ExplanationResult {
    return {
      decision,
      primaryReasons: reasons,
      supportingData: data,
      keyRisks: risks
    };
  }
}
