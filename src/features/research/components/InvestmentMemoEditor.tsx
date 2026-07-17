import React from 'react';
import { Card } from '../../../design-system/components/Card';
import { Button } from '../../../design-system/components/Button';
import { FileText, Link as LinkIcon, Edit3, Database } from 'lucide-react';

export const InvestmentMemoEditor: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-accent-blue" />
            Hybrid Investment Memo
          </h2>
          <p className="text-sm text-secondary">Structured Data + Narrative Flow + Evidence Binding</p>
        </div>
        <Button variant="primary">Save Memo</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column: Structured Data for AI */}
        <div className="lg:col-span-1 space-y-4">
          <Card variant="glass" className="h-full border-dashed border-accent-blue border-opacity-30">
            <h3 className="text-xs uppercase font-bold text-muted mb-3 flex items-center gap-1">
              <Database className="w-3 h-3" /> AI-Readable Section
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-secondary block mb-1">Key Catalyst IDs</label>
                <div className="bg-surface-hover p-2 rounded text-xs border border-border-light font-mono text-accent-blue">
                  CT-2026-Q3-ER, CT-2026-NEW-DC
                </div>
              </div>
              
              <div>
                <label className="text-xs text-secondary block mb-1">Risk Tags</label>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] bg-[rgba(245,158,11,0.1)] text-signal-warning px-2 py-1 rounded">MarginCompression</span>
                  <span className="text-[10px] bg-[rgba(245,158,11,0.1)] text-signal-warning px-2 py-1 rounded">ForexExposure</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-secondary block mb-1">Valuation Expected</label>
                <input type="text" defaultValue="145,000 VND" className="w-full bg-surface border border-border-light rounded px-2 py-1 text-sm text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Narrative Editor */}
        <div className="lg:col-span-3">
          <Card variant="default" className="h-[500px] flex flex-col p-0 overflow-hidden border-border-light">
            <div className="bg-surface-hover p-2 border-b border-border-light flex gap-2">
               <button className="p-1 hover:bg-surface rounded text-secondary hover:text-primary"><FileText className="w-4 h-4" /></button>
               <button className="p-1 hover:bg-surface rounded text-secondary hover:text-primary"><LinkIcon className="w-4 h-4" /></button>
               <div className="w-px h-4 bg-border-light mx-2 self-center"></div>
               <span className="text-xs text-muted self-center">Markdown Supported</span>
            </div>
            
            <textarea 
              className="flex-1 w-full bg-surface p-4 text-sm text-primary resize-none focus:outline-none focus:ring-1 focus:ring-accent-blue"
              defaultValue={`# Phân tích Đầu tư: FPT\n\n## 1. Bối cảnh Doanh nghiệp\nFPT đang ở giai đoạn chín muồi của chu kỳ tăng trưởng thứ 2, được thúc đẩy bởi...\n\n## 2. Lợi thế Cạnh tranh (Moat)\n- [Evidence: #EV-001] Chi phí kỹ sư IT tại Việt Nam vẫn rẻ hơn 40% so với Ấn Độ.\n- Mối quan hệ với các tập đoàn Nhật Bản rất bền chặt, thể hiện qua việc...\n\n## 3. Rủi ro & Catalyst\nQuý 3 tới đây sẽ là điểm rơi lợi nhuận của mảng Cloud...`}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
