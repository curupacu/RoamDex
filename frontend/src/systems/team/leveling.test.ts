import { describe, expect, it } from 'vitest'
import type { Gen1Entry } from '../../content/gen1/types'
import { makeSave } from '../../engine/save.testUtils'
import { addToRoster } from './roster'
import { applyXpGain, gainTeamXp, resolveEvolution, xpForNextLevel } from './leveling'

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
      { id: 3, species: 'venusaur', trigger: 'level-up', minLevel: 32 },
    ],
    sprite: { url: '', local: '/sprites/1.png' },
    ...overrides,
  }
}

describe('applyXpGain', () => {
  it('accumulates xp without leveling up when below the threshold', () => {
    const result = applyXpGain({ speciesId: 1, level: 5, xp: 0 }, 1)
    expect(result.level).toBe(5)
    expect(result.xp).toBe(1)
  })

  it('levels up once the threshold is crossed, carrying over the remainder', () => {
    const threshold = xpForNextLevel(5)
    const result = applyXpGain({ speciesId: 1, level: 5, xp: 0 }, threshold + 3)
    expect(result.level).toBe(6)
    expect(result.xp).toBe(3)
  })

  it('can cross multiple level thresholds from a single large gain', () => {
    const huge = xpForNextLevel(5) + xpForNextLevel(6) + xpForNextLevel(7) + 1
    const result = applyXpGain({ speciesId: 1, level: 5, xp: 0 }, huge)
    expect(result.level).toBe(8)
    expect(result.xp).toBe(1)
  })
})

describe('resolveEvolution', () => {
  it('stays the same species below the first evolution threshold', () => {
    expect(resolveEvolution(makeEntry(), 15)).toBe(1)
  })

  it('evolves at the exact minLevel', () => {
    expect(resolveEvolution(makeEntry(), 16)).toBe(2)
  })

  it('picks the highest qualifying stage when jumping past more than one', () => {
    expect(resolveEvolution(makeEntry(), 40)).toBe(3)
  })
})

describe('gainTeamXp', () => {
  it('applies xp only to active team members', () => {
    let save = addToRoster(makeSave(), 1, 5)
    save = addToRoster(save, 999, 5) // captured but not active (team already has room, so mark it benched below)
    save = { ...save, activeTeamIds: [1] }

    const gen1 = [makeEntry(), makeEntry({ id: 999, evolutionChain: [{ id: 999, species: 'x', trigger: 'initial', minLevel: null }] })]
    const result = gainTeamXp(save, gen1, 5)

    expect(result.roster.find((m) => m.speciesId === 1)?.xp).toBe(5)
    expect(result.roster.find((m) => m.speciesId === 999)?.xp).toBe(0)
  })

  it('evolves a member and keeps it in activeTeamIds under its new speciesId', () => {
    const save = addToRoster(makeSave(), 1, 15)
    const gen1 = [makeEntry()]

    const result = gainTeamXp(save, gen1, xpForNextLevel(15) + 1)

    expect(result.roster).toEqual([{ speciesId: 2, level: 16, xp: 1 }])
    expect(result.activeTeamIds).toEqual([2])
  })

  it('is a no-op with zero or negative amount', () => {
    const save = addToRoster(makeSave(), 1, 5)
    expect(gainTeamXp(save, [makeEntry()], 0)).toEqual(save)
  })
})
