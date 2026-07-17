
export interface StructuredSection {
  thesisId: string;
  confidence: number;
  timeHorizon: string;
}

export interface InvestmentMemo {
  id: string;
  ticker: string;
  title: string;
  
  // Structured Layer (AI Readable)
  structured: {
    theses: StructuredSection[];
    catalystsIds: string[];
    riskTags: string[];
  };
  
  // Narrative Layer (Human Readable)
  narrative: string; // Markdown content
  
  // Evidence Binding
  evidenceIds: string[];
  
  authorId: string;
  lastUpdated: string;
}
