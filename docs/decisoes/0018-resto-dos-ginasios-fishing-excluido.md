# 0018 — Resto dos 8 ginásios: fishing excluído, dungeons multi-andar mescladas

## Contexto
Sequência do Sprint 20 depois do Brock (0017): implementar o resto da
"trilha" de `docs/ROTAS-KANTO.md` até o Victory Road, com os 7 ginásios
restantes (Misty → Giovanni). Só faltava resolver os pontos em aberto do
próprio doc de pesquisa antes de virar dado de jogo.

## Decisão
- **Fishing (Old/Good/Super Rod) fica de fora.** É um mecanismo de
  item+ação que o jogo não tem (ao contrário de Surf, que aqui já virava
  "chão normal" por decisão anterior). Toda rota que tinha peixe via vara
  no Bulbapedia teve essa parte do pool descartada; só ficou grama/caverna
  + Surf.
- **Surf continua sendo só mais uma entrada no pool**, com o peso do
  Bulbapedia usado como está (sem renormalizar contra a grama). Em rotas
  100% aquáticas (19, 20) isso não muda nada; na Rota 21 (grama + Surf)
  significa que o Tentacool acaba proporcionalmente mais comum que cada
  espécie de grama individual — é a leitura mais literal dos números reais,
  não uma proporção inventada.
- **Dungeons de vários andares (Monte Moon, Túnel da Rocha, Ilhas Seafoam,
  Victory Road) viram uma localização só.** Peso por espécie = soma do peso
  em cada andar; nível = faixa mín–máx entre os andares. Mantém "1 parada
  por dungeon" na linha em vez de sub-áreas — consistente com a decisão de
  manter o mapa uma linha reta (0017).
- **Cidades sem grama** (Cerulean, Vermilion, Celadon, Fuchsia, Saffron,
  Cinnabar, Viridian) entram como paradas vazias (`encounters: []`), cada
  uma hospedando seu ginásio — mesmo padrão do Pewter City.
- Gates de doces acumulados entre paradas continuam crescendo (~20-25%
  cada), só placeholder — Sprint 25 rebalanceia tudo.
- **Spawn ficou mais rápido** (90s → 45s) e a janela pra decidir
  batalhar/ignorar ficou maior (20s → 30s) — pedido direto do dono do
  projeto depois de testar a Fase 1: "se a pessoa não quiser [batalhar],
  ela só não batalha" — precisa de folga suficiente pra isso ser uma
  escolha de verdade, não um susto.

## Fora de escopo
Elite Four + Campeão (Indigo Plateau) NÃO entraram — é Sprint 21 no
roadmap, times já documentados em `docs/ROTAS-KANTO.md` pra quando chegar a
vez. `victory-road` existe como localização (com seu próprio pool de
selvagens) mas não tem ginásio associado.
