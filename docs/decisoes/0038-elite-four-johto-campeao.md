# 0038 — Elite Four de Johto: a causa real era só o Campeão

Item 1 da lista de pendências deixada em aberto pela decisão 0034: "Elite
Four de Johto precisa de +20 de folga de nível, contra +8 do Kanto — vale
uma rodada dedicada, Pokémon por Pokémon, não mais um chute de
`LEVEL_BUMP`". Essa rodada aconteceu.

## Método

Reescrevi `simulateFight` passo a passo (script temporário em
`tests/simulations/`, deletado depois de incorporado aqui) pra imprimir,
enemy a enemy, o HP% do time do jogador ao longo da sequência inteira
(4 membros do Elite Four + Campeão, 26 Pokémon). Isso troca "o time perdeu"
por "o time perdeu EXATAMENTE aqui, contra esse Pokémon".

## Achado

**Os 4 membros do Elite Four (Will, Koga, Bruno, Karen) NÃO são o
problema** — mesmo com folga ZERO, o time do jogador atravessa os 4 com
70-100% de HP. O colapso inteiro acontece dentro do time do **Campeão
(Lance)**: Gyarados, Dragonite, Charizard, Aerodactyl, Dragonite, Dragonite
— os 6 na MESMA sequência, sem nenhuma cura entre si (só existe uma cura de
50% uma vez, ao CRUZAR de Karen pro Campeão — depois disso, nada).

Dois fatores se empilham exatamente ali:
1. **Dragão leva só 0.5x de QUALQUER um dos 3 tipos iniciais**
   (`content/typeEffectiveness.ts`: `grass.dragon`, `fire.dragon` e
   `water.dragon` são todos 0.5) — não tem "typo bom" pra trocar, os 3
   starters (grama/fogo/água) são igualmente fracos contra os 3 Dragonite
   cheios do time.
2. **Densidade de dragão**: o Kanto TAMBÉM tem 3 "dragões" (2 Dragonair +
   1 Dragonite), mas eles ficam no próprio Elite Four "Lance" (não no
   campeão) — a cura de 50% ao entrar no campeão (que, pro starter
   Bulbasaur, não tem dragão nenhum) "reseta" o dano antes da reta final.
   Johto empilha os 3 Dragonite (mais fortes que Dragonair) exatamente no
   último trecho, sem cura nenhuma depois.

Ambos os rosters são fiéis à fonte (Bulbapedia) — não é erro de dados, é
como as DUAS estruturas (roster real dos jogos + "um gauntlet contínuo com
cura só entre treinadores", decisão do próprio roadmap) interagem
diferente em cada região.

## Fix

`content/gen2/eliteFour.ts` ganhou um `CHAMPION_LEVEL_BUMP` separado do
`LEVEL_BUMP` que os outros 4 membros continuam usando — só o `LANCE_TEAM`
usa o valor menor. Testado isoladamente (variando só o nível do campeão,
cushion do jogador fixo em +8): `CHAMPION_LEVEL_BUMP=8` (era 18, mesmo
valor do resto) faz o Elite Four inteiro ser vencível com +8 de folga —
**a mesma folga já calibrada por playtest real no Kanto** — com uma margem
igualmente apertada (~2-9% de HP restante, mesma "quase perdeu" do Kanto).
Nenhum outro membro do Elite Four mudou; o roster do Campeão continua
exatamente o mesmo (Gyarados/3x Dragonite/Charizard/Aerodactyl), só o
nível é menor.

`tests/simulations/battle.sim.test.ts`'s teste de regressão do Elite Four
foi atualizado de `+20` pra `+8` — as duas regiões agora usam o MESMO
cushion de referência no teste, o que também serve de guarda: se alguém
mexer no Campeão de novo e essa folga voltar a divergir entre regiões, o
teste avisa.

## Verificação

265 testes (suíte inteira), `tsc -b` e `oxlint` limpos.
