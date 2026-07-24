import { describe, expect, it } from 'vitest'
import type { Gen1Entry } from '../../content/gen1/types'
import { deriveStats } from './stats'

const bulbasaur: Gen1Entry = {
  id: 1,
  name: 'bulbasaur',
  types: ['grass', 'poison'],
  stats: { hp: 45, attack: 49, defense: 49, 'special-attack': 65, 'special-defense': 65, speed: 45 },
  evolutionChain: [{ id: 1, species: 'bulbasaur', trigger: 'initial', minLevel: null }],
  sprite: { url: '', local: '/sprites/1.png' },
}

describe('deriveStats', () => {
  it('matches the base roadmap formula at level 1 (no growth yet)', () => {
    const stats = deriveStats(bulbasaur, 1)
    expect(stats.hp).toBe(45)
    expect(stats.atk).toBe(65) // max(attack, special-attack)
    expect(stats.def).toBe(57) // mean(defense, special-defense)
  })

  it('scales all three stats up with level', () => {
    const low = deriveStats(bulbasaur, 1)
    const high = deriveStats(bulbasaur, 20)
    expect(high.hp).toBeGreaterThan(low.hp)
    expect(high.atk).toBeGreaterThan(low.atk)
    expect(high.def).toBeGreaterThan(low.def)
  })
})
