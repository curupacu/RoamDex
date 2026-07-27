import { describe, expect, it, vi } from 'vitest'
import { UPGRADES } from '../../content/gen1/upgrades'
import { REGIONS } from '../../content/regions'
import { makeRegionSave } from '../../engine/save.testUtils'
import { applyLoot, rollLoot } from './loot'

const kanto = REGIONS.kanto

describe('rollLoot', () => {
  it('rolls candies scaled by enemy level when the upgrade roll misses', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    const result = rollLoot(kanto, makeRegionSave(), 10)
    vi.restoreAllMocks()

    expect(result).toEqual({ kind: 'candies', amount: 20 + 10 * 5 })
  })

  it('rolls an unlocked upgrade when the upgrade roll hits', () => {
    const unlockedDef = UPGRADES.find((def) => def.unlockAt === 0)!
    vi.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0)
    const result = rollLoot(kanto, makeRegionSave(), 10)
    vi.restoreAllMocks()

    expect(result.kind).toBe('upgrade')
    if (result.kind === 'upgrade') expect(result.upgradeId).toBe(unlockedDef.id)
  })

  it('falls back to candies when no upgrade is unlocked and the pokeball roll misses too', () => {
    const save = { ...makeRegionSave(), lifetimeCandies: -1 } // below every unlockAt
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    const result = rollLoot(kanto, save, 5)
    vi.restoreAllMocks()

    expect(result.kind).toBe('candies')
  })

  it('rolls a pokeball when the upgrade roll misses but the pokeball roll hits', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.99).mockReturnValueOnce(0)
    const result = rollLoot(kanto, makeRegionSave(), 5)
    vi.restoreAllMocks()

    expect(result.kind).toBe('pokeball')
    if (result.kind === 'pokeball') expect(result.amount).toBe(1)
  })
})

describe('applyLoot', () => {
  it('adds candies to both balance and lifetime total', () => {
    const save = makeRegionSave({ candies: 10, lifetimeCandies: 10 })
    const result = applyLoot(save, { kind: 'candies', amount: 50 })

    expect(result.candies).toBe(60)
    expect(result.lifetimeCandies).toBe(60)
  })

  it('increments the owned count of the looted upgrade for free', () => {
    const def = UPGRADES[0]
    const save = makeRegionSave({ candies: 0 })
    const result = applyLoot(save, { kind: 'upgrade', upgradeId: def.id, upgradeName: def.name })

    expect(result.upgrades[def.id]).toBe(1)
    expect(result.candies).toBe(0)
  })

  it('adds a looted pokeball to the owned count', () => {
    const save = makeRegionSave()
    const result = applyLoot(save, { kind: 'pokeball', ballId: 'great-ball', ballName: 'Great Ball', amount: 1 })

    expect(result.pokeballs['great-ball']).toBe(1)
  })
})
