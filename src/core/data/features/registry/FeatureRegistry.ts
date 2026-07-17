export interface FeatureDef {
  id: string;
  name: string;
  description: string;
  formula: string;
  owner: string;
  version: number;
  dependencies: string[];
  deprecated?: boolean;
}

export class FeatureRegistry {
  private static registry: Record<string, FeatureDef> = {};

  static register(def: FeatureDef) {
    this.registry[def.id] = def;
  }

  static getDefinition(id: string): FeatureDef | undefined {
    return this.registry[id];
  }
}

// Pre-register some features
FeatureRegistry.register({
  id: 'ROIC',
  name: 'Return on Invested Capital',
  description: 'Efficiency of capital allocation',
  formula: 'NOPAT / Invested Capital',
  owner: 'Quant_Team',
  version: 1,
  dependencies: ['NOPAT', 'InvestedCapital'],
  deprecated: false
});
