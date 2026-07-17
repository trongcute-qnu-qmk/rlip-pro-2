import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: number;
}

export interface UserSubscription {
  plan: 'free' | 'pro' | 'premium' | 'enterprise' | 'owner';
  status: 'active' | 'inactive';
  expiresAt?: number;
}

export interface UserPermissions {
  scanner: boolean;
  pdf: boolean;
  ai: boolean;
  watchlist: boolean;
}

interface AuthState {
  user: any | null;
  profile: UserProfile | null;
  subscription: UserSubscription | null;
  permissions: UserPermissions | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: { uid: '123', email: 'guest@rlip.pro' },
  profile: { uid: '123', email: 'guest@rlip.pro', name: 'Guest', createdAt: Date.now() },
  subscription: { plan: 'pro', status: 'active' },
  permissions: { scanner: true, pdf: true, ai: true, watchlist: true },
  loading: false,
  error: null,
};

const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
