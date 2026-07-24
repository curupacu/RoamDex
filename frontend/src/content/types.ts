// The 18 types, generation-agnostic (roadmap section 3, "Tabela mestra dos
// 18 tipos") — not gen1-specific, unlike content/gen1/*.
export type TypeName =
  | 'grass'
  | 'fire'
  | 'water'
  | 'electric'
  | 'normal'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'steel'
  | 'dark'
  | 'fairy'

export type EconomicBonusKind =
  | 'cps'
  | 'clickCandies'
  | 'critChance'
  | 'lootCandies'
  | 'upgradeCostDiscount'
  | 'teamAtk'
  | 'battleDot'
  | 'lootUpgradeChance'
  | 'wildSpawnRate'
  | 'xpGain'
  | 'rareWildChance'
  | 'teamDef'
  | 'ghostNightWindow'
  | 'allStatsSmall'
  | 'damageReduction'
  | 'doubleLootChance'
  | 'captureChance'

export interface TypeDefinition {
  id: TypeName
  name: string
  bonusKind: EconomicBonusKind
}

// bonusKind assignments come straight from the roadmap's master table —
// don't invent variations. Only cps/clickCandies/upgradeCostDiscount/
// allStatsSmall have a system to apply to today (Sprint 9 scope: economy
// only); the rest already compute a correct weight/percent, they just have
// nothing to plug into until battle/loot/encounters/capture/XP ship — see
// docs/decisoes/0002-sprint9-bonus-percentuais-provisorio.md.
export const TYPES: TypeDefinition[] = [
  { id: 'grass', name: 'Grama', bonusKind: 'cps' },
  { id: 'fire', name: 'Fogo', bonusKind: 'clickCandies' },
  { id: 'water', name: 'Água', bonusKind: 'cps' },
  { id: 'electric', name: 'Elétrico', bonusKind: 'critChance' },
  { id: 'normal', name: 'Normal', bonusKind: 'lootCandies' },
  { id: 'ice', name: 'Gelo', bonusKind: 'upgradeCostDiscount' },
  { id: 'fighting', name: 'Lutador', bonusKind: 'teamAtk' },
  { id: 'poison', name: 'Venenoso', bonusKind: 'battleDot' },
  { id: 'ground', name: 'Terra', bonusKind: 'lootUpgradeChance' },
  { id: 'flying', name: 'Voador', bonusKind: 'wildSpawnRate' },
  { id: 'psychic', name: 'Psíquico', bonusKind: 'xpGain' },
  { id: 'bug', name: 'Inseto', bonusKind: 'rareWildChance' },
  { id: 'rock', name: 'Pedra', bonusKind: 'teamDef' },
  { id: 'ghost', name: 'Fantasma', bonusKind: 'ghostNightWindow' },
  { id: 'dragon', name: 'Dragão', bonusKind: 'allStatsSmall' },
  { id: 'steel', name: 'Aço', bonusKind: 'damageReduction' },
  { id: 'dark', name: 'Escuridão', bonusKind: 'doubleLootChance' },
  { id: 'fairy', name: 'Fada', bonusKind: 'captureChance' },
]

// Kinds with a real consuming system today. wildSpawnRate/rareWildChance
// (Sprint 18) and captureChance (Sprint 19) joined the original Sprint 9
// four once encounters and capture shipped.
export const LIVE_BONUS_KINDS: EconomicBonusKind[] = [
  'cps',
  'clickCandies',
  'upgradeCostDiscount',
  'allStatsSmall',
  'wildSpawnRate',
  'rareWildChance',
  'captureChance',
]

export const BONUS_KIND_LABELS: Record<EconomicBonusKind, string> = {
  cps: 'CPS',
  clickCandies: 'doces por clique',
  critChance: 'chance de crítico no clique',
  lootCandies: 'doces ganhos em loot',
  upgradeCostDiscount: 'custo de upgrades',
  teamAtk: 'ATK do time',
  battleDot: 'dano contínuo em batalha',
  lootUpgradeChance: 'chance de loot virar upgrade',
  wildSpawnRate: 'frequência de selvagens',
  xpGain: 'XP ganho pelo time',
  rareWildChance: 'chance de selvagem raro',
  teamDef: 'DEF do time',
  ghostNightWindow: 'janela noturna de selvagens raros',
  allStatsSmall: 'tudo',
  damageReduction: 'redução de dano em batalha',
  doubleLootChance: 'chance de loot em dobro',
  captureChance: 'chance de captura',
}

// Provisional magnitudes — Sprint 25 ("Balanceamento") tunes these against
// simulation data, same as the Sprint 6 upgrade costs.
export const BONUS_PERCENT_PER_POKEMON = 0.02
export const DRAGON_ALL_STATS_PERCENT = 0.01
export const SECONDARY_TYPE_WEIGHT = 0.5

// Standard type colors used across the Pokémon fangame community — not
// official Nintendo/Game Freak branding, just a widely shared convention.
export const TYPE_COLORS: Record<TypeName, string> = {
  grass: '#78c850',
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  normal: '#a8a878',
  ice: '#98d8d8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  psychic: '#f85888',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  steel: '#b8b8d0',
  dark: '#705848',
  fairy: '#ee99ac',
}
