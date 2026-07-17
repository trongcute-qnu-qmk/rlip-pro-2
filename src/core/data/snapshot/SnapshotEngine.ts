import type { FinancialFact } from '../models/FinancialFact';

export interface Snapshot {
  id: string;
  date: string;
  ticker: string;
  dataState: FinancialFact[];
  decisions?: any; // To store Portfolio decisions at the time
  memos?: any; // To store Memos at the time
}

export class SnapshotEngine {
  private static snapshots: Snapshot[] = [];

  static createSnapshot(ticker: string, currentDataState: FinancialFact[], decisions?: any, memos?: any): string {
    const snapshot: Snapshot = {
      id: `snap-${ticker}-${Date.now()}`,
      date: new Date().toISOString(),
      ticker,
      dataState: JSON.parse(JSON.stringify(currentDataState)), // Deep copy
      decisions: decisions ? JSON.parse(JSON.stringify(decisions)) : undefined,
      memos: memos ? JSON.parse(JSON.stringify(memos)) : undefined
    };
    
    this.snapshots.push(snapshot);
    console.log(`[SnapshotEngine] Captured snapshot ${snapshot.id} for ${ticker}`);
    return snapshot.id;
  }

  static getSnapshot(id: string): Snapshot | undefined {
    return this.snapshots.find(s => s.id === id);
  }

  static getSnapshotsForTicker(ticker: string): Snapshot[] {
    return this.snapshots.filter(s => s.ticker === ticker);
  }
}
