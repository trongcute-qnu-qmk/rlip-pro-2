export interface AnalystNote {
  id: string;
  ticker: string;
  title: string;
  content: string; // Markdown
  
  tags: string[];
  linkedEvidenceIds: string[];
  
  authorId: string;
  timestamp: string;
}
