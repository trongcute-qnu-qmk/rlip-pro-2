export interface AppConfig {
  retryAttempts: number;
  retryBackoffMs: number;
  freshnessMaxAgeFinancialsDays: number;
  freshnessMaxAgeMarketMins: number;
  freshnessMaxAgeNewsHours: number;
  circuitBreakerCooldownMs: number;
}

export class ConfigService {
  private static config: AppConfig = {
    retryAttempts: 3,
    retryBackoffMs: 2000,
    freshnessMaxAgeFinancialsDays: 90,
    freshnessMaxAgeMarketMins: 5,
    freshnessMaxAgeNewsHours: 24,
    circuitBreakerCooldownMs: 5 * 60 * 1000 // 5 mins
  };

  static get(key: keyof AppConfig): number {
    return this.config[key];
  }

  static override(newConfig: Partial<AppConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}
