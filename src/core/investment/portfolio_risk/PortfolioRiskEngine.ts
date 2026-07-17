export interface Position {
  ticker: string;
  weightPct: number;
  sector: string;
}

export interface PortfolioRiskReport {
  isConcentrated: boolean;
  overweightSectors: string[];
  warnings: string[];
}

export class PortfolioRiskEngine {
  evaluateRisk(positions: Position[]): PortfolioRiskReport {
    const sectorWeights: Record<string, number> = {};
    let isConcentrated = false;
    const warnings: string[] = [];

    positions.forEach(p => {
      sectorWeights[p.sector] = (sectorWeights[p.sector] || 0) + p.weightPct;
      if (p.weightPct > 25) {
        isConcentrated = true;
        warnings.push(`Position ${p.ticker} is too large (>25% NAV).`);
      }
    });

    const overweightSectors = Object.keys(sectorWeights).filter(s => sectorWeights[s] > 40);
    if (overweightSectors.length > 0) {
      warnings.push(`Portfolio is heavily exposed to sectors: ${overweightSectors.join(', ')}`);
    }

    return {
      isConcentrated,
      overweightSectors,
      warnings
    };
  }
}
