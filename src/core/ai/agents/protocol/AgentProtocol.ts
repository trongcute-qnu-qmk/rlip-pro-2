export interface AgentResponse {
  agentName: string;
  conclusion: string;
  confidence: number;
  evidenceIds: string[];
  warnings: string[];
}
