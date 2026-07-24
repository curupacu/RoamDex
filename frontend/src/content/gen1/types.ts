import type { TypeName } from '../types'

export interface Gen1Entry {
  id: number
  name: string
  types: TypeName[]
  sprite: { url: string; local: string }
}
