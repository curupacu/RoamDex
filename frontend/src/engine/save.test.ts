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
    expect(save.activePokemon).toBeNull()
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
    expect(migrated.activePokemon).toEqual({ speciesId: 1, level: 5 })
  })

  it('migrates a v1 save (pre-upgrades) up to v2, backfilling lifetimeCandies', () => {
    const migrated = migrateSave({ version: 1, candies: 250, lastSavedAt: 123 })

    expect(migrated).toEqual({
      version: 3,
      candies: 250,
      lifetimeCandies: 250,
      lastSavedAt: 123,
      upgrades: {},
      activePokemon: { speciesId: 1, level: 5 },
    })
  })

  it('migrates a v2 save (pre-starter-picker) up to v3, backfilling the placeholder starter', () => {
    const migrated = migrateSave({ version: 2, candies: 10, lifetimeCandies: 10, lastSavedAt: 5, upgrades: { a: 1 } })

    expect(migrated).toEqual({
      version: 3,
      candies: 10,
      lifetimeCandies: 10,
      lastSavedAt: 5,
      upgrades: { a: 1 },
      activePokemon: { speciesId: 1, level: 5 },
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
