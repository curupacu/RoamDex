import { MOVES } from '../../content/moves'
import type { Gen1Entry } from '../../content/gen1/types'
import { typeEffectiveness } from '../../content/typeEffectiveness'
import type { TypeName } from '../../content/types'
import type { RosterMember } from '../../engine/save'
import { deriveStats } from '../team/stats'
import { QTE_RESULT_MULTIPLIER, type QteResult } from './qte/grading'

export const ENERGY_MAX = 100
export const ENERGY_PER_TAP = 20
// Flat fallback for the 12 types without a QTE yet (Sprints 16-17 add the
// rest) — same tier as a "full" QTE result, so those types aren't worse
// off in the meantime.
export const SUPER_ATTACK_MULTIPLIER = QTE_RESULT_MULTIPLIER.full

// Softens defense into diminishing returns instead of a hard subtraction,
// so a high-DEF unit can't reduce incoming damage to 0. Provisional.
const DEF_DAMPING = 0.5

// ATK and HP come from unrelated base stats (a low-HP "glass cannon" like
// Rattata can still have a big ATK/DEF), so raw atk-def subtraction
// regularly exceeded a target's whole HP pool in one hit — found by
// testing Sprint 15's QTE, which needs several taps per fight to ever
// trigger. This scales damage down to a fraction of the raw stat gap so a
// fight takes a handful of hits instead of one. Provisional — Sprint 25
// balances this for real.
const DAMAGE_SCALE = 0.15

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
}

export interface BattleState {
  enemy: BattleUnit
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

function makeUnit(entry: Gen1Entry, level: number): BattleUnit {
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
// new battle starts everyone back at full HP for free.
export function createBattle(
  gen1: Gen1Entry[],
  roster: RosterMember[],
  activeTeamIds: number[],
  enemyEntry: Gen1Entry,
  enemyLevel: number,
): BattleState {
  const playerTeam = activeTeamIds
    .map((id) => {
      const entry = gen1.find((candidate) => candidate.id === id)
      const member = roster.find((candidate) => candidate.speciesId === id)
      return entry && member ? makeUnit(entry, member.level) : null
    })
    .filter((unit): unit is BattleUnit => unit !== null)

  return {
    enemy: makeUnit(enemyEntry, enemyLevel),
    playerTeam,
    activeIndex: 0,
    energy: 0,
    outcome: playerTeam.length === 0 ? 'defeat' : 'ongoing',
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

// Tap-to-attack (roadmap section 4). Energy fills with taps; once full, the
// next tap either opens the type's QTE (if it has one) or releases the
// flat-multiplier super attack immediately.
export function applyPlayerTap(state: BattleState): BattleState {
  if (state.outcome !== 'ongoing' || state.awaitingQte) return state

  const active = state.playerTeam[state.activeIndex]
  const useSuper = state.energy >= ENERGY_MAX

  if (useSuper && hasQte(active.type)) {
    return { ...state, awaitingQte: active.type }
  }

  const { amount, tier } = calculateDamage(active, state.enemy)
  const dealt = amount * (useSuper ? SUPER_ATTACK_MULTIPLIER : 1)
  const enemyHp = Math.max(0, state.enemy.currentHp - dealt)

  return {
    ...state,
    enemy: { ...state.enemy, currentHp: enemyHp },
    energy: useSuper ? 0 : Math.min(ENERGY_MAX, state.energy + ENERGY_PER_TAP),
    outcome: enemyHp <= 0 ? 'victory' : 'ongoing',
    lastHit: { source: 'player', tier },
  }
}

// Called once the QTE minigame finishes — deals the super attack, graded
// by execution quality instead of the flat multiplier.
export function resolveQteAttack(state: BattleState, result: QteResult): BattleState {
  if (state.outcome !== 'ongoing' || !state.awaitingQte) return state

  const active = state.playerTeam[state.activeIndex]
  const { amount, tier } = calculateDamage(active, state.enemy)
  const dealt = amount * QTE_RESULT_MULTIPLIER[result]
  const enemyHp = Math.max(0, state.enemy.currentHp - dealt)

  return {
    ...state,
    enemy: { ...state.enemy, currentHp: enemyHp },
    energy: 0,
    awaitingQte: null,
    outcome: enemyHp <= 0 ? 'victory' : 'ongoing',
    lastHit: { source: 'player', tier },
  }
}

// The enemy attacks on a timer (driven by the caller, telegraphed before
// impact) — this just applies one hit. If the active unit faints, the next
// living team member switches in automatically; no survivors = defeat.
export function applyEnemyAttack(state: BattleState): BattleState {
  if (state.outcome !== 'ongoing' || state.awaitingQte) return state

  const active = state.playerTeam[state.activeIndex]
  const { amount, tier } = calculateDamage(state.enemy, active)
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
