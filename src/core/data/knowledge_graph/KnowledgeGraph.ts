export interface GraphNode {
  id: string;
  type: 'COMPANY' | 'PERSON' | 'INDUSTRY' | 'PRODUCT' | 'MARKET' | 'COMPETITOR';
  label: string;
}

export interface GraphEdge {
  sourceId: string;
  targetId: string;
  relationship: 'CEO_OF' | 'SUBSIDIARY_OF' | 'COMPETES_WITH' | 'OPERATES_IN' | 'DEPENDS_ON';
  weight?: number;
}

export class KnowledgeGraph {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: GraphEdge[] = [];

  addNode(node: GraphNode) {
    this.nodes.set(node.id, node);
  }

  addEdge(edge: GraphEdge) {
    this.edges.push(edge);
  }

  getRelatedNodes(nodeId: string): GraphNode[] {
    const relatedIds = this.edges
      .filter(e => e.sourceId === nodeId || e.targetId === nodeId)
      .map(e => e.sourceId === nodeId ? e.targetId : e.sourceId);
    
    return relatedIds.map(id => this.nodes.get(id)!).filter(Boolean);
  }
}
