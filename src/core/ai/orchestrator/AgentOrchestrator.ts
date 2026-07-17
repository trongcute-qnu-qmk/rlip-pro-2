import type { InvestmentMemoContract } from '../contracts/InvestmentMemoContract';
import { InvestmentCommittee } from '../investment_committee/InvestmentCommittee';
import type { AgentResponse } from '../agents/protocol/AgentProtocol';

export interface IAgent {
  agentId: string;
  role: string;
  analyze(context: any): Promise<AgentResponse>;
}

export class AgentOrchestrator {
  private agents: IAgent[] = [];
  private committee = new InvestmentCommittee();

  registerAgent(agent: IAgent) {
    this.agents.push(agent);
  }

  async runCommittee(ticker: string, financialData: any): Promise<InvestmentMemoContract> {
    const reports: AgentResponse[] = [];
    for (const agent of this.agents) {
      reports.push(await agent.analyze(financialData));
    }
    
    const decision = this.committee.deliberate(reports);
    decision.ticker = ticker;
    
    return {
      company: ticker,
      rating: decision.finalVerdict === 'WATCHLIST' ? 'HOLD' : decision.finalVerdict,
      thesis: 'Synthesized from agent committee',
      bullCase: decision.bullCasePoints,
      bearCase: decision.bearCasePoints,
      risks: decision.bearCasePoints, // Simplified
      evidenceIds: reports.flatMap(r => r.evidenceIds),
      confidence: reports.reduce((acc, r) => acc + r.confidence, 0) / reports.length
    };
  }
}
