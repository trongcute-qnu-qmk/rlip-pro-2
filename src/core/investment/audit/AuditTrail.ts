export interface AuditRecord {
  date: Date;
  ticker: string;
  decision: string;
  agentsInvolved: Record<string, string>;
  evidenceIds: string[];
}

export class AuditTrail {
  private records: AuditRecord[] = [];

  logDecision(record: AuditRecord) {
    this.records.push(record);
    // In production, this would persist to an immutable database or ledger
  }

  getHistory(ticker: string): AuditRecord[] {
    return this.records.filter(r => r.ticker === ticker);
  }
}
