// Candy Shop items (roadmap section 7 / Sprint 12). Only items with a
// live system today: Rare Candy (leveling, Sprint 11) and an XP boost
// buff. +ATK and +captura buffs from the roadmap wording aren't sold
// yet — there's no battle (Sprint 13+) or capture (Sprint 19) system to
// give them an effect. See docs/decisoes/0005-*.md.

// Provisional — Sprint 25 ("Balanceamento") tunes these.
export const RARE_CANDY_BASE_COST = 500
export const RARE_CANDY_COST_PER_LEVEL = 50

export function rareCandyCost(level: number): number {
  return RARE_CANDY_BASE_COST + RARE_CANDY_COST_PER_LEVEL * level
}

export const XP_BOOST_ID = 'xp-boost'
export const XP_BOOST_COST = 300
export const XP_BOOST_DURATION_MS = 10 * 60 * 1000
export const XP_BOOST_MULTIPLIER = 2
