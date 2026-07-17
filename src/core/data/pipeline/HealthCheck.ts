export type HealthStatus = 'HEALTHY' | 'SLOW' | 'OFFLINE';

export class HealthCheck {
  private static status: Record<string, HealthStatus> = {};

  static setStatus(providerId: string, status: HealthStatus) {
    this.status[providerId] = status;
  }

  static getStatus(providerId: string): HealthStatus {
    return this.status[providerId] || 'HEALTHY';
  }

  static getAllStatus(): Record<string, HealthStatus> {
    return this.status;
  }
}
