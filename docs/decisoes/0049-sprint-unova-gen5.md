# 0049 — Sprint Unova (Gen 5)

Continuação direta da pesquisa (`docs/ROTAS-UNOVA.md`) — pedido do dono do
projeto foi só "pode implementar", seguindo o mesmo processo já rodado pra
Hoenn/Sinnoh/Kalos: `content/gen5/*`, wire-up em `regions.ts`/`save.ts`,
smoke test, simulações de balanceamento, doc de decisão, commit.

## O que entrou

- `content/gen5/{starters,gyms,eliteFour,upgrades,locations}.ts` — 28
  locais (`nuvema-town` → `victory-road`), 8 ginásios, Elite Four (Shauntal,
  Marshal, Grimsley, Caitlin) + Campeã Alder, upgrades no padrão dos 9
  base + cadeias (`xtransceiver-taps`, `unova-conveyor`,
  `kyurem-fury`, `tao-trio-factory`, etc).
- `content/regions.ts` — `unova` adicionado a `REGION_ORDER` e `REGIONS`
  (`dataUrl: '/data/gen5.json'`, já existente no repo com 156 espécies,
  não precisou rebuild).
- `engine/save.ts` — `RegionId` ganhou `'unova'`.
- `systems/rebirth/rebirth.test.ts` — teste de "no-op além da última
  região" atualizado de `'kalos'` pra `'unova'`.
- `tests/simulations/{battle,upgraderoi,progression}.sim.test.ts` —
  Unova adicionada às listas parametrizadas de cada suíte.

### Achado de pesquisa: Striaton City tem 3 líderes, não 1

O jogo original troca automaticamente o líder de Striaton (Cilan/Chili/
Cress) por qual inicial o jogador escolheu — nunca existe tela de escolha,
é sempre "o mesmo ginásio" só com o oponente (e o Pokémon dele) trocado
pra ser fraco contra o tipo do inicial. Isso não existe em nenhuma região
anterior (todo ginásio até aqui era estático).

Modelado sem alterar o formato das outras regiões:
- `GymDefinition` (content/gen1/gyms.ts) ganhou `teamByStarter?` e
  `leaderNameByStarter?`, ambos opcionais.
- `systems/gyms/champion.ts` — `starterRootId` virou exportado, e ganhou
  `currentStarterRoot(region, save, gen1)` (acha a raiz-inicial do roster
  atual).
- `systems/gyms/gymProgress.ts` — nova função `resolveGym(region, gym,
  save, gen1)`: se o ginásio não tem `teamByStarter`, retorna o MESMO
  objeto (no-op, confirmado por teste `toBe`); se tem, troca
  `team`/`leaderName` pelo valor certo pra raiz-inicial atual, mantendo
  `id`/`badgeName`/`locationId` fixos (é literalmente o mesmo ginásio).
- `App.tsx` — `gymHere`/`activeGym` agora passam por `resolveGym` antes de
  chegar na tela de batalha.

Campeã Alder é fixa (mesmo time pros 3 iniciais) — só Striaton tem essa
variação, confirmado com um teste dedicado (`teams[0] === teams[1] ===
teams[2]`, mesma referência).

## Verificação

- `tsc -b --noEmit` limpo, `oxlint` limpo.
- Suíte inteira: **367/367** (era 340 — 27 testes novos, incluindo os 5
  específicos do mecanismo Striaton/`resolveGym`).
- Simulação de batalha (time dos 3 iniciais evoluídos, mesmo nível médio):
  todos os 8 ginásios vencem sem virar parede (pior caso: Skyla, 35% HP
  restante). Elite Four + Campeã: **perde no nível médio exato** (0% HP —
  bate com o design "é pra perder na primeira vez") e **vence com a folga
  padrão de +8 níveis** (20% HP) — Unova é a primeira região onde isso bate
  certinho sem precisar recalibrar `LEVEL_BUMP`/`CHAMPION_LEVEL_BUMP`
  (ficaram nos valores originais do Kanto, 12/8).
- Simulação de progressão: curva de liberação sobe de forma suave dos
  primeiros ginásios até o Elite Four, sem saltos — com treino idle,
  0.23h (Cilan) até 2.30h (Drayden) e 5.39h (Elite Four); só-batalha,
  2.67h até 20.85h e 40.90h (Elite Four).
- `upgraderoi.sim.test.ts`: upgrades "lendários" (Kyurem/Tao Trio) e o gap
  clique-vs-CPS passam nos mesmos limites das outras 5 regiões, sem ajuste
  numérico precisar ser feito no conteúdo de Unova.

## O que ainda falta

- Sprites de treinador (só Kanto tem, de sessões anteriores) — Unova e as
  outras 3 regiões restantes ainda usam o battle screen sem retrato.
- Upgrades por-prédio (Padrão 5, decisão 0048) ainda só existe em Kanto —
  Unova não ganhou cadeias de tier ainda.
- Alola/Galar/Paldea ainda precisam de decisões de design antes mesmo da
  pesquisa começar (não são "drop-in" como as regiões já feitas).
