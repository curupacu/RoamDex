# 0026 — Upgrades: primeira cadeia de tier

## O que foi feito

Primeira resposta real ao item "Upgrades genéricos demais" do
`docs/BACKLOG.md`, usando o Padrão 2 (cadeia de tier) de
`docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md` — escolhido entre os 3 padrões
novos por ser o que mais reaproveita o que já existe (upgrades de clique/CPS
atuais continuam valendo como estão).

`UpgradeDefinition` ganhou dois campos opcionais (retrocompatíveis — os 9
upgrades originais de cada região não mudaram de comportamento):
- `maxPurchases?: number` — undefined continua "building infinito"
  (Sprint 6); `1` faz o upgrade ser comprado uma única vez.
- `scalesWith?: 'rosterSize'` — muda o que `effect` multiplica: em vez de
  "× quantas vezes comprei", passa a ser "× Pokémon capturados no roster".
  Só um valor de escala existe por enquanto; adicionar outro (ex.: número de
  insígnias, pro Padrão 4 no futuro) é só estender esse union +
  `scaleValue()` em `systems/economy/upgrades.ts`.

Cadeia nova em Kanto e Johto, espelhada 1:1 em número (nomes diferentes por
região): 3 tiers por eixo (clique e CPS), compra única cada, os 2 primeiros
só "mais forte" (mesmo espírito dos upgrades atuais) e o 3º muda de
natureza — escala com quantos Pokémon o jogador já capturou na região, não
com quantas vezes comprou.

| Tier | Kanto | Johto | Efeito |
|---|---|---|---|
| 1 | Luvas do Campeão | Luvas do Clã Kimono | +80 doces/clique (fixo) |
| 2 | Talismã de Insígnia | Talismã do Farol | +250 doces/clique (fixo) |
| 3 | Fúria do Mewtwo | Fúria do Ho-Oh | +8 doces/clique **por Pokémon capturado** |
| 1 | Cooperativa da Vila | Cooperativa de Goldenrod | +12 CPS (fixo) |
| 2 | Rede de Postos | Rede de Postos de Johto | +35 CPS (fixo) |
| 3 | Fábrica do Zapdos | Fábrica do Lugia | +1.2 CPS **por Pokémon capturado** |

> Renomeado em 0027: os tiers 3 originalmente eram "Fúria/Fábrica Lendária"
> genérico — viraram nomes de lendário de verdade (Mewtwo/Zapdos em Kanto,
> já batendo com Ho-Oh/Lugia que Johto sempre teve) pra combinar com o
> ícone de sprite que cada upgrade ganhou.

## Por que só este padrão agora

Alinhado com o dono do projeto: os outros dois padrões da pesquisa
(sinergia entre sistemas, marco global por insígnias) ficam pra uma próxima
sessão — cada um precisa de um conceito novo (pré-requisito cruzado entre
upgrades/time; leitura de `save.badges.length`) que não valia empacotar
tudo de uma vez. A intenção registrada é cobrir os 3 eventualmente.

## Provisório

Custos/efeitos dos 6 upgrades novos são chute redondo (mesma faixa de
grandeza que os upgrades existentes nos mesmos `unlockAt`), sem simulação —
mesmo aviso de sempre, Sprint 25 é quem calibra de verdade.

## Verificação

`tsc -b`, `oxlint` e `vite build` limpos. Suíte inteira (203 testes, 26
arquivos) passa, incluindo 3 testes novos em
`systems/economy/upgrades.test.ts` cobrindo: bloqueio de recompra após
`maxPurchases`, cálculo correto de `effect × roster.length` uma vez
comprado, e contribuição zero antes de comprado. `UpgradesPanel.tsx`
atualizado pra mostrar "(comprado)" em vez do botão de compra pros tiers
esgotados.
