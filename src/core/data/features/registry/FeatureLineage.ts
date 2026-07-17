export interface LineageTrace {
  featureId: string;
  calculatedAt: string;
  dataSources: string[]; // e.g., ["FinancialFact:FPT:REVENUE:v2"]
  dependencies: string[]; // Other features it depended on
}

export class FeatureLineage {
  private static traces: Record<string, LineageTrace> = {};

  static recordTrace(instanceId: string, trace: LineageTrace) {
    this.traces[instanceId] = trace;
  }

  static getTrace(instanceId: string): LineageTrace | undefined {
    return this.traces[instanceId];
  }
}
