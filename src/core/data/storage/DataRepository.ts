import type { FinancialFact } from '../models/FinancialFact';

export class DataRepository {
  // Mock in-memory database
  private factsDb: FinancialFact[] = [];

  saveFacts(facts: FinancialFact[]) {
    // Handle Versioning: If fact already exists for ticker/period/metric, increment version
    facts.forEach(newFact => {
      const existingFacts = this.factsDb.filter(
        f => f.ticker === newFact.ticker && f.period === newFact.period && f.metric === newFact.metric
      );
      
      if (existingFacts.length > 0) {
        // Mark old ones as not latest
        existingFacts.forEach(f => f.isLatest = false);
        const maxVersion = Math.max(...existingFacts.map(f => f.version));
        newFact.version = maxVersion + 1;
      } else {
        newFact.version = 1;
      }
      
      newFact.isLatest = true;
      this.factsDb.push(newFact);
    });
  }

  getLatestFact(ticker: string, metric: string, period: string): FinancialFact | undefined {
    return this.factsDb.find(
      f => f.ticker === ticker && f.metric === metric && f.period === period && f.isLatest
    );
  }

  getLatestFactByMetric(ticker: string, metric: string): FinancialFact | undefined {
    // Sort by period descending to get the absolute latest if needed, 
    // but for now just find the first isLatest
    const facts = this.factsDb.filter(f => f.ticker === ticker && f.metric === metric && f.isLatest);
    if (facts.length === 0) return undefined;
    return facts.sort((a, b) => b.period.localeCompare(a.period))[0];
  }
}
