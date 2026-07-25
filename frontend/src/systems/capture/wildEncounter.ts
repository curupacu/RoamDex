import type { LocationDefinition } from '../../content/gen1/locations'
import type { Gen1Entry } from '../../content/gen1/types'
import { rarityTier, type RarityTier } from './rarityTier'

// Provisional — Sprint 25 tunes these against real play data. Tuned down
// from 90s/20s per the project owner's own playtest: encounters felt too
// slow, and someone who doesn't want to fight should be able to just wait
// the banner out instead of needing to tap "Ignorar".
export const BASE_SPAWN_INTERVAL_MS = 45_000
export const IGNORE_TIMEOUT_MS = 30_000

export interface WildEncounter {
  speciesId: number
  level: number
  tier: RarityTier
}

// Encounters now come from the CURRENT LOCATION's own pool
// (docs/ROTAS-KANTO.md, researched from Bulbapedia) instead of a global
// roll weighted by rarity tier across all of Gen 1 — "na rota 2 só pode
// aparecer weedle, pidgey e rattata" was the whole point of that research.
//
// Inseto's rareWildChance bonus biases the roll toward whichever species in
// the pool has the lowest weight (this location's "rarest" pick) — there's
// no separate global rare-tier gate anymore, so this is the new home for
// that bonus.
function pickEncounter(location: LocationDefinition, rareBonusMultiplier: number) {
  const lowestWeight = Math.min(...location.encounters.map((encounter) => encounter.weight))
  const weights = location.encounters.map((encounter) =>
    encounter.weight === lowestWeight ? encounter.weight * rareBonusMultiplier : encounter.weight,
  )
  const total = weights.reduce((sum, weight) => sum + weight, 0)

  let roll = Math.random() * total
  for (let i = 0; i < location.encounters.length; i++) {
    roll -= weights[i]
    if (roll <= 0) return location.encounters[i]
  }
  return location.encounters[location.encounters.length - 1]
}

function rollLevel(minLevel: number, maxLevel: number): number {
  return minLevel + Math.floor(Math.random() * (maxLevel - minLevel + 1))
}

// null for a location with no wild encounters at all (towns, gyms).
export function spawnWildEncounter(
  location: LocationDefinition,
  gen1: Gen1Entry[],
  rareBonusMultiplier: number,
): WildEncounter | null {
  if (location.encounters.length === 0) return null

  const chosen = pickEncounter(location, rareBonusMultiplier)
  const entry = gen1.find((candidate) => candidate.id === chosen.speciesId)

  return {
    speciesId: chosen.speciesId,
    level: rollLevel(chosen.minLevel, chosen.maxLevel),
    // Still shown as a "comum/incomum/raro" badge in the UI (RARITY_LABELS)
    // even though it no longer drives which species can spawn.
    tier: entry ? rarityTier(entry.captureRate) : 'common',
  }
}
