import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { env } from '@/config/env';

const firebaseConfig = env.firebase;

// Singleton initialization
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check to reduce abuse (requires ReCaptcha site key)
if (typeof window !== 'undefined' && env.recaptchaSiteKey) {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(env.recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true
    });
  } catch (error) {
    console.error('AppCheck init error:', error);
  }
}
