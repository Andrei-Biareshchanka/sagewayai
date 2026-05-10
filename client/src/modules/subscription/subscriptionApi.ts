import { api } from '@/lib/api';

export interface SubscriberInfo {
  email:  string;
  lang:   'en' | 'ru';
  active: boolean;
}

export const fetchSubscriberByToken = (token: string) =>
  api.get<SubscriberInfo>(`/subscribe/manage/${token}`).then((r) => r.data);

export const updateSubscriberLang = (token: string, lang: 'en' | 'ru') =>
  api.patch(`/subscribe/manage/${token}`, { lang }).then((r) => r.data);

export const unsubscribeByToken = (token: string) =>
  api.get(`/subscribe/unsubscribe/${token}`).then((r) => r.data);
