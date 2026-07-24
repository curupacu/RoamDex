import { describe, expect, it } from 'vitest'
import { makeSave as makeSaveWithOverrides } from './save.testUtils'
import { calculateOfflineProgress, formatDuration, MAX_OFFLINE_MS, shouldShowOfflineBanner } from './offlineProgress'

function makeSave(lastSavedAt: number) {
  return makeSaveWithOverrides({ lastSavedAt })
}

describe('calculateOfflineProgress', () => {
  it('earns cps × elapsed seconds', () => {
    const save = makeSave(0)
    const progress = calculateOfflineProgress(save, 10_000, 2)
    expect(progress.elapsedMs).toBe(10_000)
    expect(progress.candiesEarned).toBe(20)
  })

  it('caps elapsed time at MAX_OFFLINE_MS', () => {
    const save = makeSave(0)
    const progress = calculateOfflineProgress(save, MAX_OFFLINE_MS * 2, 1)
    expect(progress.elapsedMs).toBe(MAX_OFFLINE_MS)
    expect(progress.candiesEarned).toBe(MAX_OFFLINE_MS / 1000)
  })

  it('clamps negative gaps (clock skew) to zero', () => {
    const save = makeSave(10_000)
    const progress = calculateOfflineProgress(save, 5_000, 5)
    expect(progress.elapsedMs).toBe(0)
    expect(progress.candiesEarned).toBe(0)
  })

  it('earns nothing with no CPS regardless of elapsed time', () => {
    const save = makeSave(0)
    const progress = calculateOfflineProgress(save, 3_600_000, 0)
    expect(progress.candiesEarned).toBe(0)
  })
})

describe('shouldShowOfflineBanner', () => {
  it('hides the banner for brief gaps', () => {
    expect(shouldShowOfflineBanner({ elapsedMs: 5_000, candiesEarned: 0 })).toBe(false)
  })

  it('shows the banner once the gap is meaningful', () => {
    expect(shouldShowOfflineBanner({ elapsedMs: 60_000, candiesEarned: 10 })).toBe(true)
  })
})

describe('formatDuration', () => {
  it('formats sub-hour durations as minutes only', () => {
    expect(formatDuration(45 * 60_000)).toBe('45min')
  })

  it('formats durations over an hour as hours and minutes', () => {
    expect(formatDuration(90 * 60_000)).toBe('1h 30min')
  })
})
