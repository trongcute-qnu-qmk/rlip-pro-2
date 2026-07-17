export class DeadLetterQueue {
  private static dlq: Array<{ payload: any; error: string; timestamp: string }> = [];

  static push(payload: any, error: string) {
    this.dlq.push({
      payload,
      error,
      timestamp: new Date().toISOString()
    });
    console.error('[DLQ] Message moved to Dead Letter Queue:', error);
  }

  static getQueue() {
    return this.dlq;
  }
}
