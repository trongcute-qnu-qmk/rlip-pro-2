export class CircuitBreaker {
  private static failures: Record<string, number> = {};
  private static lastFailureTime: Record<string, number> = {};
  private static THRESHOLD = 3;
  private static COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

  static check(providerId: string): void {
    const failureCount = this.failures[providerId] || 0;
    const lastTime = this.lastFailureTime[providerId] || 0;

    if (failureCount >= this.THRESHOLD) {
      if (Date.now() - lastTime < this.COOLDOWN_MS) {
        throw new Error(`CircuitBreaker: ${providerId} is currently OFFLINE (Cooldown active)`);
      } else {
        // Reset after cooldown
        this.failures[providerId] = 0;
      }
    }
  }

  static recordFailure(providerId: string) {
    this.failures[providerId] = (this.failures[providerId] || 0) + 1;
    this.lastFailureTime[providerId] = Date.now();
  }

  static recordSuccess(providerId: string) {
    this.failures[providerId] = 0;
  }
}
