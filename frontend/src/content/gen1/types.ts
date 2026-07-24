import type { TypeName } from '../types'

export interface Gen1Stats {
  hp: number
  attack: number
  defense: number
  'special-attack': number
  'special-defense': number
  speed: number
}

export interface Gen1Entry {
  id: number
  name: string
  types: TypeName[]
  stats: Gen1Stats
  sprite: { url: string; local: string }
}
