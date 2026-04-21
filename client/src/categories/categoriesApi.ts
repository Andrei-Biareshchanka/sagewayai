import type { Category } from '@/shared/types';
import { api } from '@/lib/api';

export const fetchCategories = () =>
  api.get<Category[]>('/categories').then((r) => r.data);
