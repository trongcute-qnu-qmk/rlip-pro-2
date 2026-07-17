export interface PeerComparisonMetric {
  metricName: string; // e.g. "ROIC"
  companyValue: number;
  industryAverage: number;
  industryMedian: number;
  percentileRank: number; // 0 to 100
}

export class PeerComparisonEngine {
  static evaluateMetricAgainstPeers(
    companyValue: number, 
    peerValues: number[],
    metricName: string
  ): PeerComparisonMetric {
    if (peerValues.length === 0) {
      return {
        metricName,
        companyValue,
        industryAverage: companyValue,
        industryMedian: companyValue,
        percentileRank: 50 // default
      };
    }

    const sortedPeers = [...peerValues].sort((a, b) => a - b);
    const sum = sortedPeers.reduce((a, b) => a + b, 0);
    const avg = sum / sortedPeers.length;
    const mid = Math.floor(sortedPeers.length / 2);
    const median = sortedPeers.length % 2 !== 0 ? sortedPeers[mid] : (sortedPeers[mid - 1] + sortedPeers[mid]) / 2;

    // Percentile rank (how many peers are strictly less than our company's value)
    const countBelow = sortedPeers.filter(v => v < companyValue).length;
    const percentile = (countBelow / sortedPeers.length) * 100;

    return {
      metricName,
      companyValue,
      industryAverage: avg,
      industryMedian: median,
      percentileRank: percentile
    };
  }
}
