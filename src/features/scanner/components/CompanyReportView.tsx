import { useState, useEffect } from 'react';
import { Card } from '@/shared/components/Card';
import { Badge } from '@/shared/components/Badge';
import { Tabs } from '@/shared/components/Tabs';
import { generateReport } from '../engine/report';
import type { BusinessQualityReport } from '../engine/report';
import { financialRepository } from '@/core/data/repositories/FinancialRepository';

const VerdictBadge = ({ verdict }: { verdict: BusinessQualityReport['verdict'] }) => {
  const colors = {
    'EXCELLENT': 'var(--color-success)',
    'GOOD': 'var(--color-primary)',
    'WATCHLIST': 'var(--color-warning)',
    'SPECULATIVE': 'var(--color-danger)',
    'AVOID': '#000000'
  };
  const color = colors[verdict.level];

  return (
    <Card style={{ padding: 'var(--spacing-4)', borderLeft: `4px solid ${color}`, backgroundColor: 'var(--color-surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
        <span style={{ fontSize: 'var(--font-xl)', color }}>{'⭐'.repeat(verdict.stars)}</span>
        <strong style={{ fontSize: 'var(--font-lg)', color }}>{verdict.level}</strong>
      </div>
      <p style={{ color: 'var(--color-text-muted)' }}>{verdict.summary}</p>
    </Card>
  );
};

export const CompanyReportView = () => {
  const [ticker, setTicker] = useState('FPT');
  const [report, setReport] = useState<BusinessQualityReport | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (t: string) => {
    setLoading(true);
    try {
      const statement = await financialRepository.getFinancialStatement(t);
      const marketCap = 150000; // Mock
      const res = generateReport(statement, marketCap);
      setReport(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(ticker);
  }, []);

  if (loading || !report) {
    return <div style={{ padding: 'var(--spacing-8)', textAlign: 'center' }}>Đang tải báo cáo...</div>;
  }

  const overviewContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <VerdictBadge verdict={report.verdict} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
        <Card style={{ padding: 'var(--spacing-6)' }}>
          <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 'bold', marginBottom: 'var(--spacing-4)' }}>RBQS Score</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-2)' }}>
            <span style={{ fontSize: '4rem', fontWeight: 'bold', lineHeight: 1, color: 'var(--color-primary)' }}>{report.rbqs.totalScore}</span>
            <span style={{ fontSize: 'var(--font-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-2)' }}>/100</span>
          </div>
          <div style={{ marginTop: 'var(--spacing-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
              <span>Định lượng (Quantitative):</span>
              <strong>{report.rbqs.quantScore}/70</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Định tính (Qualitative):</span>
              <strong>{report.rbqs.qualScore}/30</strong>
            </div>
          </div>
        </Card>

        <Card style={{ padding: 'var(--spacing-6)' }}>
          <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 'bold', marginBottom: 'var(--spacing-4)' }}>Hệ thống Cảnh báo</h3>
          {report.risks.length === 0 ? (
            <p style={{ color: 'var(--color-success)' }}>Không phát hiện rủi ro nghiêm trọng.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              {report.risks.map(r => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  <Badge variant={r.severity === 'RED' ? 'danger' : r.severity === 'YELLOW' ? 'warning' : 'success'}>{r.severity}</Badge>
                  <span style={{ fontSize: 'var(--font-sm)' }}>{r.title}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );

  const financialContent = (
    <Card style={{ padding: 'var(--spacing-6)' }}>
      <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 'bold', marginBottom: 'var(--spacing-4)' }}>Chi tiết Chất lượng Tài chính</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
        {Object.entries({
          'Sức khoẻ tài chính (25)': report.rbqs.components.financialQuality,
          'Phân bổ vốn (20)': report.rbqs.components.capitalAllocation,
          'Tăng trưởng & Hiệu quả (15)': report.rbqs.components.growthAndEfficiency,
          'Trừ điểm Rủi ro (Max -10)': report.rbqs.components.redFlagsPenalty,
        }).map(([label, score]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-2)', borderBottom: '1px solid var(--color-surface)' }}>
            <span>{label}</span>
            <strong style={{ color: score < 0 ? 'var(--color-danger)' : 'var(--color-text)' }}>{score}</strong>
          </div>
        ))}
      </div>
    </Card>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng Quan', content: overviewContent },
    { id: 'financials', label: 'Chất lượng Tài chính', content: financialContent },
    { id: 'valuation', label: 'Định giá (Chờ Epic 5)', content: <div style={{ padding: 'var(--spacing-4)' }}>Đang xây dựng...</div> },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--spacing-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--font-3xl)', fontWeight: 'bold', color: 'var(--color-text)' }}>{report.companyName}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-lg)' }}>Ticker: <strong style={{ color: 'var(--color-primary)' }}>{report.companyTicker}</strong></p>
        </div>
        <div>
          <input 
            type="text" 
            value={ticker} 
            onChange={e => setTicker(e.target.value.toUpperCase())}
            placeholder="Nhập mã CP..."
            style={{ padding: 'var(--spacing-2)', marginRight: 'var(--spacing-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-secondary)' }}
          />
          <button 
            onClick={() => fetchReport(ticker)}
            style={{ padding: 'var(--spacing-2) var(--spacing-4)', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Phân tích
          </button>
        </div>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};
