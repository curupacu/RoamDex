import type { Gen1Entry } from '../../content/gen1/types'

// Provisional growth rate — Sprint 25 ("Balanceamento") does the real tuning
// with simulation data. Bumped from 0.03 after playtest: at 3%/level, a
// level 5 starter could solo a level ~21 gym team (Lt. Surge) because level
// barely moved the stats — a level-25 Pokémon was only ~1.5x a level-5 one
// of the same species. 0.1 puts that ratio closer to ~3x (roughly what the
// real games' level curve does over the same range), so being badly
// underleveled for a gym is a real wall again, without touching the
// same-level matchups (early routes/wild encounters) much.
const STAT_GROWTH_PER_LEVEL = 0.1

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
