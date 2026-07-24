# 0013 — Sprint 19: capturar OU loot (FASE 3 completa)

Implementa a seção 6 do roadmap: escolha exclusiva pós-vitória, só pra
encontros selvagens de verdade (não pro Rattata de teste da aba
"Batalha" — esse continua só validando o motor, sem captura/loot).

**`systems/capture/capture.ts`:** `captureChance = clamp(captureRate/255,
5%, 95%) × bônus`, com o bônus vindo só de Fada (`economyMultiplier(team,
'captureChance')`) — não existe upgrade de captura ainda, então "+
bônus (Fada, upgrades)" da seção 6 só tem a metade Fada ligada por
enquanto. Falhou a bola = o selvagem foge, sem segunda chance.

**`systems/capture/loot.ts`:** rola upgrade grátis (raro, 25%, só entre
os já desbloqueados) ou doces escalando com o nível do inimigo
(`20 + nível×5`, provisório). **O slot de item não é sorteado** — não
existe sistema de itens (reservado pra seu próprio sprint futuro, seção
13), e um resultado de loot que não faz nada pareceria bug, não
feature reservada. Mesmo raciocínio do Sprint 12 com os buffs de
ATK/captura que ainda não existiam.

**Fluxo pós-vitória em `BattleScreen`:** XP é concedido assim que a
batalha vira vitória (via `useEffect` guardado por ref, dispara uma vez
só), independente da escolha seguinte. Só then, se veio de um encontro
selvagem (`opponent` prop setado), mostra os botões "Jogar Pokébola" /
"Pegar Loot"; `onCapture`/`onLoot` retornam o texto do resultado pra
tela mostrar antes do "Continuar".

**Bug pego e corrigido nesta implementação:** o timer de 20s pra
ignorar o selvagem (`docs/decisoes/0012`) continuava rodando mesmo
depois do jogador apertar "Batalhar" — se a luta (com QTE) passasse de
20s, o encontro sumia no meio da batalha e o jogo esquecia que era um
selvagem de verdade, pulando a tela de captura/loot. Corrigido: o timer
de 20s só roda enquanto `view === 'clicker'`.

**Fase 3 (Batalha) está completa**: motor 1v1, efetividade de tipo, os
18 QTEs, encontros selvagens, capturar ou loot. Próximo é a Fase 4
(rebirth e progressão macro), começando pelos ginásios de Kanto
(Sprint 20).
