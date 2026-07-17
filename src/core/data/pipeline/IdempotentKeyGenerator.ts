export class IdempotentKeyGenerator {
  static generate(ticker: string, period: string, metric: string, version: number): string {
    const rawString = `${ticker}_${period}_${metric}_v${version}`;
    return btoa(rawString);
  }

  static generateEventKey(eventId: string, timestamp: string): string {
    return btoa(`${eventId}_${timestamp}`);
  }
}
