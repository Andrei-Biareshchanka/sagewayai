export interface Parable {
  id: string;
  title: string;
  content: string;
  moral: string;
  source?: string;
  readTime: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParablesResponse {
  data: Parable[];
  page: number;
  limit: number;
  total: number;
}

export interface FetchParablesParams {
  category?: string;
  page?: number;
  limit?: number;
}
