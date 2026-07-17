export type Role = 'ADMIN' | 'ANALYST' | 'SYSTEM' | 'VIEWER';

export class DataAccessControl {
  
  static canWriteData(role: Role): boolean {
    return ['ADMIN', 'SYSTEM'].includes(role);
  }

  static canOverrideAI(role: Role): boolean {
    return ['ADMIN', 'ANALYST'].includes(role);
  }

  static checkPermission(role: Role, action: 'WRITE_DATA' | 'OVERRIDE_AI') {
    if (action === 'WRITE_DATA' && !this.canWriteData(role)) {
      throw new Error(`Permission Denied: ${role} cannot write data.`);
    }
    if (action === 'OVERRIDE_AI' && !this.canOverrideAI(role)) {
      throw new Error(`Permission Denied: ${role} cannot override AI decisions.`);
    }
  }
}
