# 0042 — Dificuldade geral pra cima + porcentagem de spawn visível por rota

Dois pedidos diretos do dono do projeto na mesma sessão de 2026-07-28: "tá
muito fácil, faz tudo dar mais dano" e um botão pra ver a chance de spawn de
cada Pokémon em qualquer rota.

## Dificuldade

`DAMAGE_SCALE` (`systems/battle/engine.ts`) subiu de **0.06 para 0.09**
(+50%). É usado por `calculateDamage`, chamado igual pros dois lados
(`applyPlayerTap` e `applyEnemyAttack`) — "tudo dá mais dano" da forma mais
literal possível, sem mexer em ritmo de ataque nem em stats.

### Efeito colateral: Campeão de Kanto parou de ser vencível com a folga padrão

A suíte de simulação (`tests/simulations/battle.sim.test.ts`) pegou uma
regressão real: com `DAMAGE_SCALE=0.09`, o time do Campeão (Blue, 6
Pokémon — o roster mais comprido e mais variado de tipo da sequência,
entrando logo depois dos 4 membros do Elite Four com só uma cura de 50% de
lastro) deixou de ser vencível com a folga de referência de +8 níveis que
o teste exige (`docs/decisoes/0019-*.md`, mesmo cushion usado por Johto
desde a 0038). Os outros 4 membros (Lorelei/Bruno/Agatha/Lance) continuaram
OK sem mudança nenhuma.

Mesmo método da 0038: script temporário em `tests/simulations/` (deletado
depois de incorporado) variando só o nível do Campeão contra a sequência
inteira. Resultado: baixar o bump do Campeão pra **8** (mantendo o
`LEVEL_BUMP=12` dos outros 4 membros intocado) volta a fazer a sequência
inteira vencível com a folga de +8 — margem de ~4% de HP restante, o mesmo
"quase perdeu" que a 0038 achou pro Johto. Coincidência de valor com o
`CHAMPION_LEVEL_BUMP=8` de Johto — as bases (`LEVEL_BUMP` de cada região,
12 vs 18) são diferentes, o número final bateu por acaso.

`content/gen1/eliteFour.ts` ganhou seu próprio `CHAMPION_LEVEL_BUMP`
(antes o Campeão usava o mesmo `LEVEL_BUMP` fixo dos outros 4), só o time
do Blue (`CHAMPION_TEAM_BY_STARTER`) foi trocado pra usar a constante nova.

Como sempre nesse arquivo: **provisório**, calibrado pra "não virar parede
nem trivial" pela simulação, não por playtest real ainda — vale o dono do
projeto confirmar se a dificuldade geral (não só o Campeão) ficou boa nas
lutas do dia a dia, não só na sequência final.

## Porcentagem de spawn por rota

Botão "%" no canto superior direito do painel de rota (`.location-nav`) —
abre uma lista com cada Pokémon da rota atual e sua chance de spawn, em
todas as rotas com encontro selvagem (esconde sozinho em cidades/ginásios,
que têm `encounters: []`).

- `systems/capture/encounterRates.ts`: `encounterRates(location)` — só
  normaliza os `weight` já existentes em `content/*/locations.ts`
  (pesquisados do Bulbapedia, ver `docs/ROTAS-*.md`) pra porcentagem do
  total da rota, ordenado do mais comum pro mais raro.
- `ui/components/EncounterRatesButton.tsx`: botão + painel, recebe
  `location` e `gen1` (pra resolver nome/sprite de cada `speciesId`).
  Plugado dentro de `LocationNav.tsx`, que já é renderizado por região
  (Kanto e Johto compartilham o mesmo componente) — não precisou de nada
  espec��fico por região.
- Deliberadamente NÃO incorpora o bônus `rareWildChance` (tipo Inseto no
  time / loja de rebirth), que só desvia a rolagem em runtime a favor do
  Pokémon de menor peso da rota (`systems/capture/wildEncounter.ts`) — o
  painel mostra a tabela de referência "como o jogo documenta a rota"
  (mesmo espírito dos `docs/ROTAS-*.md`), não a rolagem exata desta run.

## Verificação

`tsc --noEmit` limpo. Suíte inteira (`npm test`, 265 testes) voltou a
passar depois do fix do Campeão — sem esse fix, 1 teste (Elite Four de
Kanto) quebrava. Sem teste de componente pra `LocationNav`/
`EncounterRatesButton` (mesma lacuna já registrada em 0037/0041 pra
`BattleScreen.tsx`).
