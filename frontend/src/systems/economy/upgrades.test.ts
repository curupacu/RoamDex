import { describe, expect, it } from 'vitest'
import type { SaveData } from '../../engine/save'
import { buyUpgrade, isUnlocked, ownedCount, totalClickBonus, totalCps, upgradeCost } from './upgrades'
import { UPGRADES } from '../../content/gen1/upgrades'

function makeSave(overrides: Partial<SaveData> = {}): SaveData {
  return { version: 2, candies: 0, lifetimeCandies: 0, lastSavedAt: 0, upgrades: {}, ...overrides }
}

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
    expect(isUnlocked(def, makeSave({ lifetimeCandies: def.unlockAt - 1 }))).toBe(false)
    expect(isUnlocked(def, makeSave({ lifetimeCandies: def.unlockAt }))).toBe(true)
  })
})

describe('buyUpgrade', () => {
  it('deducts the cost and increments the owned count when affordable', () => {
    const def = UPGRADES[0]
    const save = makeSave({ candies: def.baseCost })

    const result = buyUpgrade(save, def.id)

    expect(result.candies).toBe(0)
    expect(ownedCount(result, def.id)).toBe(1)
    // Spending must not touch the lifetime counter.
    expect(result.lifetimeCandies).toBe(save.lifetimeCandies)
  })

  it('is a no-op when the player cannot afford it', () => {
    const def = UPGRADES[0]
    const save = makeSave({ candies: def.baseCost - 1 })

    const result = buyUpgrade(save, def.id)

    expect(result).toEqual(save)
  })

  it('is a no-op for an unknown upgrade id', () => {
    const save = makeSave({ candies: 1_000_000 })
    expect(buyUpgrade(save, 'does-not-exist')).toEqual(save)
  })
})

describe('totalClickBonus / totalCps', () => {
  it('sums effect × owned across upgrades of each kind', () => {
    const clickDef = UPGRADES.find((u) => u.kind === 'click')!
    const cpsDef = UPGRADES.find((u) => u.kind === 'cps')!
    const save = makeSave({ upgrades: { [clickDef.id]: 3, [cpsDef.id]: 2 } })

    expect(totalClickBonus(save)).toBe(clickDef.effect * 3)
    expect(totalCps(save)).toBe(cpsDef.effect * 2)
  })
})
