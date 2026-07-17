
export interface PerformanceSnapshot {
  date: string;
  nav: number;
  dailyReturn: number;
  ytdReturn: number;
}

export class PerformanceTracker {
  
  // In a real app, this reads from a database table `portfolio_history`
  static calculateYTDReturn(snapshots: PerformanceSnapshot[]): number {
    if (snapshots.length < 2) return 0;
    
    // Simplistic YTD calculation assuming first snapshot is Jan 1
    const startNav = snapshots[0].nav;
    const currentNav = snapshots[snapshots.length - 1].nav;
    
    if (startNav === 0) return 0;
    return ((currentNav - startNav) / startNav) * 100;
  }

  static calculateMaxDrawdown(snapshots: PerformanceSnapshot[]): number {
    let maxNav = 0;
    let maxDrawdown = 0;

    snapshots.forEach(snap => {
      if (snap.nav > maxNav) {
        maxNav = snap.nav;
      }
      
      const drawdown = (snap.nav - maxNav) / maxNav;
      if (drawdown < maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });

    return maxDrawdown * 100; // Return as percentage
  }
}
