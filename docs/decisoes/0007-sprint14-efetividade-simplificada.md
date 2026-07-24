# 0007 — Sprint 14: efetividade de tipo simplificada, e correção do 0006

**Contexto:** roadmap seção 4: "Efetividade de tipos (tabela oficial
simplificada: 2×, 1×, 0.5×) aplica em ambos os lados."

**Decisões de simplificação** (`content/typeEffectiveness.ts`):
1. **Só 3 níveis, sem imunidade (0×).** Combinações tradicionalmente
   imunes (ex.: Normal vs Fantasma) caem em 0.5× em vez de ganhar um 4º
   nível. A tabela oficial de multiplicadores em si não é inventada —
   são os números reais do jogo — só a imunidade que vira "não muito
   efetivo" em vez de "sem efeito".
2. **Sem empilhamento de tipo duplo.** Pokémon com dois tipos usam só o
   tipo primário na hora de calcular efetividade (tanto atacando quanto
   defendendo). O oficial multiplicaria os dois tipos do defensor
   (podendo chegar a 4× ou 0.25×); "simplificada" foi lido aqui como
   "não fazer essa conta", não só "3 níveis".
3. **Tipo de ataque = tipo primário do atacante.** Como os golpes de
   verdade só chegam nos Sprints 15-17, o "ataque básico" de cada
   Pokémon usa o próprio tipo primário como base pra efetividade —
   não existe golpe "sem tipo" (tackle) ainda.

**Correção do `docs/decisoes/0006`:** aquele registro listou Elétrico
("+% chance de crítico") como um bônus candidato pra batalha. Reli a
tabela mestra (seção 3) com calma: o bônus do Elétrico é "chance de
crítico **no clique**" — é um bônus do clicker de doces (Sprint 5),
igual Fogo/Grama/Água/Gelo, não de batalha. Não foi implementado neste
sprint (nem deveria ter sido cogitado ali); fica como pendência separada
do clicker, não da batalha.

Lutador (ATK do time), Pedra (DEF do time) e Aço (redução de dano)
continuam genuinamente "(em breve)" — o Sprint 14 não mexeu neles pra
não misturar escopo com efetividade de tipo, que já era o suficiente
pra um sprint.
