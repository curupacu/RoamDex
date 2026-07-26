import { describe, expect, it } from 'vitest'
import type { SpeciesEntry } from '../../content/gen1/types'
import { TYPES } from '../../content/types'
import type { RosterMember } from '../../engine/save'
import {
  applyEnemyAttack,
  applyPlayerTap,
  createBattle,
  currentTrainerProgress,
  ENERGY_MAX,
  ENERGY_PER_TAP,
  hasQte,
  resolveQteAttack,
  switchActive,
  TRAINER_TRANSITION_HEAL_FRACTION,
  type BattleState,
} from './engine'

function makeEntry(overrides: Partial<SpeciesEntry> = {}): SpeciesEntry {
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

function makeMember(speciesId: number, level = 10): RosterMember {
  return { speciesId, level, xp: 0 }
}

describe('createBattle', () => {
  it('builds full-HP units for the enemy and every active team member', () => {
    const gen1 = [makeEntry({ id: 1 }), makeEntry({ id: 4, name: 'charmander' })]
    const battle = createBattle(gen1, [makeMember(1), makeMember(4)], [1, 4], [{ entry: makeEntry({ id: 19, name: 'rattata' }), level: 5 }])

    expect(battle.playerTeam).toHaveLength(2)
    expect(battle.playerTeam[0].currentHp).toBe(battle.playerTeam[0].maxHp)
    expect(battle.enemyTeam[0].currentHp).toBe(battle.enemyTeam[0].maxHp)
    expect(battle.enemyIndex).toBe(0)
    expect(battle.outcome).toBe('ongoing')
  })

  it('starts in defeat if there is no active team (defensive — should not happen post new-game)', () => {
    const battle = createBattle([], [], [], [{ entry: makeEntry({ id: 19 }), level: 5 }])
    expect(battle.outcome).toBe('defeat')
  })

  it('starts in defeat if the enemy roster is empty (defensive — should not happen)', () => {
    const gen1 = [makeEntry()]
    const battle = createBattle(gen1, [makeMember(1)], [1], [])
    expect(battle.outcome).toBe('defeat')
  })
})

describe('applyPlayerTap', () => {
  it('deals basic damage and fills energy', () => {
    const gen1 = [makeEntry()]
    const battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [{ entry: makeEntry({ id: 19, stats: { hp: 1000, attack: 10, defense: 10, 'special-attack': 10, 'special-defense': 10, speed: 10 } }), level: 5 }],
    )

    const result = applyPlayerTap(battle)

    expect(result.enemyTeam[0].currentHp).toBeLessThan(battle.enemyTeam[0].currentHp)
    expect(result.energy).toBe(ENERGY_PER_TAP)
  })

  it('deals a bigger hit and resets energy once full (defensive: a type with no QTE config, flat multiplier)', () => {
    // All 18 real types have a QTE as of Sprint 17 — this fabricated type
    // exercises the fallback path in case content/moves.ts ever has a gap
    // (e.g. a future 19th type not wired up yet).
    const gen1 = [makeEntry({ types: ['unconfigured-type' as SpeciesEntry['types'][number]] })]
    let battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [{ entry: makeEntry({ id: 19, stats: { hp: 100_000, attack: 10, defense: 10, 'special-attack': 10, 'special-defense': 10, speed: 10 } }), level: 5 }],
    )
    battle = { ...battle, energy: ENERGY_MAX }

    const beforeHp = battle.enemyTeam[0].currentHp
    const result = applyPlayerTap(battle)
    const superDamage = beforeHp - result.enemyTeam[0].currentHp

    expect(result.energy).toBe(0)

    const basicOnly = applyPlayerTap({ ...battle, energy: 0 })
    const basicDamage = beforeHp - basicOnly.enemyTeam[0].currentHp
    expect(superDamage).toBeGreaterThan(basicDamage)
  })

  it('declares victory once the enemy HP reaches 0', () => {
    const gen1 = [makeEntry()]
    const weakEnemy = makeEntry({ id: 19, stats: { hp: 1, attack: 1, defense: 0, 'special-attack': 1, 'special-defense': 0, speed: 1 } })
    const battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: weakEnemy, level: 1 }])

    const result = applyPlayerTap(battle)

    expect(result.enemyTeam[0].currentHp).toBe(0)
    expect(result.outcome).toBe('victory')
  })

  it('is a no-op once the battle is over', () => {
    const gen1 = [makeEntry()]
    const weakEnemy = makeEntry({ id: 19, stats: { hp: 1, attack: 1, defense: 0, 'special-attack': 1, 'special-defense': 0, speed: 1 } })
    const battle = applyPlayerTap(createBattle(gen1, [makeMember(1)], [1], [{ entry: weakEnemy, level: 1 }]))

    expect(applyPlayerTap(battle)).toEqual(battle)
  })

  it('opens the QTE instead of dealing damage when energy is full and the type has one (grass)', () => {
    const gen1 = [makeEntry({ types: ['grass'] })]
    let battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: makeEntry({ id: 19 }), level: 5 }])
    battle = { ...battle, energy: ENERGY_MAX }

    const result = applyPlayerTap(battle)

    expect(result.awaitingQte).toBe('grass')
    expect(result.enemyTeam[0].currentHp).toBe(battle.enemyTeam[0].currentHp)
    expect(result.energy).toBe(ENERGY_MAX)
  })

  it('opens the QTE for a Sprint 16 "leva 2" type too (rock)', () => {
    const gen1 = [makeEntry({ types: ['rock'] })]
    let battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: makeEntry({ id: 19 }), level: 5 }])
    battle = { ...battle, energy: ENERGY_MAX }

    expect(applyPlayerTap(battle).awaitingQte).toBe('rock')
  })

  it('is blocked while awaiting a QTE result', () => {
    const gen1 = [makeEntry({ types: ['grass'] })]
    let battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: makeEntry({ id: 19 }), level: 5 }])
    battle = { ...battle, energy: ENERGY_MAX }
    const awaiting = applyPlayerTap(battle)

    expect(applyPlayerTap(awaiting)).toEqual(awaiting)
  })
})

describe('resolveQteAttack', () => {
  it('deals full/partial/weak damage graded by the QTE result and clears awaitingQte', () => {
    const gen1 = [makeEntry({ types: ['grass'] })]
    const enemy = makeEntry({ id: 19, stats: { hp: 100_000, attack: 10, defense: 10, 'special-attack': 10, 'special-defense': 10, speed: 10 } })

    const makeAwaiting = () => {
      let battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: enemy, level: 5 }])
      battle = { ...battle, energy: ENERGY_MAX }
      return applyPlayerTap(battle)
    }

    const full = resolveQteAttack(makeAwaiting(), 'full')
    const partial = resolveQteAttack(makeAwaiting(), 'partial')
    const weak = resolveQteAttack(makeAwaiting(), 'weak')

    expect(full.awaitingQte).toBeNull()
    expect(full.energy).toBe(0)

    const fullDamage = 100_000 - full.enemyTeam[0].currentHp
    const partialDamage = 100_000 - partial.enemyTeam[0].currentHp
    const weakDamage = 100_000 - weak.enemyTeam[0].currentHp
    expect(fullDamage).toBeGreaterThan(partialDamage)
    expect(partialDamage).toBeGreaterThan(weakDamage)

    expect(full.lastHit?.qteResult).toBe('full')
    expect(partial.lastHit?.qteResult).toBe('partial')
    expect(weak.lastHit?.qteResult).toBe('weak')
  })

  it('is a no-op when not awaiting a QTE', () => {
    const gen1 = [makeEntry({ types: ['grass'] })]
    const battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: makeEntry({ id: 19 }), level: 5 }])

    expect(resolveQteAttack(battle, 'full')).toEqual(battle)
  })
})

describe('applyEnemyAttack', () => {
  it('damages the active unit', () => {
    const gen1 = [makeEntry()]
    const strongEnemy = makeEntry({ id: 19, stats: { hp: 100, attack: 200, defense: 10, 'special-attack': 200, 'special-defense': 10, speed: 10 } })
    const battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: strongEnemy, level: 20 }])

    const result = applyEnemyAttack(battle)

    expect(result.playerTeam[0].currentHp).toBeLessThan(battle.playerTeam[0].maxHp)
  })

  it('auto-switches to the next living member when the active one faints', () => {
    const gen1 = [makeEntry({ id: 1 }), makeEntry({ id: 4, name: 'charmander' })]
    const oneHitKill = makeEntry({ id: 19, stats: { hp: 100, attack: 100_000, defense: 10, 'special-attack': 100_000, 'special-defense': 10, speed: 10 } })
    const battle = createBattle(gen1, [makeMember(1), makeMember(4)], [1, 4], [{ entry: oneHitKill, level: 50 }])

    const result = applyEnemyAttack(battle)

    expect(result.playerTeam[0].currentHp).toBe(0)
    expect(result.activeIndex).toBe(1)
    expect(result.outcome).toBe('ongoing')
  })

  it('declares defeat once every team member has fainted', () => {
    const gen1 = [makeEntry()]
    const oneHitKill = makeEntry({ id: 19, stats: { hp: 100, attack: 100_000, defense: 10, 'special-attack': 100_000, 'special-defense': 10, speed: 10 } })
    const battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: oneHitKill, level: 50 }])

    const result = applyEnemyAttack(battle)

    expect(result.outcome).toBe('defeat')
  })
})

describe('multi-Pokémon enemy team (gym battles)', () => {
  function weakEntry(id: number): SpeciesEntry {
    return makeEntry({ id, stats: { hp: 1, attack: 1, defense: 0, 'special-attack': 1, 'special-defense': 0, speed: 1 } })
  }

  it('sends out the next enemy automatically once the current one faints, without ending the battle', () => {
    const gen1 = [makeEntry({ id: 1 })]
    const battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [
        { entry: weakEntry(74), level: 12 }, // Geodude
        { entry: makeEntry({ id: 95, name: 'onix' }), level: 14 },
      ],
    )

    const result = applyPlayerTap(battle)

    expect(result.outcome).toBe('ongoing')
    expect(result.enemyIndex).toBe(1)
    expect(result.enemyTeam[1].speciesId).toBe(95)
    expect(result.enemyTeam[1].currentHp).toBe(result.enemyTeam[1].maxHp)
  })

  it('declares victory only once every enemy in the team has fainted', () => {
    const gen1 = [makeEntry({ id: 1 })]
    let battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [
        { entry: weakEntry(74), level: 12 },
        { entry: weakEntry(95), level: 14 },
      ],
    )

    battle = applyPlayerTap(battle)
    expect(battle.outcome).toBe('ongoing')

    battle = applyPlayerTap(battle)
    expect(battle.outcome).toBe('victory')
  })

  it("attacks the player with whichever enemy is currently active, not always the first", () => {
    // attack is huge (unlike defense) so the opening tap reliably one-shots
    // weakEntry(74) regardless of how STAT_GROWTH_PER_LEVEL gets tuned —
    // this test is about enemy-switch behavior, not tap damage sizing.
    const gen1 = [makeEntry({ id: 1, stats: { hp: 1000, attack: 100_000, defense: 1, 'special-attack': 1, 'special-defense': 1, speed: 1 } })]
    let battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [
        { entry: weakEntry(74), level: 12 },
        { entry: makeEntry({ id: 95, name: 'onix', stats: { hp: 100, attack: 100_000, defense: 10, 'special-attack': 100_000, 'special-defense': 10, speed: 10 } }), level: 14 },
      ],
    )

    battle = applyPlayerTap(battle) // faints Geodude, sends out Onix
    expect(battle.enemyIndex).toBe(1)

    const result = applyEnemyAttack(battle)
    expect(result.playerTeam[0].currentHp).toBe(0)
  })
})

describe('trainer sequence (Elite Four)', () => {
  function weakEntry(id: number): SpeciesEntry {
    return makeEntry({ id, stats: { hp: 1, attack: 1, defense: 0, 'special-attack': 1, 'special-defense': 0, speed: 1 } })
  }

  // Quarter HP instead of half — leaves headroom under maxHp so a 50% heal
  // doesn't accidentally land on the cap and mask a wiring bug.
  function quarterHp(battle: BattleState): BattleState {
    return { ...battle, playerTeam: battle.playerTeam.map((unit) => ({ ...unit, currentHp: Math.round(unit.maxHp / 4) })) }
  }

  it('heals the player team by the roadmap fraction when crossing into a new trainer', () => {
    const gen1 = [makeEntry({ id: 1 })]
    const tankyBoundary = makeEntry({
      id: 95,
      name: 'onix',
      stats: { hp: 1000, attack: 1, defense: 1000, 'special-attack': 1, 'special-defense': 1000, speed: 1 },
    })
    let battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [
        { entry: weakEntry(74), level: 12, trainerName: 'Lorelei' },
        { entry: tankyBoundary, level: 53, trainerName: 'Bruno' },
      ],
    )
    battle = quarterHp(battle)
    const maxHp = battle.playerTeam[0].maxHp
    const beforeHp = battle.playerTeam[0].currentHp

    const result = applyPlayerTap(battle) // faints Lorelei's only mon, crosses into Bruno

    expect(result.enemyIndex).toBe(1)
    expect(result.playerTeam[0].currentHp).toBe(Math.min(maxHp, Math.round(beforeHp + maxHp * TRAINER_TRANSITION_HEAL_FRACTION)))
  })

  it('caps the heal at maxHp instead of overhealing', () => {
    const gen1 = [makeEntry({ id: 1 })]
    let battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [
        { entry: weakEntry(74), level: 12, trainerName: 'Lorelei' },
        { entry: weakEntry(95), level: 14, trainerName: 'Bruno' },
      ],
    )
    const maxHp = battle.playerTeam[0].maxHp
    battle = { ...battle, playerTeam: battle.playerTeam.map((unit) => ({ ...unit, currentHp: maxHp - 1 })) }

    const result = applyPlayerTap(battle)

    expect(result.playerTeam[0].currentHp).toBe(maxHp)
  })

  it('does not heal when switching within a single trainer team (no trainerName tag — gym parity)', () => {
    const gen1 = [makeEntry({ id: 1 })]
    let battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [
        { entry: weakEntry(74), level: 12 }, // same trainer, untagged — like a gym leader's own team
        { entry: makeEntry({ id: 95, name: 'onix' }), level: 14 },
      ],
    )
    battle = quarterHp(battle)
    const beforeHp = battle.playerTeam[0].currentHp

    const result = applyPlayerTap(battle)

    expect(result.enemyIndex).toBe(1)
    expect(result.playerTeam[0].currentHp).toBe(beforeHp)
  })

  it('does not heal on a non-lethal tap, even when the active enemy already sits at a boundary index (regression)', () => {
    // Regression for a bug caught during design review: healing on "nextIndex
    // is a boundary" alone (instead of "just crossed into one") would heal
    // on every single tap against a trainer's opener, not just the switch.
    const gen1 = [makeEntry({ id: 1, stats: { hp: 1000, attack: 1, defense: 1, 'special-attack': 1, 'special-defense': 1, speed: 1 } })]
    const tankyBoundary = makeEntry({
      id: 95,
      name: 'onix',
      stats: { hp: 100_000, attack: 1, defense: 1000, 'special-attack': 1, 'special-defense': 1000, speed: 1 },
    })
    let battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: tankyBoundary, level: 53, trainerName: 'Bruno' }])
    battle = quarterHp(battle)
    const beforeHp = battle.playerTeam[0].currentHp

    const result = applyPlayerTap(battle) // weak attacker, won't faint the tanky opener

    expect(result.enemyTeam[0].currentHp).toBeGreaterThan(0)
    expect(result.playerTeam[0].currentHp).toBe(beforeHp)
  })

  it('declares victory only after the last trainer\'s last Pokémon faints', () => {
    const gen1 = [makeEntry({ id: 1 })]
    let battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [
        { entry: weakEntry(74), level: 12, trainerName: 'Lorelei' },
        { entry: weakEntry(95), level: 14, trainerName: 'Bruno' },
      ],
    )

    battle = applyPlayerTap(battle)
    expect(battle.outcome).toBe('ongoing')

    battle = applyPlayerTap(battle)
    expect(battle.outcome).toBe('victory')
  })
})

describe('currentTrainerProgress', () => {
  it('is null for single-trainer fights (wild, gym — empty trainerBoundaries)', () => {
    const gen1 = [makeEntry({ id: 1 })]
    const battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: makeEntry({ id: 19 }), level: 5 }])

    expect(currentTrainerProgress(battle)).toBeNull()
  })

  it('reports the current trainer name and position within their team', () => {
    const gen1 = [makeEntry({ id: 1 })]
    const battle = createBattle(
      gen1,
      [makeMember(1)],
      [1],
      [
        { entry: makeEntry({ id: 74 }), level: 12, trainerName: 'Lorelei' },
        { entry: makeEntry({ id: 91 }), level: 13 },
        { entry: makeEntry({ id: 95 }), level: 14, trainerName: 'Bruno' },
      ],
    )

    expect(currentTrainerProgress(battle)).toEqual({ name: 'Lorelei', position: 1, size: 2 })
    expect(currentTrainerProgress({ ...battle, enemyIndex: 1 })).toEqual({ name: 'Lorelei', position: 2, size: 2 })
    expect(currentTrainerProgress({ ...battle, enemyIndex: 2 })).toEqual({ name: 'Bruno', position: 1, size: 1 })
  })
})

describe('type effectiveness', () => {
  const neutralStats = { hp: 1000, attack: 50, defense: 20, 'special-attack': 50, 'special-defense': 20, speed: 10 }

  it('deals more damage and reports "super" for a super-effective attack', () => {
    const fireAttacker = makeEntry({ id: 1, types: ['fire'], stats: neutralStats })
    const grassDefender = makeEntry({ id: 19, types: ['grass'], stats: neutralStats })
    const gen1 = [fireAttacker]
    const battle = createBattle(gen1, [makeMember(1)], [1], [{ entry: grassDefender, level: 10 }])

    const superHit = applyPlayerTap(battle)
    const neutralBattle = createBattle(
      [makeEntry({ id: 1, types: ['normal'], stats: neutralStats })],
      [makeMember(1)],
      [1],
      [{ entry: makeEntry({ id: 19, types: ['grass'], stats: neutralStats }), level: 10 }],
    )
    const neutralHit = applyPlayerTap(neutralBattle)

    expect(superHit.lastHit).toEqual({ source: 'player', tier: 'super' })
    const superDamage = battle.enemyTeam[0].currentHp - superHit.enemyTeam[0].currentHp
    const neutralDamage = neutralBattle.enemyTeam[0].currentHp - neutralHit.enemyTeam[0].currentHp
    expect(superDamage).toBeGreaterThan(neutralDamage)
  })

  it('deals less damage and reports "weak" for a not-very-effective attack', () => {
    const fireAttacker = makeEntry({ id: 1, types: ['fire'], stats: neutralStats })
    const waterDefender = makeEntry({ id: 19, types: ['water'], stats: neutralStats })
    const battle = createBattle([fireAttacker], [makeMember(1)], [1], [{ entry: waterDefender, level: 10 }])

    const result = applyPlayerTap(battle)

    expect(result.lastHit).toEqual({ source: 'player', tier: 'weak' })
  })

  it('applies the same effectiveness lookup to enemy attacks', () => {
    const waterAttacker = makeEntry({ id: 19, types: ['water'], stats: neutralStats })
    const fireDefender = makeEntry({ id: 1, types: ['fire'], stats: neutralStats })
    const battle = createBattle([fireDefender], [makeMember(1)], [1], [{ entry: waterAttacker, level: 10 }])

    const result = applyEnemyAttack(battle)

    expect(result.lastHit).toEqual({ source: 'enemy', tier: 'super' })
  })
})

describe('hasQte', () => {
  it('is true for all 18 types as of Sprint 17', () => {
    for (const type of TYPES) {
      expect(hasQte(type.id)).toBe(true)
    }
  })
})

describe('switchActive', () => {
  it('switches to a different living team member', () => {
    const gen1 = [makeEntry({ id: 1 }), makeEntry({ id: 4, name: 'charmander' })]
    const battle = createBattle(gen1, [makeMember(1), makeMember(4)], [1, 4], [{ entry: makeEntry({ id: 19 }), level: 5 }])

    const result = switchActive(battle, 1)
    expect(result.activeIndex).toBe(1)
  })

  it('refuses to switch to a fainted member', () => {
    const gen1 = [makeEntry({ id: 1 }), makeEntry({ id: 4, name: 'charmander' })]
    const battle = createBattle(gen1, [makeMember(1), makeMember(4)], [1, 4], [{ entry: makeEntry({ id: 19 }), level: 5 }])
    const fainted = { ...battle, playerTeam: battle.playerTeam.map((unit, i) => (i === 1 ? { ...unit, currentHp: 0 } : unit)) }

    expect(switchActive(fainted, 1)).toEqual(fainted)
  })
})
