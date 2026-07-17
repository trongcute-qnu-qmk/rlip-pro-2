export class SafetyGuardrails {
  static checkFinancialAdvice(aiResponse: string): boolean {
    const forbiddenPhrases = [
      'chắc chắn tăng',
      'đảm bảo lợi nhuận',
      'phải mua ngay',
      '100% sinh lời'
    ];
    
    for (const phrase of forbiddenPhrases) {
      if (aiResponse.toLowerCase().includes(phrase)) {
        return false; // Failed guardrail
      }
    }
    return true;
  }
}
