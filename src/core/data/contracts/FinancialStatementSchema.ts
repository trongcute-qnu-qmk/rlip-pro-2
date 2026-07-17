import { z } from 'zod';

export const FinancialMetricSchema = z.record(z.string(), z.number());

export const FinancialStatementSchema = z.object({
  ticker: z.string().min(1, 'Ticker is required'),
  period: z.string().regex(/^(20\d{2})-(Q[1-4]|FY)$/, 'Period must be in format YYYY-Qx or YYYY-FY'),
  metrics: FinancialMetricSchema,
  source: z.string().min(1, 'Source is required')
});

export type ValidatedFinancialStatement = z.infer<typeof FinancialStatementSchema>;

export class DataContractValidator {
  static validateFinancialStatement(data: unknown): ValidatedFinancialStatement {
    return FinancialStatementSchema.parse(data);
  }
}
