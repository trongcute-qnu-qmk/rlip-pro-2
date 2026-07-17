export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  resource: string; // e.g., "FinancialFact"
  resourceId: string;
  changes: Record<string, any>;
}

export class AuditLog {
  private logs: AuditEntry[] = [];

  logAction(entry: Omit<AuditEntry, 'id' | 'timestamp'>) {
    const fullEntry: AuditEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[Audit] ${fullEntry.action} on ${fullEntry.resource} by ${fullEntry.user}`);
  }

  getLogs(): AuditEntry[] {
    return this.logs;
  }
}
