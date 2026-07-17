export interface ResearchMemoryEntry {
  memoryId: string;
  ticker: string;
  dateRecorded: number;
  
  previousThesis: string;
  previousDecision: 'BUY' | 'SELL' | 'HOLD';
  
  actualOutcome: string;
  predictionAccuracy: number; // 0-100%
  
  mistakesMade: string[];
  keyLearnings: string[];
}

export class ResearchMemory {
  private memories: ResearchMemoryEntry[] = [];

  recordMemory(entry: ResearchMemoryEntry) {
    this.memories.push(entry);
  }

  getMemoriesForTicker(ticker: string): ResearchMemoryEntry[] {
    return this.memories.filter(m => m.ticker === ticker);
  }
}
