import React, { useEffect, useState } from 'react';
import { useAuth } from '@/core/auth/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/core/firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/shared/utils/logger';

export const WelcomeOnboarding: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If profile already exists, no need to onboard
    if (profile) {
      navigate('/dashboard', { replace: true });
      return;
    }

    const initializeProfile = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, 'users', user.uid);
        
        await setDoc(userDocRef, {
          profile: {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split('@')[0] || 'User',
            avatar: user.photoURL || '',
            createdAt: serverTimestamp(),
          },
          subscription: {
            plan: 'free',
            status: 'active',
          },
          usage: {
            dailyScan: 0,
            monthlyScan: 0,
          },
          settings: {
            theme: 'system',
          }
        });

        // Redirect after a short delay for smooth UX
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 2000);

      } catch (err: any) {
        logger.error('Error creating user profile:', err);
        setError('Không thể khởi tạo không gian làm việc. Vui lòng tải lại trang.');
      }
    };

    initializeProfile();
  }, [user, profile, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-4 text-text">
          Xin chào, {user?.displayName || user?.email?.split('@')[0]}!
        </h1>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-text-muted mb-4">Đang chuẩn bị không gian làm việc của bạn...</p>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
