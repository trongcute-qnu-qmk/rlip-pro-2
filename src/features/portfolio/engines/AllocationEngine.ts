import { type Portfolio, calculateTotalNAV } from '../models/Portfolio';
import { calculateMarketValue } from '../models/Position';

export interface AllocationTarget {
  assetClass: 'EQUITY' | 'BOND' | 'CASH';
  targetPercentage: number; // 0 to 100
  tolerance: number; // e.g., 5% deviation allowed
}

export interface AllocationResult {
  assetClass: string;
  currentPercentage: number;
  targetPercentage: number;
  deviation: number;
  actionRequired: 'REBALANCE' | 'HOLD';
}

export class AllocationEngine {
  
  static evaluateStrategicAllocation(portfolio: Portfolio, targets: AllocationTarget[]): AllocationResult[] {
    const totalNav = calculateTotalNAV(portfolio);
    if (totalNav === 0) return [];

    // Calculate current values
    const currentValues = {
      EQUITY: 0,
      BOND: 0,
      CASH: portfolio.cashBalance
    };

    portfolio.positions.forEach(pos => {
      currentValues[pos.assetClass] += calculateMarketValue(pos);
    });

    return targets.map(target => {
      const currentPercentage = (currentValues[target.assetClass] / totalNav) * 100;
      const deviation = currentPercentage - target.targetPercentage;
      
      return {
        assetClass: target.assetClass,
        currentPercentage,
        targetPercentage: target.targetPercentage,
        deviation,
        actionRequired: Math.abs(deviation) > target.tolerance ? 'REBALANCE' : 'HOLD'
      };
    });
  }

  static suggestTacticalAdjustment(marketRegime: string, baseTargets: AllocationTarget[]): AllocationTarget[] {
    // Modify targets based on AI Market Cycle Detector
    return baseTargets.map(target => {
      let newTarget = target.targetPercentage;
      
      if (target.assetClass === 'EQUITY') {
        if (marketRegime === 'BEAR') newTarget -= 15;
        if (marketRegime === 'CAUTIOUS_BULL') newTarget -= 5;
        if (marketRegime === 'BULL') newTarget += 10;
      }
      
      if (target.assetClass === 'CASH') {
        if (marketRegime === 'BEAR') newTarget += 15;
        if (marketRegime === 'CAUTIOUS_BULL') newTarget += 5;
        if (marketRegime === 'BULL') newTarget -= 10;
      }

      return { ...target, targetPercentage: Math.max(0, Math.min(100, newTarget)) };
    });
  }
}
