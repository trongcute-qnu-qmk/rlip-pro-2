import { JobHistory } from './JobHistory';

export class JobScheduler {
  static async scheduleJob(name: string, task: () => Promise<void>, intervalMs: number) {
    setInterval(async () => {
      const jobId = JobHistory.startJob(name);
      try {
        await task();
        JobHistory.endJob(jobId, 'SUCCESS');
      } catch (error: any) {
        JobHistory.endJob(jobId, 'FAILED', error.message);
      }
    }, intervalMs);
  }
}
