export interface InvestmentMemoContract {
  company: string;
  rating: 'BUY' | 'HOLD' | 'SELL';
  thesis: string;
  bullCase: string[];
  bearCase: string[];
  risks: string[];
  evidenceIds: string[];
  confidence: number;
}
