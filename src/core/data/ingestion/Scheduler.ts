export class Scheduler {
  private jobs: ReturnType<typeof setInterval>[] = [];

  scheduleDailyJob(timeString: string, task: () => void) {
    // Simplistic mock scheduler
    console.log(`[Scheduler] Job scheduled to run daily at ${timeString}`);
    
    // E.g., run every 24 hours
    const interval = setInterval(task, 24 * 60 * 60 * 1000);
    this.jobs.push(interval);
  }

  stopAll() {
    this.jobs.forEach(clearInterval);
  }
}
