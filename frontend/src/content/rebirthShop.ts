// Permanent upgrades bought with Insígnias (roadmap section 9) — unlike
// content/gen1/upgrades.ts, none of this resets on rebirth; it's the whole
// point of having gone through one. Each kind is a genuinely different
// lever (starting resources, a global rate, a one-off safety net) rather
// than N reskins of "+doces/clique" — see docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md
// for why padding to a round number with same-shaped entries was avoided.
export type RebirthUpgradeKind =
  | 'startingCandies'
  | 'startingLevel'
  | 'cpsPercent'
  | 'xpGainPercent'
  | 'wildSpawnRate'
  | 'rareWildChance'
  | 'captureRetry'

export interface RebirthUpgradeDefinition {
  id: string
  name: string
  description: string
  kind: RebirthUpgradeKind
  // Cost in Insígnias for the first level; scales by REBIRTH_COST_GROWTH
  // per level already owned (systems/rebirth/rebirthShop.ts).
  baseCost: number
  effect: number
  // undefined = buyable forever. Only set for one-off safety-net upgrades.
  maxLevel?: number
}

// Provisional costs/effects, same spirit as content/gen1/upgrades.ts —
// Sprint 25 ("Balanceamento") is where these get tuned against real
// multi-rebirth play data, since Insígnias only exist from this sprint on.
export const REBIRTH_UPGRADES: RebirthUpgradeDefinition[] = [
  {
    id: 'first-run-candies',
    name: 'Doces da Primeira Corrida',
    description: '+300 doces logo ao começar a run, depois de cada rebirth.',
    kind: 'startingCandies',
    baseCost: 3,
    effect: 300,
  },
  {
    id: 'muscle-memory',
    name: 'Memória Muscular',
    description: 'Seu time volta +1 nível acima do normal depois do rebirth.',
    kind: 'startingLevel',
    baseCost: 8,
    effect: 1,
  },
  {
    id: 'productive-colony',
    name: 'Colônia Produtiva',
    description: '+2% de doces por segundo, pra sempre.',
    kind: 'cpsPercent',
    baseCost: 6,
    effect: 0.02,
  },
  {
    id: 'ancestral-training',
    name: 'Treino Ancestral',
    description: '+3% de XP ganho (batalha e idle), pra sempre.',
    kind: 'xpGainPercent',
    baseCost: 6,
    effect: 0.03,
  },
  {
    id: 'wild-instinct',
    name: 'Instinto Selvagem',
    description: '+4% de velocidade nos encontros selvagens, pra sempre.',
    kind: 'wildSpawnRate',
    baseCost: 5,
    effect: 0.04,
  },
  {
    id: 'keen-nose',
    name: 'Faro Apurado',
    description: '+3% de chance de selvagem raro, pra sempre.',
    kind: 'rareWildChance',
    baseCost: 5,
    effect: 0.03,
  },
  {
    id: 'second-pokeball',
    name: 'Segunda Pokébola',
    description: 'Se a Pokébola falhar, tenta mais uma vez na hora. Só uma vez, caro de propósito.',
    kind: 'captureRetry',
    baseCost: 40,
    effect: 1,
    maxLevel: 1,
  },
]
