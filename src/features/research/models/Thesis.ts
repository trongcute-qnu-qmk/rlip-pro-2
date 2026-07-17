export type ThesisStatus = 'NEW' | 'ACTIVE' | 'CONFIRMED' | 'CHALLENGED' | 'BROKEN' | 'ARCHIVED';

export interface Thesis {
  id: string;
  ticker: string;
  title: string;
  description: string;
  
  status: ThesisStatus;
  confidenceScore: number; // 0 - 100
  timeHorizon: string; // e.g. "3 Years"
  
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
