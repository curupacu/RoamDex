import { describe, expect, it } from 'vitest'
import { makeRegionSave } from '../../engine/save.testUtils'
import { buyUpgrade, isUnlocked, nextLocked, ownedCount, totalClickBonus, totalCps, upgradeCost } from './upgrades'
import { UPGRADES } from '../../content/gen1/upgrades'
import { REGIONS } from '../../content/regions'

const kanto = REGIONS.kanto

describe('upgradeCost', () => {
  it('scales the base cost by 1.15^owned, rounded up', () => {
    const def = UPGRADES[0]
    expect(upgradeCost(def, 0)).toBe(def.baseCost)
    expect(upgradeCost(def, 1)).toBe(Math.ceil(def.baseCost * 1.15))
    expect(upgradeCost(def, 2)).toBe(Math.ceil(def.baseCost * 1.15 ** 2))
  })
})

describe('isUnlocked', () => {
  it('is locked below the unlock threshold and unlocked at/above it', () => {
    const def = UPGRADES.find((u) => u.unlockAt > 0)!
    expect(isUnlocked(def, makeRegionSave({ lifetimeCandies: def.unlockAt - 1 }))).toBe(false)
    expect(isUnlocked(def, makeRegionSave({ lifetimeCandies: def.unlockAt }))).toBe(true)
  })
})

describe('nextLocked', () => {
  it('returns the cheapest-to-unlock upgrade still locked, among a given kind', () => {
    const clickDefs = UPGRADES.filter((u) => u.kind === 'click')
    const save = makeRegionSave({ lifetimeCandies: 0 })

    const locked = nextLocked(clickDefs, save)

    expect(locked?.unlockAt).toBe(Math.min(...clickDefs.filter((d) => d.unlockAt > 0).map((d) => d.unlockAt)))
  })

  it('returns undefined once everything in the list is unlocked', () => {
    const clickDefs = UPGRADES.filter((u) => u.kind === 'click')
    const save = makeRegionSave({ lifetimeCandies: Number.MAX_SAFE_INTEGER })

    expect(nextLocked(clickDefs, save)).toBeUndefined()
  })
})

describe('buyUpgrade', () => {
  it('deducts the cost and increments the owned count when affordable', () => {
    const def = UPGRADES[0]
    const save = makeRegionSave({ candies: def.baseCost })

    const result = buyUpgrade(kanto, save, def.id)

    expect(result.candies).toBe(0)
    expect(ownedCount(result, def.id)).toBe(1)
    // Spending must not touch the lifetime counter.
    expect(result.lifetimeCandies).toBe(save.lifetimeCandies)
  })

  it('is a no-op when the player cannot afford it', () => {
    const def = UPGRADES[0]
    const save = makeRegionSave({ candies: def.baseCost - 1 })

    const result = buyUpgrade(kanto, save, def.id)

    expect(result).toEqual(save)
  })

  it('is a no-op for an unknown upgrade id', () => {
    const save = makeRegionSave({ candies: 1_000_000 })
    expect(buyUpgrade(kanto, save, 'does-not-exist')).toEqual(save)
  })
})

describe('totalClickBonus / totalCps', () => {
  it('sums effect × owned across upgrades of each kind', () => {
    const clickDef = UPGRADES.find((u) => u.kind === 'click' && u.maxPurchases === undefined)!
    const cpsDef = UPGRADES.find((u) => u.kind === 'cps' && u.maxPurchases === undefined)!
    const save = makeRegionSave({ upgrades: { [clickDef.id]: 3, [cpsDef.id]: 2 } })

    expect(totalClickBonus(kanto, save)).toBe(clickDef.effect * 3)
    expect(totalCps(kanto, save)).toBe(cpsDef.effect * 2)
  })
})

// "Cadeia de tier" (decisão 0026): one-time-purchase upgrades, the last of
// which scales with roster size instead of a flat per-copy amount.
describe('tier-chain upgrades (maxPurchases + scalesWith)', () => {
  it('cannot be bought again once maxPurchases is reached', () => {
    const def = UPGRADES.find((u) => u.maxPurchases === 1)!
    const save = makeRegionSave({ candies: 10_000_000, upgrades: { [def.id]: 1 } })

    const result = buyUpgrade(kanto, save, def.id)

    expect(result).toEqual(save)
  })

  it('a scalesWith upgrade contributes effect × roster size once owned', () => {
    const def = UPGRADES.find((u) => u.scalesWith === 'rosterSize' && u.kind === 'click')!
    const roster = [
      { speciesId: 1, level: 5, xp: 0 },
      { speciesId: 4, level: 5, xp: 0 },
      { speciesId: 7, level: 5, xp: 0 },
    ]
    const save = makeRegionSave({ upgrades: { [def.id]: 1 }, roster })

    expect(totalClickBonus(kanto, save)).toBe(def.effect * roster.length)
  })

  it('a scalesWith upgrade contributes nothing before being bought', () => {
    const save = makeRegionSave({ roster: [{ speciesId: 1, level: 5, xp: 0 }] })

    expect(totalClickBonus(kanto, save)).toBe(0)
  })
})
