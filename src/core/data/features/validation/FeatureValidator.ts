import type { Feature } from '../Feature';

export class FeatureValidator {
  static validate(feature: Feature): { isValid: boolean; reason?: string } {
    // 1. Range Validation
    if (feature.name === 'Margin' && feature.value < -100) { // e.g. -100%
      return { isValid: false, reason: 'Range Validation: Margin cannot be less than -100%' };
    }
    
    if (feature.name === 'Growth' && feature.value > 1000) { // e.g. 1000%
      return { isValid: false, reason: 'Range Validation: Growth exceeds 1000% anomaly threshold' };
    }

    // 2. Consistency Validation
    if (feature.name === 'ROE' && feature.value > 50) {
      if (feature.inputs && feature.inputs['NetIncome'] < 0) {
        return { isValid: false, reason: 'Consistency Validation: High ROE but Net Income is negative' };
      }
    }

    // 3. Historical Validation (stub)
    // if Math.abs(feature.value - historicalValue) > 5 * std_dev -> Flag

    return { isValid: true };
  }
}
