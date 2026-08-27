import type { UpgradeDefinition } from '../gen1/upgrades'

// Provisional — same shape and cost curve as content/gen1/upgrades.ts /
// content/gen2/upgrades.ts (docs/decisoes/0001-*.md), renamed for Hoenn
// flavor. Same 9 base buildings (plus 2 more CPS buildings added later) +
// the two "cadeia de tier" chains (decisão 0026) + Padrão 3/4 (decisão
// 0035) + Padrão 5 (upgrade por prédio, decisão 0048) — no new upgrade
// shape invented here.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'devon-scope-fingers', name: 'Dedos do Devon Scope', kind: 'click', maxPurchases: 1, baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Enxerga até Pokémon fantasma, quanto mais um clique.' },
  { id: 'running-shoes-glove', name: 'Luva dos Tênis de Corrida', kind: 'click', maxPurchases: 1, baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Corre até quando está parada.' },
  { id: 'go-goggles-strike', name: 'Golpe dos Go-Goggles', kind: 'click', maxPurchases: 1, baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Atravessa a tempestade de areia sem perder o ritmo.' },
  { id: 'legendary-trio-fury', name: 'Fúria do Trio do Tempo', kind: 'click', maxPurchases: 1, baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Chove, faz sol e treme tudo ao mesmo tempo.' },
  { id: 'contest-volunteer', name: 'Ajudante de Concurso', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Aplaude qualquer performance, mesmo sem entender bem o que rolou.' },
  { id: 'devon-collection-post', name: 'Posto de Coleta da Devon', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'A caixa de sugestões só recebe pedidos de mais doce.' },
  { id: 'berry-conveyor', name: 'Esteira de Bagas', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Baga entra madura, doce sai pronto.' },
  { id: 'lilycove-factory', name: 'Fábrica de Lilycove', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'O maior mercado de Hoenn também vende doce por atacado.' },
  { id: 'devon-hq-lab', name: 'Sede da Devon Corporation', kind: 'cps', baseCost: 240_000, effect: 560, unlockAt: 165_000, flavor: 'Tecnologia de ponta, só que pra fazer doce.' },
  { id: 'mauville-power-plant', name: 'Usina Elétrica de Mauville', kind: 'cps', baseCost: 2_600_000, effect: 2_240, unlockAt: 1_800_000, flavor: 'O zumbido nunca para, nem de noite.' },
  { id: 'trick-house-training', name: 'Treinamento da Trick House', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'Ninguém sai da mesma forma que entrou.' },

  // --- Cadeia "Treinador Lendário" (clique) — mesmo formato/números de
  // content/gen1/upgrades.ts (decisão 0026), só com sabor de Hoenn. ---
  { id: 'battle-frontier-gloves', name: 'Luvas da Battle Frontier', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Suadas em sete instalações diferentes.' },
  { id: 'devon-talisman', name: 'Talismã da Devon Corporation', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Feito da mesma liga do PokéNav.' },
  {
    id: 'rayquaza-fury',
    name: 'Fúria do Rayquaza',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Mesmo ponto de partida (50) que Kanto/Johto usam desde a rodada de
    // Sprint 25 (docs/decisoes/0034-*.md) — não recalibrado ainda pra Hoenn
    // especificamente, ver nota em eliteFour.ts.
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'Desce da estratosfera só pra separar duas lendas brigando.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'slateport-co-op', name: 'Cooperativa de Slateport', kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'O estaleiro também bota doce pra navegar.' },
  { id: 'hoenn-outpost-network', name: 'Rede de Postos de Hoenn', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: 'De Littleroot a Ever Grande, sempre tem um posto por perto.' },
  {
    id: 'kyogre-groudon-factory',
    name: 'Fábrica de Kyogre & Groudon',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'Um empurra a maré, o outro seca o chão — os dois rendem doce.',
  },

  // --- Padrão 3 (sinergia) — mesmo formato de content/gen1/upgrades.ts. ---
  {
    id: 'grass-synergy-berry-conveyor',
    name: 'Pomar Simbiótico',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'berry-conveyor', count: 15, teamType: 'grass' },
    effect: 60, // +60 CPS, permanente
    flavor: 'As Esteiras de Bagas rendem mais quando um Pokémon de Grama cuida do pomar por perto.',
  },

  // --- Padrão 5 (cadeia de upgrade POR PRÉDIO, decisão 0048) — mesmo
  // formato de content/gen1/upgrades.ts, sabor de Hoenn. Cada um dos 6
  // prédios de CPS ilimitados ganha 2 tiers, desbloqueados por quantidade
  // possuída daquele prédio (unlockAt fica em 0). ---
  {
    id: 'contest-ribbon',
    name: 'Fita Nova',
    kind: 'buildingBoost',
    boostsBuilding: 'contest-volunteer',
    baseCost: 500,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'contest-volunteer', count: 10 },
    effect: 0.05,
    flavor: 'Brilha até de longe, na plateia.',
  },
  {
    id: 'contest-badge',
    name: 'Crachá de Confiança',
    kind: 'buildingBoost',
    boostsBuilding: 'contest-volunteer',
    baseCost: 5_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'contest-volunteer', count: 25 },
    effect: 0.08,
    flavor: 'Agora ele acha que manda no lugar.',
  },
  {
    id: 'devon-basket',
    name: 'Cesta Reforçada',
    kind: 'buildingBoost',
    boostsBuilding: 'devon-collection-post',
    baseCost: 3_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'devon-collection-post', count: 10 },
    effect: 0.05,
    flavor: 'Vime trançado à mão, cabe mais doce.',
  },
  {
    id: 'devon-route',
    name: 'Rota Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'devon-collection-post',
    baseCost: 30_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'devon-collection-post', count: 25 },
    effect: 0.08,
    flavor: 'Passa por mais esquinas, junta mais doce.',
  },
  {
    id: 'berry-conveyor-oil',
    name: 'Correia Lubrificada',
    kind: 'buildingBoost',
    boostsBuilding: 'berry-conveyor',
    baseCost: 35_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'berry-conveyor', count: 10 },
    effect: 0.05,
    flavor: 'Sem ranger, sem travar, só doce.',
  },
  {
    id: 'berry-conveyor-turbo',
    name: 'Motor Turbo',
    kind: 'buildingBoost',
    boostsBuilding: 'berry-conveyor',
    baseCost: 350_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'berry-conveyor', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém sabe de onde vem essa velocidade toda.',
  },
  {
    id: 'lilycove-shift',
    name: 'Turno Duplo',
    kind: 'buildingBoost',
    boostsBuilding: 'lilycove-factory',
    baseCost: 400_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'lilycove-factory', count: 10 },
    effect: 0.05,
    flavor: 'A chaminé não descansa, e ninguém reclama.',
  },
  {
    id: 'lilycove-automation',
    name: 'Automação da Linha',
    kind: 'buildingBoost',
    boostsBuilding: 'lilycove-factory',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'lilycove-factory', count: 25 },
    effect: 0.08,
    flavor: 'A esteira roda sozinha; o vidro é só decoração.',
  },
  {
    id: 'devon-network',
    name: 'Rede Devon',
    kind: 'buildingBoost',
    boostsBuilding: 'devon-hq-lab',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'devon-hq-lab', count: 10 },
    effect: 0.05,
    flavor: 'Cada filial manda um pouco de doce pra matriz.',
  },
  {
    id: 'devon-patent',
    name: 'Patente Exclusiva',
    kind: 'buildingBoost',
    boostsBuilding: 'devon-hq-lab',
    baseCost: 43_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'devon-hq-lab', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém mais tem permissão de copiar essa fórmula.',
  },
  {
    id: 'mauville-turbine',
    name: 'Turbina Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'mauville-power-plant',
    baseCost: 44_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'mauville-power-plant', count: 10 },
    effect: 0.05,
    flavor: 'Mais watts, mais doce — a conta simplesmente fecha.',
  },
  {
    id: 'mauville-overload',
    name: 'Sobrecarga Controlada',
    kind: 'buildingBoost',
    boostsBuilding: 'mauville-power-plant',
    baseCost: 468_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'mauville-power-plant', count: 25 },
    effect: 0.08,
    flavor: 'Passa do limite de propósito; ainda não explodiu.',
  },

  // --- Padrão 4 (multiplicador global por marco) — mesmo formato,
  // gatilho pelas 8 insígnias de Hoenn. ---
  {
    id: 'hoenn-league-recognition',
    name: 'Reconhecimento da Liga Hoenn',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 4,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Metade das insígnias de Hoenn já abre conversa em qualquer Centro Pokémon.',
  },
  {
    id: 'hoenn-legend',
    name: 'Lenda de Hoenn',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 8,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 8 insígnias completas — até o Battle Frontier já ouviu falar de você.',
  },
]
