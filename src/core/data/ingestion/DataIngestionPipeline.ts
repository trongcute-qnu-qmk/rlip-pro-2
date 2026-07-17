import type { FinancialDataProvider } from '../interfaces/FinancialDataProvider';
import { FinancialNormalizer } from '../normalization/FinancialNormalizer';
import { DataRepository } from '../storage/DataRepository';
import { DataContractValidator } from '../contracts/FinancialStatementSchema';
import { IdempotentKeyGenerator } from '../pipeline/IdempotentKeyGenerator';
import { StructuredLogger } from '../observability/StructuredLogger';
import { CorrelationContext } from '../pipeline/CorrelationContext';

export class DataIngestionPipeline {
  private provider: FinancialDataProvider;
  private normalizer: FinancialNormalizer;
  private repository: DataRepository;

  constructor(
    provider: FinancialDataProvider,
    normalizer: FinancialNormalizer,
    repository: DataRepository
  ) {
    this.provider = provider;
    this.normalizer = normalizer;
    this.repository = repository;
  }

  async runSyncJob(ticker: string) {
    return CorrelationContext.runWithContext(CorrelationContext.generateId(), async () => {
      StructuredLogger.info(`Starting sync for ${ticker}`, { ticker, job: 'financial_sync' });
      
      try {
        // 1. Fetch Raw Data
        const rawIncome = await this.provider.getIncomeStatement(ticker);
        const rawBalance = await this.provider.getBalanceSheet(ticker);
        
        // Merge them for simplicity or process separately
        const rawMerged = {
          ticker: rawIncome.ticker,
          period: rawIncome.period,
          source: rawIncome.source,
          metrics: { ...rawIncome.metrics, ...rawBalance.metrics }
        };

        // 2. Validate Contract
        const validatedData = DataContractValidator.validateFinancialStatement(rawMerged);
        
        // 3. Normalize
        const normalizedFacts = this.normalizer.normalize(validatedData);
        
        // 4. Idempotent check & Store
        for (const fact of normalizedFacts) {
           const idKey = IdempotentKeyGenerator.generate(fact.ticker, fact.period, fact.metric, fact.version);
           StructuredLogger.info(`Idempotent key generated: ${idKey}`);
        }
        this.repository.saveFacts(normalizedFacts);
        
        StructuredLogger.info(`Sync complete. Saved ${normalizedFacts.length} facts.`, { ticker, status: 'SUCCESS' });
        return true;
      } catch (error: any) {
        StructuredLogger.error(`Sync failed for ${ticker}: ${error.message}`, { ticker, status: 'FAILED' });
        throw error;
      }
    });
  }
}
