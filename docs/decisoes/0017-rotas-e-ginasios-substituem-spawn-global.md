# 0017 — Rotas substituem o spawn selvagem global; ginásios viram parte do mapa

## Contexto
Antes do Sprint 20, o encontro selvagem era um roll global: qualquer Pokémon
de Gen 1 podia aparecer, com peso por rarityTier (comum/incomum/raro,
derivado do `captureRate`) e nível escalando com `lifetimeCandies`. O dono do
projeto pediu uma pesquisa completa das rotas reais de Kanto no Bulbapedia
(`docs/ROTAS-KANTO.md`) antes de codar os ginásios, especificamente pra
substituir esse spawn global por pools por rota fiéis ao jogo original.

## Decisão
- O save agora rastreia `currentLocationId` (v7). O jogador anda por uma
  sequência **linear** de localizações Kanto (`content/gen1/locations.ts`):
  Pallet Town → Rota 1 → Rota 2 → Floresta de Viridian → Pewter City.
- Cada localização carrega seu próprio pool de encontro (espécie, peso,
  faixa de nível), copiado de `docs/ROTAS-KANTO.md` (Pokémon Red,
  Bulbapedia). O spawn selvagem (`systems/capture/wildEncounter.ts`) agora
  sorteia dentro do pool da localização atual — o rarityTier global e o
  gate por `lifetimeCandies` pra "tier raro" foram removidos.
- Avançar de localização exige um total de `lifetimeCandies` (gate por
  localização, não por rota inteira) — números provisórios (200/600/1500),
  a exemplo de todo outro número econômico do jogo (Sprint 25 rebalanceia).
  Voltar uma localização é sempre livre. Não dá pra pular mais de uma
  localização por vez — decisão do dono do projeto pra manter o mapa uma
  linha reta em vez de um grafo (menos código, menos confusão).
- **Surf/pesca viram grama normal.** Vários trechos pesquisados só têm
  Pokémon via Surf/vara — o jogo não tem essas mecânicas e não é prioridade
  criá-las agora. O pool de cada localização já inclui só o que faz sentido
  como "chão", por decisão explícita do dono do projeto.
- Níveis: listas discretas do Bulbapedia (ex. "6, 8, 10, 12") viram uma
  faixa min–max simplificada, com nível sorteado uniformemente dentro dela.
- **Ginásios têm time completo, não um único inimigo.** O battle engine
  (`systems/battle/engine.ts`) generalizou de `enemy: BattleUnit` único para
  `enemyTeam: BattleUnit[]` + `enemyIndex`, com troca automática (sem cura
  entre os Pokémon do líder — só a Elite Four cura parcial, por design). Uma
  localização pode ter um ginásio associado (`content/gen1/gyms.ts`); vencer
  registra a insígnia em `save.badges` — sem gate pra tentar, pode-se
  desafiar a qualquer momento (só não vai ganhar se for cedo demais).
- Fundo único pra todas as áreas por enquanto (arte por localização fica
  pra depois — `docs/ROTAS-KANTO.md` já tem sugestões catalogadas quando
  chegar a hora).

## Escopo desta entrega
Só o primeiro ginásio (Brock). O plano completo dos 8 ginásios/Elite Four já
está em `docs/ROTAS-KANTO.md` — as próximas localizações/ginásios são só
mais entradas nos mesmos dois arquivos de conteúdo, sem mudança de sistema.
