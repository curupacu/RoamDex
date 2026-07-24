import type { Gen1Entry } from '../../content/gen1/types'
import { rarityTier, type RarityTier } from './rarityTier'

// Roadmap section 5's own numbers, not invented.
export const BASE_SPAWN_INTERVAL_MS = 90_000
export const IGNORE_TIMEOUT_MS = 20_000

// Provisional — Sprint 25 tunes the level curve against real progress data.
const BASE_LEVEL = 5
const LEVEL_PER_LIFETIME_CANDIES = 100
const MAX_LEVEL = 100

const TIER_BASE_WEIGHT: Record<RarityTier, number> = {
  common: 10,
  uncommon: 4,
  rare: 1,
}

export interface WildEncounter {
  speciesId: number
  level: number
  tier: RarityTier
}

// "Nível do selvagem escala com o progresso da run (doces totais)" —
// roadmap section 5.
export function wildLevelForProgress(lifetimeCandies: number): number {
  return Math.min(MAX_LEVEL, BASE_LEVEL + Math.floor(lifetimeCandies / LEVEL_PER_LIFETIME_CANDIES))
}

// "Raridade por tier... Inseto/Fantasma no time mexem nas chances" —
// roadmap section 5. Only Inseto's rareWildChance is wired to a real
// number today (economyMultiplier(team, 'rareWildChance') from the
// caller); Fantasma's night-window bonus has no day/night system to plug
// into yet, so it stays a display-only "(em breve)" bonus for now.
function pickWildSpecies(gen1: Gen1Entry[], rareBonusMultiplier: number): Gen1Entry {
  const weights = gen1.map((entry) => {
    const tier = rarityTier(entry.captureRate)
    return tier === 'rare' ? TIER_BASE_WEIGHT.rare * rareBonusMultiplier : TIER_BASE_WEIGHT[tier]
  })
  const total = weights.reduce((sum, weight) => sum + weight, 0)

  let roll = Math.random() * total
  for (let i = 0; i < gen1.length; i++) {
    roll -= weights[i]
    if (roll <= 0) return gen1[i]
  }
  return gen1[gen1.length - 1]
}

export function spawnWildEncounter(gen1: Gen1Entry[], lifetimeCandies: number, rareBonusMultiplier: number): WildEncounter {
  const entry = pickWildSpecies(gen1, rareBonusMultiplier)
  return {
    speciesId: entry.id,
    level: wildLevelForProgress(lifetimeCandies),
    tier: rarityTier(entry.captureRate),
  }
}
