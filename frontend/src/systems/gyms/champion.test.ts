import { describe, expect, it } from 'vitest'
import { CHAMPION_TEAM_BY_STARTER } from '../../content/gen1/eliteFour'
import type { Gen1Entry } from '../../content/gen1/types'
import { makeSave } from '../../engine/save.testUtils'
import { championTeam } from './champion'

function makeEntry(overrides: Partial<Gen1Entry> = {}): Gen1Entry {
  return {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    stats: { hp: 45, attack: 49, defense: 49, 'special-attack': 65, 'special-defense': 65, speed: 45 },
    captureRate: 45,
    evolutionChain: [{ id: 1, species: 'bulbasaur', trigger: 'initial', minLevel: null }],
    sprite: { url: '', local: '/sprites/1.png' },
    ...overrides,
  }
}

// One evolution family per starter, matching the real chains closely
// enough for the 'initial' root-id lookup: base form + one evolved form.
const bulbasaurLine = [
  makeEntry({ id: 1, name: 'bulbasaur' }),
  makeEntry({
    id: 3,
    name: 'venusaur',
    evolutionChain: [
      { id: 1, species: 'bulbasaur', trigger: 'initial', minLevel: null },
      { id: 2, species: 'ivysaur', trigger: 'level-up', minLevel: 16 },
      { id: 3, species: 'venusaur', trigger: 'level-up', minLevel: 32 },
    ],
  }),
]

const charmanderLine = [
  makeEntry({
    id: 4,
    name: 'charmander',
    evolutionChain: [{ id: 4, species: 'charmander', trigger: 'initial', minLevel: null }],
  }),
]

const nonStarter = makeEntry({
  id: 19,
  name: 'rattata',
  evolutionChain: [{ id: 19, species: 'rattata', trigger: 'initial', minLevel: null }],
})

describe('championTeam', () => {
  it("picks the champion's Bulbasaur-pick team when the base starter is in the roster", () => {
    const gen1 = [...bulbasaurLine, nonStarter]
    const save = makeSave({ roster: [{ speciesId: 1, level: 5, xp: 0 }] })

    expect(championTeam(save, gen1)).toBe(CHAMPION_TEAM_BY_STARTER[1])
  })

  it('resolves through an evolved form (Venusaur) back to its Bulbasaur root', () => {
    const gen1 = [...bulbasaurLine, nonStarter]
    const save = makeSave({ roster: [{ speciesId: 3, level: 36, xp: 0 }] })

    expect(championTeam(save, gen1)).toBe(CHAMPION_TEAM_BY_STARTER[1])
  })

  it('picks the Charmander-pick team when that starter is in the roster, even if benched', () => {
    const gen1 = [...charmanderLine, nonStarter]
    // Not in activeTeamIds — champion selection must still find it in roster.
    const save = makeSave({ roster: [{ speciesId: 4, level: 20, xp: 0 }], activeTeamIds: [] })

    expect(championTeam(save, gen1)).toBe(CHAMPION_TEAM_BY_STARTER[4])
  })

  it('ignores non-starter roster members entirely', () => {
    const gen1 = [...bulbasaurLine, nonStarter]
    const save = makeSave({ roster: [{ speciesId: 19, level: 8, xp: 0 }] })

    // No starter in roster at all (shouldn't happen post new-game) — falls
    // back to the default starter's team defensively, same spirit as
    // locationById's unknown-id fallback.
    expect(championTeam(save, gen1)).toBe(CHAMPION_TEAM_BY_STARTER[1])
  })
})
