export class AssumptionCritic {
  evaluateWacc(wacc: number): string[] {
    const concerns = [];
    if (wacc < 0.08) {
      concerns.push('WACC is aggressively low for this risk profile, artificially inflating DCF value.');
    }
    return concerns;
  }

  evaluateTerminalGrowth(g: number): string[] {
    const concerns = [];
    if (g > 0.05) {
      concerns.push('Terminal growth rate exceeds standard GDP growth estimates, highly unrealistic.');
    }
    return concerns;
  }
}
