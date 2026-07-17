import type { InvestmentMemoContract } from '../contracts/InvestmentMemoContract';

export class OutputValidator {
  static validateInvestmentMemo(memo: any): memo is InvestmentMemoContract {
    if (!memo || typeof memo !== 'object') return false;
    if (!memo.company || !memo.rating || !memo.thesis) return false;
    if (!Array.isArray(memo.bullCase) || !Array.isArray(memo.bearCase)) return false;
    if (!Array.isArray(memo.risks) || !Array.isArray(memo.evidenceIds)) return false;
    if (typeof memo.confidence !== 'number') return false;
    return true;
  }
}
