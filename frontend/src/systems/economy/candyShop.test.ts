import { describe, expect, it } from 'vitest'
import type { Gen1Entry } from '../../content/gen1/types'
import { XP_BOOST_COST, XP_BOOST_DURATION_MS, XP_BOOST_ID, XP_BOOST_MULTIPLIER } from '../../content/shop'
import { makeSave } from '../../engine/save.testUtils'
import { addToRoster } from '../team/roster'
import { buyRareCandy, buyXpBoost, isBuffActive, rareCandyCost, xpMultiplierFromBuffs } from './candyShop'

function makeEntry(overrides: Partial<Gen1Entry> = {}): Gen1Entry {
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

describe('buyRareCandy', () => {
  it('levels up the target by 1 and deducts the cost', () => {
    const save = { ...addToRoster(makeSave(), 1, 5), candies: rareCandyCost(5) }

    const result = buyRareCandy(save, [makeEntry()], 1)

    expect(result.candies).toBe(0)
    expect(result.roster[0].level).toBe(6)
  })

  it('evolves the target if the new level crosses a threshold', () => {
    const save = { ...addToRoster(makeSave(), 1, 15), candies: rareCandyCost(15) }

    const result = buyRareCandy(save, [makeEntry()], 1)

    expect(result.roster).toEqual([{ speciesId: 2, level: 16, xp: 0 }])
    expect(result.activeTeamIds).toEqual([2])
  })

  it('is a no-op when the player cannot afford it', () => {
    const save = { ...addToRoster(makeSave(), 1, 5), candies: rareCandyCost(5) - 1 }
    expect(buyRareCandy(save, [makeEntry()], 1)).toEqual(save)
  })

  it('is a no-op for a species not in the roster', () => {
    const save = { ...makeSave(), candies: 1_000_000 }
    expect(buyRareCandy(save, [makeEntry()], 1)).toEqual(save)
  })

  it('still levels up but skips the species change when evolution would collide with another roster member', () => {
    let save = addToRoster(makeSave(), 1, 15)
    save = addToRoster(save, 2, 20) // already have an ivysaur caught separately
    save = { ...save, candies: rareCandyCost(15) }

    const result = buyRareCandy(save, [makeEntry()], 1)

    const bulbasaur = result.roster.find((m) => m.speciesId === 1)
    expect(bulbasaur?.level).toBe(16)
    expect(result.roster.filter((m) => m.speciesId === 2)).toHaveLength(1)
  })
})

describe('buyXpBoost / isBuffActive / xpMultiplierFromBuffs', () => {
  it('activates the buff for XP_BOOST_DURATION_MS from now', () => {
    const save = { ...makeSave(), candies: XP_BOOST_COST }
    const now = 1_000
    const result = buyXpBoost(save, now)

    expect(result.candies).toBe(0)
    expect(result.buffs[XP_BOOST_ID]).toBe(now + XP_BOOST_DURATION_MS)
    expect(isBuffActive(result, XP_BOOST_ID, now)).toBe(true)
    expect(isBuffActive(result, XP_BOOST_ID, now + XP_BOOST_DURATION_MS + 1)).toBe(false)
    expect(xpMultiplierFromBuffs(result, now)).toBe(XP_BOOST_MULTIPLIER)
  })

  it('extends from the current expiry instead of resetting when bought again while active', () => {
    const save = { ...makeSave(), candies: XP_BOOST_COST * 2 }
    const now = 1_000
    const afterFirst = buyXpBoost(save, now)
    const afterSecond = buyXpBoost(afterFirst, now + 100)

    expect(afterSecond.buffs[XP_BOOST_ID]).toBe(now + XP_BOOST_DURATION_MS * 2)
  })

  it('is a no-op when the player cannot afford it', () => {
    const save = { ...makeSave(), candies: XP_BOOST_COST - 1 }
    expect(buyXpBoost(save, 0)).toEqual(save)
  })

  it('defaults to a 1x multiplier with no active buff', () => {
    expect(xpMultiplierFromBuffs(makeSave(), 0)).toBe(1)
  })
})
