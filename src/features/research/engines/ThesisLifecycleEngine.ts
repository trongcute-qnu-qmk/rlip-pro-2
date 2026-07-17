import type { Thesis, ThesisStatus } from '../models/Thesis';

export class ThesisLifecycleEngine {
  
  static transitionStatus(current: ThesisStatus, event: 'CONFIRM' | 'CHALLENGE' | 'BREAK' | 'ARCHIVE'): ThesisStatus {
    switch (current) {
      case 'NEW':
        if (event === 'CONFIRM') return 'ACTIVE';
        break;
      case 'ACTIVE':
        if (event === 'CONFIRM') return 'CONFIRMED';
        if (event === 'CHALLENGE') return 'CHALLENGED';
        if (event === 'BREAK') return 'BROKEN';
        break;
      case 'CONFIRMED':
        if (event === 'CHALLENGE') return 'CHALLENGED';
        if (event === 'BREAK') return 'BROKEN';
        break;
      case 'CHALLENGED':
        if (event === 'CONFIRM') return 'ACTIVE';
        if (event === 'BREAK') return 'BROKEN';
        break;
      default:
        break;
    }
    
    if (event === 'ARCHIVE') return 'ARCHIVED';
    
    return current;
  }

  static evaluateConfidence(thesis: Thesis, supportingEvidenceCount: number, conflictingEvidenceCount: number): number {
    let baseConfidence = thesis.confidenceScore;
    
    // Simple mock logic: +2 for support, -5 for conflict
    baseConfidence += (supportingEvidenceCount * 2);
    baseConfidence -= (conflictingEvidenceCount * 5);
    
    return Math.max(0, Math.min(100, baseConfidence));
  }
}
