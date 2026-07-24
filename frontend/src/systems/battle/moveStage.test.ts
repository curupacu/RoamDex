import { describe, expect, it } from 'vitest'
import type { Gen1Entry } from '../../content/gen1/types'
import { moveStage } from './moveStage'

function makeEntry(id: number, evolutionChain: Gen1Entry['evolutionChain']): Gen1Entry {
  return {
    id,
    name: 'test',
    types: ['normal'],
    stats: { hp: 1, attack: 1, defense: 1, 'special-attack': 1, 'special-defense': 1, speed: 1 },
    captureRate: 45,
    evolutionChain,
    sprite: { url: '', local: '' },
  }
}

const bulbasaurChain: Gen1Entry['evolutionChain'] = [
  { id: 1, species: 'bulbasaur', trigger: 'initial', minLevel: null },
  { id: 2, species: 'ivysaur', trigger: 'level-up', minLevel: 16 },
  { id: 3, species: 'venusaur', trigger: 'level-up', minLevel: 32 },
]

describe('moveStage', () => {
  it('uses the evolutionary stage for a species that can evolve, regardless of level', () => {
    expect(moveStage(makeEntry(1, bulbasaurChain), 5)).toBe(0)
    expect(moveStage(makeEntry(2, bulbasaurChain), 5)).toBe(1)
    expect(moveStage(makeEntry(3, bulbasaurChain), 5)).toBe(2)
  })

  it('uses level milestones (20/40) for a species with no evolution', () => {
    const noEvo = makeEntry(1, [{ id: 1, species: 'tauros', trigger: 'initial', minLevel: null }])
    expect(moveStage(noEvo, 10)).toBe(0)
    expect(moveStage(noEvo, 20)).toBe(1)
    expect(moveStage(noEvo, 39)).toBe(1)
    expect(moveStage(noEvo, 40)).toBe(2)
  })
})
