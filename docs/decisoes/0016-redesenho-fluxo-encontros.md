# 0016 — Redesenho do fluxo de batalha: sem aba avulsa, pool restrito no início

Pedido explícito do dono do projeto, fora do texto original da seção 5 do
roadmap ("pool = geração atual da run" não fazia distinção de raridade por
progresso).

**Decisões, confirmadas em conversa antes de implementar:**
1. **Pool restrito → aberto**, reaproveitando o sistema de raridade já
   existente (Sprint 18) em vez de curar uma lista nova de espécies:
   tiers comum e incomum (que já cobrem Caterpie/Metapod/Weedle/Pidgey/
   Rattata/Spearow — todos `captureRate >= 50`) ficam disponíveis desde
   o início; o tier raro fica com peso 0 no sorteio até
   `RARE_TIER_UNLOCK_LIFETIME_CANDIES` (20.000, provisório) de progresso.
   `Inseto`/`rareWildChance` continua só aumentando a chance DENTRO do
   raro depois de destrancado, não destranca sozinho.
2. **Aba "Batalha" some da navegação normal** — batalha só acontece via
   encontro selvagem de verdade. O Rattata de teste fixo (Sprint 13)
   continua existindo no código (fallback do `BattleScreen` quando
   `opponent` não é passado) mas só é alcançável agora pelo botão
   "Batalhar contra o Rattata de teste" no painel de Admin.
3. **Curva de nível mantida como está** (base 5 + 1 a cada 2000 doces
   acumulados, ajustada no fix anterior) — o dono do projeto vai testar
   mais e avisa se precisar mudar.

**Não mexido:** não existe ainda um sistema de "tier por número de
ginásios vencidos" (viria naturalmente no Sprint 20) — por ora o gate é
só por `lifetimeCandies`, mesmo sinal de progresso que todo o resto do
jogo já usa (upgrades, loja, nível dos selvagens).
