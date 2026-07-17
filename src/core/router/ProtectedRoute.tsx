import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/core/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: string[]; // e.g., ['pro', 'premium']
  requirePermission?: string; // e.g., 'pdf'
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireSubscription,
  requirePermission,
}) => {
  const { user, profile, subscription, permissions, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user exists but profile isn't loaded yet in Firestore, redirect to onboarding
  if (!profile && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  if (requireSubscription && subscription) {
    if (!requireSubscription.includes(subscription.plan) && subscription.plan !== 'owner') {
      return <Navigate to="/pricing" replace />;
    }
  }

  if (requirePermission && permissions) {
    if (!(permissions as any)[requirePermission] && subscription?.plan !== 'owner') {
      return <Navigate to="/pricing" replace />;
    }
  }

  return <>{children}</>;
};

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) return null;

  if (user && profile) {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (user && !profile) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
