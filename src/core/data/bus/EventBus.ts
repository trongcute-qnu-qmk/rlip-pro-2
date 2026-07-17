type Listener = (payload: any) => void;

export class EventBus {
  private static listeners: Record<string, Listener[]> = {};

  static subscribe(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter(l => l !== callback);
    };
  }

  static publish(event: string, payload: any) {
    console.log(`[EventBus] Emitting ${event}`, payload);
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        try {
          callback(payload);
        } catch (e) {
          console.error(`[EventBus] Error in listener for ${event}:`, e);
        }
      });
    }
  }
}
