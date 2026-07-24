import { describe, expect, it, vi } from 'vitest'
import { captureChance, rollCapture } from './capture'

describe('captureChance', () => {
  it('scales with captureRate, clamped between 5% and 95%', () => {
    expect(captureChance(0, 1)).toBe(0.05)
    expect(captureChance(255, 1)).toBe(0.95)
    expect(captureChance(127.5, 1)).toBeCloseTo(0.5, 1)
  })

  it('is boosted by a bonus multiplier, still capped at 95%', () => {
    expect(captureChance(255, 2)).toBe(0.95)
    expect(captureChance(100, 1.5)).toBeGreaterThan(captureChance(100, 1))
  })
})

describe('rollCapture', () => {
  it('succeeds when the roll is below the chance', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)
    expect(rollCapture(255, 1)).toBe(true)
    vi.restoreAllMocks()
  })

  it('fails when the roll is above the chance', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    expect(rollCapture(0, 1)).toBe(false)
    vi.restoreAllMocks()
  })
})
