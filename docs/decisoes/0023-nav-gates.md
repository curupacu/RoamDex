# 0023 — Nav: Victory Road e Loja de Rebirth só depois de ganhos

## Contexto
Playtest do dono do projeto após a entrega de multi-região/login (0022):
os botões "Victory Road" e "Loja de Rebirth" apareciam na nav desde o
início do jogo, mesmo sem nunca ter vencido uma Elite Four ou dado um
rebirth — telas vazias/sem função visíveis cedo demais.

## Decisão
- **Victory Road** só aparece na nav quando `save.victoryRoad.length > 0`
  — já é o sinal exato de "alguém venceu uma Elite Four", sem precisar de
  campo novo.
- **Loja de Rebirth** precisa de sinal novo: `insignias > 0` não bastava
  (zera se o jogador gastar tudo, escondendo o botão de novo). `SaveData`
  vira v11 com `hasRebirthed: boolean`, setado uma vez dentro de
  `performRebirth` (`systems/rebirth/rebirth.ts`) e nunca mais alterado —
  a nav lê esse campo direto.
- **Migração 10→11**: backfill `hasRebirthed: insignias > 0` — melhor
  esforço pra saves existentes (insígnia só vem de rebirth completo ou do
  painel admin), não afeta ninguém que já tinha o botão visível.

## Escopo
Só o gate de visibilidade dos dois botões — nenhuma mudança nas telas em
si.
