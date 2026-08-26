# 0045 — Sinnoh (Gen 4) pesquisada e implementada em `content/gen4/*`

Pedido do dono do projeto: pesquisa completa de Sinnoh (mesmo padrão de
`docs/ROTAS-HOENN.md`, Bulbapedia ao vivo) e implementação imediata em
código, igual foi feito com Hoenn na 0043. Servidor de dev (`npm run dev`)
também foi deixado rodando na mesma sessão pra playtest manual do Hoenn.

## Pesquisa — `docs/ROTAS-SINNOH.md`

40 locais reais, 8 ginásios, Elite Four (4) e Campeã, fonte **Pokémon
Platinum** (não Diamond/Pearl). Achado que muda a ordem inteira do
documento: **a ordem dos ginásios difere entre as versões** — em D/P é
Roark→Gardenia→Maylene→Wake→Fantina→Byron→Candice→Volkner; em **Platinum,
Fantina é a 3ª e Maylene a 4ª** (confirmado contra `Sinnoh_League` na
Bulbapedia). O documento segue Platinum do início ao fim.

Pendências explícitas registradas no doc (não fabricadas): Old Chateau,
Lost Tower, Wayward Cave, Maniac Tunnel, Fuego Ironworks, Iron Island,
Celestic Town, trechos "norte"/"leste" de algumas rotas, trio dos lagos
(incluindo as sidequests dos pássaros lendários) e Distortion World/Spear
Pillar (claramente pós-jogo, mesmo espírito do Sky Pillar de Hoenn).
Confiança nas tabelas de rota é **menor que Hoenn** — Sinnoh tem mais
divisão de horário e mais rotas multi-área, e a ferramenta de extração
teve mais ruído; recomendo revisão humana pontual antes de qualquer ajuste
fino de raridade.

## Implementação — `content/gen4/*`

Mesmo shape exato de `gen1`/`gen2`/`gen3`: `starters.ts`, `locations.ts`
(40 locais), `gyms.ts`, `eliteFour.ts`, `upgrades.ts` (cópia numérica dos
de Kanto/Johto/Hoenn, só flavor de Sinnoh). `regions.ts` ganhou `sinnoh` em
`REGIONS` e no fim de `REGION_ORDER`; saiu de `UPCOMING_REGIONS` (entrou
Kalos no lugar, próximo "drop-in" do esqueleto de pesquisa). `RegionId` em
`engine/save.ts` ganhou `'sinnoh'` — sem migração, mesmo padrão aditivo já
usado 3 vezes.

`scripts/build-data/build-gen4.ts` precisou de `LEGACY_IDS` (mesmo
problema de Johto/Hoenn — Sinnoh reaproveita bastante espécie de Gen 1/2/3
nas tabelas e times: Geodude, Magneton, Ralts, Duskull, Milotic,
Tentacool/Wingull...). Diferente de Hoenn, **não acertei a lista de
primeira** — o smoke test (`sinnoh.smoke.test.ts`) pegou duas rodadas de
IDs faltando (Wingull/Pelipper/Tentacool/Tentacruel/Lickitung/Gyarados na
primeira passada) antes de fechar limpo; ficou registrado aqui porque é
exatamente o tipo de erro que o teste existe pra pegar antes de virar bug
em produção. `gen4.json` final: **179 entradas** (107 nativas + 72
legadas).

## Balanceamento — achado: nenhum

Sinnoh entrou nas 3 simulações já parametrizadas por região
(`battle.sim.test.ts`, `upgraderoi.sim.test.ts`, `progression.sim.test.ts`,
mesmo método usado pra achar o problema do Norman/Slaking na 0044) — **os 8
ginásios + Elite Four passaram de primeira**, sem precisar de nenhum
`LEVEL_BUMP` ou ajuste pontual como o de Hoenn. `progression.sim.test.ts`
(diagnóstico) confirma o mesmo padrão já visto nas 3 regiões anteriores: o
gate de doce nunca é o gargalo real, e mesmo no cenário mais hostil (só
batalha, sem XP idle) a Elite Four ainda cai dentro da janela de 50h
simulada (44.4h, na mesma faixa de Hoenn/Johto).

`LEVEL_BUMP`/`CHAMPION_LEVEL_BUMP` em `content/gen4/eliteFour.ts` usam os
mesmos valores de partida de Hoenn (12/8, originais de Kanto) — não
recalibrados especificamente pra Sinnoh, mas passaram no teste como estão.

## Verificação

`tsc -b --noEmit` limpo, `oxlint` limpo. Suíte inteira: **313/313** (era
291 antes desta sessão — 9 do smoke test de Sinnoh + 13 entrando nas
simulações de batalha/progressão/upgrade ROI já parametrizadas por região).

## O que ainda falta

- Teste em navegador — nenhuma das 40 localizações de Sinnoh foi vista
  rodando (mesma situação de Hoenn).
- Pendências de pesquisa já listadas em `docs/ROTAS-SINNOH.md`.
- Revisão humana das tabelas de rota (confiança menor que Hoenn, ver
  Metodologia do doc).
- Kalos é o próximo "drop-in" confirmado no esqueleto
  (`docs/PESQUISA-GEN3-9-ESQUELETO.md`) — mesmo processo, sem decisão de
  design pendente.
