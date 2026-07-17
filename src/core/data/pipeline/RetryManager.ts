import { DeadLetterQueue } from './DeadLetterQueue';

export class RetryManager {
  static async execute<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelayMs: number = 1000
  ): Promise<T> {
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        return await operation();
      } catch (error: any) {
        attempt++;
        if (attempt >= maxRetries) {
          console.error(`[RetryManager] Failed after ${maxRetries} attempts.`);
          DeadLetterQueue.push({ operation: operation.toString() }, error.message);
          throw error;
        }
        
        // Exponential backoff
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        console.warn(`[RetryManager] Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Unreachable code');
  }
}
