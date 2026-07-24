import { describe, expect, it } from 'vitest'
import { typeEffectiveness } from './typeEffectiveness'

describe('typeEffectiveness', () => {
  it('is 2x for a super-effective matchup', () => {
    expect(typeEffectiveness('fire', 'grass')).toBe(2)
  })

  it('is 0.5x for a not-very-effective matchup', () => {
    expect(typeEffectiveness('fire', 'water')).toBe(0.5)
  })

  it('defaults to 1x for an unlisted (neutral) matchup', () => {
    expect(typeEffectiveness('normal', 'fire')).toBe(1)
  })

  it('folds traditional immunities into 0.5x instead of a 4th tier', () => {
    // Normal is traditionally immune to Ghost (0x) in the real games.
    expect(typeEffectiveness('normal', 'ghost')).toBe(0.5)
  })
})
