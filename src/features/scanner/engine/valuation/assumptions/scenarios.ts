import { calculateDCF } from '../engines/dcf.engine';
import type { DCFInputs } from '../engines/dcf.engine';
import type { ValuationResult } from '../types';

export interface ScenarioResults {
  baseCase: ValuationResult;
  bullCase: ValuationResult;
  bearCase: ValuationResult;
}

export function runScenarios(baseInputs: DCFInputs): ScenarioResults {
  const bullInputs = {
    ...baseInputs,
    growthRate1To5: baseInputs.growthRate1To5 + 0.05, // +5% growth
    growthRate6To10: baseInputs.growthRate6To10 + 0.02,
    wacc: Math.max(0.05, baseInputs.wacc - 0.01), // -1% discount rate
  };

  const bearInputs = {
    ...baseInputs,
    growthRate1To5: Math.max(0, baseInputs.growthRate1To5 - 0.05), // -5% growth
    growthRate6To10: Math.max(0, baseInputs.growthRate6To10 - 0.02),
    wacc: baseInputs.wacc + 0.02, // +2% discount rate (higher risk)
  };

  return {
    baseCase: calculateDCF(baseInputs),
    bullCase: calculateDCF(bullInputs),
    bearCase: calculateDCF(bearInputs),
  };
}
