// Placeholder fixed opponent (roadmap Sprint 13: "inimigo fixo de teste")
// — real wild encounters with proper level scaling come in Sprint 18.
// This exists purely so the battle engine is playable before that system
// exists.
export const TEST_OPPONENT_SPECIES_ID = 19 // Rattata
export const TEST_OPPONENT_LEVEL = 5

// Provisional — Sprint 25 ("Balanceamento") tunes these for real. Bumped
// down from 3000/800 after playtest: player taps have no cooldown at all
// (bounded only by how fast someone can click, easily several/s, plus a
// super roughly every 4th tap), so a fixed 3s enemy cooldown meant the
// enemy barely got to swing at all next to the player's pace — it read as
// "player chains ults every second, enemy plods in once in a while for
// scraps" regardless of how hard that one hit landed. Halving the interval
// keeps enemy attacks roughly in step with a natural tap/super cadence
// instead of once every several player actions.
export const ENEMY_ATTACK_INTERVAL_MS = 1_500
export const TELEGRAPH_WINDOW_MS = 500

// "XP vem de batalhas (todo o time ganha; o ativo ganha mais)" — roadmap
// section 7. The active slot gets TEAM + ACTIVE_BONUS, everyone else gets
// just TEAM. Provisional — Sprint 25 ("Balanceamento").
//
// Escala com o nível do time inimigo (mesmo espírito de
// systems/capture/loot.ts's `BASE_LOOT_CANDIES + enemyLevel *
// LOOT_CANDIES_PER_LEVEL`) — achado nas simulações de
// tests/simulations/: com XP fixo, batalhar (a fonte PRINCIPAL de XP
// segundo o roadmap) mal fazia cócegas na curva de XP real
// (xpForNextLevel escala ~nível^1.8) — levaria dezenas de horas só de
// batalha pra alcançar o nível da Elite Four. Escalando por nível, lutar
// contra selvagens/ginásios mais fortes conforme a run avança rende XP
// proporcionalmente maior, acompanhando a mesma curva.
export const BATTLE_XP_PER_ENEMY_LEVEL = 2
export const BATTLE_XP_ACTIVE_BONUS_PER_ENEMY_LEVEL = 2

// enemyLevel = nível médio do time inimigo inteiro que acabou de cair
// (BattleScreen.tsx computa isso a partir do battle.enemyTeam) — pra
// ginásios/Elite Four (times de vários Pokémon), isso já rende mais XP
// que um selvagem comum sem precisar reestruturar pra "XP por Pokémon
// derrotado dentro da luta".
export function battleXpForVictory(enemyLevel: number): { team: number; activeBonus: number } {
  return {
    team: enemyLevel * BATTLE_XP_PER_ENEMY_LEVEL,
    activeBonus: enemyLevel * BATTLE_XP_ACTIVE_BONUS_PER_ENEMY_LEVEL,
  }
}
