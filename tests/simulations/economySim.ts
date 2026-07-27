// Sprint 25 ("Balanceamento") — simulação de economia idle. Reaproveita as
// funções reais de systems/economy/* (nunca reimplementa a fórmula), então
// qualquer ajuste feito aqui pra corrigir desbalanceamento automaticamente
// se reflete no jogo de verdade e vice-versa.
import type { RegionDefinition } from '../../frontend/src/content/regions'
import type { UpgradeDefinition } from '../../frontend/src/content/gen1/upgrades'
import { emptyRegionSave, type RegionSave } from '../../frontend/src/engine/save'
import { clickValue } from '../../frontend/src/systems/economy/click'
import { isUnlocked, ownedCount, totalCps, upgradeCost, buyUpgrade } from '../../frontend/src/systems/economy/upgrades'

export interface EconomySimOptions {
  // Doces por clique/segundo assumidos — 0 simula um jogador 100% idle
  // (o "pior caso" real: só CPS, nunca clica). Usado pra checar "sem
  // muros" mesmo sem nenhum engajamento ativo.
  clicksPerSecond: number
  durationSeconds: number
}

export interface GateResult {
  locationId: string
  name: string
  unlockAt: number
  reachedAtSeconds: number | null // null = não alcançado dentro da duração simulada
}

export interface EconomySimResult {
  gates: GateResult[]
  finalCandies: number
  finalLifetimeCandies: number
  upgradesOwned: Record<string, number>
  checkpoints: { second: number; lifetimeCandies: number; upgradesOwned: Record<string, number> }[]
}

// Compara upgrades de kinds diferentes (doces/clique vs doces/s) numa base
// só: "doces/s equivalente" assumindo o ritmo de clique informado — se
// clicksPerSecond é 0, upgrades de clique naturalmente saem do cálculo
// (rate vira 0), sem precisar de um caso especial.
function effectiveRate(def: UpgradeDefinition, clicksPerSecond: number): number {
  if (def.kind === 'cps') return def.effect
  if (def.kind === 'click') return def.effect * clicksPerSecond
  return 0
}

function isMaxed(def: UpgradeDefinition, save: RegionSave): boolean {
  return def.maxPurchases !== undefined && ownedCount(save, def.id) >= def.maxPurchases
}

// Compra gulosa: a cada segundo simulado, primeiro esgota tudo que dá pra
// comprar em cps/clique ordenado por "doces/s equivalente por doce
// gasto" (melhor ROI primeiro) — aproxima o que um jogador otimizando de
// verdade faria numa sessão. Upgrades de XP são secundários (não geram
// doce, então nunca vencem o ROI de cps/clique) — só gasta o troco neles
// depois que não sobra mais nada de cps/clique afordável.
function buyGreedily(regionDef: RegionDefinition, save: RegionSave, clicksPerSecond: number): RegionSave {
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

  for (const def of regionDef.upgrades) {
    if (def.kind !== 'xp' || isMaxed(def, current)) continue
    while (isUnlocked(def, current) && upgradeCost(def, ownedCount(current, def.id), 1) <= current.candies) {
      current = buyUpgrade(regionDef, current, def.id, 1)
    }
  }

  return current
}

const CHECKPOINT_SECONDS = [60, 300, 600, 1800, 3600, 3 * 3600, 10 * 3600, 25 * 3600, 50 * 3600]

export function simulateEconomy(regionDef: RegionDefinition, options: EconomySimOptions): EconomySimResult {
  const { clicksPerSecond, durationSeconds } = options
  let save: RegionSave = emptyRegionSave(regionDef.id, regionDef.locations[0].id)

  const gates: GateResult[] = regionDef.locations.map((location) => ({
    locationId: location.id,
    name: location.name,
    unlockAt: location.unlockAt,
    reachedAtSeconds: location.unlockAt === 0 ? 0 : null,
  }))
  const checkpoints: EconomySimResult['checkpoints'] = []

  for (let second = 1; second <= durationSeconds; second++) {
    const cps = totalCps(regionDef, save, 1)
    const clickGain = clickValue(regionDef, save, 1) * clicksPerSecond
    const gain = cps + clickGain
    save = { ...save, candies: save.candies + gain, lifetimeCandies: save.lifetimeCandies + gain }

    for (const gate of gates) {
      if (gate.reachedAtSeconds === null && save.lifetimeCandies >= gate.unlockAt) {
        gate.reachedAtSeconds = second
      }
    }

    save = buyGreedily(regionDef, save, clicksPerSecond)

    if (CHECKPOINT_SECONDS.includes(second)) {
      checkpoints.push({ second, lifetimeCandies: save.lifetimeCandies, upgradesOwned: { ...save.upgrades } })
    }
  }

  return {
    gates,
    finalCandies: save.candies,
    finalLifetimeCandies: save.lifetimeCandies,
    upgradesOwned: save.upgrades,
    checkpoints,
  }
}

export function formatHours(seconds: number | null): string {
  if (seconds === null) return 'NUNCA'
  return `${(seconds / 3600).toFixed(2)}h`
}
