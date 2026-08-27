# 0052 — Sprint Paldea (Gen 9)

Última das 3 regiões pendentes (Alola/Galar/Paldea). Segue a pesquisa
(`docs/ROTAS-PALDEA.md`) e a decisão estrutural já confirmada: **ordem
fixa por nível recomendado crescente**, já que Paldea é mundo aberto de
verdade e os 8 ginásios não têm sequência obrigatória no jogo real.

## O que entrou

- `content/gen9/{starters,gyms,eliteFour,upgrades,locations,
  paldea.smoke.test}.ts` — 34 locais (Cabo Poco → victory-road/Area
  Zero), 8 ginásios na ordem Katy→Brassius→Iono→Kofu→Larry→Ryme→Tulip→
  Grusha (nível 14→47), Elite Four (Rika, Poppy, Larry, Hassel) + Campeã
  Geeta.
- `content/regions.ts` — `paldea` adicionado a `REGION_ORDER`/`REGIONS`
  (`dataUrl: '/data/gen9.json'`).
- `scripts/build-data/build-gen9.ts` — ganhou `LEGACY_IDS` (94 espécies
  de outras gerações usadas nas rotas/times de Paldea) e o `gen9.json`
  foi reconstruído (224 entradas).
- `engine/save.ts` — `RegionId` ganhou `'paldea'`.

## Achados estruturais

- **Larry é ginásio E Elite Four** (mesma pessoa, dois times totalmente
  diferentes — Normal no ginásio, Flying na Elite Four "a pedido da
  Geeta", fato do jogo real) — modelado como dois `EliteFourMember`/
  `GymDefinition` separados com o mesmo nome, mesmo espírito de Hala/
  Olivia/Acerola em Alola (reaparecem, não é mecanismo novo).
- **Ginásio da Ryme é batalha dupla (2v2)** no jogo real — fora de
  escopo, jogado como sequência 1v1 normal (mesmo tratamento dado a
  Dynamax/Terastalização: não vira mecânica nova do sistema de batalha).
- **Campeã Geeta não tem variação por inicial documentada** — diferente
  de toda região anterior. Time fixo pros 3 iniciais, mesmo tratamento já
  dado ao Alder de Unova.
- **Area Zero virou o id `'victory-road'`** (App.tsx depende desse
  literal) — no jogo real é epílogo PÓS-Campeã; aqui é a masmorra final
  antes do Elite Four, única disponível na lista de locais fornecida
  (inversão de ordem sinalizada na pesquisa, não escondida).

## Achado de balanceamento: o Elite Four original virava parede

Times de Bulbapedia (5 Pokémon por membro + 6 da Campeã, 26 no total)
faziam o jogador perder **mesmo com a folga padrão de +8 níveis**. Testei
ajustar só `LEVEL_BUMP`/`CHAMPION_LEVEL_BUMP` (de -15 a +12) e não mudou
nada — subir/descer o nível de todo mundo junto não muda a DIFERENÇA
relativa entre jogador e inimigo, que é o que decide a luta. Um probe
isolado (`simulateFight` direto, fora dos testes) confirmou que só a
partir de +20 níveis de folga a luta virava vitória — o elenco moderno de
Paldea (BST mais alto que os clássicos de Kanto) tornava a mesma
CONTAGEM de Pokémon proporcionalmente mais dura. Solução: **times saem
com 1 Pokémon a menos por membro** (o de nível mais baixo de cada um) —
20 Pokémon no total em vez de 26. Com isso, a folga padrão de +8 volta a
funcionar (22% HP restante, nem parede nem trivial).

## Verificação

- `tsc -b --noEmit` limpo, `oxlint` limpo.
- Suíte inteira: **441/441** (era 418 — 23 testes novos, incluindo os 10
  do smoke test de Paldea).
- Simulação de batalha: os 8 ginásios vencem sem virar parede (pior caso:
  Larry, 44% HP). Elite Four + Campeã **perde no nível médio exato** (0%
  HP) e **vence com a folga padrão de +8** (22% HP) — depois do ajuste de
  tamanho de time acima.
- Simulação de progressão: curva sobe de forma suave — com treino idle,
  0.26h (Katy) até 2.87h (Grusha) e 7.45h (Elite Four); só-batalha, 1.68h
  até 18.38h e 41.80h.
- `upgraderoi.sim.test.ts`: upgrades "lendários" e o gap clique-vs-CPS
  passam nos mesmos limites das outras 8 regiões.

## Estado do projeto

Com Alola, Galar e Paldea implementadas, **todas as 9 regiões
planejadas até agora estão completas** (Kanto, Johto, Hoenn, Sinnoh,
Kalos, Unova, Galar, Alola, Paldea). O que ainda falta pra "conteúdo
completo" em todas elas:

- Sprites de treinador — só Kanto tem.
- Upgrades por-prédio (Padrão 5, decisão 0048) — só Kanto tem.
- Modo infinito (feature ainda não iniciada).
