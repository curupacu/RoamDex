// Sprint 25 — junta economia + nível pra achar o gargalo de ritmo REAL.
// Descoberta rodando a economia sozinha (economySim.ts): os gates de doces
// caem em minutos — quem trava de verdade é o nível do time pro ginásio
// (canTravelTo exige doce E insígnia da localização atual). Esta simulação
// modela isso direito: o jogador fica "preso" na cidade do próximo ginásio
// não vencido (mesmo com doce de sobra pra ir mais longe) e precisa voltar
// pra rota anterior pra treinar, já que cidades/ginásios não têm selvagem
// (encounters: []). XP de batalha escala com o nível do selvagem da rota
// onde o jogador está treinando (mesmo espírito do loot de doces, que já
// escala com nível do inimigo).
import type { RegionDefinition } from '../../frontend/src/content/regions'
import { emptyRegionSave, type RegionSave, type RosterMember } from '../../frontend/src/engine/save'
import { clickValue } from '../../frontend/src/systems/economy/click'
import { isUnlocked, ownedCount, totalCps, totalXpPerSecond, upgradeCost, buyUpgrade } from '../../frontend/src/systems/economy/upgrades'
import { applyXpGain } from '../../frontend/src/systems/team/leveling'
import { BASE_SPAWN_INTERVAL_MS } from '../../frontend/src/systems/capture/wildEncounter'
import type { UpgradeDefinition } from '../../frontend/src/content/gen1/upgrades'

function effectiveRate(def: UpgradeDefinition, clicksPerSecond: number): number {
  if (def.kind === 'cps') return def.effect
  if (def.kind === 'click') return def.effect * clicksPerSecond
  return 0
}

function isMaxed(def: UpgradeDefinition, save: RegionSave): boolean {
  return def.maxPurchases !== undefined && ownedCount(save, def.id) >= def.maxPurchases
}

function buyGreedily(regionDef: RegionDefinition, save: RegionSave, clicksPerSecond: number, includeIdleXp: boolean): RegionSave {
  let current = save
  let bought = true
  while (bought) {
    bought = false
    let best: { id: string; roi: number } | null = null
    for (const def of regionDef.upgrades) {
      if (def.kind === 'xp') continue
      if (!isUnlocked(def, current) || isMaxed(def, current)) continue
      const cost = upgradeCost(def, ownedCount(current, def.id), 1)
      if (cost > current.candies) continue
      const rate = effectiveRate(def, clicksPerSecond)
      if (rate <= 0) continue
      const roi = rate / cost
      if (!best || roi > best.roi) best = { id: def.id, roi }
    }
    if (best) {
      current = buyUpgrade(regionDef, current, best.id, 1)
      bought = true
    }
  }
  if (includeIdleXp) {
    for (const def of regionDef.upgrades) {
      if (def.kind !== 'xp' || isMaxed(def, current)) continue
      while (isUnlocked(def, current) && upgradeCost(def, ownedCount(current, def.id), 1) <= current.candies) {
        current = buyUpgrade(regionDef, current, def.id, 1)
      }
    }
  }
  return current
}

function averageEncounterLevel(regionDef: RegionDefinition, locationIndex: number): number {
  for (let i = locationIndex; i >= 0; i--) {
    const location = regionDef.locations[i]
    if (location.encounters.length === 0) continue
    const levels = location.encounters.map((e) => (e.minLevel + e.maxLevel) / 2)
    return levels.reduce((sum, l) => sum + l, 0) / levels.length
  }
  return regionDef.starterLevel
}

export interface BattleXpFormula {
  perLevelTeam: number
  perLevelActiveBonus: number
}

export interface ProgressionSimOptions {
  clicksPerSecond: number
  durationSeconds: number
  battleXp: BattleXpFormula
  // false = ignora o Treinamento idle inteiro, só XP de batalha — pra
  // confirmar que batalhar sozinho (a fonte PRINCIPAL segundo o roadmap)
  // já dá conta do recado sem depender do idle como muleta.
  includeIdleXp?: boolean
}

export interface GymCheckpoint {
  gymId: string
  leaderName: string
  locationId: string
  averageTeamLevel: number
  candyGateSeconds: number | null
  levelReadySeconds: number | null // quando o nível do ativo alcançou o nível médio do time do ginásio
  clearedAtSeconds: number | null // max(candyGate, levelReady) -- quando de fato dava pra vencer e seguir
}

export interface ProgressionSimResult {
  gyms: GymCheckpoint[]
  eliteFourClearedAtSeconds: number | null
  eliteFourAverageLevel: number
  finalLevel: number
}

export function simulateProgression(regionDef: RegionDefinition, options: ProgressionSimOptions): ProgressionSimResult {
  const { clicksPerSecond, durationSeconds, battleXp, includeIdleXp = true } = options
  let save: RegionSave = emptyRegionSave(regionDef.id, regionDef.locations[0].id)
  let member: RosterMember = { speciesId: regionDef.starterIds[0], level: regionDef.starterLevel, xp: 0 }

  const gyms: GymCheckpoint[] = regionDef.gyms.map((gym) => ({
    gymId: gym.id,
    leaderName: gym.leaderName,
    locationId: gym.locationId,
    averageTeamLevel: Math.round(gym.team.reduce((sum, m) => sum + m.level, 0) / gym.team.length),
    candyGateSeconds: null,
    levelReadySeconds: null,
    clearedAtSeconds: null,
  }))
  const eliteFourAverageLevel = Math.round(
    regionDef.eliteFour.flatMap((m) => m.team).reduce((sum, m) => sum + m.level, 0) /
      regionDef.eliteFour.flatMap((m) => m.team).length,
  )
  let eliteFourClearedAtSeconds: number | null = null

  let gymsCleared = 0
  let msUntilEncounter = BASE_SPAWN_INTERVAL_MS

  for (let second = 1; second <= durationSeconds; second++) {
    const cps = totalCps(regionDef, save, 1)
    const clickGain = clickValue(regionDef, save, 1) * clicksPerSecond
    const gain = cps + clickGain
    save = { ...save, candies: save.candies + gain, lifetimeCandies: save.lifetimeCandies + gain }

    // Índice da localização mais distante que os doces já liberam.
    let candyIndex = 0
    for (let i = regionDef.locations.length - 1; i >= 0; i--) {
      if (save.lifetimeCandies >= regionDef.locations[i].unlockAt) {
        candyIndex = i
        break
      }
    }
    // Preso na cidade do próximo ginásio não vencido, mesmo se o doce já
    // permitisse ir mais longe (canTravelTo real: exige a insígnia da
    // localização atual pra passar por ela).
    const nextGym = gyms[gymsCleared]
    const nextGymLocationIndex = nextGym
      ? regionDef.locations.findIndex((l) => l.id === nextGym.locationId)
      : regionDef.locations.length - 1
    const reachableIndex = Math.min(candyIndex, nextGymLocationIndex)

    const grindLevel = averageEncounterLevel(regionDef, reachableIndex)

    const idleXp = includeIdleXp ? totalXpPerSecond(regionDef, save) : 0
    if (idleXp > 0) member = applyXpGain(member, idleXp)

    msUntilEncounter -= 1000
    if (msUntilEncounter <= 0) {
      msUntilEncounter = BASE_SPAWN_INTERVAL_MS
      const teamXp = grindLevel * battleXp.perLevelTeam
      const activeXp = teamXp + grindLevel * battleXp.perLevelActiveBonus
      member = applyXpGain(member, activeXp)
      void teamXp // (times maior que 1 membro dividiria igual pelos outros — fora do escopo desta simulação de 1 membro)
    }

    if (nextGym) {
      if (nextGym.candyGateSeconds === null && save.lifetimeCandies >= regionDef.locations[nextGymLocationIndex].unlockAt) {
        nextGym.candyGateSeconds = second
      }
      if (nextGym.levelReadySeconds === null && member.level >= nextGym.averageTeamLevel) {
        nextGym.levelReadySeconds = second
      }
      if (nextGym.candyGateSeconds !== null && nextGym.levelReadySeconds !== null && nextGym.clearedAtSeconds === null) {
        nextGym.clearedAtSeconds = Math.max(nextGym.candyGateSeconds, nextGym.levelReadySeconds)
        gymsCleared++
      }
    } else if (eliteFourClearedAtSeconds === null && member.level >= eliteFourAverageLevel) {
      eliteFourClearedAtSeconds = second
    }

    save = buyGreedily(regionDef, save, clicksPerSecond, includeIdleXp)
  }

  return { gyms, eliteFourClearedAtSeconds, eliteFourAverageLevel, finalLevel: member.level }
}

export function formatHours(seconds: number | null): string {
  if (seconds === null) return 'NUNCA'
  return `${(seconds / 3600).toFixed(2)}h`
}
