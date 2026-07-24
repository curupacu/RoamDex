import { describe, expect, it } from 'vitest'
import type { Gen1Entry } from '../../content/gen1/types'
import { TYPES } from '../../content/types'
import type { RosterMember } from '../../engine/save'
import {
  applyEnemyAttack,
  applyPlayerTap,
  createBattle,
  ENERGY_MAX,
  ENERGY_PER_TAP,
  hasQte,
  resolveQteAttack,
  switchActive,
} from './engine'

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

function makeMember(speciesId: number, level = 10): RosterMember {
  return { speciesId, level, xp: 0 }
}

describe('createBattle', () => {
  it('builds full-HP units for the enemy and every active team member', () => {
    const gen1 = [makeEntry({ id: 1 }), makeEntry({ id: 4, name: 'charmander' })]
    const battle = createBattle(gen1, [makeMember(1), makeMember(4)], [1, 4], makeEntry({ id: 19, name: 'rattata' }), 5)

    expect(battle.playerTeam).toHaveLength(2)
    expect(battle.playerTeam[0].currentHp).toBe(battle.playerTeam[0].maxHp)
    expect(battle.enemy.currentHp).toBe(battle.enemy.maxHp)
    expect(battle.outcome).toBe('ongoing')
  })

  it('starts in defeat if there is no active team (defensive — should not happen post new-game)', () => {
    const battle = createBattle([], [], [], makeEntry({ id: 19 }), 5)
    expect(battle.outcome).toBe('defeat')
  })
})

describe('applyPlayerTap', () => {
  it('deals basic damage and fills energy', () => {
    const gen1 = [makeEntry()]
    const battle = createBattle(gen1, [makeMember(1)], [1], makeEntry({ id: 19, stats: { hp: 1000, attack: 10, defense: 10, 'special-attack': 10, 'special-defense': 10, speed: 10 } }), 5)

    const result = applyPlayerTap(battle)

    expect(result.enemy.currentHp).toBeLessThan(battle.enemy.currentHp)
    expect(result.energy).toBe(ENERGY_PER_TAP)
  })

  it('deals a bigger hit and resets energy once full (defensive: a type with no QTE config, flat multiplier)', () => {
    // All 18 real types have a QTE as of Sprint 17 — this fabricated type
    // exercises the fallback path in case content/moves.ts ever has a gap
    // (e.g. a future 19th type not wired up yet).
    const gen1 = [makeEntry({ types: ['unconfigured-type' as Gen1Entry['types'][number]] })]
    let battle = createBattle(gen1, [makeMember(1)], [1], makeEntry({ id: 19, stats: { hp: 100_000, attack: 10, defense: 10, 'special-attack': 10, 'special-defense': 10, speed: 10 } }), 5)
    battle = { ...battle, energy: ENERGY_MAX }

    const beforeHp = battle.enemy.currentHp
    const result = applyPlayerTap(battle)
    const superDamage = beforeHp - result.enemy.currentHp

    expect(result.energy).toBe(0)

    const basicOnly = applyPlayerTap({ ...battle, energy: 0 })
    const basicDamage = beforeHp - basicOnly.enemy.currentHp
    expect(superDamage).toBeGreaterThan(basicDamage)
  })

  it('declares victory once the enemy HP reaches 0', () => {
    const gen1 = [makeEntry()]
    const weakEnemy = makeEntry({ id: 19, stats: { hp: 1, attack: 1, defense: 0, 'special-attack': 1, 'special-defense': 0, speed: 1 } })
    const battle = createBattle(gen1, [makeMember(1)], [1], weakEnemy, 1)

    const result = applyPlayerTap(battle)

    expect(result.enemy.currentHp).toBe(0)
    expect(result.outcome).toBe('victory')
  })

  it('is a no-op once the battle is over', () => {
    const gen1 = [makeEntry()]
    const weakEnemy = makeEntry({ id: 19, stats: { hp: 1, attack: 1, defense: 0, 'special-attack': 1, 'special-defense': 0, speed: 1 } })
    const battle = applyPlayerTap(createBattle(gen1, [makeMember(1)], [1], weakEnemy, 1))

    expect(applyPlayerTap(battle)).toEqual(battle)
  })

  it('opens the QTE instead of dealing damage when energy is full and the type has one (grass)', () => {
    const gen1 = [makeEntry({ types: ['grass'] })]
    let battle = createBattle(gen1, [makeMember(1)], [1], makeEntry({ id: 19 }), 5)
    battle = { ...battle, energy: ENERGY_MAX }

    const result = applyPlayerTap(battle)

    expect(result.awaitingQte).toBe('grass')
    expect(result.enemy.currentHp).toBe(battle.enemy.currentHp)
    expect(result.energy).toBe(ENERGY_MAX)
  })

  it('opens the QTE for a Sprint 16 "leva 2" type too (rock)', () => {
    const gen1 = [makeEntry({ types: ['rock'] })]
    let battle = createBattle(gen1, [makeMember(1)], [1], makeEntry({ id: 19 }), 5)
    battle = { ...battle, energy: ENERGY_MAX }

    expect(applyPlayerTap(battle).awaitingQte).toBe('rock')
  })

  it('is blocked while awaiting a QTE result', () => {
    const gen1 = [makeEntry({ types: ['grass'] })]
    let battle = createBattle(gen1, [makeMember(1)], [1], makeEntry({ id: 19 }), 5)
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
      let battle = createBattle(gen1, [makeMember(1)], [1], enemy, 5)
      battle = { ...battle, energy: ENERGY_MAX }
      return applyPlayerTap(battle)
    }

    const full = resolveQteAttack(makeAwaiting(), 'full')
    const partial = resolveQteAttack(makeAwaiting(), 'partial')
    const weak = resolveQteAttack(makeAwaiting(), 'weak')

    expect(full.awaitingQte).toBeNull()
    expect(full.energy).toBe(0)

    const fullDamage = 100_000 - full.enemy.currentHp
    const partialDamage = 100_000 - partial.enemy.currentHp
    const weakDamage = 100_000 - weak.enemy.currentHp
    expect(fullDamage).toBeGreaterThan(partialDamage)
    expect(partialDamage).toBeGreaterThan(weakDamage)
  })

  it('is a no-op when not awaiting a QTE', () => {
    const gen1 = [makeEntry({ types: ['grass'] })]
    const battle = createBattle(gen1, [makeMember(1)], [1], makeEntry({ id: 19 }), 5)

    expect(resolveQteAttack(battle, 'full')).toEqual(battle)
  })
})

describe('applyEnemyAttack', () => {
  it('damages the active unit', () => {
    const gen1 = [makeEntry()]
    const strongEnemy = makeEntry({ id: 19, stats: { hp: 100, attack: 200, defense: 10, 'special-attack': 200, 'special-defense': 10, speed: 10 } })
    const battle = createBattle(gen1, [makeMember(1)], [1], strongEnemy, 20)

    const result = applyEnemyAttack(battle)

    expect(result.playerTeam[0].currentHp).toBeLessThan(battle.playerTeam[0].maxHp)
  })

  it('auto-switches to the next living member when the active one faints', () => {
    const gen1 = [makeEntry({ id: 1 }), makeEntry({ id: 4, name: 'charmander' })]
    const oneHitKill = makeEntry({ id: 19, stats: { hp: 100, attack: 100_000, defense: 10, 'special-attack': 100_000, 'special-defense': 10, speed: 10 } })
    const battle = createBattle(gen1, [makeMember(1), makeMember(4)], [1, 4], oneHitKill, 50)

    const result = applyEnemyAttack(battle)

    expect(result.playerTeam[0].currentHp).toBe(0)
    expect(result.activeIndex).toBe(1)
    expect(result.outcome).toBe('ongoing')
  })

  it('declares defeat once every team member has fainted', () => {
    const gen1 = [makeEntry()]
    const oneHitKill = makeEntry({ id: 19, stats: { hp: 100, attack: 100_000, defense: 10, 'special-attack': 100_000, 'special-defense': 10, speed: 10 } })
    const battle = createBattle(gen1, [makeMember(1)], [1], oneHitKill, 50)

    const result = applyEnemyAttack(battle)

    expect(result.outcome).toBe('defeat')
  })
})

describe('type effectiveness', () => {
  const neutralStats = { hp: 1000, attack: 50, defense: 20, 'special-attack': 50, 'special-defense': 20, speed: 10 }

  it('deals more damage and reports "super" for a super-effective attack', () => {
    const fireAttacker = makeEntry({ id: 1, types: ['fire'], stats: neutralStats })
    const grassDefender = makeEntry({ id: 19, types: ['grass'], stats: neutralStats })
    const gen1 = [fireAttacker]
    const battle = createBattle(gen1, [makeMember(1)], [1], grassDefender, 10)

    const superHit = applyPlayerTap(battle)
    const neutralBattle = createBattle(
      [makeEntry({ id: 1, types: ['normal'], stats: neutralStats })],
      [makeMember(1)],
      [1],
      makeEntry({ id: 19, types: ['grass'], stats: neutralStats }),
      10,
    )
    const neutralHit = applyPlayerTap(neutralBattle)

    expect(superHit.lastHit).toEqual({ source: 'player', tier: 'super' })
    const superDamage = battle.enemy.currentHp - superHit.enemy.currentHp
    const neutralDamage = neutralBattle.enemy.currentHp - neutralHit.enemy.currentHp
    expect(superDamage).toBeGreaterThan(neutralDamage)
  })

  it('deals less damage and reports "weak" for a not-very-effective attack', () => {
    const fireAttacker = makeEntry({ id: 1, types: ['fire'], stats: neutralStats })
    const waterDefender = makeEntry({ id: 19, types: ['water'], stats: neutralStats })
    const battle = createBattle([fireAttacker], [makeMember(1)], [1], waterDefender, 10)

    const result = applyPlayerTap(battle)

    expect(result.lastHit).toEqual({ source: 'player', tier: 'weak' })
  })

  it('applies the same effectiveness lookup to enemy attacks', () => {
    const waterAttacker = makeEntry({ id: 19, types: ['water'], stats: neutralStats })
    const fireDefender = makeEntry({ id: 1, types: ['fire'], stats: neutralStats })
    const battle = createBattle([fireDefender], [makeMember(1)], [1], waterAttacker, 10)

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
    const battle = createBattle(gen1, [makeMember(1), makeMember(4)], [1, 4], makeEntry({ id: 19 }), 5)

    const result = switchActive(battle, 1)
    expect(result.activeIndex).toBe(1)
  })

  it('refuses to switch to a fainted member', () => {
    const gen1 = [makeEntry({ id: 1 }), makeEntry({ id: 4, name: 'charmander' })]
    const battle = createBattle(gen1, [makeMember(1), makeMember(4)], [1, 4], makeEntry({ id: 19 }), 5)
    const fainted = { ...battle, playerTeam: battle.playerTeam.map((unit, i) => (i === 1 ? { ...unit, currentHp: 0 } : unit)) }

    expect(switchActive(fainted, 1)).toEqual(fainted)
  })
})
