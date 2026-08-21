/* ═══════════════════════════════════════════════════════════════
   Authentication Helpers — Firebase Google Auth
   Desktop: signInWithPopup (fast, seamless)
   Mobile:  signInWithRedirect (reliable on mobile browsers)
   In-app WebViews: Blocked by Google — show user guidance
   ═══════════════════════════════════════════════════════════════ */

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth } from './firebase';
import { saveUser } from './firestore';
import { ADMIN_EMAIL } from './constants';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/* ── In-App Browser Detection ────────────────────────────────── */

/**
 * Detects if the user is in an in-app browser (WebView) where
 * Google OAuth is explicitly blocked by Google's policy.
 * Returns the name of the app if detected, or null if safe.
 */
export function detectInAppBrowser(): string | null {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent || '';

  // WhatsApp in-app browser
  if (/WhatsApp/i.test(ua)) return 'WhatsApp';
  // Facebook in-app browser (FBAN = Facebook App Name, FBAV = Facebook App Version)
  if (/FBAN|FBAV/i.test(ua)) return 'Facebook';
  // Instagram in-app browser
  if (/Instagram/i.test(ua)) return 'Instagram';
  // LinkedIn in-app browser
  if (/LinkedInApp/i.test(ua)) return 'LinkedIn';
  // Twitter/X in-app browser
  if (/Twitter/i.test(ua)) return 'Twitter';
  // Snapchat in-app browser
  if (/Snapchat/i.test(ua)) return 'Snapchat';
  // Line in-app browser
  if (/Line\//i.test(ua)) return 'Line';
  // Telegram in-app browser
  if (/TelegramBot/i.test(ua)) return 'Telegram';
  // Generic WebView detection (Android)
  if (/wv\)/.test(ua) && /Android/.test(ua)) return 'App';
  // iOS WebView (UIWebView / WKWebView without Safari in UA)
  if (/iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua)) return 'App';

  return null;
}

/* ── Mobile Detection ────────────────────────────────────────── */

function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/* ── Sign In ─────────────────────────────────────────────────── */

export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();

  // Check for in-app browser FIRST — Google blocks OAuth in WebViews
  const inAppSource = detectInAppBrowser();
  if (inAppSource) {
    throw new Error(
      `IN_APP_BROWSER:${inAppSource}`
    );
  }

  // First try signInWithPopup on all devices (mobile browsers handle popups well on direct tap events,
  // avoiding third-party cookie/storage partition issues with redirect on iOS Safari and Chrome Android)
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    try {
      await saveUser(user.uid, {
        name: user.displayName || '',
        email: user.email,
        photoURL: user.photoURL || '',
        role: user.email === ADMIN_EMAIL ? 'admin' : 'user',
      });
    } catch (saveErr) {
      console.warn('Could not save user profile to firestore:', saveErr);
    }

    return user;
  } catch (popupError: any) {
    // If popup was blocked or not supported on this device, fallback to redirect
    if (
      popupError?.code === 'auth/popup-blocked' ||
      popupError?.code === 'auth/cancelled-popup-request' ||
      popupError?.code === 'auth/operation-not-supported-in-this-environment' ||
      isMobileDevice()
    ) {
      if (popupError?.code === 'auth/popup-closed-by-user') {
        // User intentionally closed popup
        throw popupError;
      }
      console.info('Popup fallback: initiating signInWithRedirect...');
      await signInWithRedirect(auth, googleProvider);
      throw new Error('REDIRECT_IN_PROGRESS');
    }

    throw popupError;
  }
}

/* ── Handle Redirect Result (call on page load) ──────────────── */

export async function handleRedirectResult(): Promise<User | null> {
  const auth = getFirebaseAuth();

  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      const user = result.user;
      await saveUser(user.uid, {
        name: user.displayName || '',
        email: user.email,
        photoURL: user.photoURL || '',
        role: user.email === ADMIN_EMAIL ? 'admin' : 'user',
      });
      return user;
    }
  } catch (error: any) {
    // Log but don't throw — redirect result is checked on every page load,
    // and will return null when there's no pending redirect
    console.warn('Firebase redirect result error:', error?.code || error?.message);
  }

  return null;
}

/* ── Sign Out ────────────────────────────────────────────────── */

export async function signOut(): Promise<void> {
  const auth = getFirebaseAuth();
  await firebaseSignOut(auth);
}

/* ── Auth State Listener ─────────────────────────────────────── */

export function onAuthChange(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}

/* ── Admin Check ─────────────────────────────────────────────── */

export function isAdminUser(user: User | null): boolean {
  return user?.email === ADMIN_EMAIL;
}
