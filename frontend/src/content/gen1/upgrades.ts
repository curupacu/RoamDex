export interface UpgradeDefinition {
  id: string
  name: string
  kind: 'click' | 'cps'
  baseCost: number
  effect: number
  // Lifetime candies (see SaveDataV2) required before the upgrade shows up.
  unlockAt: number
}

// Provisional costs/effects — Sprint 25 ("Balanceamento") is where these get
// tuned against real play-simulation data, per docs/decisoes/0001-*.md.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'quick-fingers', name: 'Dedos Ligeiros', kind: 'click', baseCost: 10, effect: 1, unlockAt: 0 },
  { id: 'battle-glove', name: 'Luva de Treino', kind: 'click', baseCost: 100, effect: 5, unlockAt: 50 },
  { id: 'critical-strike', name: 'Golpe Crítico', kind: 'click', baseCost: 1_100, effect: 25, unlockAt: 500 },
  { id: 'pokemon-fury', name: 'Fúria Pokémon', kind: 'click', baseCost: 12_000, effect: 150, unlockAt: 5_000 },
  { id: 'volunteer-helper', name: 'Ajudante Voluntário', kind: 'cps', baseCost: 15, effect: 0.1, unlockAt: 0 },
  { id: 'collection-post', name: 'Posto de Coleta', kind: 'cps', baseCost: 180, effect: 1, unlockAt: 100 },
  { id: 'candy-conveyor', name: 'Esteira de Doces', kind: 'cps', baseCost: 2_000, effect: 8, unlockAt: 1_500 },
  { id: 'candy-factory', name: 'Fábrica de Doces', kind: 'cps', baseCost: 22_000, effect: 47, unlockAt: 15_000 },
]
