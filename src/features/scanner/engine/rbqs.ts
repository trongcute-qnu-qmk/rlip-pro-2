import type { FinancialStatement } from './models';
import { calculatePiotroskiFScore, calculateROIC, calculateBeneishMScore, calculateSloanRatio } from './formulas';

export interface RBQSResult {
  totalScore: number;
  quantScore: number; // Max 70
  qualScore: number; // Max 30
  components: {
    financialQuality: number; // Max 25
    capitalAllocation: number; // Max 20
    growthAndEfficiency: number; // Max 15
    redFlagsPenalty: number; // Max 10 (Negative)
    management: number; // Max 15
    moat: number; // Max 15
  };
}

export function calculateRBQS(
  statement: FinancialStatement, 
  qualitativeInputs?: { managementScore: number; moatScore: number }
): RBQSResult {
  const years = statement.years;
  if (years.length < 2) throw new Error("RBQS requires at least 2 years of data");

  const currentYear = years[years.length - 1];
  const prevYear = years[years.length - 2];

  const currentBs = statement.balanceSheets[currentYear];
  const prevBs = statement.balanceSheets[prevYear];
  const currentIs = statement.incomeStatements[currentYear];
  const prevIs = statement.incomeStatements[prevYear];
  const currentCf = statement.cashFlows[currentYear];

  // Quantitative ---------------------------------
  // 1. Financial Quality (25 pts)
  const fScore = calculatePiotroskiFScore(currentBs, prevBs, currentIs, prevIs, currentCf);
  const sloanRatio = Math.abs(calculateSloanRatio(currentIs, currentCf, currentBs));
  
  let financialQuality = (fScore / 9) * 20; // 20 pts from Piotroski
  if (sloanRatio < 0.1) financialQuality += 5; // 5 pts for good earnings quality

  // 2. Capital Allocation (20 pts)
  const roic = calculateROIC(currentIs, currentBs);
  let capitalAllocation = 0;
  if (roic > 0.15) capitalAllocation = 20;
  else if (roic > 0.10) capitalAllocation = 15;
  else if (roic > 0.05) capitalAllocation = 10;
  else capitalAllocation = 0;

  // 3. Growth & Efficiency (15 pts)
  const revGrowth = (currentIs.revenue - prevIs.revenue) / prevIs.revenue;
  let growthAndEfficiency = 0;
  if (revGrowth > 0.15) growthAndEfficiency = 15;
  else if (revGrowth > 0.05) growthAndEfficiency = 10;
  else if (revGrowth > 0) growthAndEfficiency = 5;

  // 4. Red Flags Penalty (-10 pts max)
  const mScore = calculateBeneishMScore(currentBs, prevBs, currentIs, prevIs);
  let redFlagsPenalty = 0;
  if (mScore > -1.78) redFlagsPenalty = -10; // High probability of manipulation

  // Qualitative ----------------------------------
  const management = qualitativeInputs?.managementScore ?? 10;
  const moat = qualitativeInputs?.moatScore ?? 10;

  const quantScore = financialQuality + capitalAllocation + growthAndEfficiency + redFlagsPenalty;
  const qualScore = management + moat;
  const totalScore = quantScore + qualScore;

  return {
    totalScore: Math.round(totalScore),
    quantScore: Math.round(quantScore),
    qualScore: Math.round(qualScore),
    components: {
      financialQuality: Math.round(financialQuality),
      capitalAllocation,
      growthAndEfficiency,
      redFlagsPenalty,
      management,
      moat
    }
  };
}

export type VerdictLevel = 'EXCELLENT' | 'GOOD' | 'WATCHLIST' | 'SPECULATIVE' | 'AVOID';

export interface Verdict {
  level: VerdictLevel;
  stars: number;
  summary: string;
}

export function getInvestmentVerdict(rbqs: RBQSResult): Verdict {
  if (rbqs.totalScore >= 80) {
    return {
      level: 'EXCELLENT',
      stars: 5,
      summary: 'Doanh nghiệp xuất sắc. Lợi thế cạnh tranh mạnh, tài chính vững vàng, chất lượng lợi nhuận cao.'
    };
  } else if (rbqs.totalScore >= 65) {
    return {
      level: 'GOOD',
      stars: 4,
      summary: 'Doanh nghiệp tốt. Hoạt động ổn định nhưng cần theo dõi sát sao rủi ro vĩ mô.'
    };
  } else if (rbqs.totalScore >= 50) {
    return {
      level: 'WATCHLIST',
      stars: 3,
      summary: 'Phù hợp đưa vào Watchlist. Sức khoẻ tài chính trung bình hoặc đang tái cấu trúc.'
    };
  } else if (rbqs.totalScore >= 35) {
    return {
      level: 'SPECULATIVE',
      stars: 2,
      summary: 'Rủi ro cao, mang tính đầu cơ. Chỉ số tài chính kém hoặc có dấu hiệu suy thoái.'
    };
  } else {
    return {
      level: 'AVOID',
      stars: 1,
      summary: 'Tuyệt đối tránh xa. Tình hình tài chính nguy hiểm hoặc có dấu hiệu xào nấu BCTC.'
    };
  }
}
