import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchSubscriberByToken,
  updateSubscriberLang,
  unsubscribeByToken,
} from './subscriptionApi';

export const useSubscriberInfo = (token: string) =>
  useQuery({
    queryKey: ['subscription', token],
    queryFn:  () => fetchSubscriberByToken(token),
    enabled:  Boolean(token),
    retry:    false,
  });

export const useUpdateSubscriberLang = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lang: 'en' | 'ru') => updateSubscriberLang(token, lang),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['subscription', token] }),
  });
};

export const useUnsubscribe = (token: string) =>
  useMutation({
    mutationFn: () => unsubscribeByToken(token),
  });
