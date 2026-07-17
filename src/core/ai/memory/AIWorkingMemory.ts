export interface AIMemoryItem {
  id: string;
  ticker?: string;
  key: string;
  value: any;
  type: 'SHORT_TERM' | 'LONG_TERM' | 'USER_PREFERENCE';
  timestamp: number;
}

export class AIWorkingMemory {
  private memoryDB: AIMemoryItem[] = [];

  store(item: Omit<AIMemoryItem, 'id' | 'timestamp'>) {
    this.memoryDB.push({
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    });
  }

  retrievePreferences(): AIMemoryItem[] {
    return this.memoryDB.filter(m => m.type === 'USER_PREFERENCE');
  }

  retrieveContext(ticker: string): AIMemoryItem[] {
    return this.memoryDB.filter(m => m.ticker === ticker);
  }
}
