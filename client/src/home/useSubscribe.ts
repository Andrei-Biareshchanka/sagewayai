import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';

const subscribe = (email: string) => api.post('/subscribe', { email });

export const useSubscribe = () =>
  useMutation({
    mutationFn: subscribe,
  });
