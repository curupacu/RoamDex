export type RarityTier = 'common' | 'uncommon' | 'rare'

// Thresholds on the real PokeAPI capture_rate (0-255, higher = easier to
// catch = more common in the wild). Provisional cutoffs — Sprint 25
// ("Balanceamento") tunes these against real species distribution.
export function rarityTier(captureRate: number): RarityTier {
  if (captureRate >= 150) return 'common'
  if (captureRate >= 50) return 'uncommon'
  return 'rare'
}

export const RARITY_LABELS: Record<RarityTier, string> = {
  common: 'comum',
  uncommon: 'incomum',
  rare: 'raro',
}
