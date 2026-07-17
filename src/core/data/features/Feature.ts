export interface Feature {
  id: string;             // e.g. "FPT_ROIC_2025Q2"
  name: string;           // e.g. "ROIC"
  category: 'QUALITY' | 'GROWTH' | 'VALUATION' | 'RISK' | 'BUSINESS';
  value: number;
  confidence: number;     // 0-100
  inputs: Record<string, any>; // Underlying data used to calculate
  formulaVersion: number;
  timestamp: string;      // ISO string
}
