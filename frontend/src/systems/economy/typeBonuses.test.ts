import { describe, expect, it } from 'vitest'
import { BONUS_PERCENT_PER_POKEMON, DRAGON_ALL_STATS_PERCENT, type TypeName } from '../../content/types'
import { bonusBreakdown, economyMultiplier, teamTypeWeights, upgradeCostMultiplier, type TeamMember } from './typeBonuses'

function member(...types: TypeName[]): TeamMember {
  return { types }
}

describe('teamTypeWeights', () => {
  it('gives full weight to the primary type and half to the secondary', () => {
    const weights = teamTypeWeights([member('grass', 'poison')])
    expect(weights.grass).toBe(1)
    expect(weights.poison).toBe(0.5)
  })

  it('sums weights across multiple team members', () => {
    const weights = teamTypeWeights([member('grass'), member('water', 'grass')])
    expect(weights.grass).toBe(1.5)
    expect(weights.water).toBe(1)
  })

  it('is empty for an empty team', () => {
    expect(teamTypeWeights([])).toEqual({})
  })
})

describe('economyMultiplier', () => {
  it('is 1 (no bonus) for an empty team', () => {
    expect(economyMultiplier([], 'cps')).toBe(1)
  })

  it('applies the grass CPS bonus for a full-weight grass type', () => {
    const team = [member('grass')]
    expect(economyMultiplier(team, 'cps')).toBeCloseTo(1 + BONUS_PERCENT_PER_POKEMON)
  })

  it('combines multiple types mapped to the same bonus kind (grass + water both feed cps)', () => {
    const team = [member('grass'), member('water')]
    expect(economyMultiplier(team, 'cps')).toBeCloseTo(1 + BONUS_PERCENT_PER_POKEMON * 2)
  })

  it('adds the Dragon "bonus to everything" on top of other kinds', () => {
    const team = [member('grass'), member('dragon')]
    expect(economyMultiplier(team, 'cps')).toBeCloseTo(1 + BONUS_PERCENT_PER_POKEMON + DRAGON_ALL_STATS_PERCENT)
  })

  it('does not double Dragon into its own allStatsSmall kind', () => {
    const team = [member('dragon')]
    expect(economyMultiplier(team, 'allStatsSmall')).toBeCloseTo(1 + DRAGON_ALL_STATS_PERCENT)
  })
})

describe('upgradeCostMultiplier', () => {
  it('is 1 (no discount) for an empty team', () => {
    expect(upgradeCostMultiplier([])).toBe(1)
  })

  it('discounts costs for the Ice type', () => {
    const team = [member('ice')]
    expect(upgradeCostMultiplier(team)).toBeCloseTo(1 - BONUS_PERCENT_PER_POKEMON)
  })

  it('never goes negative even with an implausibly large discount', () => {
    const team = Array.from({ length: 200 }, () => member('ice'))
    expect(upgradeCostMultiplier(team)).toBe(0)
  })
})

describe('bonusBreakdown', () => {
  it('lists every type present on the team, live or not', () => {
    const team = [member('grass', 'poison')]
    const breakdown = bonusBreakdown(team)

    const grass = breakdown.find((entry) => entry.typeId === 'grass')
    const poison = breakdown.find((entry) => entry.typeId === 'poison')

    expect(grass?.isLive).toBe(true)
    expect(grass?.percent).toBeCloseTo(BONUS_PERCENT_PER_POKEMON)
    expect(poison?.isLive).toBe(false)
    expect(poison?.percent).toBeCloseTo(BONUS_PERCENT_PER_POKEMON * 0.5)
  })

  it('marks Voador/Inseto/Fada as live now that encounters and capture exist (Sprints 18-19)', () => {
    const team = [member('flying'), member('bug'), member('fairy')]
    const breakdown = bonusBreakdown(team)

    expect(breakdown.find((entry) => entry.typeId === 'flying')?.isLive).toBe(true)
    expect(breakdown.find((entry) => entry.typeId === 'bug')?.isLive).toBe(true)
    expect(breakdown.find((entry) => entry.typeId === 'fairy')?.isLive).toBe(true)
  })
})
