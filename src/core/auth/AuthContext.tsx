import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '@/core/firebase/auth';
import { db } from '@/core/firebase/firestore';
import { logger } from '@/shared/utils/logger';

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
  user: User | null;
  profile: UserProfile | null;
  subscription: UserSubscription | null;
  permissions: UserPermissions | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  subscription: null,
  permissions: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setState({ ...initialState, loading: false });
        return;
      }

      try {
        // Fetch extended user data from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setState({
            user: firebaseUser,
            profile: data.profile || null,
            subscription: data.subscription || null,
            permissions: data.permissions || null,
            loading: false,
            error: null,
          });
        } else {
          // If the user document doesn't exist, they need to go through onboarding
          setState({
            user: firebaseUser,
            profile: null,
            subscription: null,
            permissions: null,
            loading: false,
            error: null,
          });
        }
      } catch (error: any) {
        logger.error('Error fetching user data from Firestore:', error);
        setState({
          ...initialState,
          user: firebaseUser,
          loading: false,
          error: 'Không thể tải thông tin người dùng. Vui lòng thử lại.',
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
