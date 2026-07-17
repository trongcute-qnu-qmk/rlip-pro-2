export function calculateFreshnessScore(retrievedAt: number, periodType: 'REALTIME' | 'DAILY' | 'QUARTERLY' | 'ANNUAL'): number {
  const now = Date.now();
  const diffHours = (now - retrievedAt) / (1000 * 60 * 60);

  if (periodType === 'REALTIME') {
    if (diffHours < 1) return 100;
    if (diffHours < 24) return 80;
    return 50;
  }

  if (periodType === 'DAILY') {
    if (diffHours < 24) return 100;
    if (diffHours < 48) return 80;
    return 40;
  }

  if (periodType === 'QUARTERLY') {
    const diffDays = diffHours / 24;
    if (diffDays < 30) return 100; // Vừa ra BCTC
    if (diffDays < 90) return 90;  // Vẫn trong quý
    if (diffDays < 180) return 70; // Bắt đầu cũ
    return 30; // Outdated (Chưa có BCTC quý mới)
  }

  return 50; // Fallback
}
