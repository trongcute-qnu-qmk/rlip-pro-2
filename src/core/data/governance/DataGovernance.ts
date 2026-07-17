export type DataSource = 'TCBS' | 'FMP' | 'CAFEF' | 'SSI';

export class DataGovernance {
  // Mức độ ưu tiên cao dần từ trái qua phải. TCBS là ưu tiên cao nhất.
  private static FINANCIAL_PRIORITY: DataSource[] = ['CAFEF', 'FMP', 'SSI', 'TCBS'];
  
  static getPreferredSource(availableSources: DataSource[]): DataSource | null {
    let bestSource: DataSource | null = null;
    let bestPriority = -1;

    for (const source of availableSources) {
      const priority = this.FINANCIAL_PRIORITY.indexOf(source);
      if (priority > bestPriority) {
        bestPriority = priority;
        bestSource = source;
      }
    }

    return bestSource;
  }
}
