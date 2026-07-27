import { POKEBALLS, pokeballById, type PokeballDefinition } from '../../content/pokeballs'
import type { RegionSave } from '../../engine/save'
import { captureChance } from './capture'

export function ballCount(region: RegionSave, id: string): number {
  return region.pokeballs[id] ?? 0
}

// The base Pokébola (no cost) is always available; a finite ball needs at
// least one owned.
export function isBallAvailable(region: RegionSave, def: PokeballDefinition): boolean {
  return def.cost === undefined || ballCount(region, def.id) > 0
}

export function addBalls(region: RegionSave, id: string, amount: number): RegionSave {
  if (amount <= 0) return region
  return { ...region, pokeballs: { ...region.pokeballs, [id]: ballCount(region, id) + amount } }
}

// Spends one ball on a throw — no-op for the infinite base Pokébola, or if
// none are owned (caller should have already checked isBallAvailable).
export function spendBall(region: RegionSave, id: string): RegionSave {
  const def = pokeballById(id)
  if (!def || def.cost === undefined) return region
  const count = ballCount(region, id)
  if (count <= 0) return region
  return { ...region, pokeballs: { ...region.pokeballs, [id]: count - 1 } }
}

export function buyBall(region: RegionSave, id: string): RegionSave {
  const def = pokeballById(id)
  if (!def || def.cost === undefined || region.candies < def.cost) return region
  return addBalls({ ...region, candies: region.candies - def.cost }, id, 1)
}

export interface CaptureOption {
  id: string
  name: string
  count: number | null // null = infinite (the base Pokébola)
  chance: number // 0-1
}

// One row per ball for the post-victory capture HUD (BattleScreen) —
// bonusMultiplier is everything the caller already had (team/Fada bonus,
// future upgrades), this just folds each ball's own catchMultiplier on top.
export function captureOptions(region: RegionSave, captureRate: number, bonusMultiplier: number): CaptureOption[] {
  return POKEBALLS.map((def) => ({
    id: def.id,
    name: def.name,
    count: def.cost === undefined ? null : ballCount(region, def.id),
    chance: captureChance(captureRate, bonusMultiplier * def.catchMultiplier),
  }))
}

// Weighted pick among the balls that can drop as loot (the base Pokébola
// has no lootWeight, so it never comes up) — used by systems/capture/loot.ts.
export function rollLootBall(): PokeballDefinition {
  const droppable = POKEBALLS.filter((def) => def.lootWeight !== undefined)
  const totalWeight = droppable.reduce((sum, def) => sum + (def.lootWeight ?? 0), 0)

  let roll = Math.random() * totalWeight
  for (const def of droppable) {
    roll -= def.lootWeight ?? 0
    if (roll <= 0) return def
  }
  return droppable[droppable.length - 1]
}
