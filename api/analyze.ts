import type { VercelRequest, VercelResponse } from '@vercel/node';
import { TcbsProvider } from '../src/core/data/providers/TcbsProvider';
import { FinancialNormalizer } from '../src/core/data/normalization/FinancialNormalizer';
import { DataRepository } from '../src/core/data/storage/DataRepository';
import { DataIngestionPipeline } from '../src/core/data/ingestion/DataIngestionPipeline';
import { QualityFeatureEngine } from '../src/core/data/features/quality/QualityFeatureEngine';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ticker } = req.body;
  if (!ticker) {
    return res.status(400).json({ error: 'Ticker is required' });
  }

  try {
    const provider = new TcbsProvider();
    const normalizer = new FinancialNormalizer();
    const repository = new DataRepository();
    const pipeline = new DataIngestionPipeline(provider, normalizer, repository);

    // 1. Run Data Ingestion
    await pipeline.runSyncJob(ticker);

    // 2. Extract Features
    const nopatFact = repository.getLatestFactByMetric(ticker, 'NET_INCOME');
    const equityFact = repository.getLatestFactByMetric(ticker, 'TOTAL_EQUITY');
    const debtFact = repository.getLatestFactByMetric(ticker, 'TOTAL_DEBT');
    
    const nopat = nopatFact ? nopatFact.value : 0;
    const investedCapital = (equityFact ? equityFact.value : 0) + (debtFact ? debtFact.value : 0);

    const roicFeature = QualityFeatureEngine.calculateROIC(ticker, nopat, investedCapital, 95);
    const roic = roicFeature.value;

    // 3. AI Logic
    let decision = 'HOLD';
    let bullCase = '';
    let bearCase = '';
    let score = 50;

    if (roic > 0.15) {
      decision = 'BUY';
      bullCase = `${ticker} has a strong ROIC of ${(roic * 100).toFixed(2)}%, indicating excellent capital allocation efficiency. Moat is intact.`;
      bearCase = `High ROIC might attract aggressive competition. Needs monitoring on margin compression.`;
      score = 88;
    } else {
      decision = 'HOLD';
      bullCase = `${ticker} has potential for margin expansion if restructuring succeeds.`;
      bearCase = `ROIC is currently weak at ${(roic * 100).toFixed(2)}%. Capital is not generating sufficient returns.`;
      score = 45;
    }

    // 4. Save to Supabase
    try {
      if (supabaseUrl !== 'https://placeholder.supabase.co') {
        await supabase.from('analysis_history').insert([
          {
            ticker,
            roic,
            decision,
            bull_case: bullCase,
            bear_case: bearCase,
            score
          }
        ]);
      }
    } catch (dbErr) {
      console.warn("Failed to save to Supabase:", dbErr);
    }

    return res.status(200).json({
      ticker,
      roic,
      decision,
      bullCase,
      bearCase,
      score
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
