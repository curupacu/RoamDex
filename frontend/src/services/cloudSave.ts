import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import type { SaveData } from '../engine/save'
import { db } from './firebase'

const MAX_BACKUPS = 3

// A timestamp gap above this is treated as a real conflict (played in two
// places without syncing), not just "the cloud is a bit behind".
const CONFLICT_THRESHOLD_MS = 60_000

function saveDocRef(uid: string) {
  return doc(db, 'saves', uid)
}

function backupsCollectionRef(uid: string) {
  return collection(db, 'saves', uid, 'backups')
}

export async function fetchCloudSave(uid: string): Promise<SaveData | null> {
  const snapshot = await getDoc(saveDocRef(uid))
  return snapshot.exists() ? (snapshot.data() as SaveData) : null
}

export async function pushCloudSave(uid: string, save: SaveData): Promise<void> {
  await setDoc(saveDocRef(uid), save)
  await pushBackup(uid, save)
}

async function pushBackup(uid: string, save: SaveData): Promise<void> {
  await addDoc(backupsCollectionRef(uid), save)

  const existing = await getDocs(query(backupsCollectionRef(uid), orderBy('lastSavedAt', 'desc')))
  const excess = existing.docs.slice(MAX_BACKUPS)
  await Promise.all(excess.map((backupDoc) => deleteDoc(backupDoc.ref)))
}

export type SyncResolution =
  | { kind: 'use-local' }
  | { kind: 'use-cloud'; cloud: SaveData }
  | { kind: 'conflict'; local: SaveData; cloud: SaveData }

// Roadmap rule: "latest write wins" when the gap is small; diverges a lot ->
// let the player choose (the UI decides what to do with 'conflict').
export function resolveSync(local: SaveData, cloud: SaveData | null): SyncResolution {
  if (!cloud) return { kind: 'use-local' }

  const delta = local.lastSavedAt - cloud.lastSavedAt
  if (Math.abs(delta) <= CONFLICT_THRESHOLD_MS) {
    return delta >= 0 ? { kind: 'use-local' } : { kind: 'use-cloud', cloud }
  }
  return { kind: 'conflict', local, cloud }
}
