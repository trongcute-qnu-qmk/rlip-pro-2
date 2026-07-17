import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/core/firebase/auth';
import { logger } from '@/shared/utils/logger';

// Ánh xạ lỗi Firebase sang Tiếng Việt thân thiện
export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email hoặc mật khẩu không chính xác.';
    case 'auth/email-already-in-use':
      return 'Email này đã được đăng ký.';
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu (cần ít nhất 6 ký tự).';
    case 'auth/invalid-email':
      return 'Định dạng email không hợp lệ.';
    case 'auth/too-many-requests':
      return 'Bạn đã thử sai quá nhiều lần. Vui lòng thử lại sau.';
    case 'auth/network-request-failed':
      return 'Lỗi kết nối mạng. Vui lòng kiểm tra lại.';
    default:
      return 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.';
  }
};

const googleProvider = new GoogleAuthProvider();

export const authService = {
  loginWithGoogle: async (): Promise<User> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      logger.error('Google login error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  },

  loginWithEmail: async (email: string, password: string): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      logger.error('Email login error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  },

  registerWithEmail: async (email: string, password: string): Promise<User> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(result.user);
      return result.user;
    } catch (error: any) {
      logger.error('Registration error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await signOut(auth);
      logger.info('User logged out successfully');
    } catch (error: any) {
      logger.error('Logout error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  },

  resetPassword: async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      logger.error('Reset password error:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  }
};
