export class MemoryCache {
  private static cache: Record<string, { value: any; expiry: number }> = {};

  static set(key: string, value: any, ttlSeconds: number = 3600) {
    const expiry = Date.now() + ttlSeconds * 1000;
    this.cache[key] = { value, expiry };
  }

  static get<T>(key: string): T | null {
    const item = this.cache[key];
    if (!item) return null;

    if (Date.now() > item.expiry) {
      delete this.cache[key];
      return null;
    }

    return item.value as T;
  }

  static clear(keyPrefix?: string) {
    if (!keyPrefix) {
      this.cache = {};
      return;
    }
    Object.keys(this.cache).forEach(k => {
      if (k.startsWith(keyPrefix)) {
        delete this.cache[k];
      }
    });
  }
}
