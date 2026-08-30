import type { UpgradeDefinition } from '../gen1/upgrades'

// Provisional — same shape and cost curve as content/gen1/upgrades.ts /
// content/gen2/upgrades.ts / content/gen3/upgrades.ts (docs/decisoes/
// 0001-*.md), renamed for Sinnoh flavor. Same 9 base buildings (plus 2
// more CPS buildings added later) + the two "cadeia de tier" chains
// (decisão 0026) + Padrão 3/4 (decisão 0035) + Padrão 5 (upgrade por
// prédio, decisão 0048) — no new upgrade shape invented here.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'poketch-fingers', name: 'Dedos do Poketch', kind: 'click', maxPurchases: 1, baseCost: 10, effect: 1, unlockAt: 0, flavor: 'App novo a cada semana, dedo sempre no mesmo ritmo.' },
  { id: 'explorer-kit-glove', name: 'Luva do Kit de Exploração', kind: 'click', maxPurchases: 1, baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Cheira a caverna e a Monte Coronet.' },
  { id: 'vs-seeker-strike', name: 'Golpe do VS Seeker', kind: 'click', maxPurchases: 1, baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Encontra treinador com vontade de brigar em qualquer rota.' },
  { id: 'lake-trio-fury', name: 'Fúria do Trio dos Lagos', kind: 'click', maxPurchases: 1, baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Conhecimento, emoção e vontade num soco só.' },
  { id: 'volunteer-helper', name: 'Ajudante Voluntário', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Cisca o chão sem parar, nem sabe bem por quê.' },
  { id: 'solaceon-collection-post', name: 'Posto de Coleta de Solaceon', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'As ruínas guardam mais doce que segredo antigo.' },
  { id: 'berry-conveyor-sinnoh', name: 'Esteira de Bagas Sinnoh', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Baga entra congelada, doce sai quentinho.' },
  { id: 'canalave-library-factory', name: 'Fábrica da Biblioteca de Canalave', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'Todo livro tem uma receita de doce escondida no rodapé.' },
  { id: 'rowan-lab', name: 'Laboratório do Professor Rowan', kind: 'cps', baseCost: 240_000, effect: 560, unlockAt: 165_000, flavor: 'Tecnologia de ponta, só que pra fazer doce.' },
  { id: 'valley-windworks-plant', name: 'Usina Eólica do Vale', kind: 'cps', baseCost: 2_600_000, effect: 2_240, unlockAt: 1_800_000, flavor: 'O vento nunca para, nem de noite.' },
  { id: 'trainers-school-training', name: 'Treinamento da Escola de Treinadores', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'A prova é fácil, o resultado não é.' },

  // --- Cadeia "Treinador Lendário" (clique) — mesmo formato/números de
  // content/gen1/upgrades.ts (decisão 0026), só com sabor de Sinnoh. ---
  { id: 'sinnoh-league-gloves', name: 'Luvas da Liga Sinnoh', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Suadas em oito ginásios de clima bem diferente entre si.' },
  { id: 'adamant-orb-talisman', name: 'Talismã do Orbe Adamante', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Pesado igual uma lenda de platina.' },
  {
    id: 'giratina-fury',
    name: 'Fúria do Giratina',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Mesmo ponto de partida (50) que Kanto/Johto/Hoenn usam desde a
    // rodada de Sprint 25 — não recalibrado ainda pra Sinnoh
    // especificamente, ver nota em eliteFour.ts.
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'Atravessa o Mundo Distorcido só pra dar um croque na hora certa.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'jubilife-co-op', name: 'Cooperativa de Jubilife', kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'A maior TV de Sinnoh também anuncia promoção de doce.' },
  { id: 'sinnoh-outpost-network', name: 'Rede de Postos de Sinnoh', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: 'De Twinleaf a Sunyshore, sempre tem um posto na próxima rota.' },
  {
    id: 'dialga-palkia-factory',
    name: 'Fábrica de Dialga & Palkia',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'Um dobra o tempo, o outro dobra o espaço — os dois dobram a produção.',
  },

  // --- Padrão 3 (sinergia) — mesmo formato de content/gen1/upgrades.ts. ---
  {
    id: 'grass-synergy-berry-conveyor-sinnoh',
    name: 'Estufa Simbiótica',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'berry-conveyor-sinnoh', count: 15, teamType: 'grass' },
    effect: 60, // +60 CPS, permanente
    flavor: 'As Esteiras de Baga de Sinnoh rendem mais com um Pokémon de Grama vigiando a estufa.',
  },

  // --- Padrão 5 (cadeia de upgrade POR PRÉDIO, decisão 0048) — mesmo
  // formato de content/gen1/upgrades.ts, sabor de Sinnoh. Cada um dos 6
  // prédios de CPS ilimitados ganha 2 tiers, desbloqueados por quantidade
  // possuída daquele prédio (unlockAt fica em 0). ---
  {
    id: 'underground-pickaxe',
    name: 'Picareta Nova',
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
    id: 'underground-badge',
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
    id: 'solaceon-basket',
    name: 'Cesta Reforçada',
    kind: 'buildingBoost',
    boostsBuilding: 'solaceon-collection-post',
    baseCost: 3_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'solaceon-collection-post', count: 10 },
    effect: 0.05,
    flavor: 'Vime trançado à mão, cabe mais doce.',
  },
  {
    id: 'solaceon-route',
    name: 'Rota Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'solaceon-collection-post',
    baseCost: 30_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'solaceon-collection-post', count: 25 },
    effect: 0.08,
    flavor: 'Passa por mais esquinas, junta mais doce.',
  },
  {
    id: 'berry-conveyor-sinnoh-oil',
    name: 'Correia Lubrificada',
    kind: 'buildingBoost',
    boostsBuilding: 'berry-conveyor-sinnoh',
    baseCost: 35_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'berry-conveyor-sinnoh', count: 10 },
    effect: 0.05,
    flavor: 'Sem ranger, sem travar, só doce.',
  },
  {
    id: 'berry-conveyor-sinnoh-turbo',
    name: 'Motor Turbo',
    kind: 'buildingBoost',
    boostsBuilding: 'berry-conveyor-sinnoh',
    baseCost: 350_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'berry-conveyor-sinnoh', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém sabe de onde vem essa velocidade toda.',
  },
  {
    id: 'canalave-shift',
    name: 'Turno Duplo',
    kind: 'buildingBoost',
    boostsBuilding: 'canalave-library-factory',
    baseCost: 400_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'canalave-library-factory', count: 10 },
    effect: 0.05,
    flavor: 'A chaminé não descansa, e ninguém reclama.',
  },
  {
    id: 'canalave-automation',
    name: 'Automação da Linha',
    kind: 'buildingBoost',
    boostsBuilding: 'canalave-library-factory',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'canalave-library-factory', count: 25 },
    effect: 0.08,
    flavor: 'A esteira roda sozinha; o vidro é só decoração.',
  },
  {
    id: 'rowan-network',
    name: 'Rede Rowan',
    kind: 'buildingBoost',
    boostsBuilding: 'rowan-lab',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'rowan-lab', count: 10 },
    effect: 0.05,
    flavor: 'Cada filial manda um pouco de doce pra matriz.',
  },
  {
    id: 'rowan-patent',
    name: 'Patente Exclusiva',
    kind: 'buildingBoost',
    boostsBuilding: 'rowan-lab',
    baseCost: 43_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'rowan-lab', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém mais tem permissão de copiar essa fórmula.',
  },
  {
    id: 'windworks-turbine',
    name: 'Turbina Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'valley-windworks-plant',
    baseCost: 44_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'valley-windworks-plant', count: 10 },
    effect: 0.05,
    flavor: 'Mais vento, mais doce — a conta simplesmente fecha.',
  },
  {
    id: 'windworks-overload',
    name: 'Sobrecarga Controlada',
    kind: 'buildingBoost',
    boostsBuilding: 'valley-windworks-plant',
    baseCost: 468_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'valley-windworks-plant', count: 25 },
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
  // gatilho pelas 8 insígnias de Sinnoh. ---
  {
    id: 'sinnoh-league-recognition',
    name: 'Reconhecimento da Liga Sinnoh',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 4,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Metade das insígnias de Sinnoh já derrete o gelo em qualquer Centro Pokémon.',
  },
  {
    id: 'sinnoh-legend',
    name: 'Lenda de Sinnoh',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 8,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 8 insígnias completas — até Cynthia já ouviu falar de você.',
  },
]
