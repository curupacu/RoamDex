import type { UpgradeDefinition } from '../gen1/upgrades'

// Provisional — same shape and cost curve as content/gen1/upgrades.ts /
// content/gen2/upgrades.ts / content/gen3/upgrades.ts / content/gen4/
// upgrades.ts (docs/decisoes/0001-*.md), renamed for Kalos flavor. Same 9
// base buildings + the two "cadeia de tier" chains (decisão 0026) + Padrão
// 3/4 (decisão 0035) — no new upgrade shape invented here.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'holo-caster-taps', name: 'Toques no Holo Caster', kind: 'click', baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Chamada em vídeo de qualquer rota de Kalos.' },
  { id: 'roller-skate-glove', name: 'Luva do Patins', kind: 'click', baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Desliza rápido, croca mais rápido ainda.' },
  { id: 'furfrou-trim-strike', name: 'Golpe do Corte do Furfrou', kind: 'click', baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Nove estilos, um croque só.' },
  { id: 'legendary-trio-fury', name: 'Fúria do Trio Lendário', kind: 'click', baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Vida, mente e corpo num soco só.' },
  { id: 'sushi-high-roller-volunteer', name: 'Ajudante do Sushi Alto', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Serve doce em vez de peixe, ninguém reclama.' },
  { id: 'lumiose-cafe-post', name: 'Posto do Café de Lumiose', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'Todo café da cidade tem uma mesa reservada pro doce.' },
  { id: 'patisserie-conveyor-kalos', name: 'Esteira da Patisserie Kalos', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Croissant entra cru, doce sai quentinho.' },
  { id: 'lysandre-cafe-factory', name: 'Fábrica do Café Lysandre', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'A mesa do fundo esconde mais doce que plano.' },
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
