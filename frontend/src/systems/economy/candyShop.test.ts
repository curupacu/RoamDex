import { describe, expect, it } from 'vitest'
import type { SpeciesEntry } from '../../content/gen1/types'
import { RARE_CANDY_XP_FRACTION, XP_BOOST_ID, XP_BOOST_TIERS } from '../../content/shop'
import { makeRegionSave } from '../../engine/save.testUtils'
import { addToRoster } from '../team/roster'
import { xpForNextLevel } from '../team/leveling'
import { bestXpBoostTier, buyRareCandy, buyXpBoost, isBuffActive, nextXpBoostTier, rareCandyCost, xpMultiplierFromBuffs } from './candyShop'

const [TIER_1, TIER_2] = XP_BOOST_TIERS

function makeEntry(overrides: Partial<SpeciesEntry> = {}): SpeciesEntry {
  return {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    stats: { hp: 45, attack: 49, defense: 49, 'special-attack': 65, 'special-defense': 65, speed: 45 },
    captureRate: 45,
    evolutionChain: [
      { id: 1, species: 'bulbasaur', trigger: 'initial', minLevel: null },
      { id: 2, species: 'ivysaur', trigger: 'level-up', minLevel: 16 },
    ],
    sprite: { url: '', local: '/sprites/1.png' },
    ...overrides,
  }
}

describe('rareCandyCost', () => {
  it('gets cheaper (in %) with more badges, capped', () => {
    const withoutBadges = rareCandyCost(10, 0)
    const withBadges = rareCandyCost(10, 4)
    const maxedOut = rareCandyCost(10, 100)

    expect(withBadges).toBeLessThan(withoutBadges)
    expect(maxedOut).toBe(rareCandyCost(10, 15)) // both past the discount cap, same cost
  })
})

describe('buyRareCandy', () => {
  it('grants a fraction of the next level XP and deducts the cost', () => {
    const save = { ...addToRoster(makeRegionSave(), 1, 5), candies: rareCandyCost(5, 0) }

    const result = buyRareCandy(save, [makeEntry()], 1)

    expect(result.candies).toBe(0)
    expect(result.roster[0].xp).toBeCloseTo(xpForNextLevel(5) * RARE_CANDY_XP_FRACTION)
    expect(result.roster[0].level).toBe(5) // a fraction alone isn't enough to level up
  })

  it('crosses a level (and evolution threshold) when the injected XP is enough', () => {
    // Level 15 sitting 1 XP short of 16 — any injected amount finishes it off.
    const save = {
      ...makeRegionSave(),
      candies: rareCandyCost(15, 0),
      roster: [{ speciesId: 1, level: 15, xp: xpForNextLevel(15) - 1 }],
    }

    const result = buyRareCandy(save, [makeEntry()], 1)

    expect(result.roster[0].level).toBeGreaterThanOrEqual(16)
    expect(result.roster[0].speciesId).toBe(2)
  })

  it('is a no-op when the player cannot afford it', () => {
    const save = { ...addToRoster(makeRegionSave(), 1, 5), candies: rareCandyCost(5, 0) - 1 }
    expect(buyRareCandy(save, [makeEntry()], 1)).toEqual(save)
  })

  it('is a no-op for a species not in the roster', () => {
    const save = { ...makeRegionSave(), candies: 1_000_000 }
    expect(buyRareCandy(save, [makeEntry()], 1)).toEqual(save)
  })
})

describe('bestXpBoostTier / nextXpBoostTier', () => {
  it('starts at tier 1 with nothing unlocked yet', () => {
    const save = makeRegionSave()
    expect(bestXpBoostTier(save)).toBe(TIER_1)
    expect(nextXpBoostTier(save)).toBe(TIER_2)
  })

  it('stays at tier 1 if candies/badges pass but the required training upgrade is missing', () => {
    const save = makeRegionSave({ lifetimeCandies: TIER_2.unlockAt, badges: ['a', 'b'] })
    expect(bestXpBoostTier(save)).toBe(TIER_1)
  })

  it('unlocks tier 2 once candies, badges, and the training upgrade are all satisfied', () => {
    const save = makeRegionSave({
      lifetimeCandies: TIER_2.unlockAt,
      badges: ['a', 'b'],
      upgrades: { [TIER_2.requiresTrainingUpgradeId!]: 1 },
    })
    expect(bestXpBoostTier(save)).toBe(TIER_2)
  })
})

describe('buyXpBoost / isBuffActive / xpMultiplierFromBuffs', () => {
  it('activates the best unlocked tier for its own duration/multiplier', () => {
    const save = { ...makeRegionSave(), candies: TIER_1.cost }
    const now = 1_000
    const result = buyXpBoost(save, now)

    expect(result.candies).toBe(0)
    expect(result.buffs[XP_BOOST_ID]).toBe(now + TIER_1.durationMs)
    expect(isBuffActive(result, XP_BOOST_ID, now)).toBe(true)
    expect(isBuffActive(result, XP_BOOST_ID, now + TIER_1.durationMs + 1)).toBe(false)
    expect(xpMultiplierFromBuffs(result, now)).toBe(TIER_1.multiplier)
  })

  it('extends from the current expiry instead of resetting when bought again while active', () => {
    const save = { ...makeRegionSave(), candies: TIER_1.cost * 2 }
    const now = 1_000
    const afterFirst = buyXpBoost(save, now)
    const afterSecond = buyXpBoost(afterFirst, now + 100)

    expect(afterSecond.buffs[XP_BOOST_ID]).toBe(now + TIER_1.durationMs * 2)
  })

  it('is a no-op when the player cannot afford the current tier', () => {
    const save = { ...makeRegionSave(), candies: TIER_1.cost - 1 }
    expect(buyXpBoost(save, 0)).toEqual(save)
  })

  it('defaults to a 1x multiplier with no active buff', () => {
    expect(xpMultiplierFromBuffs(makeRegionSave(), 0)).toBe(1)
  })
})
