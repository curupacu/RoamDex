// Candy Shop items (roadmap section 7 / Sprint 12). Reformulados na
// decisão 0053: Rare Candy virou injeção parcial de XP com desconto por
// insígnias (em vez de 1 nível de graça, desconectado do resto do jogo),
// e Reforço de treino virou uma cadeia curta de tiers (duração e
// multiplicador maiores, gatilhados por doces vitalícias/insígnias/posse
// de tiers de Treinamento) em vez de um botão estático pra sempre.

// Provisional — Sprint 25 ("Balanceamento") tunes these.
export const RARE_CANDY_BASE_COST = 500
export const RARE_CANDY_COST_PER_LEVEL = 50
// Em vez de dar 1 nível inteiro de graça (trivializava a curva
// xpForNextLevel ~ level^1.8), cada compra injeta só uma fração do XP do
// PRÓXIMO nível do alvo — o custo abaixo já é escalado pela mesma fração,
// então "completar" 1 nível em pedaços custa perto do mesmo total de
// antes, só que passando pelo pipeline normal de XP (gainMemberXp), que já
// lida com multi-level-up e evolução sozinho.
export const RARE_CANDY_XP_FRACTION = 0.4
// Fica mais barato (em %) conforme o save já tem mais insígnias — dá ao
// Rare Candy uma leitura temática ("a Liga confia mais doce a quem já
// provou valor"), em vez de só depender do nível do alvo.
export const RARE_CANDY_BADGE_DISCOUNT_PER_BADGE = 0.04
export const RARE_CANDY_MAX_BADGE_DISCOUNT = 0.6

export interface XpBoostTier {
  id: string
  unlockAt: number
  requiresBadges: number
  // Liga este tier a um upgrade de Treinamento específico (Padrão 5-like,
  // mas checado à mão aqui já que Reforço não é um UpgradeDefinition de
  // região) — precisa possuir esse upgrade antes do tier ficar disponível,
  // unindo as duas peças da "loja de XP" numa progressão só.
  requiresTrainingUpgradeId?: string
  cost: number
  multiplier: number
  durationMs: number
}

export const XP_BOOST_ID = 'xp-boost'
// Guarda o multiplicador do tier ATIVO dentro de RegionSave.buffs — não é
// um timestamp de expiração como a chave XP_BOOST_ID, é um valor direto.
// Necessário porque tiers diferentes têm multiplicadores diferentes: sem
// isso, xpMultiplierFromBuffs não saberia qual valor usar enquanto o
// boost está rodando.
export const XP_BOOST_MULTIPLIER_KEY = 'xp-boost-multiplier'

export const XP_BOOST_TIERS: XpBoostTier[] = [
  { id: 'reforco-1', unlockAt: 0, requiresBadges: 0, cost: 300, multiplier: 2, durationMs: 10 * 60 * 1000 },
  {
    id: 'reforco-2',
    unlockAt: 40_000,
    requiresBadges: 2,
    requiresTrainingUpgradeId: 'training-drills',
    cost: 1_500,
    multiplier: 2.5,
    durationMs: 15 * 60 * 1000,
  },
  {
    id: 'reforco-3',
    unlockAt: 200_000,
    requiresBadges: 5,
    requiresTrainingUpgradeId: 'training-simulator',
    cost: 8_000,
    multiplier: 3,
    durationMs: 20 * 60 * 1000,
  },
]
