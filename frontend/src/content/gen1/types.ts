import type { TypeName } from '../types'

export interface Gen1Stats {
  hp: number
  attack: number
  defense: number
  'special-attack': number
  'special-defense': number
  speed: number
}

export interface EvolutionStep {
  id: number
  species: string
  trigger: string
  minLevel: number | null
}

export interface Gen1Entry {
  id: number
  name: string
  types: TypeName[]
  stats: Gen1Stats
  evolutionChain: EvolutionStep[]
  sprite: { url: string; local: string }
}
