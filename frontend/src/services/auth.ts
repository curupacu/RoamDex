import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from 'firebase/auth'
import { auth } from './firebase'

// Local-first: the game never waits on this to run. We only use the uid once
// it resolves, to sync with Firestore in the background.
export function ensureSignedIn(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        if (user) {
          resolve(user)
          return
        }
        signInAnonymously(auth)
          .then((credential) => resolve(credential.user))
          .catch(reject)
      },
      reject,
    )
  })
}

// The 3 choices on the login gate (docs/decisoes/00NN-multi-regiao-e-login.md)
// — a fresh sign-in each, not an upgrade of an existing session. Firebase
// persists whichever one the player picks, so returning players never see
// the login screen again (onAuthStateChanged just resolves to the same user).
export function signInWithGoogle(): Promise<User> {
  return signInWithPopup(auth, new GoogleAuthProvider()).then((credential) => credential.user)
}

export function signUpWithEmail(email: string, password: string): Promise<User> {
  return createUserWithEmailAndPassword(auth, email, password).then((credential) => credential.user)
}

export function signInWithEmail(email: string, password: string): Promise<User> {
  return signInWithEmailAndPassword(auth, email, password).then((credential) => credential.user)
}

export function signInAsGuest(): Promise<User> {
  return signInAnonymously(auth).then((credential) => credential.user)
}

// Upgrades an anonymous account to Google, preserving the same uid (and
// therefore the same save doc) — reserved for a future "vincular conta"
// entry point from within the game, not used by the login gate itself.
export function linkWithGoogle(): Promise<User> {
  if (!auth.currentUser) return Promise.reject(new Error('no signed-in user to link'))
  return linkWithPopup(auth.currentUser, new GoogleAuthProvider()).then((credential) => credential.user)
}
