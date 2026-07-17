export class CostTracker {
  private totalApiCalls: number = 0;
  private totalLlmTokens: number = 0;

  logApiCall(provider: string) {
    console.log(`[CostTracker] API called for provider: ${provider}`);
    this.totalApiCalls++;
  }

  logLlmUsage(tokens: number) {
    this.totalLlmTokens += tokens;
    // log to db
  }

  getMetrics() {
    return {
      apiCalls: this.totalApiCalls,
      llmTokens: this.totalLlmTokens
    };
  }
}
