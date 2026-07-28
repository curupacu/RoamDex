import type { LocationDefinition } from '../../content/gen1/locations'

export interface EncounterRate {
  speciesId: number
  percent: number
}

// Base spawn-weight breakdown for a location's wild encounter pool, as plain
// percentages of that location's own weight total — ignores the
// rareWildChance bonus from bug-type team members / rebirth upgrades (which
// nudges the roll toward the rarest entry at runtime, see wildEncounter.ts).
// This is the reference table, same spirit as docs/ROTAS-*.md: what the
// route's odds look like on paper, not this particular save's live roll.
export function encounterRates(location: LocationDefinition): EncounterRate[] {
  const total = location.encounters.reduce((sum, encounter) => sum + encounter.weight, 0)
  return location.encounters
    .map((encounter) => ({ speciesId: encounter.speciesId, percent: total === 0 ? 0 : (encounter.weight / total) * 100 }))
    .sort((a, b) => b.percent - a.percent)
}
