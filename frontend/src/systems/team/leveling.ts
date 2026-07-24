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

// The roster is keyed by speciesId with no duplicate-id support. Evolution
// used to assume that was always safe ("duplicates aren't possible
// pre-capture" — true when this was written in Sprint 11), but real
// capture (Sprint 19) can now put both a pre-evolution and its evolved
// form in the roster separately. If evolving would collide with a
// *different* existing member, skip the species change (level/xp still
// apply) instead of silently creating two roster entries with the same id.
export function resolveEvolutionSafely(save: SaveData, gen1: Gen1Entry[], speciesId: number, level: number): number {
  const entry = gen1.find((candidate) => candidate.id === speciesId)
  if (!entry) return speciesId

  const evolvedId = resolveEvolution(entry, level)
  if (evolvedId === speciesId) return evolvedId

  const collides = save.roster.some((member) => member.speciesId !== speciesId && member.speciesId === evolvedId)
  return collides ? speciesId : evolvedId
}

// Grants XP to a single roster member (by current speciesId), evolving it
// if the new level crosses a threshold. Shared by the idle "Treinamento"
// upgrade, Rare Candy, and battle XP rewards (Sprint 13).
export function gainMemberXp(save: SaveData, gen1: Gen1Entry[], speciesId: number, amount: number): SaveData {
  if (amount <= 0) return save
  const member = save.roster.find((candidate) => candidate.speciesId === speciesId)
  if (!member) return save

  const leveled = applyXpGain(member, amount)
  const newSpeciesId = resolveEvolutionSafely(save, gen1, leveled.speciesId, leveled.level)

  const roster = save.roster.map((candidate) =>
    candidate.speciesId === speciesId ? { ...leveled, speciesId: newSpeciesId } : candidate,
  )
  const activeTeamIds = save.activeTeamIds.map((id) => (id === speciesId ? newSpeciesId : id))

  return { ...save, roster, activeTeamIds }
}

// Applies idle XP (roadmap section 7, "Treinamento" upgrade) to every
// active team member equally. Each call threads through gainMemberXp via
// reduce, so resolveEvolutionSafely always checks against the up-to-date
// roster — including evolutions already applied earlier in the same call.
export function gainTeamXp(save: SaveData, gen1: Gen1Entry[], amount: number): SaveData {
  if (amount <= 0 || save.activeTeamIds.length === 0) return save

  return save.activeTeamIds.reduce((current, speciesId) => gainMemberXp(current, gen1, speciesId, amount), save)
}
