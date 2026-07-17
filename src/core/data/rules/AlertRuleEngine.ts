export interface AlertRule {
  ruleId: string;
  condition: (dataContext: any) => boolean;
  severity: 'INFO' | 'WATCH' | 'WARNING' | 'CRITICAL' | 'THESIS_BREAK';
  message: string;
}

export class AlertRuleEngine {
  private rules: AlertRule[] = [];

  addRule(rule: AlertRule) {
    this.rules.push(rule);
  }

  evaluateRules(dataContext: any): string[] {
    const triggeredAlerts: string[] = [];
    for (const rule of this.rules) {
      if (rule.condition(dataContext)) {
        triggeredAlerts.push(`[${rule.severity}] ${rule.message}`);
      }
    }
    return triggeredAlerts;
  }
}
