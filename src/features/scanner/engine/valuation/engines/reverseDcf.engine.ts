import { calculateDCF } from './dcf.engine';
import type { DCFInputs } from './dcf.engine';

export function calculateImpliedGrowthRate(
  inputs: Omit<DCFInputs, 'growthRate1To5' | 'growthRate6To10'>,
  targetPrice: number
): number {
  let lowerBound = -0.50; // -50%
  let upperBound = 1.00; // 100%
  const tolerance = 0.001; // 0.1% accuracy

  for (let i = 0; i < 100; i++) { // Max iterations to prevent infinite loop
    const midGrowth = (lowerBound + upperBound) / 2;
    // Assume growth phase 2 fades linearly or is half of phase 1
    const fadeGrowth = Math.max(0, midGrowth - 0.05);

    const testInputs: DCFInputs = {
      ...inputs,
      growthRate1To5: midGrowth,
      growthRate6To10: fadeGrowth,
    };
    
    const result = calculateDCF(testInputs);
    
    if (Math.abs(result.intrinsicValue - targetPrice) / targetPrice < tolerance) {
      return midGrowth;
    }

    if (result.intrinsicValue > targetPrice) {
      upperBound = midGrowth;
    } else {
      lowerBound = midGrowth;
    }
  }

  return (lowerBound + upperBound) / 2;
}
