export interface InvestmentThesis {
  bullCase: string[];
  bearCase: string[];
  keyRisks: string[];
  whatMustHappen: string;
}

export function generateInvestmentThesis(
  companyName: string,
  impliedGrowthRate: number,
  historicalPePremium: number,
  roic: number
): InvestmentThesis {
  // Simple heuristic-based generator for now. AI can enhance this later.
  
  const bullCase = [];
  const bearCase = [];
  const keyRisks = [];
  
  if (roic > 0.15) {
    bullCase.push('Doanh nghiệp có lợi thế cạnh tranh mạnh (Moat) với ROIC cao bền vững.');
  } else {
    bearCase.push('Hiệu quả sử dụng vốn (ROIC) chưa thực sự ấn tượng.');
  }

  if (historicalPePremium < -0.1) {
    bullCase.push('Định giá hiện tại đang rẻ hơn so với mức P/E trung bình 5 năm.');
  } else if (historicalPePremium > 0.1) {
    bearCase.push('Cổ phiếu đang giao dịch ở mức Premium so với lịch sử, rủi ro điều chỉnh cao.');
  }

  if (impliedGrowthRate > 0.15) {
    keyRisks.push('Thị trường đang kỳ vọng tốc độ tăng trưởng rất cao. Bất kỳ sự chững lại nào cũng sẽ làm sập giá.');
  } else {
    bullCase.push('Kỳ vọng của thị trường hiện tại khá thấp, dễ dàng vượt qua (Beat Earnings).');
  }

  keyRisks.push('Rủi ro vĩ mô: Lãi suất hoặc chính sách ngành thay đổi.');

  const whatMustHappen = `${companyName} phải duy trì tốc độ tăng trưởng lợi nhuận >${(impliedGrowthRate * 100).toFixed(1)}% trong 5 năm tới để biện minh cho mức giá hiện tại.`;

  return {
    bullCase,
    bearCase,
    keyRisks,
    whatMustHappen
  };
}
