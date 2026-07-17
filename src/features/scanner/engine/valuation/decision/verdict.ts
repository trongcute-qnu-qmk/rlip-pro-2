export function getFinalDecisionMatrix(
  qualityScore: number, // 0-100 (from RBQS)
  marginOfSafety: number // Percentage, e.g. 0.20 for 20%
) {
  // If quality is excellent but expensive -> Watch
  // If quality is good and cheap -> Accumulate
  if (qualityScore >= 80) {
    if (marginOfSafety > 0.15) return 'BUY';
    if (marginOfSafety > 0) return 'ACCUMULATE';
    return 'WATCH'; // Too expensive
  } else if (qualityScore >= 60) {
    if (marginOfSafety > 0.20) return 'ACCUMULATE';
    if (marginOfSafety > 0.05) return 'WATCH';
    return 'AVOID';
  } else {
    // Bad company
    if (marginOfSafety > 0.40) return 'SPECULATIVE_BUY'; // Super cheap
    return 'AVOID';
  }
}
