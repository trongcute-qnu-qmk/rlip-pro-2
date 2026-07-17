export interface MultiplesInputs {
  marketCap: number;
  totalDebt: number;
  cashAndEquivalents: number;
  ebitda: number;
  freeCashFlow: number;
  netIncome: number;
  bookValue: number;
}

export function calculateMultiples(inputs: MultiplesInputs) {
  const enterpriseValue = inputs.marketCap + inputs.totalDebt - inputs.cashAndEquivalents;
  
  return {
    pe: inputs.netIncome > 0 ? inputs.marketCap / inputs.netIncome : null,
    pb: inputs.bookValue > 0 ? inputs.marketCap / inputs.bookValue : null,
    evToEbitda: inputs.ebitda > 0 ? enterpriseValue / inputs.ebitda : null,
    evToFcf: inputs.freeCashFlow > 0 ? enterpriseValue / inputs.freeCashFlow : null,
  };
}
