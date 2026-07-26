import { describe, expect, it, vi } from 'vitest'
import type { LocationDefinition } from '../../content/gen1/locations'
import type { SpeciesEntry } from '../../content/gen1/types'
import { spawnWildEncounter } from './wildEncounter'

function makeEntry(id: number, captureRate = 45): SpeciesEntry {
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

function makeLocation(overrides: Partial<LocationDefinition> = {}): LocationDefinition {
  return { id: 'test-route', name: 'Test Route', unlockAt: 0, background: 'tall-grass.png', encounters: [], ...overrides }
}

describe('spawnWildEncounter', () => {
  it('returns null for a location with no encounters (towns, gyms)', () => {
    expect(spawnWildEncounter(makeLocation(), [makeEntry(1)], 1)).toBeNull()
  })

  it('only ever picks a species from the location pool', () => {
    const location = makeLocation({ encounters: [{ speciesId: 1, weight: 100, minLevel: 3, maxLevel: 3 }] })
    const encounter = spawnWildEncounter(location, [makeEntry(1)], 1)

    expect(encounter?.speciesId).toBe(1)
    expect(encounter?.level).toBe(3)
  })

  it('rolls a level within the species range', () => {
    const location = makeLocation({ encounters: [{ speciesId: 1, weight: 100, minLevel: 2, maxLevel: 5 }] })

    for (let i = 0; i < 20; i++) {
      const encounter = spawnWildEncounter(location, [makeEntry(1)], 1)
      expect(encounter?.level).toBeGreaterThanOrEqual(2)
      expect(encounter?.level).toBeLessThanOrEqual(5)
    }
  })

  it('biases the roll toward the lowest-weight species when rareBonusMultiplier is higher', () => {
    const location = makeLocation({
      encounters: [
        { speciesId: 1, weight: 10, minLevel: 5, maxLevel: 5 },
        { speciesId: 2, weight: 1, minLevel: 5, maxLevel: 5 },
      ],
    })
    const gen1 = [makeEntry(1), makeEntry(2)]

    // Fixed roll at the midpoint of [0, total): with multiplier 1, total=11
    // and the midpoint (5.5) lands in species 1's slice (0-10); with
    // multiplier 20, total=30 and the midpoint (15) falls into species 2's
    // now much bigger slice (10-30).
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const withoutBonus = spawnWildEncounter(location, gen1, 1)
    const withBonus = spawnWildEncounter(location, gen1, 20)
    vi.restoreAllMocks()

    expect(withoutBonus?.speciesId).toBe(1)
    expect(withBonus?.speciesId).toBe(2)
  })

  it('derives the display rarity tier from the species captureRate, not the location weight', () => {
    const location = makeLocation({ encounters: [{ speciesId: 1, weight: 100, minLevel: 5, maxLevel: 5 }] })
    const encounter = spawnWildEncounter(location, [makeEntry(1, 255)], 1)

    expect(encounter?.tier).toBe('common')
  })
})
