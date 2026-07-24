import type { TypeName } from './types'

export interface MoveSet {
  stages: [string, string, string]
}

// Only these 6 types have a real QTE + moveset so far (Sprint 15, roadmap's
// "leva 1"); Sprints 16-17 add the remaining 12. Names are official English
// move names (CLAUDE.md convention), straight from the roadmap's master
// table (section 3) — not invented.
export const MOVES: Partial<Record<TypeName, MoveSet>> = {
  grass: { stages: ['Vine Whip', 'Bullet Seed', 'Leaf Storm'] },
  fire: { stages: ['Ember', 'Flamethrower', 'Fire Blast'] },
  water: { stages: ['Water Gun', 'Surf', 'Hydro Pump'] },
  electric: { stages: ['Thunder Shock', 'Thunderbolt', 'Thunder'] },
  normal: { stages: ['Tackle', 'Body Slam', 'Hyper Beam'] },
  fighting: { stages: ['Karate Chop', 'Brick Break', 'Close Combat'] },
}

export function moveNameForStage(type: TypeName, stage: 0 | 1 | 2): string | null {
  return MOVES[type]?.stages[stage] ?? null
}
