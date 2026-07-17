export type EvidenceSourceType = 'ANNUAL_REPORT' | 'QUARTERLY_REPORT' | 'NEWS' | 'MANAGEMENT_MEETING' | 'MACRO_DATA';

export interface Evidence {
  id: string;
  ticker: string;
  sourceType: EvidenceSourceType;
  sourceName: string; // e.g. "Q3 2026 Earnings Call"
  url?: string;
  
  claim: string;
  confidence: number; // AI confidence in this evidence (0-100)
  
  date: string;
}
