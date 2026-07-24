import {
  BONUS_PERCENT_PER_POKEMON,
  DRAGON_ALL_STATS_PERCENT,
  LIVE_BONUS_KINDS,
  SECONDARY_TYPE_WEIGHT,
  TYPES,
  type EconomicBonusKind,
  type TypeName,
} from '../../content/types'

export interface TeamMember {
  // [primary] or [primary, secondary], per roadmap section 3.
  types: TypeName[]
}

// Sums (1 per primary, 0.5 per secondary) across the team for each type —
// "tipo duplo usa o tipo primário para o golpe e recebe metade do bônus
// econômico do secundário" (roadmap section 3).
export function teamTypeWeights(team: TeamMember[]): Partial<Record<TypeName, number>> {
  const weights: Partial<Record<TypeName, number>> = {}
  for (const member of team) {
    member.types.forEach((type, index) => {
      const weight = index === 0 ? 1 : SECONDARY_TYPE_WEIGHT
      weights[type] = (weights[type] ?? 0) + weight
    })
  }
  return weights
}

function dragonWeight(team: TeamMember[]): number {
  return teamTypeWeights(team).dragon ?? 0
}

// Dragon's own "small bonus to everything" is deliberately smaller than the
// other 17 types' per-Pokémon rate, since it stacks onto every kind at once.
function percentPerUnit(typeId: TypeName): number {
  return typeId === 'dragon' ? DRAGON_ALL_STATS_PERCENT : BONUS_PERCENT_PER_POKEMON
}

// Multiplier (>= 1) for a given economic bonus kind: every type mapped to
// that kind contributes, plus Dragon's small "+% em tudo".
export function economyMultiplier(team: TeamMember[], kind: EconomicBonusKind): number {
  const weights = teamTypeWeights(team)
  let percent = 0
  for (const def of TYPES) {
    if (def.bonusKind === kind) percent += (weights[def.id] ?? 0) * percentPerUnit(def.id)
  }
  if (kind !== 'allStatsSmall') percent += dragonWeight(team) * DRAGON_ALL_STATS_PERCENT
  return 1 + percent
}

// Ice discounts upgrade costs; Dragon's "tudo" bonus discounts a little too.
export function upgradeCostMultiplier(team: TeamMember[]): number {
  const weights = teamTypeWeights(team)
  const discount = (weights.ice ?? 0) * BONUS_PERCENT_PER_POKEMON + dragonWeight(team) * DRAGON_ALL_STATS_PERCENT
  return Math.max(0, 1 - discount)
}

export interface BonusBreakdownEntry {
  typeId: TypeName
  typeName: string
  bonusKind: EconomicBonusKind
  percent: number
  isLive: boolean
}

// For UI: "mostrando origem de cada bônus" — every type currently on the
// team, whether or not its target system exists yet.
export function bonusBreakdown(team: TeamMember[]): BonusBreakdownEntry[] {
  const weights = teamTypeWeights(team)
  return TYPES.filter((def) => (weights[def.id] ?? 0) > 0).map((def) => {
    const weight = weights[def.id] ?? 0
    const percent = weight * percentPerUnit(def.id)
    return { typeId: def.id, typeName: def.name, bonusKind: def.bonusKind, percent, isLive: LIVE_BONUS_KINDS.includes(def.bonusKind) }
  })
}
