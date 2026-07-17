import type { ValuationResult } from '../types';

export interface DCFInputs {
  currentFCF: number;
  growthRate1To5: number;
  growthRate6To10: number;
  terminalGrowthRate: number;
  wacc: number;
  sharesOutstanding: number;
  netDebt: number; // Total Debt - Cash
  currentPrice: number;
}

export function calculateDCF(inputs: DCFInputs): ValuationResult {
  const { currentFCF, growthRate1To5, growthRate6To10, terminalGrowthRate, wacc, sharesOutstanding, netDebt, currentPrice } = inputs;
  
  if (sharesOutstanding <= 0) throw new Error("Shares outstanding must be positive");

  let pvOfFCF = 0;
  let nextFCF = currentFCF;

  // Years 1-5
  for (let year = 1; year <= 5; year++) {
    nextFCF = nextFCF * (1 + growthRate1To5);
    pvOfFCF += nextFCF / Math.pow(1 + wacc, year);
  }

  // Years 6-10
  let terminalFCF = nextFCF;
  for (let year = 6; year <= 10; year++) {
    nextFCF = nextFCF * (1 + growthRate6To10);
    terminalFCF = nextFCF;
    pvOfFCF += nextFCF / Math.pow(1 + wacc, year);
  }

  // Terminal Value (Gordon Growth Model)
  const terminalValue = (terminalFCF * (1 + terminalGrowthRate)) / (wacc - terminalGrowthRate);
  const pvOfTerminalValue = terminalValue / Math.pow(1 + wacc, 10);

  const enterpriseValue = pvOfFCF + pvOfTerminalValue;
  const equityValue = enterpriseValue - netDebt;
  
  const intrinsicValue = equityValue / sharesOutstanding;
  
  // Margin of Safety = (Intrinsic Value - Price) / Intrinsic Value
  const marginOfSafety = intrinsicValue > 0 ? (intrinsicValue - currentPrice) / intrinsicValue : -1;
  
  let verdict: ValuationResult['verdict'] = 'FAIRLY_VALUED';
  if (marginOfSafety > 0.15) verdict = 'UNDERVALUED';
  else if (marginOfSafety < -0.10) verdict = 'OVERVALUED';

  return {
    intrinsicValue,
    currentPrice,
    marginOfSafety,
    verdict
  };
}
