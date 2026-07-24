# 0002 — Sprint 9: só 4 dos 18 bônus de tipo têm efeito de jogo hoje

**Contexto:** a tabela mestra (roadmap seção 3) define **qual** bônus cada
tipo dá (fonte da verdade, não reinventada aqui), mas não define a
magnitude, e vários bônus apontam pra sistemas que ainda não existem:
crítico no clique, loot, encontros selvagens, captura, XP, ATK/DEF/DoT de
batalha, janela noturna do Fantasma.

**Decisão:** implementar o cálculo genérico dos 18 tipos (peso por
Pokémon no time, tipo secundário = metade, per `systems/economy/typeBonuses.ts`)
e aplicar de verdade só nos 4 que já têm um sistema-alvo hoje:

| Tipo(s) | Efeito aplicado agora |
|---|---|
| Grama, Água | Multiplicador de CPS |
| Fogo | Multiplicador de doces por clique |
| Gelo | Desconto no custo de upgrades |
| Dragão | Bônus pequeno somado em CPS, clique e desconto de upgrade ("tudo") |

Os outros 13 (Elétrico, Normal, Lutador, Venenoso, Terra, Voador,
Psíquico, Inseto, Pedra, Fantasma, Aço, Escuridão, Fada) já têm peso e
percentual calculados corretamente por `bonusBreakdown()` e aparecem na UI
marcados "(em breve)" — só faltam os sistemas de batalha/loot/encontros/
captura/XP (Sprints 11, 13–19) pra ligar o efeito. Não é preciso reabrir
`typeBonuses.ts` quando esses sprints chegarem, só consumir o multiplicador
que já existe.

`BONUS_PERCENT_PER_POKEMON` (2%) e `DRAGON_ALL_STATS_PERCENT` (1%) são
provisórios, mesmo tratamento do Sprint 6 — Sprint 25 ("Balanceamento")
ajusta com dados de simulação.
