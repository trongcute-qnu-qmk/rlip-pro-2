import { env } from '@/config/env';

export interface ILogger {
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

class ConsoleLogger implements ILogger {
  info(message: string, ...args: any[]): void {
    if (env.isDev) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }
}

// Future implementations could be added here:
// class SentryLogger implements ILogger { ... }
// class FirebaseLogger implements ILogger { ... }

// Export a singleton instance. Can be easily swapped later.
export const logger: ILogger = new ConsoleLogger();
