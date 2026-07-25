import { CHAMPION_DEFAULT_STARTER_ID, CHAMPION_TEAM_BY_STARTER, type EliteFourMember } from '../../content/gen1/eliteFour'
import type { GymTeamMember } from '../../content/gen1/gyms'
import { STARTER_IDS } from '../../content/gen1/starters'
import type { Gen1Entry } from '../../content/gen1/types'
import type { SaveData } from '../../engine/save'

// Which starter family (if any) a roster member belongs to, by walking its
// own evolutionChain back to the 'initial' step (every stage of a family
// carries the same chain — see systems/team/leveling.ts). Scans
// save.roster, not activeTeamIds: there's no release/remove-from-roster
// anywhere in the game, so a benched-but-not-active starter still counts.
function starterRootId(gen1: Gen1Entry[], speciesId: number): number | null {
  const entry = gen1.find((candidate) => candidate.id === speciesId)
  const root = entry?.evolutionChain.find((step) => step.trigger === 'initial')?.id
  return root !== undefined && STARTER_IDS.includes(root) ? root : null
}

// Champion's team varies by which starter the player originally picked
// (roadmap/docs/ROTAS-KANTO.md) — starters aren't wild-catchable, so at
// most one roster member's family root is ever a STARTER_ID. Falls back to
// the first starter's team if none resolves (shouldn't happen post
// new-game, same defensive spirit as locationById's fallback).
export function championTeam(save: SaveData, gen1: Gen1Entry[]): GymTeamMember[] {
  const rootId = save.roster.map((member) => starterRootId(gen1, member.speciesId)).find((id) => id !== null)
  return CHAMPION_TEAM_BY_STARTER[rootId ?? CHAMPION_DEFAULT_STARTER_ID]
}

// The full Elite Four + Champion sequence as one flat roster-shaped list —
// BattleScreen flattens this into EnemyRosterEntry[], tagging each
// trainer's first member with trainerName (see systems/battle/engine.ts).
export function eliteFourSequence(eliteFour: EliteFourMember[], save: SaveData, gen1: Gen1Entry[]): { name: string; team: GymTeamMember[] }[] {
  return [...eliteFour.map(({ name, team }) => ({ name, team })), { name: 'Campeão', team: championTeam(save, gen1) }]
}
