import type { RegionSave } from '../../engine/save'
import { FRENZY_BUFF_ID, FRENZY_DURATION_MS, FRENZY_MULTIPLIER } from '../../content/goldenEncounter'
import { isBuffActive } from './candyShop'

export function isFrenzyActive(save: RegionSave, now: number): boolean {
  return isBuffActive(save, FRENZY_BUFF_ID, now)
}

// >1 while Frenzia is active, otherwise 1 — same shape as
// xpMultiplierFromBuffs (candyShop.ts), callers combine it with type
// bonuses/rebirth bonuses separately.
export function frenzyMultiplier(save: RegionSave, now: number): number {
  return isFrenzyActive(save, now) ? FRENZY_MULTIPLIER : 1
}

// Buying/catching again while still active extends from the current expiry
// instead of resetting the timer (same rule as buyXpBoost).
export function triggerFrenzy(save: RegionSave, now: number): RegionSave {
  const currentExpiry = Math.max(save.buffs[FRENZY_BUFF_ID] ?? 0, now)
  return { ...save, buffs: { ...save.buffs, [FRENZY_BUFF_ID]: currentExpiry + FRENZY_DURATION_MS } }
}
