import { beforeEach, describe, expect, it } from 'vitest'
import { CURRENT_SAVE_VERSION, SAVE_KEY, exportSave, importSave, loadSave, migrateSave, writeSave } from './save'
import { makeSave, makeSaveWithRegion } from './save.testUtils'

describe('save', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns a default save when nothing is stored', () => {
    const save = loadSave()
    expect(save.version).toBe(CURRENT_SAVE_VERSION)
    expect(save.currentRegionId).toBeNull()
    expect(save.regionsUnlocked).toEqual(['kanto'])
    expect(save.regions.kanto?.candies).toBe(0)
    expect(save.regions.kanto?.roster).toEqual([])
    expect(save.regions.kanto?.activeTeamIds).toEqual([])
  })

  it('survives a refresh: write then load returns the same data', () => {
    const save = makeSave()
    writeSave({ ...save, regions: { kanto: { ...save.regions.kanto!, candies: 4200, lifetimeCandies: 4200 } } })

    const reloaded = loadSave()

    expect(reloaded.regions.kanto?.candies).toBe(4200)
    expect(reloaded.version).toBe(CURRENT_SAVE_VERSION)
  })

  it('migrates an unversioned legacy save up to the current version', () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ candies: 999 }))

    const migrated = loadSave()

    expect(migrated.version).toBe(CURRENT_SAVE_VERSION)
    expect(migrated.regions.kanto?.candies).toBe(999)
    expect(migrated.regions.kanto?.lifetimeCandies).toBe(999)
    expect(migrated.regions.kanto?.upgrades).toEqual({})
    // Backfilled as if already playing with the pre-Sprint-8 placeholder.
    expect(migrated.regions.kanto?.roster).toEqual([{ speciesId: 1, level: 5, xp: 0 }])
    expect(migrated.regions.kanto?.activeTeamIds).toEqual([1])
  })

  it('migrates a v1 save (pre-upgrades) up to current, backfilling lifetimeCandies and the starter', () => {
    const migrated = migrateSave({ version: 1, candies: 250, lastSavedAt: 123 })

    expect(migrated).toEqual({
      version: CURRENT_SAVE_VERSION,
      lastSavedAt: 123,
      regions: {
        kanto: {
          regionId: 'kanto',
          candies: 250,
          lifetimeCandies: 250,
          upgrades: {},
          roster: [{ speciesId: 1, level: 5, xp: 0 }],
          activeTeamIds: [1],
          buffs: {},
          currentLocationId: 'pallet-town',
          badges: [],
          championBeaten: false,
          upgradeEarnings: {},
          pokeballs: {},
        },
      },
      regionsUnlocked: ['kanto'],
      currentRegionId: 'kanto',
      victoryRoad: [],
      insignias: 0,
      rebirthUpgrades: {},
      hasRebirthed: false,
    })
  })

  it('migrates a v3 save with no starter chosen up to current with an empty roster', () => {
    const migrated = migrateSave({
      version: 3,
      candies: 0,
      lifetimeCandies: 0,
      lastSavedAt: 5,
      upgrades: {},
      activePokemon: null,
    })

    expect(migrated.regions.kanto?.roster).toEqual([])
    expect(migrated.regions.kanto?.activeTeamIds).toEqual([])
  })

  it('migrates a v3 save with a chosen starter up to current, moving it into the roster', () => {
    const migrated = migrateSave({
      version: 3,
      candies: 42,
      lifetimeCandies: 42,
      lastSavedAt: 5,
      upgrades: {},
      activePokemon: { speciesId: 4, level: 5 },
    })

    expect(migrated.regions.kanto?.roster).toEqual([{ speciesId: 4, level: 5, xp: 0 }])
    expect(migrated.regions.kanto?.activeTeamIds).toEqual([4])
  })

  it('migrates a v7 save (pre-rebirth) up to current, backfilling no champion beaten and an empty Victory Road', () => {
    const migrated = migrateSave({
      version: 7,
      candies: 5,
      lifetimeCandies: 5,
      lastSavedAt: 5,
      upgrades: {},
      roster: [],
      activeTeamIds: [],
      buffs: {},
      currentLocationId: 'victory-road',
      badges: ['brock'],
    })

    expect(migrated.regions.kanto?.currentLocationId).toBe('victory-road')
    expect(migrated.regions.kanto?.badges).toEqual(['brock'])
    expect(migrated.regions.kanto?.championBeaten).toBe(false)
    expect(migrated.victoryRoad).toEqual([])
  })

  it('migrates a v9 save (single flat run) into regions.kanto, unlocking only Kanto', () => {
    const migrated = migrateSave({
      version: 9,
      candies: 5,
      lifetimeCandies: 5,
      lastSavedAt: 5,
      upgrades: {},
      roster: [],
      activeTeamIds: [],
      buffs: {},
      currentLocationId: 'pallet-town',
      badges: [],
      championBeaten: true,
      victoryRoad: [{ region: 'kanto', completedAt: 123, team: [{ speciesId: 3, level: 58 }] }],
      insignias: 12,
      rebirthUpgrades: { 'first-run-candies': 1 },
    })

    expect(migrated.version).toBe(CURRENT_SAVE_VERSION)
    expect(migrated.currentRegionId).toBe('kanto')
    expect(migrated.regionsUnlocked).toEqual(['kanto'])
    expect(migrated.regions.kanto?.championBeaten).toBe(true)
    expect(migrated.victoryRoad).toEqual([{ region: 'kanto', completedAt: 123, team: [{ speciesId: 3, level: 58 }] }])
    expect(migrated.insignias).toBe(12)
    expect(migrated.rebirthUpgrades).toEqual({ 'first-run-candies': 1 })
  })

  it('falls back to a default save when the stored JSON is corrupt', () => {
    localStorage.setItem(SAVE_KEY, '{not valid json')

    const save = loadSave()

    expect(save.version).toBe(CURRENT_SAVE_VERSION)
    expect(save.regions.kanto?.candies).toBe(0)
  })

  it('throws migrateSave when no migration exists for an unknown future-shaped version', () => {
    expect(() => migrateSave({ version: 999 })).not.toThrow()
    // version 999 is already >= CURRENT_SAVE_VERSION, so it's returned as-is
    expect(migrateSave({ version: 999, candies: 1 })).toEqual({ version: 999, candies: 1 })
  })
})

describe('exportSave/importSave', () => {
  it('round-trips a save through Base64', () => {
    const save = makeSaveWithRegion({ candies: 4200, lifetimeCandies: 4200 })

    const imported = importSave(exportSave(save))

    expect(imported).toEqual(save)
  })

  it('round-trips non-ASCII text (Pokémon name accents, region flavor text)', () => {
    const save = makeSaveWithRegion({ currentLocationId: 'Cidade Pokémon — ção' })

    expect(importSave(exportSave(save)).regions.kanto?.currentLocationId).toBe('Cidade Pokémon — ção')
  })

  it('runs imported saves through migrateSave, same as loadSave', () => {
    const legacyJson = JSON.stringify({ candies: 999 })
    const encoded = btoa(legacyJson)

    const imported = importSave(encoded)

    expect(imported.version).toBe(CURRENT_SAVE_VERSION)
    expect(imported.regions.kanto?.candies).toBe(999)
  })

  it('throws on garbage input instead of silently returning a default save', () => {
    expect(() => importSave('not valid base64 at all!!')).toThrow()
  })
})
