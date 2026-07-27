// Sprint 25 — simula uma luta de verdade (motor real: createBattle/
// applyPlayerTap/applyEnemyAttack/resolveQteAttack), pra checar se
// DAMAGE_SCALE/STAT_GROWTH_PER_LEVEL/LEVEL_BUMP produzem lutas que
// realmente dão trabalho sem virar parede, contra o time real de cada
// ginásio/Elite Four.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { GymTeamMember } from '../../frontend/src/content/gen1/gyms'
import type { SpeciesEntry } from '../../frontend/src/content/gen1/types'
import {
  applyEnemyAttack,
  applyPlayerTap,
  createBattle,
  resolveQteAttack,
  switchActive,
  type EnemyRosterEntry,
} from '../../frontend/src/systems/battle/engine'
import type { QteResult } from '../../frontend/src/systems/battle/qte/grading'
import { resolveEvolution } from '../../frontend/src/systems/team/leveling'

const HERE = path.dirname(fileURLToPath(import.meta.url))

export function loadSpecies(dataUrl: string): SpeciesEntry[] {
  const file = path.join(HERE, '../../frontend/public', dataUrl)
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as SpeciesEntry[]
}

// Espécie/estágio que o STARTER teria "naturalmente" nesse nível (via
// resolveEvolution real) — usado como time solo de pior caso (sem
// sinergia de tipo, sem outros membros pra trocar) pra achar o piso da
// dificuldade: se até isso vence sem virar parede, um time de verdade
// (vários membros, tipos variados) só fica mais fácil.
export function starterAtLevel(gen1: SpeciesEntry[], starterId: number, level: number): { speciesId: number; level: number } {
  const base = gen1.find((s) => s.id === starterId)
  if (!base) throw new Error(`starter ${starterId} not found`)
  const speciesId = resolveEvolution(base, level)
  return { speciesId, level }
}

export interface BattleSimOptions {
  qteQuality: QteResult
  tapsPerEnemyAttack: number
  maxTaps: number
}

export interface BattleSimResult {
  outcome: 'victory' | 'defeat' | 'timeout'
  taps: number
  playerHpFractionRemaining: number
}

export function simulateFight(
  gen1: SpeciesEntry[],
  playerTeam: { speciesId: number; level: number }[],
  enemyTeam: (GymTeamMember & { trainerName?: string })[],
  options: BattleSimOptions,
): BattleSimResult {
  const roster = playerTeam.map((p) => ({ speciesId: p.speciesId, level: p.level, xp: 0 }))
  const activeTeamIds = playerTeam.map((p) => p.speciesId)
  const enemyRoster: EnemyRosterEntry[] = enemyTeam.map(({ speciesId, level, trainerName }) => {
    const entry = gen1.find((s) => s.id === speciesId)
    if (!entry) throw new Error(`species ${speciesId} not found`)
    return { entry, level, trainerName }
  })

  let battle = createBattle(gen1, roster, activeTeamIds, enemyRoster)
  let taps = 0

  while (battle.outcome === 'ongoing' && taps < options.maxTaps) {
    battle = battle.awaitingQte ? resolveQteAttack(battle, options.qteQuality) : applyPlayerTap(battle)
    taps++

    if (battle.outcome === 'ongoing' && taps % options.tapsPerEnemyAttack === 0) {
      battle = applyEnemyAttack(battle)
    }

    if (battle.outcome === 'ongoing') {
      const active = battle.playerTeam[battle.activeIndex]
      if (active.currentHp <= 0) {
        const nextIndex = battle.playerTeam.findIndex((u) => u.currentHp > 0)
        if (nextIndex !== -1) battle = switchActive(battle, nextIndex)
      }
    }
  }

  const totalMaxHp = battle.playerTeam.reduce((sum, u) => sum + u.maxHp, 0)
  const totalHp = battle.playerTeam.reduce((sum, u) => sum + Math.max(0, u.currentHp), 0)

  return {
    outcome: battle.outcome === 'ongoing' ? 'timeout' : battle.outcome,
    taps,
    playerHpFractionRemaining: totalMaxHp > 0 ? totalHp / totalMaxHp : 0,
  }
}
