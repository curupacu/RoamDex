import type { TypeName } from '../types'

export interface UpgradeDefinition {
  id: string
  name: string
  // 'globalMultiplier' — Padrão 4 (marco global,
  // docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md): `effect` é uma fração
  // (0.1 = +10%) somada em systems/economy/upgrades.ts's
  // globalMultiplierBonus, aplicada em cima de doces/clique E CPS — não
  // entra nos somatórios de totalClickBonus/totalCps (esses só somam
  // 'click'/'cps'), então nunca é contado em dobro.
  // 'buildingBoost' — Padrão 5 (pedido do dono do projeto, referência
  // Cookie Clicker real: cada prédio tem sua própria cadeia de upgrades
  // de tier, tipo "Faísca +1%" -> "Raio +2%" pra fábrica do Zapdos):
  // `effect` é uma fração igual globalMultiplier, mas só multiplica a
  // contribuição do prédio em `boostsBuilding` (por id), não tudo — ver
  // systems/economy/upgrades.ts's buildingBoostMultiplier. Não entra no
  // somatório de nenhum kind (não produz CPS/clique próprio, só amplifica
  // outro upgrade já existente).
  kind: 'click' | 'cps' | 'xp' | 'globalMultiplier' | 'buildingBoost'
  baseCost: number
  effect: number
  // Lifetime candies (see SaveDataV2) required before the upgrade shows up.
  unlockAt: number
  // Undefined = infinite building (Sprint 6 original, cost keeps compounding
  // forever). A number caps it — 1 makes it a one-time "tier" purchase, the
  // shape docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md calls the "cadeia de
  // tier" pattern (decisão 0026): a short sequence of one-time upgrades,
  // gated by unlockAt like a prerequisite, where the last tier changes
  // *what it scales with* instead of just being a bigger flat number.
  maxPurchases?: number
  // When set, `effect` is per-unit of this instead of per-copy-owned — the
  // "muda de natureza" tier. Only meaningful once owned (0 or 1 while
  // maxPurchases is 1). Add more scale kinds here as new tiers need them
  // (badge count, etc.) — systems/economy/upgrades.ts's scaleValue() is the
  // one place that has to learn about each one.
  scalesWith?: 'rosterSize'
  // Padrão 4 (marco global) — além do unlockAt de doces, exige N insígnias
  // de ginásio (save.badges.length) pra aparecer na loja.
  requiresBadges?: number
  // Padrão 3 (sinergia entre dois sistemas, docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md)
  // — além do unlockAt, exige N cópias de OUTRO upgrade (por id) já
  // compradas E um Pokémon desse tipo no time ativo agora. Checado só pra
  // DESBLOQUEAR (aparecer na loja) — uma vez comprado (maxPurchases: 1),
  // o efeito é permanente mesmo que o time mude depois, igual qualquer
  // outro upgrade de tier único.
  requiresSynergy?: { upgradeId: string; count: number; teamType: TypeName }
  // Padrão 5 (cadeia de upgrade POR PRÉDIO) — além do unlockAt de doces,
  // exige N cópias já compradas de um prédio de CPS/clique ilimitado
  // específico (por id). Sem checagem de tipo de time (diferente de
  // requiresSynergy) — é só "possua N desse prédio".
  requiresBuildingOwned?: { buildingId: string; count: number }
  // Só usado com kind:'buildingBoost' — qual upgrade (normalmente um
  // prédio de CPS ilimitado) esse upgrade amplifica. Ver nota do kind
  // acima e systems/economy/upgrades.ts's buildingBoostMultiplier.
  boostsBuilding?: string
  // Frase de efeito curta (decisão 0030) — escalando de mundano pra
  // absurdo conforme o tier, mesmo truque do Cookie Clicker (Cursor →
  // Vovó → ... → Torre Mágica) de dar personalidade sem custar arte nova.
  flavor?: string
}

// Icon convention (decisão 0028/0031): NOT a Pokémon species photo — a
// themed pixel-art object icon dropped at
// public/icons/upgrades/{id}.png (or .gif) by the project owner.
// ui/components/UpgradeIcon.tsx loads it by id, tries .png then .gif,
// and hides the <img> entirely if neither exists, so an upgrade with no
// art yet just shows text, never a broken image. See docs/decisoes/0028-*.md
// for the full asset list requested.

// Provisional costs/effects — Sprint 25 ("Balanceamento") is where these get
// tuned against real play-simulation data, per docs/decisoes/0001-*.md.
//
// Feedback: os 4 upgrades de clique base eram compráveis infinitas vezes
// (sem maxPurchases, custo composto a cada compra) — igual um PRÉDIO de
// Cookie Clicker, não um upgrade. No jogo real, upgrade é sempre compra
// única (o que escala infinitamente é o PRÉDIO/CPS, nunca um upgrade);
// clique ganha força através de uma cadeia curta de upgrades de 1 compra
// só, cada um desbloqueando o próximo por doce acumulado — exatamente
// como a cadeia "Cursor" da wiki (Reinforced index finger -> Carpal
// tunnel -> Ambidextrous -> Thousand fingers...). Ganharam
// `maxPurchases: 1` pra bater com isso; `unlockAt` já fazia o papel de
// gatilho progressivo, não precisou mudar. Os 4 de CPS (linhas abaixo)
// continuam infinitos de propósito — são PRÉDIOS de verdade.
export const UPGRADES: UpgradeDefinition[] = [
  { id: 'quick-fingers', name: 'Dedos Ligeiros', kind: 'click', maxPurchases: 1, baseCost: 10, effect: 1, unlockAt: 0, flavor: 'Seus dedos já decoraram o caminho até o Pokémon.' },
  { id: 'battle-glove', name: 'Luva de Treino', kind: 'click', maxPurchases: 1, baseCost: 100, effect: 5, unlockAt: 50, flavor: 'Cheira a couro e determinação.' },
  { id: 'critical-strike', name: 'Golpe Crítico', kind: 'click', maxPurchases: 1, baseCost: 1_100, effect: 25, unlockAt: 500, flavor: 'Às vezes dói só de ver.' },
  { id: 'pokemon-fury', name: 'Fúria Pokémon', kind: 'click', maxPurchases: 1, baseCost: 12_000, effect: 150, unlockAt: 5_000, flavor: 'Ninguém sabe explicar de onde vem essa raiva.' },
  { id: 'volunteer-helper', name: 'Ajudante Voluntário', kind: 'cps', baseCost: 15, effect: 0.3, unlockAt: 0, flavor: 'Cisca o chão sem parar, nem sabe bem por quê.' },
  { id: 'collection-post', name: 'Posto de Coleta', kind: 'cps', baseCost: 180, effect: 3, unlockAt: 100, flavor: 'Uma cesta que nunca fica vazia por muito tempo.' },
  { id: 'candy-conveyor', name: 'Esteira de Doces', kind: 'cps', baseCost: 2_000, effect: 24, unlockAt: 1_500, flavor: 'Doce entra, doce sai, ninguém pergunta como.' },
  { id: 'candy-factory', name: 'Fábrica de Doces', kind: 'cps', baseCost: 22_000, effect: 140, unlockAt: 15_000, flavor: 'A fumacinha da chaminé é 90% açúcar.' },
  // Idle XP complement (roadmap section 7) — "pra ninguém travar por odiar
  // batalhar", since the battle system itself isn't built until Sprint 13+.
  { id: 'training-regimen', name: 'Treinamento', kind: 'xp', baseCost: 250, effect: 0.5, unlockAt: 200, flavor: 'Não rende doce. Rende resultado.' },

  // --- Cadeia "Treinador Lendário" (clique) — decisão 0026, 1ª cadeia de
  // tier do jogo. Cada tier é comprado uma vez só; o 3º muda de natureza. ---
  { id: 'champion-gloves', name: 'Luvas do Campeão', kind: 'click', baseCost: 25_000, effect: 80, unlockAt: 8_000, maxPurchases: 1, flavor: 'Forjadas com o suor de oito medalhas.' },
  { id: 'badge-talisman', name: 'Talismã de Insígnia', kind: 'click', baseCost: 120_000, effect: 250, unlockAt: 40_000, maxPurchases: 1, flavor: 'Tilinta toda vez que alguém desafia a Liga.' },
  {
    id: 'legendary-fury',
    name: 'Fúria do Mewtwo',
    kind: 'click',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Sprint 25 ("Balanceamento"): era 8 — simulação (tests/simulations/
    // upgraderoi.sim.test.ts) achou que precisaria de 131 Pokémon no
    // roster só pra EMPATAR em eficiência com o Talismã de Insígnia (tier
    // anterior), inviável (Kanto só tem 151 espécies). 50 deixa um roster
    // "razoável" (~6, só o time ativo) já competitivo com o tier anterior,
    // e continua crescendo de verdade conforme você captura mais.
    effect: 50, // +50 doces/clique por Pokémon capturado no roster
    flavor: 'Cada Pokémon do time empresta um pouco da própria fúria psíquica.',
  },

  // --- Cadeia "Colônia de Doces" (CPS) — mesmo formato, eixo de CPS. ---
  { id: 'village-co-op', name: 'Cooperativa da Vila', kind: 'cps', baseCost: 25_000, effect: 36, unlockAt: 8_000, maxPurchases: 1, flavor: 'Todo mundo participa, ninguém sabe quem manda.' },
  { id: 'outpost-network', name: 'Rede de Postos', kind: 'cps', baseCost: 120_000, effect: 105, unlockAt: 40_000, maxPurchases: 1, flavor: 'Bandeirinhas coloridas até onde a vista alcança.' },
  {
    id: 'legendary-factory',
    name: 'Fábrica do Zapdos',
    kind: 'cps',
    baseCost: 500_000,
    unlockAt: 120_000,
    maxPurchases: 1,
    scalesWith: 'rosterSize',
    // Sprint 25: era 1.2, mesmo motivo do Fúria do Mewtwo acima.
    effect: 12, // +12 CPS por Pokémon capturado no roster
    flavor: 'Cada trovão vira uma fornada.',
  },

  // --- Padrão 3 (sinergia entre dois sistemas) — decisão de upgrades,
  // Sprint pós-25. Exige N cópias de um building específico JÁ comprado
  // + um Pokémon de um tipo específico no time ativo agora. Tipo Grama
  // escolhido de propósito: já é o tipo que dá bônus de CPS
  // (content/types.ts), então esse upgrade "dobra a aposta" no mesmo
  // tema em vez de inventar uma sinergia sem relação com o resto do jogo. ---
  {
    id: 'grass-synergy-conveyor',
    name: 'Cultivo Simbiótico',
    kind: 'cps',
    baseCost: 40_000,
    unlockAt: 1_500, // mesmo unlockAt da Esteira de Doces — só falta a sinergia
    maxPurchases: 1,
    requiresSynergy: { upgradeId: 'candy-conveyor', count: 15, teamType: 'grass' },
    effect: 60, // +60 CPS, permanente
    flavor: 'As Esteiras de Doces produzem mais quando um Pokémon de Grama cuida da plantação por perto.',
  },

  // --- Padrão 5 (cadeia de upgrade POR PRÉDIO, pedido do dono do
  // projeto — referência: Cookie Clicker de verdade, onde cada prédio
  // tem sua própria fileira de upgrades, tipo "Faísca +1%" -> "Raio +2%").
  // Cada um dos 4 prédios de CPS ilimitados (Ajudante Voluntário, Posto de
  // Coleta, Esteira de Doces, Fábrica de Doces) ganha 2 tiers, cada um
  // amplificando só a PRODUÇÃO DAQUELE PRÉDIO (buildingBoostMultiplier),
  // desbloqueados por QUANTIDADE POSSUÍDA daquele prédio (não por doces
  // acumuladas — unlockAt fica em 0, o gate real é requiresBuildingOwned).
  // Modo história tem só esses 2 tiers por prédio de propósito — o modo
  // infinito (ainda não existe) é onde a cadeia completa (~10+ tiers por
  // prédio, igual o Cookie Clicker real) entra. ---
  {
    id: 'volunteer-broom',
    name: 'Vassoura Nova',
    kind: 'buildingBoost',
    boostsBuilding: 'volunteer-helper',
    baseCost: 500,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'volunteer-helper', count: 10 },
    effect: 0.05, // +5% na produção do Ajudante Voluntário
    flavor: 'Cisca o dobro, reclama a metade.',
  },
  {
    id: 'volunteer-badge',
    name: 'Crachá de Confiança',
    kind: 'buildingBoost',
    boostsBuilding: 'volunteer-helper',
    baseCost: 5_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'volunteer-helper', count: 25 },
    effect: 0.08, // +8% na produção do Ajudante Voluntário
    flavor: 'Agora ele acha que manda no lugar.',
  },
  {
    id: 'collection-basket',
    name: 'Cesta Reforçada',
    kind: 'buildingBoost',
    boostsBuilding: 'collection-post',
    baseCost: 3_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'collection-post', count: 10 },
    effect: 0.05, // +5% na produção do Posto de Coleta
    flavor: 'Vime trançado à mão, cabe mais doce.',
  },
  {
    id: 'collection-route',
    name: 'Rota Extra',
    kind: 'buildingBoost',
    boostsBuilding: 'collection-post',
    baseCost: 30_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'collection-post', count: 25 },
    effect: 0.08, // +8% na produção do Posto de Coleta
    flavor: 'Passa por mais esquinas, junta mais doce.',
  },
  {
    id: 'conveyor-oil',
    name: 'Correia Lubrificada',
    kind: 'buildingBoost',
    boostsBuilding: 'candy-conveyor',
    baseCost: 35_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'candy-conveyor', count: 10 },
    effect: 0.05, // +5% na produção da Esteira de Doces
    flavor: 'Sem ranger, sem travar, só doce.',
  },
  {
    id: 'conveyor-turbo',
    name: 'Motor Turbo',
    kind: 'buildingBoost',
    boostsBuilding: 'candy-conveyor',
    baseCost: 350_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'candy-conveyor', count: 25 },
    effect: 0.08, // +8% na produção da Esteira de Doces
    flavor: 'Ninguém sabe de onde vem essa velocidade toda.',
  },
  {
    id: 'factory-double-shift',
    name: 'Turno Duplo',
    kind: 'buildingBoost',
    boostsBuilding: 'candy-factory',
    baseCost: 400_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'candy-factory', count: 10 },
    effect: 0.05, // +5% na produção da Fábrica de Doces
    flavor: 'A chaminé não descansa, e ninguém reclama.',
  },
  {
    id: 'factory-automation',
    name: 'Automação da Linha',
    kind: 'buildingBoost',
    boostsBuilding: 'candy-factory',
    baseCost: 4_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBuildingOwned: { buildingId: 'candy-factory', count: 25 },
    effect: 0.08, // +8% na produção da Fábrica de Doces
    flavor: 'A esteira roda sozinha; o vidro é só decoração.',
  },

  // --- Padrão 4 (multiplicador global por marco) — desbloqueado por
  // insígnias de ginásio (save.badges.length), não por doces. Efeito
  // soma com qualquer outro 'globalMultiplier' já comprado
  // (globalMultiplierBonus), aplicado em cima de doces/clique E CPS. ---
  {
    id: 'league-recognition',
    name: 'Reconhecimento da Liga Pokémon',
    kind: 'globalMultiplier',
    baseCost: 300_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 4,
    effect: 0.08, // +8% em tudo (doces/clique e CPS)
    flavor: 'Metade das insígnias de Kanto já abre portas em qualquer cidade.',
  },
  {
    id: 'kanto-legend',
    name: 'Lenda de Kanto',
    kind: 'globalMultiplier',
    baseCost: 1_000_000,
    unlockAt: 0,
    maxPurchases: 1,
    requiresBadges: 8,
    effect: 0.15, // +15% em tudo, soma com o Reconhecimento da Liga
    flavor: 'As 8 insígnias completas — seu nome já circula antes de você chegar.',
  },
]
