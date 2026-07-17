import { MemoryCache } from './MemoryCache';

export interface CalculatedFeature {
  ticker: string;
  featureName: string;
  value: any;
  timestamp: string;
}

export class FeatureStore {
  
  static saveFeature(feature: CalculatedFeature) {
    const key = `feature:${feature.ticker}:${feature.featureName}`;
    MemoryCache.set(key, feature, 24 * 3600); // Cache for 24 hours
  }

  static getFeature(ticker: string, featureName: string): CalculatedFeature | null {
    const key = `feature:${ticker}:${featureName}`;
    return MemoryCache.get<CalculatedFeature>(key);
  }

  static invalidateTicker(ticker: string) {
    MemoryCache.clear(`feature:${ticker}:`);
  }
}
