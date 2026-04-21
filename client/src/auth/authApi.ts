import type { AuthResponse } from '@/shared/types';
import { api } from '@/lib/api';

export const register = (email: string, password: string) =>
  api.post<AuthResponse>('/auth/register', { email, password }).then((r) => r.data);

export const login = (email: string, password: string) =>
  api.post<AuthResponse>('/auth/login', { email, password }).then((r) => r.data);

export const logout = () => api.post('/auth/logout');

export const refreshSession = () =>
  api.post<AuthResponse>('/auth/refresh').then((r) => r.data);
