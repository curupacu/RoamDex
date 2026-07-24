import type { TypeName } from './types'

export interface MoveSet {
  stages: [string, string, string]
}

// All 18 types have a real QTE + moveset now (Sprint 15 "leva 1" + Sprint
// 16 "leva 2" + Sprint 17 "leva 3"). Names are official English move
// names (CLAUDE.md convention), straight from the roadmap's master table
// (section 3) — not invented.
export const MOVES: Partial<Record<TypeName, MoveSet>> = {
  grass: { stages: ['Vine Whip', 'Bullet Seed', 'Leaf Storm'] },
  fire: { stages: ['Ember', 'Flamethrower', 'Fire Blast'] },
  water: { stages: ['Water Gun', 'Surf', 'Hydro Pump'] },
  electric: { stages: ['Thunder Shock', 'Thunderbolt', 'Thunder'] },
  normal: { stages: ['Tackle', 'Body Slam', 'Hyper Beam'] },
  fighting: { stages: ['Karate Chop', 'Brick Break', 'Close Combat'] },
  ice: { stages: ['Powder Snow', 'Ice Beam', 'Blizzard'] },
  poison: { stages: ['Poison Sting', 'Sludge Bomb', 'Gunk Shot'] },
  ground: { stages: ['Mud-Slap', 'Dig', 'Earthquake'] },
  flying: { stages: ['Peck', 'Aerial Ace', 'Brave Bird'] },
  psychic: { stages: ['Confusion', 'Psybeam', 'Psychic'] },
  rock: { stages: ['Rock Throw', 'Rock Slide', 'Stone Edge'] },
  bug: { stages: ['Bug Bite', 'X-Scissor', 'Megahorn'] },
  ghost: { stages: ['Lick', 'Shadow Ball', 'Phantom Force'] },
  dragon: { stages: ['Dragon Breath', 'Dragon Claw', 'Draco Meteor'] },
  steel: { stages: ['Metal Claw', 'Iron Head', 'Meteor Mash'] },
  dark: { stages: ['Bite', 'Crunch', 'Dark Pulse'] },
  fairy: { stages: ['Fairy Wind', 'Dazzling Gleam', 'Moonblast'] },
}

export function moveNameForStage(type: TypeName, stage: 0 | 1 | 2): string | null {
  return MOVES[type]?.stages[stage] ?? null
}
