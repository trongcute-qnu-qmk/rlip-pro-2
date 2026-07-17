type EventHandler<T = any> = (payload: T) => void;

export class DataEventBus {
  private listeners: Record<string, EventHandler[]> = {};

  subscribe<T>(event: string, handler: EventHandler<T>): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);

    return () => {
      this.listeners[event] = this.listeners[event].filter(h => h !== handler);
    };
  }

  publish<T>(event: string, payload: T): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(handler => {
      try {
        handler(payload);
      } catch (e) {
        console.error(`Error in event handler for ${event}`, e);
      }
    });
  }
}

export const dataEventBus = new DataEventBus();

// Core Events
export const EVENTS = {
  FINANCIAL_REPORT_UPDATED: 'FINANCIAL_REPORT_UPDATED',
  PRICE_CHANGED: 'PRICE_CHANGED',
  OWNERSHIP_CHANGED: 'OWNERSHIP_CHANGED',
  MACRO_DATA_UPDATED: 'MACRO_DATA_UPDATED',
};
