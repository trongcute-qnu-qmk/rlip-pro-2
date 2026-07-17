export class CorrelationContext {
  private static currentContext: string | null = null;

  static generateId(): string {
    return `corr-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  static runWithContext<T>(correlationId: string, fn: () => T): T {
    const previous = this.currentContext;
    this.currentContext = correlationId;
    try {
      return fn();
    } finally {
      this.currentContext = previous;
    }
  }

  static getId(): string {
    return this.currentContext || 'no-context';
  }
}
