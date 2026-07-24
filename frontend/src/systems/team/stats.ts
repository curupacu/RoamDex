import type { Gen1Entry } from '../../content/gen1/types'

// Provisional growth rate — Sprint 25 ("Balanceamento") tunes this.
const STAT_GROWTH_PER_LEVEL = 0.03

export interface DerivedStats {
  hp: number
  atk: number
  def: number
}

// Roadmap section 4 (decisão proposta): HP = base_hp, ATK = max(attack,
// sp_attack), DEF = média(defense, sp_defense) — then scaled by level,
// since the base formula alone wouldn't grow with the level Sprint 11
// just introduced.
export function deriveStats(entry: Gen1Entry, level: number): DerivedStats {
  const growth = 1 + (level - 1) * STAT_GROWTH_PER_LEVEL
  return {
    hp: Math.round(entry.stats.hp * growth),
    atk: Math.round(Math.max(entry.stats.attack, entry.stats['special-attack']) * growth),
    def: Math.round(((entry.stats.defense + entry.stats['special-defense']) / 2) * growth),
  }
}
