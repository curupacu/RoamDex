import type { UpgradeDefinition } from '../gen1/upgrades'

// Provisional — same shape and cost curve as content/gen1/upgrades.ts
// (docs/decisoes/0001-*.md), renamed for Johto flavor. Sprint 6's original
// 9 are still the plain building pattern; the "cadeia de tier" chains below
// (decisão 0026) are the first real answer to "Upgrades genéricos demais"
// (docs/BACKLOG.md) — more patterns from
// docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md are still to come. Icon art is
// convention-based (decisão 0028/0031) — see
// ui/components/UpgradeIcon.tsx, no per-entry field needed.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'sprout-gloves', name: 'Luvas de Broto', kind: 'click', maxPurchases: 1, baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Cheiram a terra molhada.' },
  { id: 'apricorn-satchel', name: 'Bolsa de Bagas Apricô', kind: 'click', maxPurchases: 1, baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Sempre sobra uma baga no fundo.' },
  { id: 'pokegear-clicker', name: 'Pokégear de Combate', kind: 'click', maxPurchases: 1, baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'A tela range, mas nunca trava.' },
  { id: 'legendary-beast-fury', name: 'Fúria das Feras Lendárias', kind: 'click', maxPurchases: 1, baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Um rosnado que atravessa três rotas.' },
  { id: 'bug-catching-helper', name: 'Ajudante do Concurso de Insetos', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Trocaria qualquer prêmio por mais um Caterpie.' },
  { id: 'goldenrod-post', name: 'Posto de Coleta de Goldenrod', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'A fila nunca anda, mas o estoque sempre cresce.' },
  { id: 'gs-ball-conveyor', name: 'Esteira da GS Ball', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Ninguém sabe abrir, mas ela rende do mesmo jeito.' },
  { id: 'radio-tower-factory', name: 'Fábrica da Torre de Rádio', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'Transmite estática e doce em partes iguais.' },
  { id: 'day-care-training', name: 'Treinamento da Creche', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'Ninguém contou pros ovos que isso não é oficial.' },

  // --- Cadeia "Treinador Lendário" (clique) — mesmo formato/números de
  // content/gen1/upgrades.ts (decisão 0026), só com sabor de Johto. ---
  { id: 'kimono-gloves', name: 'Luvas do Clã Kimono', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Bordadas à mão, socam igual.' },
  { id: 'lighthouse-talisman', name: 'Talismã do Farol', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Pisca no mesmo ritmo do Farol de Olivine.' },
  {
    id: 'ho-oh-fury',
    name: 'Fúria do Ho-Oh',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Sprint 25 ("Balanceamento"): era 8 — mesmo motivo do Fúria do Mewtwo
    // em content/gen1/upgrades.ts (simulação achou que precisaria de 131
    // Pokémon no roster só pra empatar com o tier anterior).
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'Uma pena dourada que nunca esfria.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'goldenrod-co-op', name: 'Cooperativa de Goldenrod', kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'O leite rende mais que qualquer selo raro.' },
  { id: 'johto-outpost-network', name: 'Rede de Postos de Johto', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: 'Cada posto novo encurta a distância até Kanto.' },
  {
    id: 'lugia-factory',
    name: 'Fábrica do Lugia',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'Um redemoinho silencioso, mas produtivo.',
  },

  // --- Padrão 3 (sinergia) — mesmo formato de content/gen1/upgrades.ts,
  // só trocando a Esteira de Doces pela Esteira da GS Ball. ---
  {
    id: 'grass-synergy-gs-ball',
    name: 'Cultivo da Rota de Ilex',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500,
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'gs-ball-conveyor', count: 15, teamType: 'grass' },
    effect: 60, // +60 CPS, permanente
    flavor: 'As Esteiras da GS Ball rendem mais perto da floresta, com um Pokémon de Grama por perto.',
  },

  // --- Padrão 4 (multiplicador global por marco) — mesmo formato de
  // content/gen1/upgrades.ts, gatilho pelas 8 insígnias de Johto. ---
  {
    id: 'johto-league-recognition',
    name: 'Reconhecimento da Liga Johto',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 4,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Metade das insígnias de Johto já rende respeito em qualquer Centro Pokémon.',
  },
  {
    id: 'johto-legend',
    name: 'Lenda de Johto',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 8,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 8 insígnias completas — até o Rei da Ilha Vale já ouviu falar de você.',
  },
]
