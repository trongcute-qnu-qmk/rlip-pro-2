export interface FeedbackEvent {
  memoId: string;
  aiRecommendation: 'BUY' | 'SELL' | 'HOLD';
  userDecision: 'BUY' | 'SELL' | 'HOLD' | 'PASS';
  userReason?: string;
  timestamp: number;
}

export class HumanFeedbackLoop {
  private feedbackLog: FeedbackEvent[] = [];

  logDecision(event: FeedbackEvent) {
    this.feedbackLog.push(event);
  }

  getLearningsForAI(): string[] {
    // Basic analysis of feedback to feed back into AI context
    const passCount = this.feedbackLog.filter(f => f.userDecision === 'PASS').length;
    return [`User has passed on ${passCount} recommendations recently.`];
  }
}
