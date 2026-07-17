import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { app } from './firebase';
import { logger } from '@/shared/utils/logger';

export const auth = getAuth(app);

// Enable local persistence immediately as requested
setPersistence(auth, browserLocalPersistence).catch((error) => {
  logger.error('Auth persistence error:', error);
});
