import type { IAgent } from '../../orchestrator/AgentOrchestrator';
import type { AgentResponse } from '../protocol/AgentProtocol';

export class FinancialAnalystAgent implements IAgent {
  agentId = 'financial-analyst';
  role = 'Analyzes historical financials, margins, ROIC, and cash flows.';

  async analyze(_context: any): Promise<AgentResponse> {
    // In reality, this would construct a prompt with the AIProvider and get a structured response
    return {
      agentName: 'Financial Analyst',
      conclusion: 'ROIC is consistently above 15% but operating margins are slightly compressing.',
      confidence: 0.85,
      evidenceIds: ['financial_model_Q1'],
      warnings: ['Margin compression detected in the latest quarter']
    };
  }
}
