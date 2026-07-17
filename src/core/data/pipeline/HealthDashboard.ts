import { HealthCheck } from './HealthCheck';
import { JobHistory } from './JobHistory';

export interface SystemHealth {
  providers: Record<string, string>;
  jobs: Record<string, string>;
  systemStatus: 'HEALTHY' | 'DEGRADED' | 'DOWN';
}

export class HealthDashboard {
  static getReport(): SystemHealth {
    const providers = HealthCheck.getAllStatus();
    const history = JobHistory.getHistory();
    
    let hasOffline = false;
    
    for (const status of Object.values(providers)) {
      if (status === 'OFFLINE') hasOffline = true;
    }

    const recentJobs: Record<string, string> = {};
    // Get last 10 jobs
    history.slice(-10).forEach(job => {
      recentJobs[job.name] = job.result;
    });

    let systemStatus: 'HEALTHY' | 'DEGRADED' | 'DOWN' = 'HEALTHY';
    if (hasOffline) systemStatus = 'DEGRADED';
    // Logic could be expanded

    return {
      providers,
      jobs: recentJobs,
      systemStatus
    };
  }
}
