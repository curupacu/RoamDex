import { describe, expect, it, vi } from 'vitest'
import type { Gen1Entry } from '../../content/gen1/types'
import { RARE_TIER_UNLOCK_LIFETIME_CANDIES, spawnWildEncounter, wildLevelForProgress } from './wildEncounter'

function makeEntry(id: number, captureRate: number): Gen1Entry {
  return {
    id,
    name: `species-${id}`,
    types: ['normal'],
    stats: { hp: 1, attack: 1, defense: 1, 'special-attack': 1, 'special-defense': 1, speed: 1 },
    captureRate,
    evolutionChain: [{ id, species: `species-${id}`, trigger: 'initial', minLevel: null }],
    sprite: { url: '', local: '' },
  }
}

describe('wildLevelForProgress', () => {
  it('starts at the base level with no progress', () => {
    expect(wildLevelForProgress(0)).toBe(5)
  })

  it('grows with lifetime candies', () => {
    expect(wildLevelForProgress(20_000)).toBeGreaterThan(wildLevelForProgress(0))
  })

  it('caps at the max level', () => {
    expect(wildLevelForProgress(1_000_000_000)).toBe(100)
  })
})

describe('spawnWildEncounter', () => {
  it('picks a species from the pool and scales its level by progress', () => {
    const gen1 = [makeEntry(1, 255)]
    const encounter = spawnWildEncounter(gen1, 500, 1)

    expect(encounter.speciesId).toBe(1)
    expect(encounter.level).toBe(wildLevelForProgress(500))
    expect(encounter.tier).toBe('common')
  })

  it('boosts rare-tier spawn odds when rareBonusMultiplier is higher (rare already unlocked)', () => {
    const gen1 = [makeEntry(1, 255), makeEntry(2, 3)] // common (weight 10) vs rare (weight 1×bonus)
    const unlocked = RARE_TIER_UNLOCK_LIFETIME_CANDIES

    // Fixed roll at the midpoint of [0, total): with multiplier 1, total=11
    // and the midpoint (5.5) still lands in the common slice (0-10); with
    // multiplier 20, total=30 and the midpoint (15) falls past common (0-10)
    // into the now much bigger rare slice (10-30).
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const withoutBonus = spawnWildEncounter(gen1, unlocked, 1)
    const withBonus = spawnWildEncounter(gen1, unlocked, 20)
    vi.restoreAllMocks()

    expect(withoutBonus.speciesId).toBe(1)
    expect(withBonus.speciesId).toBe(2)
  })

  it('never picks a rare-tier species before the unlock threshold, regardless of bonus', () => {
    const gen1 = [makeEntry(1, 255), makeEntry(2, 3)] // common vs rare

    vi.spyOn(Math, 'random').mockReturnValue(0.99) // would favor the rare slice if it had any weight
    const result = spawnWildEncounter(gen1, RARE_TIER_UNLOCK_LIFETIME_CANDIES - 1, 50)
    vi.restoreAllMocks()

    expect(result.speciesId).toBe(1)
  })

  it('allows a rare-tier species once the threshold is reached', () => {
    const gen1 = [makeEntry(2, 3)] // only a rare species in the pool
    const result = spawnWildEncounter(gen1, RARE_TIER_UNLOCK_LIFETIME_CANDIES, 1)

    expect(result.speciesId).toBe(2)
  })
})
