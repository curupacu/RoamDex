import type { GymTeamMember } from '../../content/gen1/gyms'
import type { SpeciesEntry } from '../../content/gen1/types'
import type { RegionSave } from '../../engine/save'
import type { RegionDefinition } from '../../content/regions'

// Which starter family (if any) a roster member belongs to, by walking its
// own evolutionChain back to the 'initial' step (every stage of a family
// carries the same chain — see systems/team/leveling.ts). Scans
// save.roster, not activeTeamIds: there's no release/remove-from-roster
// anywhere in the game, so a benched-but-not-active starter still counts.
// Exportada (não só usada por championTeam): Unova's GYMS_BY_STARTER
// (systems/gyms/gymProgress.ts's resolveGym) reusa a mesma lógica pro
// trio de líderes de Striaton, ver docs/decisoes/00NN-sprint-unova-gen5.md.
export function starterRootId(region: RegionDefinition, gen1: SpeciesEntry[], speciesId: number): number | null {
  const entry = gen1.find((candidate) => candidate.id === speciesId)
  const root = entry?.evolutionChain.find((step) => step.trigger === 'initial')?.id
  return root !== undefined && region.starterIds.includes(root) ? root : null
}

// Qual starter root o jogador escolheu nesta run, resolvido a partir do
// roster (não activeTeamIds — mesmo motivo de starterRootId acima).
// undefined se nada resolver (não deveria acontecer pós-new-game).
export function currentStarterRoot(region: RegionDefinition, save: RegionSave, gen1: SpeciesEntry[]): number | undefined {
  return save.roster.map((member) => starterRootId(region, gen1, member.speciesId)).find((id) => id !== null) ?? undefined
}

// Champion's team varies by which starter the player originally picked
// (roadmap/docs/ROTAS-KANTO.md) — starters aren't wild-catchable, so at
// most one roster member's family root is ever a starter id. Falls back to
// the region's default starter team if none resolves (shouldn't happen post
// new-game, same defensive spirit as locationById's fallback).
export function championTeam(region: RegionDefinition, save: RegionSave, gen1: SpeciesEntry[]): GymTeamMember[] {
  const rootId = currentStarterRoot(region, save, gen1)
  return region.championTeamByStarter[rootId ?? region.defaultStarterId]
}

// The full Elite Four + Champion sequence as one flat roster-shaped list —
// BattleScreen flattens this into EnemyRosterEntry[], tagging each
// trainer's first member with trainerName (see systems/battle/engine.ts).
export function eliteFourSequence(region: RegionDefinition, save: RegionSave, gen1: SpeciesEntry[]): { name: string; team: GymTeamMember[] }[] {
  return [
    ...region.eliteFour.map(({ name, team }) => ({ name, team })),
    { name: 'Campeão', team: championTeam(region, save, gen1) },
  ]
}
