export interface Catalyst {
  id: string;
  ticker: string;
  description: string;
  expectedDate: Date;
  status: 'PENDING' | 'ACHIEVED' | 'FAILED';
}

export class CatalystTracker {
  private catalysts: Catalyst[] = [];

  addCatalyst(catalyst: Catalyst) {
    this.catalysts.push(catalyst);
  }

  evaluateCatalysts(currentDate: Date): string[] {
    const warnings: string[] = [];
    this.catalysts.forEach(c => {
      if (c.status === 'PENDING' && currentDate > c.expectedDate) {
        warnings.push(`Catalyst Overdue [${c.ticker}]: ${c.description}`);
      }
    });
    return warnings;
  }
}
