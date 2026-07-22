import { describe, expect, it } from 'vitest'
import { formatBigNumber } from './numberFormat'

describe('formatBigNumber', () => {
  it('shows small integers plainly', () => {
    expect(formatBigNumber(0)).toBe('0')
    expect(formatBigNumber(42)).toBe('42')
    expect(formatBigNumber(999)).toBe('999')
  })

  it('applies short-scale suffixes', () => {
    expect(formatBigNumber(1000)).toBe('1K')
    expect(formatBigNumber(1500)).toBe('1.5K')
    expect(formatBigNumber(1_000_000)).toBe('1M')
    expect(formatBigNumber(1_234_000_000)).toBe('1.23B')
  })

  it('rolls over to the next tier instead of showing 1000.00K', () => {
    expect(formatBigNumber(999_999)).toBe('1M')
  })

  it('falls back to scientific notation past the suffix table (Dc, 10^33)', () => {
    expect(formatBigNumber(1e36)).toBe('1e36')
  })

  it('keeps the sign for negative numbers', () => {
    expect(formatBigNumber(-1500)).toBe('-1.5K')
  })

  it('handles non-finite input', () => {
    expect(formatBigNumber(Infinity)).toBe('∞')
    expect(formatBigNumber(NaN)).toBe('NaN')
  })
})
