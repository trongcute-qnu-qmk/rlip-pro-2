export interface Catalyst {
  id: string;
  ticker: string;
  title: string;
  description: string;
  
  expectedDate: string; // e.g. "Q3/2026" or specific ISO date
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  direction: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  
  status: 'PENDING' | 'MATERIALIZED' | 'MISSED';
}
