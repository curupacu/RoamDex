import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GameLoop, LOGICAL_TICK_MS } from './gameLoop'

describe('GameLoop', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('sums deltas to the real elapsed time even with irregular tick timing', () => {
    const loop = new GameLoop()
    let totalDelta = 0
    loop.subscribe((deltaMs) => {
      totalDelta += deltaMs
    })

    loop.start()

    // Simulates background-tab throttling: ticks fire late and irregularly,
    // but deltaMs is derived from real timestamps, so nothing is lost.
    vi.advanceTimersByTime(LOGICAL_TICK_MS * 3) // one throttled batch
    vi.advanceTimersByTime(LOGICAL_TICK_MS * 20) // another
    vi.advanceTimersByTime(LOGICAL_TICK_MS * 7)

    loop.stop()

    expect(totalDelta).toBe(LOGICAL_TICK_MS * 30)
  })

  it('stops notifying listeners after stop()', () => {
    const loop = new GameLoop()
    const listener = vi.fn()
    loop.subscribe(listener)

    loop.start()
    vi.advanceTimersByTime(LOGICAL_TICK_MS)
    loop.stop()
    const callsAfterStop = listener.mock.calls.length
    vi.advanceTimersByTime(LOGICAL_TICK_MS * 5)

    expect(listener.mock.calls.length).toBe(callsAfterStop)
  })

  it('unsubscribe removes only that listener', () => {
    const loop = new GameLoop()
    const a = vi.fn()
    const b = vi.fn()
    const unsubA = loop.subscribe(a)
    loop.subscribe(b)

    loop.start()
    vi.advanceTimersByTime(LOGICAL_TICK_MS)
    unsubA()
    vi.advanceTimersByTime(LOGICAL_TICK_MS)
    loop.stop()

    expect(a).toHaveBeenCalledTimes(1)
    expect(b).toHaveBeenCalledTimes(2)
  })
})
