import type { UpgradeDefinition } from '../gen1/upgrades'

// Mesmo formato e curva de custo de content/gen1..gen6/upgrades.ts, sabor
// de Galar. 9 prédios base + as 2 cadeias de tier (decisão 0026) + Padrão
// 3/4 (decisão 0035) — nenhum formato novo de upgrade inventado aqui.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'rotom-phone-taps', name: 'Toques no Rotom Phone', kind: 'click', baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Notificação de doce a cada rota de Galar.' },
  { id: 'league-card-glove', name: 'Luva do Cartão da Liga', kind: 'click', baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Cada foto no Estádio croca mais forte.' },
  { id: 'curry-pot-strike', name: 'Golpe da Panela de Curry', kind: 'click', baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Berry picante, punho ainda mais.' },
  { id: 'legendary-dogs-fury', name: 'Fúria dos Cães Lendários', kind: 'click', baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Espada e escudo golpeando juntos.' },
  { id: 'digging-duo-volunteer', name: 'Ajudante da Dupla Cavadora', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Cava fóssil, acha doce.' },
  { id: 'wishing-piece-post', name: 'Posto do Fragmento dos Desejos', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'Toda Toca Max esconde uma cesta de doce.' },
  { id: 'wild-area-conveyor', name: 'Esteira da Área Selvagem', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Entra Wishing Piece, sai doce quentinho.' },
  { id: 'stow-on-side-factory', name: 'Fábrica de Stow-on-Side', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'A serraria mais doceira de Galar.' },
  { id: 'trainers-school-training', name: 'Treinamento da Escola de Treinadores', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'A prova é fácil, o resultado não é.' },

  // --- Cadeia "Treinador Lendário" (clique) — mesmo formato/números de
  // content/gen1/upgrades.ts (decisão 0026), sabor de Galar. ---
  { id: 'galar-league-gloves', name: 'Luvas da Liga Galar', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Suadas em oito ginásios espalhados por toda Galar.' },
  { id: 'dynamax-band-talisman', name: 'Talismã da Pulseira Dynamax', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Brilha igual Power Spot, mesmo sem Dynamax aqui.' },
  {
    id: 'zacian-zamazenta-fury',
    name: 'Fúria de Zacian & Zamazenta',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Mesmo ponto de partida (50) que as regiões anteriores usam desde a
    // rodada de Sprint 25 — não recalibrado ainda pra Galar especificamente.
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'A espada e o escudo lendários emprestam a força de todo o time.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'wyndon-tv-co-op', name: 'Cooperativa da TV de Wyndon', kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'A maior emissora de Galar também anuncia promoção de doce.' },
  { id: 'galar-outpost-network', name: 'Rede de Postos de Galar', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: 'De Postwick a Wyndon, sempre tem um posto na próxima rota.' },
  {
    id: 'obsidian-fieldlands-factory',
    name: 'Fábrica dos Campos de Obsidiana',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'A Área Selvagem inteira vira linha de produção.',
  },

  // --- Padrão 3 (sinergia) — mesmo formato de content/gen1/upgrades.ts. ---
  {
    id: 'grass-synergy-wild-area-conveyor',
    name: 'Esteira Simbiótica',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'wild-area-conveyor', count: 15, teamType: 'grass' },
    effect: 60, // +60 CPS, permanente
    flavor: 'A Esteira da Área Selvagem rende mais com um Pokémon Grama cuidando das plantas.',
  },

  // --- Padrão 4 (multiplicador global por marco) — mesmo formato,
  // gatilho pelas 8 insígnias de Galar. ---
  {
    id: 'galar-league-recognition',
    name: 'Reconhecimento da Liga Galar',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 4,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Metade das insígnias de Galar já abre a porta de qualquer Centro Pokémon.',
  },
  {
    id: 'galar-legend',
    name: 'Lenda de Galar',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 8,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 8 insígnias completas — até Leon já ouviu falar de você.',
  },
]
