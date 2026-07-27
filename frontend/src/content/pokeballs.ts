// Sistema de Pokébolas — Pokébola normal (infinita, sempre disponível),
// Great Ball e Ultra Ball (finitas: compradas na Loja de Doces ou achadas
// como loot de vitória, ver systems/capture/loot.ts). `catchMultiplier`
// entra no mesmo `bonusMultiplier` que systems/capture/capture.ts já
// recebe (Fada, upgrades) — é só mais um fator na mesma conta.
export interface PokeballDefinition {
  id: string
  name: string
  catchMultiplier: number
  // undefined = a Pokébola base: infinita, nunca comprada, nunca cai como
  // loot (não faz sentido "achar" a bola que você já tem sem limite).
  cost?: number
  // Peso relativo entre as bolas finitas quando o loot rola uma bola —
  // maior = mais comum. Ausente pra quem não pode dropar (a base).
  lootWeight?: number
}

// Provisório — Sprint 25 ("Balanceamento") calibra preço/multiplicador com
// dados de simulação, mesmo tratamento de todo número econômico do jogo.
export const POKEBALLS: PokeballDefinition[] = [
  { id: 'poke-ball', name: 'Pokébola', catchMultiplier: 1 },
  { id: 'great-ball', name: 'Great Ball', catchMultiplier: 1.5, cost: 300, lootWeight: 4 },
  { id: 'ultra-ball', name: 'Ultra Ball', catchMultiplier: 2, cost: 1200, lootWeight: 1 },
]

export function pokeballById(id: string): PokeballDefinition | undefined {
  return POKEBALLS.find((ball) => ball.id === id)
}
