import {
  GoogleAuthProvider,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
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

// Upgrades an anonymous account to Google, preserving the same uid (and
// therefore the same save doc) — this is how the save "moves across devices".
export function linkWithGoogle(): Promise<User> {
  if (!auth.currentUser) return Promise.reject(new Error('no signed-in user to link'))
  return linkWithPopup(auth.currentUser, new GoogleAuthProvider()).then((credential) => credential.user)
}
