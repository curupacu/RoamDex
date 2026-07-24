export const SAVE_KEY = 'pokeidle-save'
export const CURRENT_SAVE_VERSION = 3

export interface SaveDataV1 {
  version: 1
  candies: number
  lastSavedAt: number
}

export interface SaveDataV2 {
  version: 2
  candies: number
  // Total ever earned, never reduced by spending. Drives progressive
  // upgrade unlocks (Sprint 6) and will later drive gym gates (roadmap
  // section 8, "doces acumulados na run").
  lifetimeCandies: number
  lastSavedAt: number
  upgrades: Record<string, number>
}

export interface ActivePokemon {
  speciesId: number
  level: number
}

export interface SaveDataV3 {
  version: 3
  candies: number
  lifetimeCandies: number
  lastSavedAt: number
  upgrades: Record<string, number>
  // null = hasn't finished the new-game starter picker yet (Sprint 8).
  activePokemon: ActivePokemon | null
}

export type SaveData = SaveDataV3

// Unversioned data predates the save-version field. Treated as version 0
// so it still migrates instead of wiping the player's progress.
type LegacyUnversionedSave = { candies?: unknown }

// Each step only has to produce the *next* version's shape, not the final
// one — migrateSave() walks the chain until it reaches CURRENT_SAVE_VERSION.
type Migration = (old: unknown) => unknown

const migrations: Record<number, Migration> = {
  0: (old): SaveDataV1 => {
    const legacy = old as LegacyUnversionedSave
    return {
      version: 1,
      candies: typeof legacy.candies === 'number' ? legacy.candies : 0,
      lastSavedAt: Date.now(),
    }
  },
  1: (old): SaveDataV2 => {
    const v1 = old as SaveDataV1
    return {
      version: 2,
      candies: v1.candies,
      // Best-effort backfill: v1 had no lifetime counter, so assume
      // everything currently held was never spent.
      lifetimeCandies: v1.candies,
      lastSavedAt: v1.lastSavedAt,
      upgrades: {},
    }
  },
  2: (old): SaveDataV3 => {
    const v2 = old as SaveDataV2
    return {
      ...v2,
      version: 3,
      // Best-effort backfill: v2 always showed Bulbasaur lvl 5 as a
      // hardcoded placeholder, so keep that instead of bouncing existing
      // players into the new-game picker.
      activePokemon: { speciesId: 1, level: 5 },
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
  return {
    version: CURRENT_SAVE_VERSION,
    candies: 0,
    lifetimeCandies: 0,
    lastSavedAt: Date.now(),
    upgrades: {},
    activePokemon: null,
  }
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
