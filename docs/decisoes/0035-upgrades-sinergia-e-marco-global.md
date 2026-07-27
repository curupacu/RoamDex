# 0035 — Padrões 3 e 4 de upgrade: sinergia e marco global

Continuação direta da 0034 (item 3 do "em aberto"): dois padrões de
`docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md` que ainda não tinham sido
implementados — Padrão 3 (sinergia entre dois sistemas) e Padrão 4
(multiplicador global por marco). Pedido do dono do projeto: "bora pro 4",
priorizando isso sobre o resto do backlog de balanceamento aberto.

## Schema

`UpgradeDefinition` (`content/gen1/upgrades.ts`, reusado por Johto) ganhou:

- `kind: 'globalMultiplier'` — um `effect` fracionário (0.08 = +8%) que não
  entra em `totalClickBonus`/`totalCps` (esses só somam `'click'`/`'cps'`),
  então nunca é contado em dobro; é aplicado à parte via
  `globalMultiplierBonus`.
- `requiresBadges?: number` — trava por `save.badges.length`, não por
  `lifetimeCandies`. Independente do `unlockAt` (ambos precisam passar).
- `requiresSynergy?: { upgradeId, count, teamType }` — trava por N cópias de
  OUTRO upgrade já compradas E um Pokémon desse tipo no time ATIVO agora
  (não o roster inteiro). Só checado pra desbloquear; uma vez comprado
  (`maxPurchases: 1`), o efeito é permanente mesmo que o time mude depois.

`systems/economy/upgrades.ts`:
- `isUnlocked`/`nextLocked` ganharam um 3º parâmetro opcional
  `activeTypes: TypeName[] = []` (default seguro pra quem não modela time,
  ex. as simulações de `tests/simulations/`).
- `globalMultiplierBonus(region, save)`: `1 + soma dos effect` de todo
  `globalMultiplier` já comprado — mesma convenção de
  `systems/rebirth/rebirthShop.ts`'s `cpsMultiplierBonus`, o chamador
  multiplica isso em cima do que já tinha.

## Conteúdo (Kanto + Johto, espelhado)

- **Marco global tier A** (`league-recognition`/`johto-league-recognition`):
  4 insígnias, +8%.
- **Marco global tier B** (`kanto-legend`/`johto-legend`): 8 insígnias
  (todas), +15%, soma com o tier A (total +23% com os dois).
- **Sinergia** (`grass-synergy-conveyor`/`grass-synergy-gs-ball`): 15 cópias
  da Esteira de Doces/GS Ball + um Pokémon de tipo Grama no time ativo, +60
  CPS. Tipo Grama escolhido de propósito — já é o tipo com bônus de CPS
  (`content/types.ts`), reforçando o mesmo tema em vez de inventar uma
  sinergia sem relação com o resto do jogo.

Valores calibrados pra ficar na mesma ordem de grandeza dos tiers vizinhos
(unlockAt ~1.500-1.000.000, mesma faixa dos upgrades "cadeia de tier" já
existentes) — não passaram por simulação dedicada como os achados da 0034,
mas seguem a mesma lógica de custo/efeito por tier que os upgrades
adjacentes.

## Integração (App.tsx)

`activeTypes = team.flatMap((m) => m.types)` computado uma vez, passado pra
`ClickUpgradesGrid`/`UpgradesPanel` (que passam pra `isUnlocked`/
`nextLocked`). `globalMultiplierBonus(regionDef, region)` multiplicado em
cima do multiplicador existente nos três lugares que geram doces: clique
(`handleClick`), CPS do tick principal, e CPS do progresso offline (não no
XP — o marco global só afeta doces, por design, mesma decisão do
`cpsMultiplierBonus` do rebirth que também não toca XP).

## UI

O placeholder "???" da loja assumia sempre "desbloqueia com X doces
acumulados" — errado pros dois novos padrões. `ui/components/lockedHint.ts`
centraliza a lógica (mesma ordem de checagem do `isUnlocked`: doces →
insígnias → sinergia) e é reusada por `ClickUpgradesGrid` e
`UpgradesPanel`. `UpgradesPanel`'s `UpgradeRow` ganhou um branch de
`effectLabel` pra `'globalMultiplier'` (mostra a porcentagem, não um número
cru de doces/s) e omite `earnedLabel` pra esse kind — `upgradeEarned` nunca
acumula nada pra ele (não passa por `contributionsByKind`), então "Já
rendeu 0 doces" seria enganoso.

## Verificação

18 testes novos em `upgrades.test.ts` (badge gate locked/unlocked, synergy
gate nos três estados — falta cópia, falta tipo, os dois satisfeitos —, e
`globalMultiplierBonus` com 0 e com todos os tiers comprados). Suíte
completa: 261 testes, `tsc -b` e `oxlint` limpos.

Testado em navegador depois (decisão 0040): marco global e sinergia
confirmados funcionando ao vivo, incluindo o texto certo no tooltip e o
multiplicador de fato entrando na conta do clique.
