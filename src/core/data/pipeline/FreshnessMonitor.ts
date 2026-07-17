export class FreshnessMonitor {
  static getFreshnessScore(lastUpdatedTimestamp: string, dataType: 'FINANCIALS' | 'MARKET' | 'NEWS'): number {
    const ageMs = Date.now() - new Date(lastUpdatedTimestamp).getTime();
    
    // Returns a score from 1 to 5 (Stars)
    if (dataType === 'MARKET') {
      if (ageMs < 5 * 60 * 1000) return 5; // < 5 mins
      if (ageMs < 15 * 60 * 1000) return 4;
      if (ageMs < 60 * 60 * 1000) return 3;
      return 1;
    }
    
    if (dataType === 'FINANCIALS') {
      const days = ageMs / (24 * 3600 * 1000);
      if (days <= 30) return 5;
      if (days <= 90) return 4;
      if (days <= 180) return 3;
      return 2;
    }

    if (dataType === 'NEWS') {
      const hours = ageMs / (3600 * 1000);
      if (hours <= 1) return 5;
      if (hours <= 6) return 4;
      if (hours <= 24) return 3;
      return 2;
    }

    return 3;
  }
}
