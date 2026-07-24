import type { Gen1Entry } from '../../content/gen1/types'
import type { RosterMember, SaveData } from '../../engine/save'

// Provisional curve — Sprint 25 ("Balanceamento") tunes this against
// simulation data, same treatment as the Sprint 6 upgrade costs.
const XP_CURVE_BASE = 20
const XP_CURVE_EXPONENT = 1.8

export function xpForNextLevel(level: number): number {
  return Math.round(XP_CURVE_BASE * level ** XP_CURVE_EXPONENT)
}

// Pure level/xp math — no species lookup, so it doesn't need gen1 data.
// Loops instead of a single division since a big XP dump (e.g. a long
// offline gap once Sprint 7's cap allows more idle XP) can cross several
// level thresholds, each with a different cost, at once.
export function applyXpGain(member: RosterMember, amount: number): RosterMember {
  let level = member.level
  let xp = member.xp + amount

  while (xp >= xpForNextLevel(level)) {
    xp -= xpForNextLevel(level)
    level += 1
  }

  return { ...member, level, xp }
}

// Every stage in a species' evolutionChain lists the full chain (roadmap
// data: Ivysaur's entry has the same 3 steps as Bulbasaur's), so this
// works no matter which stage `entry` currently is.
export function resolveEvolution(entry: Gen1Entry, level: number): number {
  let speciesId = entry.id
  for (const step of entry.evolutionChain) {
    if (step.trigger === 'level-up' && step.minLevel !== null && level >= step.minLevel) {
      speciesId = step.id
    }
  }
  return speciesId
}

// Applies idle XP (roadmap section 7, "Treinamento" upgrade) to every
// active team member, evolving anyone who crosses a level-up threshold.
// Duplicates aren't possible pre-capture (Sprint 19), so id collisions
// between two evolving members aren't a concern yet.
export function gainTeamXp(save: SaveData, gen1: Gen1Entry[], amount: number): SaveData {
  if (amount <= 0 || save.activeTeamIds.length === 0) return save

  let activeTeamIds = save.activeTeamIds
  const roster = save.roster.map((member) => {
    if (!save.activeTeamIds.includes(member.speciesId)) return member

    const leveled = applyXpGain(member, amount)
    const entry = gen1.find((candidate) => candidate.id === leveled.speciesId)
    const speciesId = entry ? resolveEvolution(entry, leveled.level) : leveled.speciesId

    if (speciesId !== member.speciesId) {
      activeTeamIds = activeTeamIds.map((id) => (id === member.speciesId ? speciesId : id))
    }

    return { ...leveled, speciesId }
  })

  return { ...save, roster, activeTeamIds }
}
