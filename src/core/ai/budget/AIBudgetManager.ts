export class AIBudgetManager {
  private currentRequests: number = 0;
  private requestLimit: number;
  
  constructor(requestLimit: number) {
    this.requestLimit = requestLimit;
  }

  canMakeRequest(): boolean {
    return this.currentRequests < this.requestLimit;
  }

  recordRequest() {
    this.currentRequests++;
  }
}
