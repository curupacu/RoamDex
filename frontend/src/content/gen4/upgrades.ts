import type { UpgradeDefinition } from '../gen1/upgrades'

// Provisional — same shape and cost curve as content/gen1/upgrades.ts /
// content/gen2/upgrades.ts / content/gen3/upgrades.ts (docs/decisoes/
// 0001-*.md), renamed for Sinnoh flavor. Same 9 base buildings + the two
// "cadeia de tier" chains (decisão 0026) + Padrão 3/4 (decisão 0035) — no
// new upgrade shape invented here.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'poketch-fingers', name: 'Dedos do Poketch', kind: 'click', baseCost: 10, effect: 1, unlockAt: 0, flavor: 'App novo a cada semana, dedo sempre no mesmo ritmo.' },
  { id: 'explorer-kit-glove', name: 'Luva do Kit de Exploração', kind: 'click', baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Cheira a caverna e a Monte Coronet.' },
  { id: 'vs-seeker-strike', name: 'Golpe do VS Seeker', kind: 'click', baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Encontra treinador com vontade de brigar em qualquer rota.' },
  { id: 'lake-trio-fury', name: 'Fúria do Trio dos Lagos', kind: 'click', baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Conhecimento, emoção e vontade num soco só.' },
  { id: 'underground-volunteer', name: 'Ajudante do Subterrâneo', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Cava sem parar atrás de esfera não sabe bem de quê.' },
  { id: 'solaceon-collection-post', name: 'Posto de Coleta de Solaceon', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'As ruínas guardam mais doce que segredo antigo.' },
  { id: 'berry-conveyor-sinnoh', name: 'Esteira de Bagas Sinnoh', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Baga entra congelada, doce sai quentinho.' },
  { id: 'canalave-library-factory', name: 'Fábrica da Biblioteca de Canalave', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'Todo livro tem uma receita de doce escondida no rodapé.' },
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
