import type { UpgradeDefinition } from '../gen1/upgrades'

// Provisional — mesmo shape e curva de custo de content/gen1/upgrades.ts /
// gen2/gen3/gen4/gen6 (docs/decisoes/0001-*.md), renomeado pro sabor de
// Unova. Mesmos 9 prédios base + as duas cadeias de "tier" (decisão 0026)
// + Padrão 3/4 (decisão 0035) — nenhuma forma nova de upgrade inventada
// aqui. Padrão 5 (upgrade por prédio, decisão 0048) fica pra uma leva
// futura, igual as outras regiões ainda não têm.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'xtransceiver-taps', name: 'Toques no Xtransceiver', kind: 'click', baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Vídeo-chamada de qualquer rota de Unova.' },
  { id: 'roller-skate-glove', name: 'Luva de Patins', kind: 'click', baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Desliza rápido, croca mais rápido ainda.' },
  { id: 'join-avenue-strike', name: 'Golpe da Join Avenue', kind: 'click', baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Toda loja da avenida vende um croque de brinde.' },
  { id: 'legendary-trio-fury', name: 'Fúria do Trio Lendário', kind: 'click', baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Verdade, ideais e vontade num soco só.' },
  { id: 'nurse-assistant-volunteer', name: 'Ajudante do Centro Pokémon', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Cura Pokémon de graça, cobra doce por fora.' },
  { id: 'battle-subway-post', name: 'Posto do Battle Subway', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'A fila anda devagar, o doce rende rápido.' },
  { id: 'unova-conveyor', name: 'Esteira de Doces Unova', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Doce entra congelado, sai quentinho igual em Nimbasa.' },
  { id: 'castelia-cone-factory', name: 'Fábrica do Cone de Castelia', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'A fila do food truck dá volta no quarteirão inteiro.' },
  { id: 'trainers-school-training', name: 'Treinamento da Escola de Treinadores', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'A prova é fácil, o resultado não é.' },

  // --- Cadeia "Treinador Lendário" (clique) — mesmo formato/números de
  // content/gen1/upgrades.ts (decisão 0026), só com sabor de Unova. ---
  { id: 'unova-league-gloves', name: 'Luvas da Liga Unova', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Suadas em oito ginásios de clima bem diferente entre si.' },
  { id: 'dark-stone-talisman', name: 'Talismã da Pedra Sombria', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Pesada igual uma lenda de verdade ou ideal.' },
  {
    id: 'kyurem-fury',
    name: 'Fúria do Kyurem',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Mesmo ponto de partida (50) que Kanto/Johto/Hoenn/Sinnoh/Kalos usam
    // desde a rodada de Sprint 25 — não recalibrado ainda pra Unova.
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'Congela o tempo só pra dar um croque com calma.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'nimbasa-amusement-co-op', name: 'Cooperativa do Parque de Nimbasa', kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'A roda-gigante também roda doce.' },
  { id: 'unova-outpost-network', name: 'Rede de Postos de Unova', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: 'De Nuvema a Opelucid, sempre tem um posto na próxima rota.' },
  {
    id: 'tao-trio-factory',
    name: 'Fábrica do Trio Tao',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'Verdade e ideais discordam de tudo, menos da produção.',
  },

  // --- Padrão 3 (sinergia) — mesmo formato de content/gen1/upgrades.ts. ---
  {
    id: 'grass-synergy-conveyor-unova',
    name: 'Estufa Simbiótica de Unova',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'unova-conveyor', count: 15, teamType: 'grass' },
    effect: 60, // +60 CPS, permanente
    flavor: 'A Esteira de Unova rende mais com um Pokémon de Grama cuidando da fila.',
  },

  // --- Padrão 4 (multiplicador global por marco) — mesmo formato,
  // gatilho pelas 8 insígnias de Unova. ---
  {
    id: 'unova-league-recognition',
    name: 'Reconhecimento da Liga Unova',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 4,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Metade das insígnias de Unova já abre a porta de qualquer Centro Pokémon.',
  },
  {
    id: 'unova-legend',
    name: 'Lenda de Unova',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 8,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 8 insígnias completas — até Alder já ouviu falar de você.',
  },
]
