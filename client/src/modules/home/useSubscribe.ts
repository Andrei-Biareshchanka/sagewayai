import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';

interface SubscribeParams {
  email: string;
  lang:  string;
}

const subscribe = (params: SubscribeParams) => api.post('/subscribe', params);

export const useSubscribe = () =>
  useMutation({
    mutationFn: subscribe,
  });
