export interface FeatureWeight {
  featureName: string;
  weightPercentage: number;
  rationale: string;
}

export class FeatureImportanceEngine {
  private weights: Map<string, FeatureWeight[]> = new Map();

  setWeightsForModel(modelName: string, weights: FeatureWeight[]) {
    const totalWeight = weights.reduce((acc, w) => acc + w.weightPercentage, 0);
    if (totalWeight !== 100) {
      throw new Error(`Total weight must be 100%, got ${totalWeight}%`);
    }
    this.weights.set(modelName, weights);
  }

  getWeights(modelName: string): FeatureWeight[] {
    return this.weights.get(modelName) || [];
  }
}
