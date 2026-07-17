export interface DataLineage {
  sourceId: string; // e.g. "CafeF_API"
  pageOrEndpoint?: string;
  calculatedBy?: string; // e.g. "RLIP_Normalization"
  timestamp: string;
}

export interface FinancialFact {
  id: string; // Unique identifier
  ticker: string;
  metric: string; // Standardized, e.g., "REVENUE", "ROIC"
  value: number;
  period: string; // "FY2025"
  
  version: number; // For Data Versioning (e.g. Audited vs Unaudited)
  isLatest: boolean;
  
  lineage: DataLineage;
  confidenceScore: number; // Based on Source Reliability
}
