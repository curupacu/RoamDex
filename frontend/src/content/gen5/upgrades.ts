import type { UpgradeDefinition } from '../gen1/upgrades'

// Provisional — mesmo shape e curva de custo de content/gen1/upgrades.ts /
// gen2/gen3/gen4/gen6 (docs/decisoes/0001-*.md), renomeado pro sabor de
// Unova. Mesmos 11 prédios base (os 4 originais + 2 novos) + as duas
// cadeias de "tier" (decisão 0026) + Padrão 3/4 (decisão 0035) + Padrão 5
// (upgrade por prédio, decisão 0048) — nenhuma forma nova de upgrade
// inventada aqui.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'xtransceiver-taps', name: 'Toques no Xtransceiver', kind: 'click', maxPurchases: 1, baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Vídeo-chamada de qualquer rota de Unova.' },
  { id: 'roller-skate-glove', name: 'Luva de Patins', kind: 'click', maxPurchases: 1, baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Desliza rápido, croca mais rápido ainda.' },
  { id: 'join-avenue-strike', name: 'Golpe da Join Avenue', kind: 'click', maxPurchases: 1, baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Toda loja da avenida vende um croque de brinde.' },
  { id: 'legendary-trio-fury', name: 'Fúria do Trio Lendário', kind: 'click', maxPurchases: 1, baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Verdade, ideais e vontade num soco só.' },
  { id: 'volunteer-helper', name: 'Ajudante Voluntário', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Cisca o chão sem parar, nem sabe bem por quê.' },
  { id: 'battle-subway-post', name: 'Posto do Battle Subway', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'A fila anda devagar, o doce rende rápido.' },
  { id: 'unova-conveyor', name: 'Esteira de Doces Unova', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Doce entra congelado, sai quentinho igual em Nimbasa.' },
  { id: 'castelia-cone-factory', name: 'Fábrica do Cone de Castelia', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'A fila do food truck dá volta no quarteirão inteiro.' },
  { id: 'juniper-lab', name: 'Laboratório da Professora Juniper', kind: 'cps', baseCost: 240_000, effect: 560, unlockAt: 165_000, flavor: 'Tecnologia de ponta, só que pra fazer doce.' },
  { id: 'chargestone-power-plant', name: 'Usina da Chargestone Cave', kind: 'cps', baseCost: 2_600_000, effect: 2_240, unlockAt: 1_800_000, flavor: 'O zumbido nunca para, nem de noite.' },
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

  // --- Padrão 5 (cadeia de upgrade POR PRÉDIO, decisão 0048) — mesmo
  // formato de content/gen1/upgrades.ts, sabor de Unova. Cada um dos 6
  // prédios de CPS ilimitados ganha 2 tiers, desbloqueados por quantidade
  // possuída daquele prédio (unlockAt fica em 0). ---
  {
    id: 'nurse-coat',
    name: 'Jaleco Novo',
    kind: 'buildingBoost',
    boostsBuilding: 'volunteer-helper',
    baseCost: 500,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'volunteer-helper', count: 10 },
    effect: 0.05,
    flavor: 'Passa confiança até no Pokémon mais nervoso.',
  },
  {
    id: 'nurse-badge',
    name: 'Crachá de Confiança',
    kind: 'buildingBoost',
    boostsBuilding: 'volunteer-helper',
    baseCost: 5_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'volunteer-helper', count: 25 },
    effect: 0.08,
    flavor: 'Agora ele acha que manda no lugar.',
  },
  {
    id: 'battle-subway-basket',
    name: 'Cesta Reforçada',
    kind: 'buildingBoost',
    boostsBuilding: 'battle-subway-post',
    baseCost: 3_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'battle-subway-post', count: 10 },
    effect: 0.05,
    flavor: 'Vime trançado à mão, cabe mais doce.',
  },
  {
    id: 'battle-subway-route',
    name: 'Rota Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'battle-subway-post',
    baseCost: 30_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'battle-subway-post', count: 25 },
    effect: 0.08,
    flavor: 'Passa por mais esquinas, junta mais doce.',
  },
  {
    id: 'unova-conveyor-oil',
    name: 'Correia Lubrificada',
    kind: 'buildingBoost',
    boostsBuilding: 'unova-conveyor',
    baseCost: 35_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'unova-conveyor', count: 10 },
    effect: 0.05,
    flavor: 'Sem ranger, sem travar, só doce.',
  },
  {
    id: 'unova-conveyor-turbo',
    name: 'Motor Turbo',
    kind: 'buildingBoost',
    boostsBuilding: 'unova-conveyor',
    baseCost: 350_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'unova-conveyor', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém sabe de onde vem essa velocidade toda.',
  },
  {
    id: 'castelia-shift',
    name: 'Turno Duplo',
    kind: 'buildingBoost',
    boostsBuilding: 'castelia-cone-factory',
    baseCost: 400_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'castelia-cone-factory', count: 10 },
    effect: 0.05,
    flavor: 'A chaminé não descansa, e ninguém reclama.',
  },
  {
    id: 'castelia-automation',
    name: 'Automação da Linha',
    kind: 'buildingBoost',
    boostsBuilding: 'castelia-cone-factory',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'castelia-cone-factory', count: 25 },
    effect: 0.08,
    flavor: 'A esteira roda sozinha; o vidro é só decoração.',
  },
  {
    id: 'juniper-network',
    name: 'Rede Juniper',
    kind: 'buildingBoost',
    boostsBuilding: 'juniper-lab',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'juniper-lab', count: 10 },
    effect: 0.05,
    flavor: 'Cada filial manda um pouco de doce pra matriz.',
  },
  {
    id: 'juniper-patent',
    name: 'Patente Exclusiva',
    kind: 'buildingBoost',
    boostsBuilding: 'juniper-lab',
    baseCost: 43_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'juniper-lab', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém mais tem permissão de copiar essa fórmula.',
  },
  {
    id: 'chargestone-turbine',
    name: 'Turbina Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'chargestone-power-plant',
    baseCost: 44_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'chargestone-power-plant', count: 10 },
    effect: 0.05,
    flavor: 'Mais watts, mais doce — a conta simplesmente fecha.',
  },
  {
    id: 'chargestone-overload',
    name: 'Sobrecarga Controlada',
    kind: 'buildingBoost',
    boostsBuilding: 'chargestone-power-plant',
    baseCost: 468_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'chargestone-power-plant', count: 25 },
    effect: 0.08,
    flavor: 'Passa do limite de propósito; ainda não explodiu.',
  },

  // --- Cadeia "Treinamento" (XP) — decisão 0053, mesmo formato de
  // content/gen1/upgrades.ts. ---
  { id: 'training-drills', name: 'Repetição Cronometrada', kind: 'xp', baseCost: 2_000, effect: 2, unlockAt: 8_000, maxPurchases: 1, flavor: 'Fazer de novo, de novo, e de novo — até virar reflexo.' },
  { id: 'training-simulator', name: 'Simulador de Combate', kind: 'xp', baseCost: 10_000, effect: 6, unlockAt: 40_000, maxPurchases: 1, flavor: 'Nenhum Pokémon se machuca, mas todos aprendem igual.' },
  {
    id: 'training-academy',
    name: 'Escola Itinerante',
    kind: 'xp',
    baseCost: 45_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 1, // +1 XP/s por Pokémon capturado no roster
    flavor: 'Cada Pokémon do time vira professor do próximo, por um tempinho.',
  },
  {
    id: 'training-psychic-bond',
    name: 'Vínculo Psíquico',
    kind: 'xp',
    baseCost: 60_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'training-academy', count: 1, teamType: 'psychic' },
    effect: 3, // +3 XP/s, permanente
    flavor: 'Um Pokémon Psíquico no time sente o que os outros ainda não aprenderam.',
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
