import { describe, expect, it, vi } from 'vitest'
import { makeRegionSave } from '../../engine/save.testUtils'
import { addBalls, ballCount, buyBall, captureOptions, isBallAvailable, rollLootBall, spendBall } from './pokeballs'

describe('ballCount', () => {
  it('is 0 for a ball never owned', () => {
    expect(ballCount(makeRegionSave(), 'great-ball')).toBe(0)
  })
})

describe('isBallAvailable', () => {
  it('is always true for the base Pokébola (no cost, infinite)', () => {
    expect(isBallAvailable(makeRegionSave(), { id: 'poke-ball', name: 'Pokébola', catchMultiplier: 1 })).toBe(true)
  })

  it('is false for a finite ball with none owned, true once owned', () => {
    const def = { id: 'great-ball', name: 'Great Ball', catchMultiplier: 1.5, cost: 300 }
    expect(isBallAvailable(makeRegionSave(), def)).toBe(false)
    expect(isBallAvailable(makeRegionSave({ pokeballs: { 'great-ball': 1 } }), def)).toBe(true)
  })
})

describe('addBalls / spendBall', () => {
  it('adds to the owned count', () => {
    const region = addBalls(makeRegionSave(), 'great-ball', 2)
    expect(ballCount(region, 'great-ball')).toBe(2)
  })

  it('spends one ball on a throw', () => {
    const region = addBalls(makeRegionSave(), 'great-ball', 2)
    expect(ballCount(spendBall(region, 'great-ball'), 'great-ball')).toBe(1)
  })

  it('is a no-op spending a ball with none owned', () => {
    const region = makeRegionSave()
    expect(spendBall(region, 'great-ball')).toBe(region)
  })

  it('is a no-op spending the infinite base Pokébola (never tracked)', () => {
    const region = makeRegionSave()
    expect(spendBall(region, 'poke-ball')).toBe(region)
  })
})

describe('buyBall', () => {
  it('deducts candies and adds one ball when affordable', () => {
    const region = buyBall(makeRegionSave({ candies: 300 }), 'great-ball')
    expect(region.candies).toBe(0)
    expect(ballCount(region, 'great-ball')).toBe(1)
  })

  it('is a no-op when candies are short', () => {
    const region = makeRegionSave({ candies: 299 })
    expect(buyBall(region, 'great-ball')).toBe(region)
  })

  it('is a no-op for the infinite base Pokébola (not purchasable)', () => {
    const region = makeRegionSave({ candies: 999_999 })
    expect(buyBall(region, 'poke-ball')).toBe(region)
  })
})

describe('captureOptions', () => {
  it('returns one row per ball, folding its catchMultiplier into the given bonus', () => {
    const region = addBalls(makeRegionSave(), 'great-ball', 3)
    const options = captureOptions(region, 100, 1)

    const pokeBall = options.find((option) => option.id === 'poke-ball')!
    const greatBall = options.find((option) => option.id === 'great-ball')!
    const ultraBall = options.find((option) => option.id === 'ultra-ball')!

    expect(pokeBall.count).toBeNull()
    expect(greatBall.count).toBe(3)
    expect(ultraBall.count).toBe(0)
    // Higher catchMultiplier -> higher chance, same captureRate/bonus otherwise.
    expect(greatBall.chance).toBeGreaterThan(pokeBall.chance)
    expect(ultraBall.chance).toBeGreaterThan(greatBall.chance)
  })
})

describe('rollLootBall', () => {
  it('only ever picks a ball that has a lootWeight (never the infinite base)', () => {
    for (const value of [0, 0.5, 0.99]) {
      vi.spyOn(Math, 'random').mockReturnValue(value)
      expect(rollLootBall().id).not.toBe('poke-ball')
      vi.restoreAllMocks()
    }
  })

  it('picks Great Ball on a low roll and Ultra Ball on a high roll (Great Ball weighted more common)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(rollLootBall().id).toBe('great-ball')
    vi.restoreAllMocks()

    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    expect(rollLootBall().id).toBe('ultra-ball')
    vi.restoreAllMocks()
  })
})
