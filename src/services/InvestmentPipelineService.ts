export interface AIAnalysisResult {
  ticker: string;
  roic: number;
  decision: 'BUY' | 'HOLD' | 'SELL';
  bullCase: string;
  bearCase: string;
  score: number;
}

export class InvestmentPipelineService {
  async analyzeTicker(ticker: string): Promise<AIAnalysisResult> {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ticker })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to analyze ticker');
    }

    return await response.json();
  }
}

export const pipelineService = new InvestmentPipelineService();
