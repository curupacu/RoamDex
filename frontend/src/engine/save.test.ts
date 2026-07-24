import { beforeEach, describe, expect, it } from 'vitest'
import { CURRENT_SAVE_VERSION, SAVE_KEY, loadSave, migrateSave, writeSave } from './save'
import { makeSave } from './save.testUtils'

describe('save', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns a default save when nothing is stored', () => {
    const save = loadSave()
    expect(save.version).toBe(CURRENT_SAVE_VERSION)
    expect(save.candies).toBe(0)
    expect(save.roster).toEqual([])
    expect(save.activeTeamIds).toEqual([])
  })

  it('survives a refresh: write then load returns the same data', () => {
    writeSave(makeSave({ candies: 4200, lifetimeCandies: 4200 }))

    const reloaded = loadSave()

    expect(reloaded.candies).toBe(4200)
    expect(reloaded.version).toBe(CURRENT_SAVE_VERSION)
  })

  it('migrates an unversioned legacy save up to the current version', () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ candies: 999 }))

    const migrated = loadSave()

    expect(migrated.version).toBe(CURRENT_SAVE_VERSION)
    expect(migrated.candies).toBe(999)
    expect(migrated.lifetimeCandies).toBe(999)
    expect(migrated.upgrades).toEqual({})
    // Backfilled as if already playing with the pre-Sprint-8 placeholder.
    expect(migrated.roster).toEqual([{ speciesId: 1, level: 5, xp: 0 }])
    expect(migrated.activeTeamIds).toEqual([1])
  })

  it('migrates a v1 save (pre-upgrades) up to v6, backfilling lifetimeCandies and the starter', () => {
    const migrated = migrateSave({ version: 1, candies: 250, lastSavedAt: 123 })

    expect(migrated).toEqual({
      version: 6,
      candies: 250,
      lifetimeCandies: 250,
      lastSavedAt: 123,
      upgrades: {},
      roster: [{ speciesId: 1, level: 5, xp: 0 }],
      activeTeamIds: [1],
      buffs: {},
    })
  })

  it('migrates a v2 save (pre-starter-picker) up to v6, backfilling the placeholder starter', () => {
    const migrated = migrateSave({ version: 2, candies: 10, lifetimeCandies: 10, lastSavedAt: 5, upgrades: { a: 1 } })

    expect(migrated).toEqual({
      version: 6,
      candies: 10,
      lifetimeCandies: 10,
      lastSavedAt: 5,
      upgrades: { a: 1 },
      roster: [{ speciesId: 1, level: 5, xp: 0 }],
      activeTeamIds: [1],
      buffs: {},
    })
  })

  it('migrates a v3 save with no starter chosen up to v6 with an empty roster', () => {
    const migrated = migrateSave({
      version: 3,
      candies: 0,
      lifetimeCandies: 0,
      lastSavedAt: 5,
      upgrades: {},
      activePokemon: null,
    })

    expect(migrated.roster).toEqual([])
    expect(migrated.activeTeamIds).toEqual([])
  })

  it('migrates a v3 save with a chosen starter up to v6, moving it into the roster', () => {
    const migrated = migrateSave({
      version: 3,
      candies: 42,
      lifetimeCandies: 42,
      lastSavedAt: 5,
      upgrades: {},
      activePokemon: { speciesId: 4, level: 5 },
    })

    expect(migrated).toEqual({
      version: 6,
      candies: 42,
      lifetimeCandies: 42,
      lastSavedAt: 5,
      upgrades: {},
      roster: [{ speciesId: 4, level: 5, xp: 0 }],
      activeTeamIds: [4],
      buffs: {},
    })
  })

  it('migrates a v4 save (pre-XP) up to v6, backfilling xp for every roster member', () => {
    const migrated = migrateSave({
      version: 4,
      candies: 5,
      lifetimeCandies: 5,
      lastSavedAt: 5,
      upgrades: {},
      roster: [{ speciesId: 1, level: 8 }],
      activeTeamIds: [1],
    })

    expect(migrated).toEqual({
      version: 6,
      candies: 5,
      lifetimeCandies: 5,
      lastSavedAt: 5,
      upgrades: {},
      roster: [{ speciesId: 1, level: 8, xp: 0 }],
      activeTeamIds: [1],
      buffs: {},
    })
  })

  it('migrates a v5 save (pre-buffs) up to v6, backfilling an empty buffs map', () => {
    const migrated = migrateSave({
      version: 5,
      candies: 5,
      lifetimeCandies: 5,
      lastSavedAt: 5,
      upgrades: {},
      roster: [],
      activeTeamIds: [],
    })

    expect(migrated).toEqual({
      version: 6,
      candies: 5,
      lifetimeCandies: 5,
      lastSavedAt: 5,
      upgrades: {},
      roster: [],
      activeTeamIds: [],
      buffs: {},
    })
  })

  it('falls back to a default save when the stored JSON is corrupt', () => {
    localStorage.setItem(SAVE_KEY, '{not valid json')

    const save = loadSave()

    expect(save.version).toBe(CURRENT_SAVE_VERSION)
    expect(save.candies).toBe(0)
  })

  it('throws migrateSave when no migration exists for an unknown future-shaped version', () => {
    expect(() => migrateSave({ version: 999 })).not.toThrow()
    // version 999 is already >= CURRENT_SAVE_VERSION, so it's returned as-is
    expect(migrateSave({ version: 999, candies: 1 })).toEqual({ version: 999, candies: 1 })
  })
})
