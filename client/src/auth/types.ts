export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface SubscriptionSettings {
  active: boolean;
  categoryPreferences: string[];
}
