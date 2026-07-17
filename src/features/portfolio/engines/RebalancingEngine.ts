import type { Portfolio } from '../models/Portfolio';
import { RiskEngine } from './RiskEngine';

export interface ProposedTrade {
  ticker: string;
  action: 'BUY' | 'SELL';
  quantity: number;
  estimatedPrice: number;
}

export interface RebalanceSimulationResult {
  beforeNAV: number;
  afterNAV: number; // Should be roughly same minus fees
  beforeRiskScore: number;
  afterRiskScore: number;
  cashChange: number;
  warnings: string[];
}

export class RebalancingEngine {
  
  static simulate(portfolio: Portfolio, trades: ProposedTrade[]): RebalanceSimulationResult {
    // 1. Deep clone portfolio for simulation
    const simulatedPortfolio: Portfolio = JSON.parse(JSON.stringify(portfolio));
    let cashChange = 0;
    const warnings: string[] = [];

    // 2. Apply trades
    trades.forEach(trade => {
      const tradeValue = trade.quantity * trade.estimatedPrice;
      
      if (trade.action === 'BUY') {
        if (simulatedPortfolio.cashBalance < tradeValue) {
          warnings.push(`Insufficient cash for BUY ${trade.ticker}`);
        }
        
        simulatedPortfolio.cashBalance -= tradeValue;
        cashChange -= tradeValue;
        
        const existingPos = simulatedPortfolio.positions.find(p => p.ticker === trade.ticker);
        if (existingPos) {
          // Weighted average cost update (simplified)
          const totalCost = (existingPos.quantity * existingPos.averageCost) + tradeValue;
          existingPos.quantity += trade.quantity;
          existingPos.averageCost = totalCost / existingPos.quantity;
        } else {
          // In a real system, we'd fetch quality/risk scores from the AI Engine
          simulatedPortfolio.positions.push({
            id: `sim-${Date.now()}`,
            ticker: trade.ticker,
            quantity: trade.quantity,
            averageCost: trade.estimatedPrice,
            currentPrice: trade.estimatedPrice,
            qualityScore: 50, // placeholder
            riskScore: 50, // placeholder
            valuationScore: 50, // placeholder
            overallConviction: 50, // placeholder
            assetClass: 'EQUITY'
          });
        }
      } else if (trade.action === 'SELL') {
        const existingPos = simulatedPortfolio.positions.find(p => p.ticker === trade.ticker);
        if (!existingPos || existingPos.quantity < trade.quantity) {
          warnings.push(`Insufficient shares for SELL ${trade.ticker}`);
        } else {
          simulatedPortfolio.cashBalance += tradeValue;
          cashChange += tradeValue;
          existingPos.quantity -= trade.quantity;
          
          if (existingPos.quantity === 0) {
             simulatedPortfolio.positions = simulatedPortfolio.positions.filter(p => p.ticker !== trade.ticker);
          }
        }
      }
    });

    // 3. Calculate metrics
    const beforeRiskScore = RiskEngine.calculatePortfolioRiskScore(portfolio);
    const afterRiskScore = RiskEngine.calculatePortfolioRiskScore(simulatedPortfolio);
    
    // Note: NAV calculation logic would go here, imported from Portfolio.ts
    // For simplicity, we assume we just return the diff metrics

    return {
      beforeNAV: 0, // Placeholder
      afterNAV: 0,  // Placeholder
      beforeRiskScore,
      afterRiskScore,
      cashChange,
      warnings
    };
  }
}
