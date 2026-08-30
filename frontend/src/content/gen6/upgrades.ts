import type { UpgradeDefinition } from '../gen1/upgrades'

// Provisional — same shape and cost curve as content/gen1/upgrades.ts /
// content/gen2/upgrades.ts / content/gen3/upgrades.ts / content/gen4/
// upgrades.ts (docs/decisoes/0001-*.md), renamed for Kalos flavor. Same 9
// base buildings (plus 2 more CPS buildings added later) + the two "cadeia
// de tier" chains (decisão 0026) + Padrão 3/4 (decisão 0035) + Padrão 5
// (upgrade por prédio, decisão 0048) — no new upgrade shape invented here.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'holo-caster-taps', name: 'Toques no Holo Caster', kind: 'click', maxPurchases: 1, baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Chamada em vídeo de qualquer rota de Kalos.' },
  { id: 'roller-skate-glove', name: 'Luva do Patins', kind: 'click', maxPurchases: 1, baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Desliza rápido, croca mais rápido ainda.' },
  { id: 'furfrou-trim-strike', name: 'Golpe do Corte do Furfrou', kind: 'click', maxPurchases: 1, baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Nove estilos, um croque só.' },
  { id: 'legendary-trio-fury', name: 'Fúria do Trio Lendário', kind: 'click', maxPurchases: 1, baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Vida, mente e corpo num soco só.' },
  { id: 'volunteer-helper', name: 'Ajudante Voluntário', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Cisca o chão sem parar, nem sabe bem por quê.' },
  { id: 'lumiose-cafe-post', name: 'Posto do Café de Lumiose', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'Todo café da cidade tem uma mesa reservada pro doce.' },
  { id: 'patisserie-conveyor-kalos', name: 'Esteira da Patisserie Kalos', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Croissant entra cru, doce sai quentinho.' },
  { id: 'lysandre-cafe-factory', name: 'Fábrica do Café Lysandre', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'A mesa do fundo esconde mais doce que plano.' },
  { id: 'sycamore-lab', name: 'Laboratório do Professor Sycamore', kind: 'cps', baseCost: 240_000, effect: 560, unlockAt: 165_000, flavor: 'Tecnologia de ponta, só que pra fazer doce.' },
  { id: 'kalos-power-plant', name: 'Usina Elétrica de Kalos', kind: 'cps', baseCost: 2_600_000, effect: 2_240, unlockAt: 1_800_000, flavor: 'O zumbido nunca para, nem de noite.' },
  { id: 'trainers-school-training', name: 'Treinamento da Escola de Treinadores', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'A prova é fácil, o resultado não é.' },

  // --- Cadeia "Treinador Lendário" (clique) — mesmo formato/números de
  // content/gen1/upgrades.ts (decisão 0026), só com sabor de Kalos. ---
  { id: 'kalos-league-gloves', name: 'Luvas da Liga Kalos', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Suadas em oito ginásios espalhados por toda Kalos.' },
  { id: 'mega-ring-talisman', name: 'Talismã do Mega Anel', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Brilha igual pedra-chave, mesmo sem Mega Evolução aqui.' },
  {
    id: 'zygarde-fury',
    name: 'Fúria do Zygarde',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Mesmo ponto de partida (50) que Kanto/Johto/Hoenn/Sinnoh usam desde a
    // rodada de Sprint 25 — não recalibrado ainda pra Kalos especificamente.
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'Junta as células só pra dar um croque na hora certa.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'lumiose-tv-co-op', name: 'Cooperativa da TV de Lumiose', kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'A maior emissora de Kalos também anuncia promoção de doce.' },
  { id: 'kalos-outpost-network', name: 'Rede de Postos de Kalos', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: 'De Vaniville a Snowbelle, sempre tem um posto na próxima rota.' },
  {
    id: 'xerneas-yveltal-factory',
    name: 'Fábrica de Xerneas & Yveltal',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'Um dá vida, o outro tira — os dois multiplicam a produção.',
  },

  // --- Padrão 3 (sinergia) — mesmo formato de content/gen1/upgrades.ts. ---
  {
    id: 'fairy-synergy-patisserie-conveyor-kalos',
    name: 'Patisserie Simbiótica',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'patisserie-conveyor-kalos', count: 15, teamType: 'fairy' },
    effect: 60, // +60 CPS, permanente
    flavor: 'A Esteira da Patisserie de Kalos rende mais com um Pokémon Fada decorando a vitrine.',
  },

  // --- Padrão 5 (cadeia de upgrade POR PRÉDIO, decisão 0048) — mesmo
  // formato de content/gen1/upgrades.ts, sabor de Kalos. Cada um dos 6
  // prédios de CPS ilimitados ganha 2 tiers, desbloqueados por quantidade
  // possuída daquele prédio (unlockAt fica em 0). ---
  {
    id: 'sushi-tray',
    name: 'Bandeja Nova',
    kind: 'buildingBoost',
    boostsBuilding: 'volunteer-helper',
    baseCost: 500,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'volunteer-helper', count: 10 },
    effect: 0.05,
    flavor: 'Serve o dobro sem derramar nada.',
  },
  {
    id: 'sushi-badge',
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
    id: 'lumiose-cafe-basket',
    name: 'Cesta Reforçada',
    kind: 'buildingBoost',
    boostsBuilding: 'lumiose-cafe-post',
    baseCost: 3_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'lumiose-cafe-post', count: 10 },
    effect: 0.05,
    flavor: 'Vime trançado à mão, cabe mais doce.',
  },
  {
    id: 'lumiose-cafe-route',
    name: 'Rota Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'lumiose-cafe-post',
    baseCost: 30_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'lumiose-cafe-post', count: 25 },
    effect: 0.08,
    flavor: 'Passa por mais esquinas, junta mais doce.',
  },
  {
    id: 'patisserie-conveyor-kalos-oil',
    name: 'Correia Lubrificada',
    kind: 'buildingBoost',
    boostsBuilding: 'patisserie-conveyor-kalos',
    baseCost: 35_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'patisserie-conveyor-kalos', count: 10 },
    effect: 0.05,
    flavor: 'Sem ranger, sem travar, só doce.',
  },
  {
    id: 'patisserie-conveyor-kalos-turbo',
    name: 'Motor Turbo',
    kind: 'buildingBoost',
    boostsBuilding: 'patisserie-conveyor-kalos',
    baseCost: 350_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'patisserie-conveyor-kalos', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém sabe de onde vem essa velocidade toda.',
  },
  {
    id: 'lysandre-cafe-shift',
    name: 'Turno Duplo',
    kind: 'buildingBoost',
    boostsBuilding: 'lysandre-cafe-factory',
    baseCost: 400_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'lysandre-cafe-factory', count: 10 },
    effect: 0.05,
    flavor: 'A chaminé não descansa, e ninguém reclama.',
  },
  {
    id: 'lysandre-cafe-automation',
    name: 'Automação da Linha',
    kind: 'buildingBoost',
    boostsBuilding: 'lysandre-cafe-factory',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'lysandre-cafe-factory', count: 25 },
    effect: 0.08,
    flavor: 'A esteira roda sozinha; o vidro é só decoração.',
  },
  {
    id: 'sycamore-network',
    name: 'Rede Sycamore',
    kind: 'buildingBoost',
    boostsBuilding: 'sycamore-lab',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'sycamore-lab', count: 10 },
    effect: 0.05,
    flavor: 'Cada filial manda um pouco de doce pra matriz.',
  },
  {
    id: 'sycamore-patent',
    name: 'Patente Exclusiva',
    kind: 'buildingBoost',
    boostsBuilding: 'sycamore-lab',
    baseCost: 43_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'sycamore-lab', count: 25 },
    effect: 0.08,
    flavor: 'Ninguém mais tem permissão de copiar essa fórmula.',
  },
  {
    id: 'kalos-plant-turbine',
    name: 'Turbina Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'kalos-power-plant',
    baseCost: 44_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'kalos-power-plant', count: 10 },
    effect: 0.05,
    flavor: 'Mais watts, mais doce — a conta simplesmente fecha.',
  },
  {
    id: 'kalos-plant-overload',
    name: 'Sobrecarga Controlada',
    kind: 'buildingBoost',
    boostsBuilding: 'kalos-power-plant',
    baseCost: 468_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'kalos-power-plant', count: 25 },
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
  // gatilho pelas 8 insígnias de Kalos. ---
  {
    id: 'kalos-league-recognition',
    name: 'Reconhecimento da Liga Kalos',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 4,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Metade das insígnias de Kalos já abre a porta de qualquer Centro Pokémon.',
  },
  {
    id: 'kalos-legend',
    name: 'Lenda de Kalos',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 8,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 8 insígnias completas — até Diantha já ouviu falar de você.',
  },
]
