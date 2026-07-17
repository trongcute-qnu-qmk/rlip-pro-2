export interface AIProviderContext {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface IAIProvider {
  getProviderName(): string;
  generateText(context: AIProviderContext): Promise<string>;
  generateStructured<T>(context: AIProviderContext, schema: any): Promise<T>;
}
