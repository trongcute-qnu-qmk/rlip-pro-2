export interface InvestmentThesis {
  bullCase: string[];
  bearCase: string[];
  whatMustHappen: string;
}

export interface InvestmentJournalEntry {
  id: string;
  ticker: string;
  dateCreated: number;
  targetReviewDate: number;
  
  rlipAlphaScore: number;
  investmentConfidenceScore: 'A+' | 'A' | 'B' | 'C' | 'D';
  
  thesis: InvestmentThesis;
  reasonsToBuy: string[];
  risksToMonitor: string[];
  
  status: 'ACTIVE' | 'REVIEWED' | 'CLOSED';
}
