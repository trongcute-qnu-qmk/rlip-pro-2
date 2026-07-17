import { type Portfolio, calculateTotalNAV } from '../models/Portfolio';
import { calculateMarketValue } from '../models/Position';

export class RiskEngine {
  
  // Calculate weighted average risk score of the portfolio
  static calculatePortfolioRiskScore(portfolio: Portfolio): number {
    const totalNav = calculateTotalNAV(portfolio);
    if (totalNav === 0) return 0; // Cash is risk-free in this context

    let totalRiskWeight = 0;
    
    portfolio.positions.forEach(pos => {
      const weight = calculateMarketValue(pos) / totalNav;
      // Assume cash has 0 risk, we only sum equity/bond risks
      totalRiskWeight += pos.riskScore * weight;
    });

    return totalRiskWeight;
  }

  // Check if any single position exceeds maximum allowed concentration
  static checkConcentrationRisk(portfolio: Portfolio, maxWeightPerPosition: number = 0.20): string[] {
    const totalNav = calculateTotalNAV(portfolio);
    if (totalNav === 0) return [];

    const alerts: string[] = [];
    
    portfolio.positions.forEach(pos => {
      const weight = calculateMarketValue(pos) / totalNav;
      if (weight > maxWeightPerPosition) {
        alerts.push(`Concentration Alert: ${pos.ticker} is ${(weight * 100).toFixed(1)}% of NAV (Max allowed: ${maxWeightPerPosition * 100}%)`);
      }
    });

    return alerts;
  }
}
