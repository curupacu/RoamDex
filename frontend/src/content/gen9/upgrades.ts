import type { UpgradeDefinition } from '../gen1/upgrades'

// Mesmo formato e curva de custo de content/gen1..gen8/upgrades.ts, sabor
// de Paldea. 9 prédios base + as 2 cadeias de tier (decisão 0026) + Padrão
// 3/4 (decisão 0035) — nenhum formato novo de upgrade inventado aqui.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'rotom-phone-taps', name: 'Toques no Rotom Phone', kind: 'click', baseCost: 10, effect: 1, unlockAt: 0, flavor: 'App de mapa que também comenta o clique.' },
  { id: 'tera-orb-glove', name: 'Luva do Tera Orb', kind: 'click', baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Não Teraliza nada, mas croca com brilho.' },
  { id: 'let-go-strike', name: 'Golpe do Deixa Comigo', kind: 'click', baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'O Pokémon anda sozinho, o croque continua manual.' },
  { id: 'ruinous-treasures-fury', name: 'Fúria dos Tesouros Ruinosos', kind: 'click', baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'A espada, o pote, a joia e a máscara batendo juntos.' },
  { id: 'sandwich-volunteer', name: 'Ajudante do Sanduíche', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Receita de piquenique que rende mais doce que fome.' },
  { id: 'academy-post', name: 'Posto da Academia', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'Toda prova da academia esconde um doce de recompensa.' },
  { id: 'plaza-conveyor', name: 'Esteira da Praça Central', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Entra churro, sai doce quentinho.' },
  { id: 'terarium-factory', name: 'Fábrica do Terário', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'Cada bioma do terário rende sua própria amostra de doce.' },
  { id: 'trainers-school-training', name: 'Treinamento da Escola de Treinadores', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'A prova é fácil, o resultado não é.' },

  // --- Cadeia "Treinador Lendário" (clique) — mesmo formato/números de
  // content/gen1/upgrades.ts (decisão 0026), sabor de Paldea. ---
  { id: 'paldea-league-gloves', name: 'Luvas da Liga Paldea', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Suadas em oito ginásios espalhados por toda Paldea.' },
  { id: 'herba-mystica-talisman', name: 'Talismã da Herba Mystica', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Brilha igual sanduíche lendário, mesmo sem efeito nenhum.' },
  {
    id: 'koraidon-miraidon-fury',
    name: 'Fúria de Koraidon & Miraidon',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Mesmo ponto de partida (50) que as regiões anteriores usam desde a
    // rodada de Sprint 25 — não recalibrado ainda pra Paldea especificamente.
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'Passado e futuro lendários emprestam a força de todo o time.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'mesagoza-tv-co-op', name: 'Cooperativa da TV de Mesagoza', kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'A maior emissora de Paldea também anuncia promoção de doce.' },
  { id: 'paldea-outpost-network', name: 'Rede de Postos de Paldea', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: 'De Cabo Poco a Glaseado, sempre tem um posto na próxima província.' },
  {
    id: 'area-zero-factory',
    name: 'Fábrica da Área Zero',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'A cratera inteira vira linha de produção.',
  },

  // --- Padrão 3 (sinergia) — mesmo formato de content/gen1/upgrades.ts. ---
  {
    id: 'grass-synergy-plaza-conveyor',
    name: 'Esteira Simbiótica',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'plaza-conveyor', count: 15, teamType: 'grass' },
    effect: 60, // +60 CPS, permanente
    flavor: 'A Esteira da Praça Central rende mais com um Pokémon de Grama temperando o churro.',
  },

  // --- Padrão 4 (multiplicador global por marco) — mesmo formato,
  // gatilho pelas 8 insígnias de Paldea. ---
  {
    id: 'paldea-league-recognition',
    name: 'Reconhecimento da Liga Paldea',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 4,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Metade das insígnias de Paldea já abre a porta de qualquer Centro Pokémon.',
  },
  {
    id: 'paldea-legend',
    name: 'Lenda de Paldea',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 8,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 8 insígnias completas — até Geeta já ouviu falar de você.',
  },
]
