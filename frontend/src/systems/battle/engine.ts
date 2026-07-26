import { MOVES } from '../../content/moves'
import type { SpeciesEntry } from '../../content/gen1/types'
import { typeEffectiveness } from '../../content/typeEffectiveness'
import type { TypeName } from '../../content/types'
import type { RosterMember } from '../../engine/save'
import { deriveStats } from '../team/stats'
import { QTE_RESULT_MULTIPLIER, type QteResult } from './qte/grading'

export const ENERGY_MAX = 100
// 4 taps to fill — found by testing: a typical early fight takes ~5 basic
// hits to win, so energy needs to fill in *fewer* taps than that or the
// QTE and the kill land on the same tap and the QTE never shows.
export const ENERGY_PER_TAP = 25
// Flat fallback for the 12 types without a QTE yet (Sprints 16-17 add the
// rest) — same tier as a "full" QTE result, so those types aren't worse
// off in the meantime.
export const SUPER_ATTACK_MULTIPLIER = QTE_RESULT_MULTIPLIER.full

// "Entre batalhas da sequência: cura parcial (50%)" — roadmap section 8,
// Elite Four only. Applied once when the active enemy index crosses into a
// new trainer's team (see trainerBoundaries below), never between a single
// trainer's own Pokémon (that stays a zero-heal switch, per Sprint 20).
export const TRAINER_TRANSITION_HEAL_FRACTION = 0.5

// Softens defense into diminishing returns instead of a hard subtraction,
// so a high-DEF unit can't reduce incoming damage to 0. Provisional.
const DEF_DAMPING = 0.5

// ATK and HP come from unrelated base stats (a low-HP "glass cannon" like
// Rattata can still have a big ATK/DEF), so raw atk-def subtraction
// regularly exceeded a target's whole HP pool in one hit — found by
// testing Sprint 15's QTE, which needs several taps per fight to ever
// trigger. This scales damage down to a fraction of the raw stat gap so a
// fight takes several hits instead of one. Provisional — Sprint 25
// balances this for real.
// (Was 0.15 — testing found that still ended most fights in ~5 hits on
// either side, both directions, which felt over almost instantly. Lowered
// so a typical early fight takes closer to 10-15 hits.)
const DAMAGE_SCALE = 0.06

export interface BattleUnit {
  speciesId: number
  name: string
  level: number
  maxHp: number
  currentHp: number
  atk: number
  def: number
  // Primary type only, used for effectiveness — see docs/decisoes/0007.
  type: TypeName
}

export type BattleOutcome = 'ongoing' | 'victory' | 'defeat'
export type EffectivenessTier = 'super' | 'normal' | 'weak'

export interface BattleHit {
  source: 'player' | 'enemy'
  tier: EffectivenessTier
  // Set only when this hit came from resolveQteAttack — the UI uses it to
  // show "Golpe cheio!/parcial/fraco" so the QTE_RESULT_MULTIPLIER
  // difference (2.5x/1.6x/1x) is actually visible, not just a slightly
  // different number.
  qteResult?: QteResult
}

// One member of the roster a battle is fought against — a wild encounter's
// roster is always length 1, a gym leader's/trainer's can be several.
export interface EnemyRosterEntry {
  entry: SpeciesEntry
  level: number
  // Set only on the FIRST entry of each trainer within a multi-trainer
  // sequence (Elite Four) — its presence marks a trainerBoundaries index
  // and doubles as that trainer's display name, so callers don't need to
  // thread a second parallel array through just for the label.
  trainerName?: string
}

export interface BattleState {
  enemyTeam: BattleUnit[]
  // Index into enemyTeam currently fighting — advances automatically as
  // each one faints (a trainer sends out their next Pokémon; there's no
  // player choice on that side). Wild encounters have a single-entry team,
  // so this always stays 0 for those fights.
  enemyIndex: number
  // enemyTeam index -> trainer display name, for the indices where a new
  // trainer's team starts within a multi-trainer sequence (Elite Four).
  // Empty for single-trainer fights (wild, gym) — crossing into one of
  // these indices is what triggers TRAINER_TRANSITION_HEAL_FRACTION.
  trainerBoundaries: Record<number, string>
  playerTeam: BattleUnit[]
  activeIndex: number
  energy: number
  outcome: BattleOutcome
  lastHit: BattleHit | null
  // Set to the active unit's type when energy is full AND that type has a
  // real QTE (content/moves.ts) — the caller (BattleScreen) shows the
  // minigame and calls resolveQteAttack() with the result. Types without a
  // QTE yet skip straight to the flat SUPER_ATTACK_MULTIPLIER, so this
  // stays null for them.
  awaitingQte: TypeName | null
}

export function hasQte(type: TypeName): boolean {
  return MOVES[type] !== undefined
}

function makeUnit(entry: SpeciesEntry, level: number): BattleUnit {
  const stats = deriveStats(entry, level)
  return {
    speciesId: entry.id,
    name: entry.name,
    level,
    maxHp: stats.hp,
    currentHp: stats.hp,
    atk: stats.atk,
    def: stats.def,
    type: entry.types[0],
  }
}

// HP lives only inside BattleState — the save never tracks it, since the
// roadmap has no persistent damage ("Pós-batalha, todo mundo cura full
// automaticamente... Não existe morte, custo de cura nem hospital"). Every
// new battle starts everyone back at full HP for free. A gym leader's team
// doesn't heal between their own Pokémon though (only the Elite Four's
// between-battle 50% heal is a thing, per the roadmap) — it's one
// continuous fight, same as the real games.
export function createBattle(
  gen1: SpeciesEntry[],
  roster: RosterMember[],
  activeTeamIds: number[],
  enemyRoster: EnemyRosterEntry[],
): BattleState {
  const playerTeam = activeTeamIds
    .map((id) => {
      const entry = gen1.find((candidate) => candidate.id === id)
      const member = roster.find((candidate) => candidate.speciesId === id)
      return entry && member ? makeUnit(entry, member.level) : null
    })
    .filter((unit): unit is BattleUnit => unit !== null)

  const enemyTeam = enemyRoster.map(({ entry, level }) => makeUnit(entry, level))
  const trainerBoundaries: Record<number, string> = {}
  enemyRoster.forEach((member, index) => {
    if (member.trainerName) trainerBoundaries[index] = member.trainerName
  })

  return {
    enemyTeam,
    enemyIndex: 0,
    trainerBoundaries,
    playerTeam,
    activeIndex: 0,
    energy: 0,
    outcome: playerTeam.length === 0 || enemyTeam.length === 0 ? 'defeat' : 'ongoing',
    lastHit: null,
    awaitingQte: null,
  }
}

function effectivenessTier(multiplier: number): EffectivenessTier {
  if (multiplier > 1) return 'super'
  if (multiplier < 1) return 'weak'
  return 'normal'
}

// "Efetividade de tipos... aplica em ambos os lados" (roadmap section 4):
// same lookup whether the player or the enemy is attacking.
function calculateDamage(attacker: BattleUnit, defender: BattleUnit): { amount: number; tier: EffectivenessTier } {
  const multiplier = typeEffectiveness(attacker.type, defender.type)
  const base = Math.max(1, Math.round((attacker.atk - defender.def * DEF_DAMPING) * DAMAGE_SCALE))
  return { amount: Math.max(1, Math.round(base * multiplier)), tier: effectivenessTier(multiplier) }
}

function nextLivingIndex(team: BattleUnit[], from: number): number {
  for (let offset = 0; offset < team.length; offset++) {
    const index = (from + offset) % team.length
    if (team[index].currentHp > 0) return index
  }
  return -1
}

function healFraction(team: BattleUnit[], fraction: number): BattleUnit[] {
  return team.map((unit) => ({ ...unit, currentHp: Math.min(unit.maxHp, Math.round(unit.currentHp + unit.maxHp * fraction)) }))
}

// Applies damage to the currently active enemy and, if that faints, sends
// out the trainer's next living Pokémon automatically (or ends the battle
// in victory once none are left). If that switch crosses into a new
// trainer's team (Elite Four sequence), the player's team gets the
// roadmap's 50% partial heal — but ONLY on the switch itself, never on a
// tap that doesn't faint anything, even if the still-active enemy happens
// to sit at a boundary index (that would heal on every single hit against
// a trainer's opener instead of once, on the crossing).
function applyDamageToEnemyTeam(state: BattleState, dealt: number): Pick<BattleState, 'enemyTeam' | 'enemyIndex' | 'outcome' | 'playerTeam'> {
  const activeEnemy = state.enemyTeam[state.enemyIndex]
  const enemyHp = Math.max(0, activeEnemy.currentHp - dealt)
  const enemyTeam = state.enemyTeam.map((unit, index) => (index === state.enemyIndex ? { ...unit, currentHp: enemyHp } : unit))
  const fainted = enemyHp <= 0

  const nextIndex = fainted ? nextLivingIndex(enemyTeam, state.enemyIndex + 1) : state.enemyIndex
  const crossedIntoNewTrainer = fainted && nextIndex !== -1 && state.trainerBoundaries[nextIndex] !== undefined

  return {
    enemyTeam,
    enemyIndex: nextIndex === -1 ? state.enemyIndex : nextIndex,
    outcome: nextIndex === -1 ? 'victory' : 'ongoing',
    playerTeam: crossedIntoNewTrainer ? healFraction(state.playerTeam, TRAINER_TRANSITION_HEAL_FRACTION) : state.playerTeam,
  }
}

// Tap-to-attack (roadmap section 4). Energy fills with taps; once full, the
// next tap either opens the type's QTE (if it has one) or releases the
// flat-multiplier super attack immediately.
export function applyPlayerTap(state: BattleState): BattleState {
  if (state.outcome !== 'ongoing' || state.awaitingQte) return state

  const active = state.playerTeam[state.activeIndex]
  const activeEnemy = state.enemyTeam[state.enemyIndex]
  const useSuper = state.energy >= ENERGY_MAX

  if (useSuper && hasQte(active.type)) {
    return { ...state, awaitingQte: active.type }
  }

  const { amount, tier } = calculateDamage(active, activeEnemy)
  const dealt = amount * (useSuper ? SUPER_ATTACK_MULTIPLIER : 1)

  return {
    ...state,
    ...applyDamageToEnemyTeam(state, dealt),
    energy: useSuper ? 0 : Math.min(ENERGY_MAX, state.energy + ENERGY_PER_TAP),
    lastHit: { source: 'player', tier },
  }
}

// Called once the QTE minigame finishes — deals the super attack, graded
// by execution quality instead of the flat multiplier.
export function resolveQteAttack(state: BattleState, result: QteResult): BattleState {
  if (state.outcome !== 'ongoing' || !state.awaitingQte) return state

  const active = state.playerTeam[state.activeIndex]
  const activeEnemy = state.enemyTeam[state.enemyIndex]
  const { amount, tier } = calculateDamage(active, activeEnemy)
  const dealt = amount * QTE_RESULT_MULTIPLIER[result]

  return {
    ...state,
    ...applyDamageToEnemyTeam(state, dealt),
    energy: 0,
    awaitingQte: null,
    lastHit: { source: 'player', tier, qteResult: result },
  }
}

// The enemy attacks on a timer (driven by the caller, telegraphed before
// impact) — this just applies one hit. If the active unit faints, the next
// living team member switches in automatically; no survivors = defeat.
export function applyEnemyAttack(state: BattleState): BattleState {
  if (state.outcome !== 'ongoing' || state.awaitingQte) return state

  const active = state.playerTeam[state.activeIndex]
  const activeEnemy = state.enemyTeam[state.enemyIndex]
  const { amount, tier } = calculateDamage(activeEnemy, active)
  const playerTeam = state.playerTeam.map((unit, index) =>
    index === state.activeIndex ? { ...unit, currentHp: Math.max(0, unit.currentHp - amount) } : unit,
  )

  const stillAlive = playerTeam[state.activeIndex].currentHp > 0
  const activeIndex = stillAlive ? state.activeIndex : nextLivingIndex(playerTeam, state.activeIndex + 1)

  return {
    ...state,
    playerTeam,
    activeIndex: activeIndex === -1 ? state.activeIndex : activeIndex,
    outcome: activeIndex === -1 ? 'defeat' : 'ongoing',
    lastHit: { source: 'enemy', tier },
  }
}

// Manual switch (roadmap section 4, "1v1 com troca") — only to a living,
// different team member.
export function switchActive(state: BattleState, index: number): BattleState {
  if (state.outcome !== 'ongoing') return state
  if (index === state.activeIndex) return state
  if (!state.playerTeam[index] || state.playerTeam[index].currentHp <= 0) return state
  return { ...state, activeIndex: index }
}

export interface TrainerProgress {
  name: string
  position: number // 1-based index within this trainer's own team
  size: number // this trainer's team size
}

// Derives "which trainer, how far into their team" from trainerBoundaries
// for multi-trainer sequences (Elite Four) — null for single-trainer
// fights (wild, gym), where the UI keeps its existing plain counter.
export function currentTrainerProgress(state: BattleState): TrainerProgress | null {
  const boundaryIndices = Object.keys(state.trainerBoundaries)
    .map(Number)
    .sort((a, b) => a - b)
  if (boundaryIndices.length === 0) return null

  const start = boundaryIndices.filter((index) => index <= state.enemyIndex).pop() ?? boundaryIndices[0]
  const next = boundaryIndices.find((index) => index > start)
  const size = (next ?? state.enemyTeam.length) - start

  return { name: state.trainerBoundaries[start], position: state.enemyIndex - start + 1, size }
}
