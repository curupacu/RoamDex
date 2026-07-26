export const SAVE_KEY = 'pokeidle-save'
export const CURRENT_SAVE_VERSION = 11

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

export interface RosterMemberV4 {
  speciesId: number
  level: number
}

export interface SaveDataV4 {
  version: 4
  candies: number
  lifetimeCandies: number
  lastSavedAt: number
  upgrades: Record<string, number>
  // Every species ever obtained (today: only ever the chosen starter,
  // until Sprint 19 adds capturing). Empty = hasn't finished the
  // new-game starter picker yet (Sprint 8).
  roster: RosterMemberV4[]
  // Up to 6 speciesIds from roster; index 0 is the one you click/battle
  // with (roadmap section 4, "1v1 com troca").
  activeTeamIds: number[]
}

export interface RosterMember {
  speciesId: number
  level: number
  // Progress toward xpForNextLevel(level) — see systems/team/leveling.ts.
  xp: number
}

export interface SaveDataV5 {
  version: 5
  candies: number
  lifetimeCandies: number
  lastSavedAt: number
  upgrades: Record<string, number>
  roster: RosterMember[]
  activeTeamIds: number[]
}

export interface SaveDataV6 {
  version: 6
  candies: number
  lifetimeCandies: number
  lastSavedAt: number
  upgrades: Record<string, number>
  roster: RosterMember[]
  activeTeamIds: number[]
  // buffId -> expiry timestamp (ms). Candy Shop temporary buffs
  // (Sprint 12) — timestamp-based like everything else (CLAUDE.md rule 4),
  // so "still active?" is just `buffs[id] > Date.now()`.
  buffs: Record<string, number>
}

export interface SaveDataV7 {
  version: 7
  candies: number
  lifetimeCandies: number
  lastSavedAt: number
  upgrades: Record<string, number>
  roster: RosterMember[]
  activeTeamIds: number[]
  buffs: Record<string, number>
  // Kanto location id the player is standing at — see
  // systems/gyms/locations.ts. Hardcoded starting id instead of importing
  // content/gen1/locations.ts, so engine/ doesn't depend on content/.
  currentLocationId: string
  // Gym ids beaten so far (content/gen1/gyms.ts) — the "trilha" of
  // routes/gyms from roadmap section 8 / Sprint 20.
  badges: string[]
}

// Snapshot of the team that beat a region's Elite Four + Champion, taken at
// the moment of that win (roadmap section 1, "Victory Road"). Read-only hall
// of fame — nothing in the game reads these back into a battle yet (that's
// Fase 6, raids).
export interface VictoryRoadEntry {
  region: string
  completedAt: number
  team: { speciesId: number; level: number }[]
}

export interface SaveDataV8 {
  version: 8
  candies: number
  lifetimeCandies: number
  lastSavedAt: number
  upgrades: Record<string, number>
  roster: RosterMember[]
  activeTeamIds: number[]
  buffs: Record<string, number>
  currentLocationId: string
  badges: string[]
  // Set true the moment the Champion falls, before rebirth resets anything
  // else — the run keeps going (farm, explore) until the player chooses to
  // press rebirth (roadmap section 8: "o jogador escolhe quando apertar").
  championBeaten: boolean
  victoryRoad: VictoryRoadEntry[]
}

export interface SaveDataV9 {
  version: 9
  candies: number
  lifetimeCandies: number
  lastSavedAt: number
  upgrades: Record<string, number>
  roster: RosterMember[]
  activeTeamIds: number[]
  buffs: Record<string, number>
  currentLocationId: string
  badges: string[]
  championBeaten: boolean
  victoryRoad: VictoryRoadEntry[]
  // Loja de Rebirth currency (roadmap section 9) — never resets, earned on
  // rebirth from systems/rebirth/rebirth.ts's insigniasEarned().
  insignias: number
  // Rebirth Shop upgrade levels (content/rebirthShop.ts) — permanent, unlike
  // `upgrades` above which is the run-scoped Sprint 6 shop and resets.
  rebirthUpgrades: Record<string, number>
}

// Regions as parallel save slots (docs/decisoes/00NN-multi-regiao-e-login.md):
// only content/regions.ts knows what a RegionId actually contains — engine/
// stays content-agnostic, same rule that already kept 'pallet-town' a plain
// string literal instead of an import.
export type RegionId = 'kanto'

// Everything that resets on THAT region's rebirth. One run's worth of
// progress — a player with two unlocked regions has two of these, entirely
// independent (own roster, own Pokédex-via-roster, own badges).
export interface RegionSave {
  regionId: RegionId
  candies: number
  lifetimeCandies: number
  upgrades: Record<string, number>
  roster: RosterMember[]
  activeTeamIds: number[]
  buffs: Record<string, number>
  currentLocationId: string
  badges: string[]
  championBeaten: boolean
}

export interface SaveDataV10 {
  version: 10
  lastSavedAt: number
  regions: Partial<Record<RegionId, RegionSave>>
  // Always includes 'kanto'. A region unlocks the moment its predecessor's
  // Champion falls (systems/rebirth/rebirth.ts's unlockNextRegion) —
  // independent of whether the player ever rebirths that predecessor.
  regionsUnlocked: RegionId[]
  // null = show the region-select hub instead of the game.
  currentRegionId: RegionId | null
  // Global, never resets by any single region's rebirth (already true pre-v10).
  victoryRoad: VictoryRoadEntry[]
  insignias: number
  rebirthUpgrades: Record<string, number>
}

export interface SaveDataV11 extends Omit<SaveDataV10, 'version'> {
  version: 11
  // True the moment the player's first rebirth (any region) completes —
  // gates the "Loja de Rebirth" nav button so it doesn't show up before
  // there's anything to spend there (docs/decisoes/0023-nav-gates.md).
  // victoryRoad.length > 0 does the equivalent gating for "Victory Road".
  hasRebirthed: boolean
}

export type SaveData = SaveDataV11

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
  3: (old): SaveDataV4 => {
    const v3 = old as SaveDataV3
    const roster = v3.activePokemon ? [v3.activePokemon] : []
    return {
      version: 4,
      candies: v3.candies,
      lifetimeCandies: v3.lifetimeCandies,
      lastSavedAt: v3.lastSavedAt,
      upgrades: v3.upgrades,
      roster,
      activeTeamIds: roster.map((member) => member.speciesId),
    }
  },
  4: (old): SaveDataV5 => {
    const v4 = old as SaveDataV4
    return {
      ...v4,
      version: 5,
      // Best-effort backfill: v4 had no XP tracking, so start everyone at
      // 0 progress toward their next level instead of guessing.
      roster: v4.roster.map((member) => ({ ...member, xp: 0 })),
    }
  },
  5: (old): SaveDataV6 => {
    const v5 = old as SaveDataV5
    return { ...v5, version: 6, buffs: {} }
  },
  6: (old): SaveDataV7 => {
    const v6 = old as SaveDataV6
    return { ...v6, version: 7, currentLocationId: 'pallet-town', badges: [] }
  },
  7: (old): SaveDataV8 => {
    const v7 = old as SaveDataV7
    return { ...v7, version: 8, championBeaten: false, victoryRoad: [] }
  },
  8: (old): SaveDataV9 => {
    const v8 = old as SaveDataV8
    return { ...v8, version: 9, insignias: 0, rebirthUpgrades: {} }
  },
  9: (old): SaveDataV10 => {
    const v9 = old as SaveDataV9
    const kantoSave: RegionSave = {
      regionId: 'kanto',
      candies: v9.candies,
      lifetimeCandies: v9.lifetimeCandies,
      upgrades: v9.upgrades,
      roster: v9.roster,
      activeTeamIds: v9.activeTeamIds,
      buffs: v9.buffs,
      currentLocationId: v9.currentLocationId,
      badges: v9.badges,
      championBeaten: v9.championBeaten,
    }
    return {
      version: 10,
      lastSavedAt: v9.lastSavedAt,
      regions: { kanto: kantoSave },
      regionsUnlocked: ['kanto'],
      // An existing player only ever had Kanto — land them straight back in
      // it, same as before, instead of adding a region-select click for
      // something that isn't a real choice yet.
      currentRegionId: 'kanto',
      victoryRoad: v9.victoryRoad,
      insignias: v9.insignias,
      rebirthUpgrades: v9.rebirthUpgrades,
    }
  },
  10: (old): SaveDataV11 => {
    const v10 = old as SaveDataV10
    return {
      ...v10,
      version: 11,
      // Best-effort backfill: insignias only ever come from a completed
      // rebirth (or the admin panel) — if the player already has some,
      // treat them as having rebirthed before so the shop button doesn't
      // vanish on existing saves that already unlocked it.
      hasRebirthed: v10.insignias > 0,
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

// Fresh region, never played — used for both a brand-new save's starting
// region and for lazily creating a save slot the first time the player
// enters a newly-unlocked region from the select screen.
export function emptyRegionSave(regionId: RegionId, startLocationId: string): RegionSave {
  return {
    regionId,
    candies: 0,
    lifetimeCandies: 0,
    upgrades: {},
    roster: [],
    activeTeamIds: [],
    buffs: {},
    currentLocationId: startLocationId,
    badges: [],
    championBeaten: false,
  }
}

export function createDefaultSave(): SaveData {
  return {
    version: CURRENT_SAVE_VERSION,
    lastSavedAt: Date.now(),
    regions: { kanto: emptyRegionSave('kanto', 'pallet-town') },
    regionsUnlocked: ['kanto'],
    currentRegionId: 'kanto',
    victoryRoad: [],
    insignias: 0,
    rebirthUpgrades: {},
    hasRebirthed: false,
  }
}

// The region currently being played. Throws on a corrupt/missing slot for
// currentRegionId instead of silently faking one — callers only ever read
// this once a region gate (App.tsx) has already confirmed it exists.
export function currentRegion(save: SaveData): RegionSave {
  const region = save.currentRegionId ? save.regions[save.currentRegionId] : undefined
  if (!region) throw new Error(`no region save for ${save.currentRegionId}`)
  return region
}

export function withRegion(save: SaveData, region: RegionSave): SaveData {
  return { ...save, regions: { ...save.regions, [region.regionId]: region } }
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
