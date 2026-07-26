import { describe, expect, it } from 'vitest'
import type { Gen1Entry } from '../../content/gen1/types'
import { makeSave } from '../../engine/save.testUtils'
import { baseFormId, insigniasEarned, performRebirth, victoryRoadSnapshot } from './rebirth'

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

const bulbasaurLine = [
  makeEntry({ id: 1, name: 'bulbasaur' }),
  makeEntry({
    id: 2,
    name: 'ivysaur',
    evolutionChain: [
      { id: 1, species: 'bulbasaur', trigger: 'initial', minLevel: null },
      { id: 2, species: 'ivysaur', trigger: 'level-up', minLevel: 16 },
      { id: 3, species: 'venusaur', trigger: 'level-up', minLevel: 32 },
    ],
  }),
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

const caterpieLine = [
  makeEntry({
    id: 10,
    name: 'caterpie',
    evolutionChain: [
      { id: 10, species: 'caterpie', trigger: 'initial', minLevel: null },
      { id: 11, species: 'metapod', trigger: 'level-up', minLevel: 7 },
      { id: 12, species: 'butterfree', trigger: 'level-up', minLevel: 10 },
    ],
  }),
  makeEntry({
    id: 12,
    name: 'butterfree',
    evolutionChain: [
      { id: 10, species: 'caterpie', trigger: 'initial', minLevel: null },
      { id: 11, species: 'metapod', trigger: 'level-up', minLevel: 7 },
      { id: 12, species: 'butterfree', trigger: 'level-up', minLevel: 10 },
    ],
  }),
]

const gen1 = [...bulbasaurLine, ...caterpieLine]

describe('baseFormId', () => {
  it('resolves an evolved form back to its base species', () => {
    expect(baseFormId(gen1, 3)).toBe(1)
  })

  it('returns the same id for a species already at its base form', () => {
    expect(baseFormId(gen1, 1)).toBe(1)
  })

  it('falls back to the given id when the species is unknown', () => {
    expect(baseFormId(gen1, 999)).toBe(999)
  })
})

describe('victoryRoadSnapshot', () => {
  it('captures species and level of the active team at the moment of victory', () => {
    const save = makeSave({
      roster: [
        { speciesId: 3, level: 58, xp: 0 },
        { speciesId: 12, level: 40, xp: 0 },
      ],
      activeTeamIds: [3, 12],
    })

    const snapshot = victoryRoadSnapshot(save)

    expect(snapshot.region).toBe('kanto')
    expect(snapshot.team).toEqual([
      { speciesId: 3, level: 58 },
      { speciesId: 12, level: 40 },
    ])
  })

  it('skips an active id that has no matching roster member', () => {
    const save = makeSave({ roster: [{ speciesId: 3, level: 58, xp: 0 }], activeTeamIds: [3, 999] })

    expect(victoryRoadSnapshot(save).team).toEqual([{ speciesId: 3, level: 58 }])
  })
})

describe('insigniasEarned', () => {
  it('awards a flat base plus 1 per badge plus 1 per 100k lifetime candies', () => {
    const save = makeSave({ badges: ['brock', 'misty'], lifetimeCandies: 900_000 })

    // 10 base + 2 badges + floor(900_000 / 100_000) = 9
    expect(insigniasEarned(save)).toBe(21)
  })

  it('never earns a fraction of an Insígnia from partial candy progress', () => {
    const save = makeSave({ badges: [], lifetimeCandies: 99_999 })

    expect(insigniasEarned(save)).toBe(10)
  })
})

describe('performRebirth', () => {
  it('resets run-scoped progress and reverts the roster to base form / level 1', () => {
    const save = makeSave({
      candies: 5000,
      lifetimeCandies: 900_000,
      upgrades: { 'click-1': 10 },
      buffs: { 'atk-boost': Date.now() + 60_000 },
      badges: ['brock', 'misty'],
      currentLocationId: 'victory-road',
      roster: [
        { speciesId: 3, level: 58, xp: 12 },
        { speciesId: 12, level: 40, xp: 3 },
      ],
      activeTeamIds: [3, 12],
      championBeaten: true,
    })

    const reborn = performRebirth(save, gen1)

    expect(reborn.candies).toBe(0)
    expect(reborn.lifetimeCandies).toBe(0)
    expect(reborn.upgrades).toEqual({})
    expect(reborn.buffs).toEqual({})
    expect(reborn.badges).toEqual([])
    expect(reborn.currentLocationId).toBe('pallet-town')
    expect(reborn.roster).toEqual([
      { speciesId: 1, level: 1, xp: 0 },
      { speciesId: 10, level: 1, xp: 0 },
    ])
    expect(reborn.activeTeamIds).toEqual([])
    expect(reborn.championBeaten).toBe(false)
    // 10 base + 2 badges + floor(900_000 / 100_000) = 9, on top of the 0 the save started with.
    expect(reborn.insignias).toBe(21)
  })

  it('adds newly earned Insígnias on top of whatever was already banked', () => {
    const save = makeSave({ insignias: 50, badges: [], lifetimeCandies: 0, roster: [], activeTeamIds: [] })

    expect(performRebirth(save, gen1).insignias).toBe(50 + insigniasEarned(save))
  })

  it('applies Rebirth Shop bonuses: starting candies and a higher starting level', () => {
    const save = makeSave({
      roster: [{ speciesId: 3, level: 58, xp: 0 }],
      activeTeamIds: [3],
      rebirthUpgrades: { 'first-run-candies': 2, 'muscle-memory': 3 },
    })

    const reborn = performRebirth(save, gen1)

    // first-run-candies: 300 per level × 2 levels owned.
    expect(reborn.candies).toBe(600)
    expect(reborn.lifetimeCandies).toBe(600)
    // muscle-memory: +1 level per level owned, on top of the base level 1.
    expect(reborn.roster).toEqual([{ speciesId: 1, level: 4, xp: 0 }])
  })

  it('collapses two roster members from the same family into a single base-form entry', () => {
    const save = makeSave({
      roster: [
        { speciesId: 1, level: 12, xp: 0 },
        { speciesId: 3, level: 58, xp: 0 },
      ],
      activeTeamIds: [1, 3],
    })

    const reborn = performRebirth(save, gen1)

    expect(reborn.roster).toEqual([{ speciesId: 1, level: 1, xp: 0 }])
  })

  it('preserves fields the roadmap says persist through rebirth, like victoryRoad and version', () => {
    const save = makeSave({
      roster: [{ speciesId: 1, level: 5, xp: 0 }],
      activeTeamIds: [1],
      victoryRoad: [{ region: 'kanto', completedAt: 123, team: [{ speciesId: 3, level: 58 }] }],
    })

    const reborn = performRebirth(save, gen1)

    expect(reborn.victoryRoad).toEqual(save.victoryRoad)
    expect(reborn.version).toBe(save.version)
  })
})
