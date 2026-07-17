export type AIModelId = 'gpt-4o' | 'claude-3-5-sonnet' | 'gemini-1.5-pro' | 'gemini-1.5-flash';

export interface AICapability {
  taskId: 'investment_reasoning' | 'summarization' | 'data_extraction' | 'risk_detection';
  requiredCapabilities: ('long_context' | 'structured_output' | 'reasoning')[];
  recommendedModel: AIModelId;
}

export class AICapabilityRegistry {
  private capabilities: AICapability[] = [
    {
      taskId: 'investment_reasoning',
      requiredCapabilities: ['long_context', 'structured_output', 'reasoning'],
      recommendedModel: 'claude-3-5-sonnet'
    },
    {
      taskId: 'summarization',
      requiredCapabilities: ['long_context'],
      recommendedModel: 'gemini-1.5-flash'
    }
  ];

  getRecommendedModel(taskId: string): AIModelId {
    const cap = this.capabilities.find(c => c.taskId === taskId);
    return cap?.recommendedModel || 'gpt-4o';
  }
}
