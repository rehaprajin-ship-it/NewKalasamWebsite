/* ═══════════════════════════════════════════════════════════════
   Authentication Helpers — Lazy Firebase Init
   ═══════════════════════════════════════════════════════════════ */

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth } from './firebase';
import { saveUser } from './firestore';
import { ADMIN_EMAIL } from './constants';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  await saveUser(user.uid, {
    name: user.displayName || '',
    email: user.email,
    photoURL: user.photoURL || '',
    role: user.email === ADMIN_EMAIL ? 'admin' : 'user',
  });

  return user;
}

export async function signOut(): Promise<void> {
  const auth = getFirebaseAuth();
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}

export function isAdminUser(user: User | null): boolean {
  return user?.email === ADMIN_EMAIL;
}
