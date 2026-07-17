import { calculateDCF } from '../engines/dcf.engine';
import type { DCFInputs } from '../engines/dcf.engine';

export interface SensitivityMatrix {
  waccValues: number[];
  terminalGrowthValues: number[];
  matrix: number[][]; // [waccIndex][growthIndex] -> Intrinsic Value
}

export function generateSensitivityMatrix(baseInputs: DCFInputs): SensitivityMatrix {
  const waccOffsets = [-0.02, -0.01, 0, 0.01, 0.02]; // -2%, -1%, 0, +1%, +2%
  const growthOffsets = [-0.01, -0.005, 0, 0.005, 0.01]; // -1%, -0.5%, 0, +0.5%, +1%

  const waccValues = waccOffsets.map(o => baseInputs.wacc + o);
  const terminalGrowthValues = growthOffsets.map(o => baseInputs.terminalGrowthRate + o);
  
  const matrix: number[][] = [];

  for (let i = 0; i < waccValues.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < terminalGrowthValues.length; j++) {
      const testInputs = {
        ...baseInputs,
        wacc: waccValues[i],
        terminalGrowthRate: terminalGrowthValues[j]
      };
      
      // Gordon Growth model breaks if terminal growth >= WACC
      if (testInputs.terminalGrowthRate >= testInputs.wacc) {
        row.push(0); // Invalid scenario
      } else {
        const result = calculateDCF(testInputs);
        row.push(Math.round(result.intrinsicValue)); // Round for cleaner matrix
      }
    }
    matrix.push(row);
  }

  return {
    waccValues,
    terminalGrowthValues,
    matrix
  };
}
