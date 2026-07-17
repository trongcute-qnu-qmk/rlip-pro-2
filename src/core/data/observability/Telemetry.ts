export interface TelemetryEvent {
  id: string;
  module: string;
  operation: string;
  durationMs: number;
  timestamp: string;
  status: 'SUCCESS' | 'ERROR';
}

export class Telemetry {
  private static events: TelemetryEvent[] = [];

  static record(module: string, operation: string, durationMs: number, status: 'SUCCESS' | 'ERROR' = 'SUCCESS') {
    const event: TelemetryEvent = {
      id: `tel-${Date.now()}`,
      module,
      operation,
      durationMs,
      timestamp: new Date().toISOString(),
      status
    };
    this.events.push(event);
    
    // Warn if operation is too slow
    if (durationMs > 1000) {
      console.warn(`[Telemetry] Slow operation detected: [${module}] ${operation} took ${durationMs}ms`);
    } else {
      console.debug(`[Telemetry] [${module}] ${operation} completed in ${durationMs}ms`);
    }
  }

  static getSlowestOperations(limit: number = 5): TelemetryEvent[] {
    return [...this.events].sort((a, b) => b.durationMs - a.durationMs).slice(0, limit);
  }
}

// Decorator-like utility for measuring function execution time
export async function withTelemetry<T>(module: string, operation: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    Telemetry.record(module, operation, duration, 'SUCCESS');
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    Telemetry.record(module, operation, duration, 'ERROR');
    throw error;
  }
}
