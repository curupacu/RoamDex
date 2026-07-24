// Placeholder fixed opponent (roadmap Sprint 13: "inimigo fixo de teste")
// — real wild encounters with proper level scaling come in Sprint 18.
// This exists purely so the battle engine is playable before that system
// exists.
export const TEST_OPPONENT_SPECIES_ID = 19 // Rattata
export const TEST_OPPONENT_LEVEL = 5

// Provisional — Sprint 25 ("Balanceamento") tunes these.
export const ENEMY_ATTACK_INTERVAL_MS = 3_000
export const TELEGRAPH_WINDOW_MS = 800

// "XP vem de batalhas (todo o time ganha; o ativo ganha mais)" — roadmap
// section 7. The active slot gets TEAM + ACTIVE_BONUS, everyone else gets
// just TEAM.
export const BATTLE_XP_TEAM = 15
export const BATTLE_XP_ACTIVE_BONUS = 15
