import { CorrelationContext } from '../pipeline/CorrelationContext';

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  job?: string;
  provider?: string;
  ticker?: string;
  duration_ms?: number;
  status?: string;
  correlation_id: string;
  message: string;
  [key: string]: any;
}

export class StructuredLogger {
  static info(message: string, metadata: Partial<LogEntry> = {}) {
    this.log('INFO', message, metadata);
  }

  static warn(message: string, metadata: Partial<LogEntry> = {}) {
    this.log('WARN', message, metadata);
  }

  static error(message: string, metadata: Partial<LogEntry> = {}) {
    this.log('ERROR', message, metadata);
  }

  private static log(level: 'INFO' | 'WARN' | 'ERROR', message: string, metadata: Partial<LogEntry>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      correlation_id: CorrelationContext.getId(),
      message,
      ...metadata
    };
    
    // In production, this would stream to ElasticSearch/Datadog
    console.log(JSON.stringify(entry));
  }
}
