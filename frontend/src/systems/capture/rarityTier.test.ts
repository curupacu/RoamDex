import { describe, expect, it } from 'vitest'
import { rarityTier } from './rarityTier'

describe('rarityTier', () => {
  it('is common at or above 150', () => {
    expect(rarityTier(255)).toBe('common')
    expect(rarityTier(150)).toBe('common')
  })

  it('is uncommon between 50 and 149', () => {
    expect(rarityTier(149)).toBe('uncommon')
    expect(rarityTier(50)).toBe('uncommon')
  })

  it('is rare below 50', () => {
    expect(rarityTier(49)).toBe('rare')
    expect(rarityTier(3)).toBe('rare')
  })
})
