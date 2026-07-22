export const SAVE_KEY = 'pokeidle-save'
export const CURRENT_SAVE_VERSION = 1

export interface SaveDataV1 {
  version: 1
  candies: number
  lastSavedAt: number
}

export type SaveData = SaveDataV1

// Unversioned data predates the save-version field. Treated as version 0
// so it still migrates instead of wiping the player's progress.
type LegacyUnversionedSave = { candies?: unknown }

type Migration = (old: unknown) => SaveData

const migrations: Record<number, Migration> = {
  0: (old) => {
    const legacy = old as LegacyUnversionedSave
    return {
      version: 1,
      candies: typeof legacy.candies === 'number' ? legacy.candies : 0,
      lastSavedAt: Date.now(),
    }
  },
}

function detectVersion(raw: unknown): number {
  if (typeof raw === 'object' && raw !== null && 'version' in raw) {
    const version = (raw as { version: unknown }).version
    if (typeof version === 'number') return version
  }
  return 0
}

export function createDefaultSave(): SaveData {
  return { version: CURRENT_SAVE_VERSION, candies: 0, lastSavedAt: Date.now() }
}

export function migrateSave(raw: unknown): SaveData {
  let version = detectVersion(raw)
  let data: unknown = raw

  while (version < CURRENT_SAVE_VERSION) {
    const migrate = migrations[version]
    if (!migrate) throw new Error(`no migration registered from save version ${version}`)
    data = migrate(data)
    version = detectVersion(data)
  }

  return data as SaveData
}

export function loadSave(): SaveData {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return createDefaultSave()

  try {
    return migrateSave(JSON.parse(raw))
  } catch {
    return createDefaultSave()
  }
}

export function writeSave(data: SaveData): void {
  const toStore: SaveData = { ...data, lastSavedAt: Date.now() }
  localStorage.setItem(SAVE_KEY, JSON.stringify(toStore))
}
