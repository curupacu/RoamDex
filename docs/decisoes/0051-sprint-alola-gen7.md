# 0051 — Sprint Alola (Gen 7)

Continuação da pesquisa (`docs/ROTAS-ALOLA.md`), seguindo a decisão
estrutural já confirmada com o dono do projeto: **Provações e Grandes
Provações viram `GymDefinition`**, com o time de batalha real sendo o
**Totem + aliado(s)** (não o Capitão, que vira só flavor).

## O que entrou

- `content/gen7/{starters,gyms,eliteFour,upgrades,locations,
  alola.smoke.test}.ts` — 51 locais (Hau'oli City → victory-road/Mount
  Lanakila), **11** "ginásios" (mais que qualquer região anterior — Alola
  tem 8 Provações + 3 Grandes Provações em vez de 8 ginásios fixos),
  Elite Four (Hala, Olivia, Acerola, Kahili) + Campeão Kukui.
- `content/regions.ts` — `alola` adicionado a `REGION_ORDER`/`REGIONS`
  (`dataUrl: '/data/gen7.json'`).
- `scripts/build-data/build-gen7.ts` — ganhou `LEGACY_IDS` (98 espécies de
  outras gerações, a maioria formas Alolanas de espécies antigas tipo
  Rattata/Meowth/Raticate) e o `gen7.json` foi reconstruído (193
  entradas).
- `engine/save.ts` — `RegionId` ganhou `'alola'`.

## Achados estruturais

- **Provação ≠ Grande Provação**: nas 8 Provações comuns, quem realmente
  bate é o **Totem Pokémon** (+ até 2 aliados convocados em batalha) — o
  Capitão que "conduz" a provação nem sempre tem time de combate próprio.
  3 capitães (Sophocles, Acerola, e parcialmente Mallow) não têm time
  pessoal documentado pra versão Sun — não bloqueou nada, porque o time
  real do `GymDefinition` sempre vem do Totem.
- **3 Kahunas reaparecem na Elite Four** com times diferentes/mais fortes
  (Hala, Olivia, Acerola) — modelado com times SEPARADOS em `gyms.ts`
  (Grande Provação) e `eliteFour.ts` (pós-jogo); não é o mesmo mecanismo
  de `teamByVersion`/`teamByStarter` porque não depende de nada que o
  jogador escolha, é só "o mesmo personagem, 2 pontos da história". Nanu
  recusou a vaga — Acerola assume no lugar dele (fato do jogo real,
  documentado na pesquisa).
- **Campeão (Kukui) varia por inicial** — mesmo padrão
  `CHAMPION_TEAM_BY_STARTER` de toda região anterior, só o 6º Pokémon
  muda (evolução do inicial forte contra o do jogador).
- **Mount Lanakila virou o id `'victory-road'`** (App.tsx depende desse
  literal em toda região) — é o caminho de acesso à Elite Four, o
  equivalente de verdade na história.

## Verificação

- `tsc -b --noEmit` limpo, `oxlint` limpo.
- Suíte inteira: **418/418** (era 393 — 25 testes novos, incluindo os 9
  do smoke test de Alola). Tudo passou de primeira, sem bug pego desta
  vez (diferente de Galar, onde o smoke test achou 2 `locationId`
  errados).
- Simulação de batalha: as 11 provações/grandes provações vencem sem
  virar parede (pior caso: Totem Kommo-o, 35% HP). Elite Four + Campeão
  **vence mesmo no nível médio exato** (31% HP) — o salto de nível de
  Hapu (47) pra Elite Four (66, já com bump) é grande, mas dentro do
  aceitável (mesmo padrão de Hoenn/Sinnoh/Kalos/Galar).
- `upgraderoi.sim.test.ts`: upgrades "lendários" e o gap clique-vs-CPS
  passam nos mesmos limites das outras 7 regiões.

## O que ainda falta

- Paldea (ordem fixa por nível de ginásio, mundo aberto no jogo real) —
  pesquisa já pronta em `docs/ROTAS-PALDEA.md`, implementação ainda não
  feita.
- Sprites de treinador e upgrades por-prédio (Padrão 5) — só Kanto tem
  os dois.
