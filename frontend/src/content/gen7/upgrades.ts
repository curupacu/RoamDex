import type { UpgradeDefinition } from '../gen1/upgrades'

// Mesmo formato e curva de custo de content/gen1..gen8/upgrades.ts, sabor
// de Alola. 9 prédios base + as 2 cadeias de tier (decisão 0026) + Padrão
// 3/4 (decisão 0035) — nenhum formato novo de upgrade inventado aqui.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'rotom-dex-taps', name: 'Toques no Rotom Dex', kind: 'click', baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Ele comenta cada clique, mas ajuda mesmo assim.' },
  { id: 'z-ring-glove', name: 'Luva do Z-Ring', kind: 'click', baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Não solta Z-Move, mas croca com pose.' },
  { id: 'poke-ride-strike', name: 'Golpe do Poké Ride', kind: 'click', baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Tauros puxa a carroça, o croque vai junto.' },
  { id: 'tapu-fury', name: 'Fúria dos Tapu', kind: 'click', baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'As 4 divindades-guardiãs de Alola num soco só.' },
  { id: 'malasada-volunteer', name: 'Ajudante da Malasada', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Doce frito, doce de verdade — os dois rendem.' },
  { id: 'festival-plaza-post', name: 'Posto do Festival Plaza', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'Toda missão da Praça esconde um Doce Nice.' },
  { id: 'hano-beach-conveyor', name: 'Esteira de Hano Beach', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Entra maré, sai doce quentinho.' },
  { id: 'aether-foundation-factory', name: 'Fábrica da Fundação Aether', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'Cada Pokémon resgatado deixa uma amostra de doce.' },
  { id: 'trainers-school-training', name: 'Treinamento da Escola de Treinadores', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'A prova é fácil, o resultado não é.' },

  // --- Cadeia "Treinador Lendário" (clique) — mesmo formato/números de
  // content/gen1/upgrades.ts (decisão 0026), sabor de Alola. ---
  { id: 'alola-league-gloves', name: 'Luvas da Liga Alola', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Suadas em onze provações espalhadas por toda Alola.' },
  { id: 'z-crystal-talisman', name: 'Talismã do Z-Cristal', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Brilha igual pose de Z-Move, mesmo sem golpe nenhum.' },
  {
    id: 'solgaleo-lunala-fury',
    name: 'Fúria de Solgaleo & Lunala',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Mesmo ponto de partida (50) que as regiões anteriores usam desde a
    // rodada de Sprint 25 — não recalibrado ainda pra Alola especificamente.
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'Sol e lua lendários emprestam a força de todo o time.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'ula-ula-tv-co-op', name: "Cooperativa da TV de Ula'ula", kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'A maior emissora de Alola também anuncia promoção de doce.' },
  { id: 'alola-outpost-network', name: 'Rede de Postos de Alola', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: "De Melemele a Poni, sempre tem um posto na próxima ilha." },
  {
    id: 'ultra-beast-factory',
    name: 'Fábrica dos Ultra Seres',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'Um Ultra Wormhole inteiro vira linha de produção.',
  },

  // --- Padrão 3 (sinergia) — mesmo formato de content/gen1/upgrades.ts. ---
  {
    id: 'water-synergy-hano-beach-conveyor',
    name: 'Esteira Simbiótica',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'hano-beach-conveyor', count: 15, teamType: 'water' },
    effect: 60, // +60 CPS, permanente
    flavor: 'A Esteira de Hano Beach rende mais com um Pokémon de Água surfando ao lado.',
  },

  // --- Padrão 4 (multiplicador global por marco) — mesmo formato,
  // gatilho pelos 11 certificados de Alola. ---
  {
    id: 'alola-league-recognition',
    name: 'Reconhecimento da Liga Alola',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 6,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Mais da metade das provações já abre a porta de qualquer Centro Pokémon.',
  },
  {
    id: 'alola-legend',
    name: 'Lenda de Alola',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 11,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 11 provações completas — até Kukui já ouviu falar de você.',
  },
]
