# 0043 — Hoenn (Gen 3) implementada em `content/gen3/*`

Pedido do dono do projeto: com `docs/ROTAS-HOENN.md` pesquisado (sessão
anterior, Bulbapedia ao vivo contra Pokémon Emerald), implementar o
conteúdo de Hoenn seguindo exatamente o mesmo molde de `content/gen1/*` e
`content/gen2/*` — nenhuma abstração nova, só mais uma região.

## O que entrou

- `content/gen3/starters.ts`, `locations.ts`, `gyms.ts`, `eliteFour.ts`,
  `upgrades.ts` — mesmo shape de `gen1`/`gen2`, sem código novo em
  `systems/`/`ui/` (regra 2 do CLAUDE.md: região nova é dado, não lógica).
- `content/regions.ts`: `hoenn` adicionado a `REGIONS` e ao fim de
  `REGION_ORDER` (destrava assim que o Campeão de Johto cai — genérico via
  `systems/rebirth/rebirth.ts`'s `unlockNextRegion`, nada hardcoded).
  Removido de `UPCOMING_REGIONS` (só resta Sinnoh como placeholder).
- `engine/save.ts`: `RegionId` ganhou `'hoenn'`. **Sem migração de save** —
  mesmo padrão que Johto: regiões são aditivas
  (`SaveData.regionsUnlocked`/`regions` são sparse), um save existente
  simplesmente não tem `hoenn` até desbloquear.
- `content/gen3/hoenn.smoke.test.ts` — mesmo smoke test end-to-end do
  Johto (`johto.smoke.test.ts`): anda a run inteira via `systems/gyms/*`
  real, confirma que todo `speciesId` citado existe em `gen3.json`, que os
  8 ginásios têm local válido, e que a sequência de Elite Four/Campeã bate.

## `scripts/build-data/build-gen3.ts` precisou de `LEGACY_IDS`

Mesmo problema que `build-gen2.ts` já resolveu: Hoenn reaproveita bastante
espécie de Gen 1/2 nas tabelas de selvagem e nos times de treinador
(Geodude, Tentacool, Oddish, Zubat, Xatu, Kingdra, Slugma, Skarmory...), e o
jogo busca só um `dataUrl` por região (`App.tsx`) — sem merge com
`gen1.json`/`gen2.json` em runtime. Levantei os 33 ids legados (Gen 1/2)
citados direta ou indiretamente (evolução por nível de algo capturável
selvagem, nunca troca/pedra) nas tabelas de `docs/ROTAS-HOENN.md` e
re-rodei `build:gen3` — `gen3.json` foi de 135 pra 168 entradas.

## Simplificações/decisões tomadas na hora de virar código

- **47 locais** no total (mais que a estimativa de "~34" feita durante a
  pesquisa) — Route 104 e Petalburg Woods viraram 2 `LocationDefinition`
  separadas (a pesquisa tinha combinado as duas numa tabela só por
  brevidade, mas são lugares fisicamente distintos) e Meteor Falls (achado
  já pesquisado mas esquecido na escrita do doc — corrigido agora,
  retroativo em `docs/ROTAS-HOENN.md`) entrou como local próprio.
- **Trecho 5 (Norman) reusa o padrão do Trecho 6 de Johto (Jasmine)**:
  `petalburg-city-gym` é uma segunda entrada pra Petalburg City (mesma
  tabela vazia da primeira), já que o jogador só enfrenta Norman na volta.
- **`unlockAt` é uma curva escrita à mão**, não simulada — mesma ordem de
  grandeza final que Johto (0 a 650.000), esticada pra 670.000 porque
  Hoenn tem mais paradas reais. Assumidamente provisório, igual todo
  `unlockAt` de toda região antes do respectivo Sprint 25.
- **`LEVEL_BUMP`/`CHAMPION_LEVEL_BUMP` usam os valores originais de Kanto
  (12/8)**, não os já recalibrados de Kanto/Johto pós-0038/0042 — não fazia
  sentido copiar um número que foi ajustado pra um problema específico de
  OUTRA região (o combo Dragonite-sem-cura do Lance) sem antes rodar a
  simulação de Hoenn e ver se o mesmo problema existe aqui.
- Igual Johto quando implementado (0025), **nenhum balanceamento real
  rodou ainda** — isso é explicitamente o próximo Sprint 25-style pass
  pendente, não coberto por este registro.

## Verificação

`tsc -b --noEmit` limpo. Suíte inteira (`npm test`): 274/274 (era 265 antes
desta sessão — os 9 novos são o smoke test de Hoenn). Um teste preexistente
(`rebirth.test.ts`, "is a no-op past the last defined region") assumia que
Johto era a última região em `REGION_ORDER` — atualizado pra `'hoenn'`,
não é regressão, só uma premissa que deixou de ser verdade.

## O que ainda falta (não incluído neste sprint, registrado no BACKLOG)

- Balanceamento real de Hoenn via `tests/simulations/` (o pass que fez
  Kanto/Johto ficarem jogáveis de verdade).
- Playtest manual (nenhuma das 47 localizações foi vista no navegador).
- As pendências de pesquisa já listadas em `docs/ROTAS-HOENN.md`
  (Route 106/107/108/124/127/130/132/133, Safari Zone etc.) — se algum
  desses precisar entrar no jogo, pesquisar antes de codificar.
