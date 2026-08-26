# 0048 — Padrão 5: upgrades de tier POR PRÉDIO (compra única, evoluem)

Pedido original do dono do projeto (retomado nesta sessão): os itens da
loja deviam poder virar itens de 1 compra só que "evoluem" — exemplo dado:
pra fábrica do Zapdos, uma "Faísca" que melhora a produção em 1%, depois
um "Raio" que melhora mais 2%, desbloqueados por quantidade possuída do
prédio (ex.: 10 fábricas) ou doces acumulados. Pedido pra olhar a página
de Upgrades da Cookie Clicker Wiki como referência de escala: 717 upgrades
no total, 300 são upgrades por prédio (cada um dos ~18 prédios tem sua
própria cadeia de tiers). Confirmado: modo história tem uma versão bem mais
enxuta disso; a cadeia completa (~10+ tiers por prédio) é pro modo
infinito, ainda não implementado.

## O que entrou — Padrão 5

- `UpgradeDefinition` (content/gen1/upgrades.ts) ganhou:
  - `kind: 'buildingBoost'` — `effect` é uma fração (igual globalMultiplier),
    mas só multiplica a contribuição de UM prédio específico
    (`boostsBuilding`, por id), não o jogo inteiro.
  - `requiresBuildingOwned?: { buildingId, count }` — desbloqueia por
    quantidade possuída de um prédio (sem checar tipo de time, diferente
    de `requiresSynergy`).
- `systems/economy/upgrades.ts`:
  - `buildingBoostMultiplier(region, save, buildingId)` — soma a fração de
    todo `buildingBoost` comprado que mira esse prédio (1 + soma).
  - `upgradeContribution` passou a receber `region` (antes só `save`) pra
    poder aplicar esse multiplicador na contribuição do prédio-alvo.
  - `isUnlocked` ganhou o gate de `requiresBuildingOwned`.
- `lockedHint.ts` e `UpgradesPanel.tsx` (o "+N" cosmético que pipoca de vez
  em quando também precisou aprender sobre o boost, senão ficava
  mostrando o valor errado assim que um prédio ganhava tier) atualizados.
- Conteúdo (Kanto): os 4 prédios de CPS ilimitados (Ajudante Voluntário,
  Posto de Coleta, Esteira de Doces, Fábrica de Doces) ganharam 2 tiers
  cada (+5%, depois +8%), desbloqueados por quantidade possuída (10, depois
  25) — 8 upgrades novos no total.

## Verificação

`tsc -b --noEmit` limpo, `oxlint` limpo. Suíte inteira: **340/340** (era
335 — 5 testes novos cobrindo `requiresBuildingOwned` e
`buildingBoostMultiplier`, incluindo um teste de integração confirmando
que `totalCps` realmente aplica o boost em cima do prédio certo, e só
dele). Testado ao vivo: comprar 10x Ajudante Voluntário destrava a
"Vassoura Nova" (+5%), o hint "???" seguinte já mostra corretamente
"Desbloqueia com 25x Ajudante Voluntário" (a 2ª tier), e comprá-la marca
"(comprado)" — fluxo ponta a ponta confirmado no navegador.

## O que ainda falta

- Só Kanto, só 2 tiers por prédio, só os 4 prédios de CPS ilimitados —
  modo história de propósito enxuto. Click-type buildings (os que ficam
  no grid pequeno) e as outras 4 regiões não ganharam cadeia ainda.
- Modo infinito (feature ainda não iniciada) é onde a cadeia completa
  (~10+ tiers por prédio, igual o Cookie Clicker real, ~300 upgrades só
  de prédio) entraria — este commit só constrói o MECANISMO, não a
  profundidade toda.
- O item "upgrades visuais aparecendo ao redor do clique" (ex.: Magikarp
  pulando) mencionado na mesma ideia original ainda não foi feito — é um
  sistema de decoração separado, não uma extensão deste.
