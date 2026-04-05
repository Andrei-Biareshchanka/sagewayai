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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  parablesCount: number;
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
