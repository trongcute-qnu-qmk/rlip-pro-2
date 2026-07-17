import type { Evidence } from '../models/Evidence';
import type { AnalystNote } from '../models/Note';
import type { InvestmentMemo } from '../models/Memo';

export class EvidenceLinker {
  
  static extractEvidenceFromNotes(notes: AnalystNote[], allEvidence: Evidence[]): Evidence[] {
    const linkedEvidenceIds = new Set<string>();
    notes.forEach(n => n.linkedEvidenceIds.forEach(id => linkedEvidenceIds.add(id)));
    
    return allEvidence.filter(e => linkedEvidenceIds.has(e.id));
  }

  static validateMemoEvidence(memo: InvestmentMemo, allEvidence: Evidence[]): string[] {
    const missingWarnings: string[] = [];
    
    memo.evidenceIds.forEach(id => {
      if (!allEvidence.find(e => e.id === id)) {
        missingWarnings.push(`Missing Evidence reference: ${id}`);
      }
    });
    
    return missingWarnings;
  }
}
