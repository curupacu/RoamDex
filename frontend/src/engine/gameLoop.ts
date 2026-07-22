export type TickListener = (deltaMs: number, now: number) => void

export const LOGICAL_TICK_MS = 100

// Ticks by wall-clock delta (Date.now), not by counting fixed intervals.
// Browsers throttle setInterval in background tabs, but the delta between
// real timestamps stays accurate, so listeners never drift from real time.
export class GameLoop {
  private listeners = new Set<TickListener>()
  private intervalId: ReturnType<typeof setInterval> | null = null
  private lastTick = 0

  subscribe(listener: TickListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  start(): void {
    if (this.intervalId !== null) return
    this.lastTick = Date.now()
    this.intervalId = setInterval(() => this.tick(), LOGICAL_TICK_MS)
  }

  stop(): void {
    if (this.intervalId === null) return
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  get isRunning(): boolean {
    return this.intervalId !== null
  }

  private tick(): void {
    const now = Date.now()
    const deltaMs = now - this.lastTick
    this.lastTick = now
    for (const listener of this.listeners) listener(deltaMs, now)
  }
}
