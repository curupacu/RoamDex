import type { Gen1Entry } from '../../content/gen1/types'
import { typeEffectiveness } from '../../content/typeEffectiveness'
import type { TypeName } from '../../content/types'
import type { RosterMember } from '../../engine/save'
import { deriveStats } from '../team/stats'

export const ENERGY_MAX = 100
export const ENERGY_PER_TAP = 20
// Flat bonus until the QTE framework (Sprint 15+) gates it by execution
// quality ("QTE bem executado = dano cheio; mediano = parcial; falhou =
// fraco" — roadmap section 3). Provisional.
export const SUPER_ATTACK_MULTIPLIER = 2.5

// Softens defense into diminishing returns instead of a hard subtraction,
// so a high-DEF unit can't reduce incoming damage to 0. Provisional.
const DEF_DAMPING = 0.5

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
  const base = Math.max(1, Math.round(attacker.atk - defender.def * DEF_DAMPING))
  return { amount: Math.max(1, Math.round(base * multiplier)), tier: effectivenessTier(multiplier) }
}

function nextLivingIndex(team: BattleUnit[], from: number): number {
  for (let offset = 0; offset < team.length; offset++) {
    const index = (from + offset) % team.length
    if (team[index].currentHp > 0) return index
  }
  return -1
}

// Tap-to-attack (roadmap section 4). Energy fills with taps; once full,
// the next tap releases the super attack instead and resets it.
export function applyPlayerTap(state: BattleState): BattleState {
  if (state.outcome !== 'ongoing') return state

  const active = state.playerTeam[state.activeIndex]
  const useSuper = state.energy >= ENERGY_MAX
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

// The enemy attacks on a timer (driven by the caller, telegraphed before
// impact) — this just applies one hit. If the active unit faints, the next
// living team member switches in automatically; no survivors = defeat.
export function applyEnemyAttack(state: BattleState): BattleState {
  if (state.outcome !== 'ongoing') return state

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
