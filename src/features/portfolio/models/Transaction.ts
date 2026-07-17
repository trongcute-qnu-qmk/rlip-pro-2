export type TransactionType = 'BUY' | 'SELL' | 'DIVIDEND' | 'DEPOSIT' | 'WITHDRAWAL';

export interface Transaction {
  id: string;
  portfolioId: string;
  ticker?: string; // Optional for DEPOSIT/WITHDRAWAL
  type: TransactionType;
  quantity: number;
  price: number;
  timestamp: string; // ISO Date string
  fees: number;
  
  // Rationale for AI Learning Loop
  reasonTags?: string[];
  notes?: string;
}
