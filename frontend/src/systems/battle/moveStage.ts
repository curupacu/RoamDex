import type { Gen1Entry } from '../../content/gen1/types'

// "O estágio do golpe segue o estágio evolutivo (forma base/1ª evo/2ª
// evo). Pokémon sem evolução sobe de estágio por marcos de nível
// (20/40)." — roadmap section 3, decisão proposta 5.
export function moveStage(entry: Gen1Entry, level: number): 0 | 1 | 2 {
  if (entry.evolutionChain.length > 1) {
    const index = entry.evolutionChain.findIndex((step) => step.id === entry.id)
    return Math.min(2, Math.max(0, index)) as 0 | 1 | 2
  }
  if (level >= 40) return 2
  if (level >= 20) return 1
  return 0
}
