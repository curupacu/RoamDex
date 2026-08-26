import { describe, expect, it } from 'vitest'
import { makeRegionSave } from '../../engine/save.testUtils'
import {
  buildingBoostMultiplier,
  buyUpgrade,
  globalMultiplierBonus,
  isUnlocked,
  nextLocked,
  ownedCount,
  totalClickBonus,
  totalCps,
  upgradeCost,
} from './upgrades'
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

// Padrão 4 (marco global por insígnias): gated by save.badges.length, not
// by lifetimeCandies — separate from the unlockAt check above.
describe('requiresBadges (Padrão 4, marco global)', () => {
  it('stays locked below the badge threshold even with unlockAt satisfied', () => {
    const def = UPGRADES.find((u) => u.requiresBadges === 4)!
    const save = makeRegionSave({ lifetimeCandies: def.unlockAt, badges: ['pewter'] })

    expect(isUnlocked(def, save)).toBe(false)
  })

  it('unlocks once badges.length reaches the threshold', () => {
    const def = UPGRADES.find((u) => u.requiresBadges === 4)!
    const save = makeRegionSave({ lifetimeCandies: def.unlockAt, badges: ['a', 'b', 'c', 'd'] })

    expect(isUnlocked(def, save)).toBe(true)
  })
})

// Padrão 3 (sinergia entre dois sistemas): gated by N copies of another
// upgrade already owned AND a matching type on the active team right now.
describe('requiresSynergy (Padrão 3, sinergia)', () => {
  it('stays locked without enough copies of the required upgrade', () => {
    const def = UPGRADES.find((u) => u.requiresSynergy !== undefined)!
    const { upgradeId, count, teamType } = def.requiresSynergy!
    const save = makeRegionSave({
      lifetimeCandies: def.unlockAt,
      upgrades: { [upgradeId]: count - 1 },
    })

    expect(isUnlocked(def, save, [teamType])).toBe(false)
  })

  it('stays locked without the required type on the active team', () => {
    const def = UPGRADES.find((u) => u.requiresSynergy !== undefined)!
    const { upgradeId, count } = def.requiresSynergy!
    const save = makeRegionSave({
      lifetimeCandies: def.unlockAt,
      upgrades: { [upgradeId]: count },
    })

    expect(isUnlocked(def, save, ['fire'])).toBe(false)
  })

  it('unlocks once both the copy count and the active-team type are satisfied', () => {
    const def = UPGRADES.find((u) => u.requiresSynergy !== undefined)!
    const { upgradeId, count, teamType } = def.requiresSynergy!
    const save = makeRegionSave({
      lifetimeCandies: def.unlockAt,
      upgrades: { [upgradeId]: count },
    })

    expect(isUnlocked(def, save, [teamType])).toBe(true)
  })
})

// Padrão 5 (cadeia de upgrade POR PRÉDIO, pedido do dono do projeto —
// referência Cookie Clicker: cada prédio tem sua própria fileira de
// upgrades de tier). Diferente do Padrão 3, o gate é só quantidade
// possuída de um prédio — sem checagem de tipo de time.
describe('requiresBuildingOwned (Padrão 5, cadeia por prédio)', () => {
  it('stays locked without enough copies of the targeted building', () => {
    const def = UPGRADES.find((u) => u.requiresBuildingOwned !== undefined)!
    const { buildingId, count } = def.requiresBuildingOwned!
    const save = makeRegionSave({ lifetimeCandies: def.unlockAt, upgrades: { [buildingId]: count - 1 } })

    expect(isUnlocked(def, save)).toBe(false)
  })

  it('unlocks once the building count is reached', () => {
    const def = UPGRADES.find((u) => u.requiresBuildingOwned !== undefined)!
    const { buildingId, count } = def.requiresBuildingOwned!
    const save = makeRegionSave({ lifetimeCandies: def.unlockAt, upgrades: { [buildingId]: count } })

    expect(isUnlocked(def, save)).toBe(true)
  })
})

describe('buildingBoostMultiplier (Padrão 5)', () => {
  it('is 1 (no-op) with none owned', () => {
    const save = makeRegionSave()
    const def = UPGRADES.find((u) => u.kind === 'buildingBoost')!
    expect(buildingBoostMultiplier(kanto, save, def.boostsBuilding!)).toBe(1)
  })

  it('sums the effect of every buildingBoost upgrade owned that targets this building, and only this building', () => {
    const boosts = UPGRADES.filter((u) => u.kind === 'buildingBoost' && u.boostsBuilding === 'volunteer-helper')
    expect(boosts.length).toBeGreaterThan(1) // garante que o teste cobre mais de 1 tier
    const otherBoost = UPGRADES.find((u) => u.kind === 'buildingBoost' && u.boostsBuilding !== 'volunteer-helper')!

    const save = makeRegionSave({
      upgrades: { ...Object.fromEntries(boosts.map((d) => [d.id, 1])), [otherBoost.id]: 1 },
    })

    const expected = 1 + boosts.reduce((total, d) => total + d.effect, 0)
    expect(buildingBoostMultiplier(kanto, save, 'volunteer-helper')).toBeCloseTo(expected)
  })

  it('folds into totalCps: the boosted building produces MORE than effect × owned alone', () => {
    const building = UPGRADES.find((u) => u.id === 'volunteer-helper')!
    const boost = UPGRADES.find((u) => u.id === 'volunteer-broom')!
    const owned = 10

    const withoutBoost = makeRegionSave({ upgrades: { [building.id]: owned } })
    const withBoost = makeRegionSave({ upgrades: { [building.id]: owned, [boost.id]: 1 } })

    expect(totalCps(kanto, withoutBoost)).toBeCloseTo(building.effect * owned)
    expect(totalCps(kanto, withBoost)).toBeCloseTo(building.effect * owned * (1 + boost.effect))
  })
})

describe('globalMultiplierBonus (Padrão 4)', () => {
  it('is 1 (no-op) with none owned', () => {
    const save = makeRegionSave()
    expect(globalMultiplierBonus(kanto, save)).toBe(1)
  })

  it('sums the effect of every globalMultiplier upgrade owned', () => {
    const defs = UPGRADES.filter((u) => u.kind === 'globalMultiplier')
    const save = makeRegionSave({ upgrades: Object.fromEntries(defs.map((d) => [d.id, 1])) })

    const expected = 1 + defs.reduce((total, d) => total + d.effect, 0)
    expect(globalMultiplierBonus(kanto, save)).toBeCloseTo(expected)
  })
})
