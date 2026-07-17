export interface JobRecord {
  id: string;
  name: string;
  startTime: string;
  endTime?: string;
  durationMs?: number;
  result: 'SUCCESS' | 'FAILED' | 'RUNNING';
  errorMessage?: string;
}

export class JobHistory {
  private static history: JobRecord[] = [];

  static startJob(name: string): string {
    const id = `job-${Date.now()}`;
    this.history.push({
      id,
      name,
      startTime: new Date().toISOString(),
      result: 'RUNNING'
    });
    return id;
  }

  static endJob(id: string, result: 'SUCCESS' | 'FAILED', errorMessage?: string) {
    const job = this.history.find(j => j.id === id);
    if (job) {
      job.endTime = new Date().toISOString();
      job.durationMs = new Date(job.endTime).getTime() - new Date(job.startTime).getTime();
      job.result = result;
      job.errorMessage = errorMessage;
    }
  }

  static getHistory(): JobRecord[] {
    return this.history;
  }
}
