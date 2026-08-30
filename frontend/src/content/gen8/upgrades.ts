import type { UpgradeDefinition } from '../gen1/upgrades'

// Mesmo formato e curva de custo de content/gen1..gen6/upgrades.ts, sabor
// de Galar. 9 prédios base (mais 2 prédios de CPS adicionados depois) + as
// 2 cadeias de tier (decisão 0026) + Padrão 3/4 (decisão 0035) + Padrão 5
// (upgrade por prédio, decisão 0048) — nenhum formato novo de upgrade
// inventado aqui.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'rotom-phone-taps', name: 'Toques no Rotom Phone', kind: 'click', maxPurchases: 1, baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Notificação de doce a cada rota de Galar.' },
  { id: 'league-card-glove', name: 'Luva do Cartão da Liga', kind: 'click', maxPurchases: 1, baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Cada foto no Estádio croca mais forte.' },
  { id: 'curry-pot-strike', name: 'Golpe da Panela de Curry', kind: 'click', maxPurchases: 1, baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Berry picante, punho ainda mais.' },
  { id: 'legendary-dogs-fury', name: 'Fúria dos Cães Lendários', kind: 'click', maxPurchases: 1, baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Espada e escudo golpeando juntos.' },
  { id: 'volunteer-helper', name: 'Ajudante Voluntário', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Cisca o chão sem parar, nem sabe bem por quê.' },
  { id: 'wishing-piece-post', name: 'Posto do Fragmento dos Desejos', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'Toda Toca Max esconde uma cesta de doce.' },
  { id: 'wild-area-conveyor', name: 'Esteira da Área Selvagem', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Entra Wishing Piece, sai doce quentinho.' },
  { id: 'stow-on-side-factory', name: 'Fábrica de Stow-on-Side', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'A serraria mais doceira de Galar.' },
  { id: 'magnolia-lab', name: 'Laboratório da Professora Magnólia', kind: 'cps', baseCost: 240_000, effect: 560, unlockAt: 165_000, flavor: 'Tecnologia de ponta, só que pra fazer doce.' },
  { id: 'isle-of-armor-power-plant', name: 'Usina da Isle of Armor', kind: 'cps', baseCost: 2_600_000, effect: 2_240, unlockAt: 1_800_000, flavor: 'O zumbido nunca para, nem de noite.' },
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

  // --- Padrão 5 (cadeia de upgrade POR PRÉDIO, decisão 0048) — mesmo
  // formato de content/gen1/upgrades.ts, sabor de Galar. Cada um dos 6
  // prédios de CPS ilimitados ganha 2 tiers, desbloqueados por quantidade
  // possuída daquele prédio (unlockAt fica em 0). ---
  {
    id: 'digging-duo-shovel',
    name: 'Pá Nova',
    kind: 'buildingBoost',
    boostsBuilding: 'volunteer-helper',
    baseCost: 500,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'volunteer-helper', count: 10 },
    effect: 0.05,
    flavor: 'Cava mais fundo, acha mais doce.',
  },
  {
    id: 'digging-duo-badge',
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
    id: 'wishing-piece-basket',
    name: 'Cesta Reforçada',
    kind: 'buildingBoost',
    boostsBuilding: 'wishing-piece-post',
    baseCost: 3_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'wishing-piece-post', count: 10 },
    effect: 0.05,
    flavor: 'Vime trançado à mão, cabe mais doce.',
  },
  {
    id: 'wishing-piece-route',
    name: 'Rota Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'wishing-piece-post',
    baseCost: 30_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'wishing-piece-post', count: 25 },
    effect: 0.08,
    flavor: 'Passa por mais esquinas, junta mais doce.',
  },
  {
    id: 'wild-area-oil',
    name: 'Correia Lubrificada',
    kind: 'buildingBoost',
    boostsBuilding: 'wild-area-conveyor',
    baseCost: 35_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'wild-area-conveyor', count: 10 },
    effect: 0.05,
    flavor: 'Sem ranger, sem travar, só doce.',
  },
  {
    id: 'wild-area-turbo',
    name: 'Motor Turbo',
    kind: 'buildingBoost',
    boostsBuilding: 'wild-area-conveyor',
    baseCost: 350_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'wild-area-conveyor', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém sabe de onde vem essa velocidade toda.',
  },
  {
    id: 'stow-on-side-shift',
    name: 'Turno Duplo',
    kind: 'buildingBoost',
    boostsBuilding: 'stow-on-side-factory',
    baseCost: 400_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'stow-on-side-factory', count: 10 },
    effect: 0.05,
    flavor: 'A chaminé não descansa, e ninguém reclama.',
  },
  {
    id: 'stow-on-side-automation',
    name: 'Automação da Linha',
    kind: 'buildingBoost',
    boostsBuilding: 'stow-on-side-factory',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'stow-on-side-factory', count: 25 },
    effect: 0.08,
    flavor: 'A esteira roda sozinha; o vidro é só decoração.',
  },
  {
    id: 'magnolia-network',
    name: 'Rede Magnólia',
    kind: 'buildingBoost',
    boostsBuilding: 'magnolia-lab',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'magnolia-lab', count: 10 },
    effect: 0.05,
    flavor: 'Cada filial manda um pouco de doce pra matriz.',
  },
  {
    id: 'magnolia-patent',
    name: 'Patente Exclusiva',
    kind: 'buildingBoost',
    boostsBuilding: 'magnolia-lab',
    baseCost: 43_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'magnolia-lab', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém mais tem permissão de copiar essa fórmula.',
  },
  {
    id: 'isle-of-armor-turbine',
    name: 'Turbina Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'isle-of-armor-power-plant',
    baseCost: 44_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'isle-of-armor-power-plant', count: 10 },
    effect: 0.05,
    flavor: 'Mais watts, mais doce — a conta simplesmente fecha.',
  },
  {
    id: 'isle-of-armor-overload',
    name: 'Sobrecarga Controlada',
    kind: 'buildingBoost',
    boostsBuilding: 'isle-of-armor-power-plant',
    baseCost: 468_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'isle-of-armor-power-plant', count: 25 },
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
