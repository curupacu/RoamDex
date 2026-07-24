import type { SaveData } from './save'

// Provisional cap — Sprint 25 ("Balanceamento") is where this gets tuned
// against real play-simulation data.
export const MAX_OFFLINE_MS = 8 * 60 * 60 * 1000

// Below this gap, a "while you were away" banner is just noise (tab
// switches, quick refreshes) rather than a meaningful absence.
const MIN_OFFLINE_MS_TO_SHOW = 60_000

export interface OfflineProgress {
  elapsedMs: number
  candiesEarned: number
}

// Timestamp-diff based, per CLAUDE.md rule 4 — never derived from frames
// or a running interval, since the app wasn't running while offline.
export function calculateOfflineProgress(save: SaveData, now: number, cps: number): OfflineProgress {
  const elapsedMs = Math.min(Math.max(0, now - save.lastSavedAt), MAX_OFFLINE_MS)
  return { elapsedMs, candiesEarned: (cps * elapsedMs) / 1000 }
}

export function shouldShowOfflineBanner(progress: OfflineProgress): boolean {
  return progress.elapsedMs >= MIN_OFFLINE_MS_TO_SHOW
}

export function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60_000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return hours === 0 ? `${minutes}min` : `${hours}h ${minutes}min`
}
