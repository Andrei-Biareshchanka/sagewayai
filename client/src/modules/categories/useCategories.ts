import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from './categoriesApi';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
