export interface DatasetMeta {
  datasetId: string;
  source: string;
  updatedAt: number;
  qualityScore: number; // 0-100
  status: 'ACTIVE' | 'DEPRECATED' | 'ERROR';
}

export class DataCatalog {
  private datasets: Map<string, DatasetMeta> = new Map();

  registerDataset(meta: DatasetMeta) {
    this.datasets.set(meta.datasetId, meta);
  }

  getDatasetInfo(datasetId: string): DatasetMeta | undefined {
    return this.datasets.get(datasetId);
  }
}
