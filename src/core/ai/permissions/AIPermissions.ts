export type DataScope = 'FINANCIALS' | 'NEWS' | 'LEGAL' | 'USER_PORTFOLIO';

export class AIPermissions {
  private agentScopes: Map<string, DataScope[]> = new Map();

  grantScope(agentId: string, scopes: DataScope[]) {
    this.agentScopes.set(agentId, scopes);
  }

  canAccess(agentId: string, scope: DataScope): boolean {
    const scopes = this.agentScopes.get(agentId) || [];
    return scopes.includes(scope);
  }
}
