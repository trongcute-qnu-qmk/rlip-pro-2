export class LocalCache {
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    const itemStr = window.localStorage.getItem(key);
    if (!itemStr) return null;
    try {
      const item = JSON.parse(itemStr);
      const now = new Date();
      // Kiểm tra hết hạn
      if (now.getTime() > item.expiry) {
        window.localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch {
      return null;
    }
  }

  static set<T>(key: string, value: T, ttlHours: number = 24): void {
    if (typeof window === 'undefined') return;
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttlHours * 60 * 60 * 1000,
    };
    try {
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.warn('LocalCache set error', e);
    }
  }
}
