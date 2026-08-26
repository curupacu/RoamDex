# 0046 — Kalos (Gen 6) finalizada e implementada em `content/gen6/*`

Continuação de uma implementação que tinha ficado pela metade numa sessão
anterior: `content/gen6/gyms.ts`, `eliteFour.ts`, `starters.ts` e
`locations.ts` já existiam (com `docs/ROTAS-KALOS.md` pesquisado, mesmo
padrão de Bulbapedia ao vivo contra Pokémon X das 3 regiões anteriores), mas
faltava `upgrades.ts`, o smoke test, e o registro em `content/regions.ts` —
Kalos não estava de fato jogável ainda. Pedido do dono do projeto: terminar
o que faltava e fechar o Sprint.

## O que entrou

- `content/gen6/upgrades.ts` — mesmo shape exato de `gen1`/`gen2`/`gen3`/
  `gen4` (9 prédios base + cadeia de tier + Padrão 3/4), só flavor de Kalos
  (Holo Caster, Zygarde, Xerneas & Yveltal etc.).
- `content/gen6/kalos.smoke.test.ts` — mesmo smoke test end-to-end das
  outras 3 regiões: anda a run inteira via `systems/gyms/*` real, confirma
  que todo `speciesId` citado existe em `gen6.json`, que os 8 ginásios têm
  local válido, e que a sequência de Elite Four/Campeã bate.
- `content/regions.ts`: `kalos` adicionado a `REGIONS` e ao fim de
  `REGION_ORDER` (destrava quando a Campeã de Sinnoh — Cynthia — cai).
  Removido de `UPCOMING_REGIONS`, que fica **vazio** agora — Unova precisa
  de uma micro-decisão de design (líder do 1º ginásio) e Alola/Galar/Paldea
  têm rupturas estruturais maiores (`docs/PESQUISA-GEN3-9-ESQUELETO.md`),
  nenhuma é "drop-in" como Hoenn/Sinnoh/Kalos foram.
- `engine/save.ts`: `RegionId` ganhou `'kalos'`. Sem migração — mesmo
  padrão aditivo das 3 regiões anteriores.
- `systems/rebirth/rebirth.test.ts`: o teste "no-op past the last defined
  region" apontava pra `'sinnoh'`, atualizado pra `'kalos'` — não é
  regressão, só a premissa "última região" mudando de dono outra vez.

## `scripts/build-data/build-gen6.ts` precisou de mais `LEGACY_IDS`

O arquivo já existia com uma lista inicial, mas o smoke test pegou **10
IDs faltando** na primeira rodada (Kecleon, Bagon, Solosis, Piloswine,
Lairon, Heatmor, Scyther, Bibarel — em tabelas de rota — e Surskit/Magneton
— nos times de Viola/Clemont). Mesmo tipo de gap que Sinnoh teve (0045) e
exatamente o motivo do smoke test existir. Adicionei os 10 diretos mais os
sucessores de evolução por nível (nunca troca/pedra) dos que são
selvagem-capturáveis: Shelgon/Salamence (de Bagon), Duosion/Reuniclus (de
Solosis), Mamoswine (de Piloswine) e Aggron (de Lairon) — Scyther ficou de
fora da extensão porque a evolução dele (Scizor) é por troca, não nível;
Surskit e Magneton são só time de ginásio, sem local selvagem, então não
precisam de sucessor. `gen6.json` final: **204 entradas** (72 nativas + 132
legadas).

## Balanceamento — achado: nenhum

Kalos entrou nas 3 simulações já parametrizadas por região
(`battle.sim.test.ts`, `upgraderoi.sim.test.ts`, `progression.sim.test.ts`)
— **os 8 ginásios + Elite Four passaram de primeira**, sem precisar de
nenhum `LEVEL_BUMP` ou ajuste pontual. `LEVEL_BUMP`/`CHAMPION_LEVEL_BUMP`
em `content/gen6/eliteFour.ts` ficam nos mesmos valores originais de Kanto
(12/8), igual Hoenn/Sinnoh tinham ficado — passaram no teste como estão.

`progression.sim.test.ts` (diagnóstico, sem assertion) mostra Kalos com o
nível médio de Elite Four mais alto das 4 regiões (76, contra 61-65 das
outras) — consistente com X/Y ter uma Elite Four/Campeã de nível mais alto
no jogo original. No cenário realista (com XP idle da Treinamento
comprada) isso ainda libera a Elite Four em 8.83h, mesma ordem de grandeza
das outras 3 regiões. No cenário "só batalha" (Treinamento nunca comprada)
a Elite Four não é liberada dentro da janela de 50h simulada — mas **Kanto
também não é** nesse mesmo cenário hostil (verificado agora, olhando o
mesmo relatório), então não é uma regressão nem um problema específico de
Kalos, é o comportamento já existente desse cenário-limite pra a região
mais antiga do jogo.

## Verificação

`tsc -b --noEmit` limpo, `oxlint` limpo. Suíte inteira: **335/335** (era
313 antes desta sessão — 9 do smoke test de Kalos + 13 entrando nas
simulações de batalha/progressão/upgrade ROI já parametrizadas por região).

## O que ainda falta

- Teste em navegador — nenhuma das 36 localizações de Kalos foi vista
  rodando (mesma situação de Hoenn/Sinnoh).
- Pendências de pesquisa já listadas em `docs/ROTAS-KALOS.md`.
- Próxima região "drop-in" nenhuma — Unova precisa de uma micro-decisão de
  design antes de virar pesquisa de rota; Alola/Galar/Paldea precisam de
  decisão de design maior (ver `docs/PESQUISA-GEN3-9-ESQUELETO.md`).
