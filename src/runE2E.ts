import { TcbsProvider } from './core/data/providers/TcbsProvider';
import { FinancialNormalizer } from './core/data/normalization/FinancialNormalizer';
import { DataRepository } from './core/data/storage/DataRepository';
import { DataIngestionPipeline } from './core/data/ingestion/DataIngestionPipeline';
import { QualityFeatureEngine } from './core/data/features/quality/QualityFeatureEngine';

async function runE2E(ticker: string = 'FPT') {
  console.log(`\n===========================================`);
  console.log(`🚀 STARTING END-TO-END PIPELINE FOR ${ticker}`);
  console.log(`===========================================\n`);

  try {
    // 1. Setup Infrastructure
    const provider = new TcbsProvider();
    const normalizer = new FinancialNormalizer();
    const repository = new DataRepository();
    const pipeline = new DataIngestionPipeline(provider, normalizer, repository);

    // 2. Run Data Ingestion (Fetch, Validate, Normalize, Store)
    console.log(`[Step 1] Fetching and Processing Financials...`);
    await pipeline.runSyncJob(ticker);

    // 3. Feature Extraction
    console.log(`\n[Step 2] Feature Engineering...`);
    const nopatFact = repository.getLatestFactByMetric(ticker, 'NET_INCOME');
    const equityFact = repository.getLatestFactByMetric(ticker, 'TOTAL_EQUITY');
    const debtFact = repository.getLatestFactByMetric(ticker, 'TOTAL_DEBT');
    
    const nopat = nopatFact ? nopatFact.value : 0;
    const investedCapital = (equityFact ? equityFact.value : 0) + (debtFact ? debtFact.value : 0);

    const roicFeature = QualityFeatureEngine.calculateROIC(ticker, nopat, investedCapital, 95);
    
    console.log(`Calculated ROIC for ${ticker}: ${(roicFeature.value * 100).toFixed(2)}%`);
    
    // 4. AI Committee (Mocking Agent output based on Real Feature)
    console.log(`\n[Step 3] AI Committee Analysis...`);
    let decision = 'HOLD';
    let bullCase = '';
    let bearCase = '';

    if (roicFeature.value > 0.15) {
      decision = 'BUY';
      bullCase = `${ticker} has a strong ROIC of ${(roicFeature.value * 100).toFixed(2)}%, indicating excellent capital allocation efficiency. Moat is intact.`;
      bearCase = `High ROIC might attract aggressive competition. Needs monitoring on margin compression.`;
    } else {
      decision = 'HOLD';
      bullCase = `${ticker} has potential for margin expansion if restructuring succeeds.`;
      bearCase = `ROIC is currently weak at ${(roicFeature.value * 100).toFixed(2)}%. Capital is not generating sufficient returns.`;
    }

    console.log(`[Decision]: ${decision}`);
    console.log(`[Bull Case]: ${bullCase}`);
    console.log(`[Bear Case]: ${bearCase}`);

    // 5. War Room UI output
    console.log(`\n===========================================`);
    console.log(`✅ END-TO-END DEMO SUCCESSFUL`);
    console.log(`===========================================\n`);

  } catch (error) {
    console.error(`\n❌ END-TO-END PIPELINE FAILED:`, error);
  }
}

// Default execution for FPT
runE2E('FPT');
