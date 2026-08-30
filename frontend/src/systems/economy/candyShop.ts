import type { SpeciesEntry } from '../../content/gen1/types'
import {
  RARE_CANDY_BADGE_DISCOUNT_PER_BADGE,
  RARE_CANDY_BASE_COST,
  RARE_CANDY_COST_PER_LEVEL,
  RARE_CANDY_MAX_BADGE_DISCOUNT,
  RARE_CANDY_XP_FRACTION,
  XP_BOOST_ID,
  XP_BOOST_MULTIPLIER_KEY,
  XP_BOOST_TIERS,
  type XpBoostTier,
} from '../../content/shop'
import type { RegionSave } from '../../engine/save'
import { gainMemberXp, xpForNextLevel } from '../team/leveling'
import { rosterMember } from '../team/roster'
import { ownedCount } from './upgrades'

export function rareCandyCost(level: number, badgeCount: number): number {
  const base = (RARE_CANDY_BASE_COST + RARE_CANDY_COST_PER_LEVEL * level) * RARE_CANDY_XP_FRACTION
  const discount = Math.min(RARE_CANDY_MAX_BADGE_DISCOUNT, badgeCount * RARE_CANDY_BADGE_DISCOUNT_PER_BADGE)
  return Math.ceil(base * (1 - discount))
}

// Injeta uma fração do XP do PRÓXIMO nível do alvo (decisão 0053) — não dá
// mais 1 nível de graça, passa pelo pipeline normal de XP (gainMemberXp),
// que já lida com XP fracionário, multi-level-up e evolução sozinho.
export function buyRareCandy(save: RegionSave, speciesData: SpeciesEntry[], speciesId: number): RegionSave {
  const member = rosterMember(save, speciesId)
  if (!member) return save

  const cost = rareCandyCost(member.level, save.badges.length)
  if (save.candies < cost) return save

  const xpGain = xpForNextLevel(member.level) * RARE_CANDY_XP_FRACTION
  return { ...gainMemberXp(save, speciesData, speciesId, xpGain), candies: save.candies - cost }
}

export function isBuffActive(save: RegionSave, buffId: string, now: number): boolean {
  return (save.buffs[buffId] ?? 0) > now
}

// Melhor tier de Reforço já desbloqueado agora (mesmos gates de
// isUnlocked: doces vitalícias, insígnias, e posse do upgrade de
// Treinamento correspondente) — sempre existe pelo menos o tier 1
// (unlockAt/requiresBadges 0, sem requiresTrainingUpgradeId).
export function bestXpBoostTier(save: RegionSave): XpBoostTier {
  const unlocked = XP_BOOST_TIERS.filter(
    (tier) =>
      save.lifetimeCandies >= tier.unlockAt &&
      save.badges.length >= tier.requiresBadges &&
      (!tier.requiresTrainingUpgradeId || ownedCount(save, tier.requiresTrainingUpgradeId) > 0),
  )
  return unlocked[unlocked.length - 1] ?? XP_BOOST_TIERS[0]
}

// Próximo tier ainda bloqueado (mesma ideia de nextLocked pros upgrades) —
// undefined quando já tem o último tier.
export function nextXpBoostTier(save: RegionSave): XpBoostTier | undefined {
  const current = bestXpBoostTier(save)
  const index = XP_BOOST_TIERS.findIndex((tier) => tier.id === current.id)
  return XP_BOOST_TIERS[index + 1]
}

// >1 enquanto o buff está ativo, lendo o multiplicador do TIER que estava
// ativo quando o boost foi comprado (guardado em buffs[XP_BOOST_MULTIPLIER_KEY]),
// não o tier atual — evita que destravar um tier novo mude retroativamente
// a força de um boost já em andamento. Módulo continua alheio a "tipos"
// ou upgrades, quem chama combina isso com aquilo separadamente.
export function xpMultiplierFromBuffs(save: RegionSave, now: number): number {
  if (!isBuffActive(save, XP_BOOST_ID, now)) return 1
  return save.buffs[XP_BOOST_MULTIPLIER_KEY] ?? XP_BOOST_TIERS[0].multiplier
}

// Compra sempre o MELHOR tier já desbloqueado agora. Comprar de novo
// enquanto já está ativo estende a partir da expiração atual em vez de
// reiniciar o timer, e adota o multiplicador do tier comprado agora (que
// pode ser maior que o anterior, se destravou um tier novo nesse meio-tempo).
export function buyXpBoost(save: RegionSave, now: number): RegionSave {
  const tier = bestXpBoostTier(save)
  if (save.candies < tier.cost) return save

  const currentExpiry = Math.max(save.buffs[XP_BOOST_ID] ?? 0, now)
  return {
    ...save,
    candies: save.candies - tier.cost,
    buffs: { ...save.buffs, [XP_BOOST_ID]: currentExpiry + tier.durationMs, [XP_BOOST_MULTIPLIER_KEY]: tier.multiplier },
  }
}
