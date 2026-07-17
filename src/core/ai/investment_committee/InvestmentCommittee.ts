import type { AgentResponse } from '../agents/protocol/AgentProtocol';

export interface CommitteeDecision {
  ticker: string;
  bullCasePoints: string[];
  bearCasePoints: string[];
  finalVerdict: 'BUY' | 'HOLD' | 'SELL' | 'WATCHLIST';
}

export class InvestmentCommittee {
  deliberate(agentReports: AgentResponse[]): CommitteeDecision {
    const bullCase: string[] = [];
    const bearCase: string[] = [];
    let confidenceSum = 0;
    
    agentReports.forEach(report => {
      bullCase.push(`[${report.agentName}]: ${report.conclusion}`);
      if (report.warnings.length > 0) {
        bearCase.push(...report.warnings.map(w => `[${report.agentName} Warning]: ${w}`));
      }
      confidenceSum += report.confidence;
    });

    const avgConfidence = agentReports.length > 0 ? confidenceSum / agentReports.length : 0;
    const verdict = bearCase.length > 2 ? 'HOLD' : 'WATCHLIST';

    return {
      ticker: 'UNKNOWN', // would be passed in context
      bullCasePoints: bullCase,
      bearCasePoints: bearCase,
      finalVerdict: avgConfidence > 0.8 && bearCase.length === 0 ? 'BUY' : verdict
    };
  }
}
