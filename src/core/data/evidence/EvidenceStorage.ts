export interface EvidenceRecord {
  evidenceId: string;
  claimId: string; // The AI's claim or insight
  sourceDocument: string; // e.g. "Annual Report 2025"
  pageOrSection?: string;
  exactQuote: string;
  confidenceScore: number;
}

export class EvidenceStorage {
  private evidenceDB: Map<string, EvidenceRecord[]> = new Map();

  addEvidence(claimId: string, evidence: EvidenceRecord) {
    if (!this.evidenceDB.has(claimId)) {
      this.evidenceDB.set(claimId, []);
    }
    this.evidenceDB.get(claimId)!.push(evidence);
  }

  getEvidenceForClaim(claimId: string): EvidenceRecord[] {
    return this.evidenceDB.get(claimId) || [];
  }
}
