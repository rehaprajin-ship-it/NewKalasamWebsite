'use client';

/* ═══════════════════════════════════════════════════════════════
   Auth Provider — Firebase Google Authentication
   Handles popup (desktop), redirect (mobile), and in-app browser detection
   ═══════════════════════════════════════════════════════════════ */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type User } from 'firebase/auth';
import { signInWithGoogle, signOut, onAuthChange, isAdminUser, handleRedirectResult, detectInAppBrowser } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  /** Error message from the last login attempt */
  loginError: string | null;
  /** Name of the in-app browser if detected (e.g. 'WhatsApp') */
  inAppBrowser: string | null;
  /** Clear any login error */
  clearLoginError: () => void;
  login: () => Promise<User | void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  loginError: null,
  inAppBrowser: null,
  clearLoginError: () => {},
  login: async () => { throw new Error('AuthProvider not mounted'); },
  logout: async () => {},
});

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [inAppBrowser, setInAppBrowser] = useState<string | null>(null);

  // Check for in-app browser on mount
  useEffect(() => {
    const detected = detectInAppBrowser();
    if (detected) {
      setInAppBrowser(detected);
    }
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handle redirect result on page load (for mobile signInWithRedirect)
  useEffect(() => {
    handleRedirectResult()
      .then((redirectUser) => {
        if (redirectUser) {
          setUser(redirectUser);
          setLoginError(null);
        }
      })
      .catch((err) => {
        console.warn('Redirect result handling error:', err);
      });
  }, []);

  const clearLoginError = useCallback(() => setLoginError(null), []);

  const login = useCallback(async () => {
    setLoginError(null);

    try {
      const u = await signInWithGoogle();
      return u;
    } catch (error: any) {
      const message = error?.message || '';

      // In-app browser detection
      if (message.startsWith('IN_APP_BROWSER:')) {
        const appName = message.split(':')[1] || 'this app';
        setLoginError(
          `Google sign-in is not supported inside ${appName}'s built-in browser. ` +
          `Please tap the ⋯ menu (top-right) and choose "Open in Browser" to sign in.`
        );
        return;
      }

      // Redirect in progress — not an error, user will be sent to Google
      if (message === 'REDIRECT_IN_PROGRESS') {
        return;
      }

      // Google's disallowed_useragent error (fallback for undetected WebViews)
      if (error?.code === 'auth/disallowed-useragent' || error?.code === 'auth/operation-not-supported-in-this-environment') {
        setLoginError(
          'Google sign-in is blocked in this browser. ' +
          'Please open this page in Chrome, Safari, or your default browser to sign in.'
        );
        return;
      }

      // Popup blocked
      if (error?.code === 'auth/popup-blocked') {
        setLoginError(
          'The sign-in popup was blocked by your browser. ' +
          'Please allow popups for this site or try again.'
        );
        return;
      }

      // Popup closed by user (not really an error)
      if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
        return; // Silent — user intentionally cancelled
      }

      // Network error
      if (error?.code === 'auth/network-request-failed') {
        setLoginError('Network error. Please check your internet connection and try again.');
        return;
      }

      // Generic fallback
      setLoginError('Sign-in failed. Please try again or use a different browser.');
      console.error('Login error:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoginError(null);
    await signOut();
  }, []);

  const isAdmin = isAdminUser(user);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, loginError, inAppBrowser, clearLoginError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
