# 0010 — Sprint 16: QTE "leva 2" (Gelo, Venenoso, Terra, Voador, Psíquico, Pedra)

Mesmo framework do Sprint 15 (`docs/decisoes/0008`) — só entradas novas
em `content/moves.ts` + 6 componentes novos + 6 casos no `QteModal`.
Nenhuma mudança no motor de batalha (`engine.ts`) nem nos helpers de
graduação (`grading.ts`), confirmando que o framework realmente
"aceita QTE novo só com config".

Mecânicas por tipo (todas usando `GameLoop`, timestamp-based):
- **Gelo:** 4 rachaduras clicáveis simultâneas, quebrar todas antes do
  timer (`gradeByCount`).
- **Venenoso:** bolhas aparecem uma de cada vez em posição aleatória,
  estourar dentro da janela de tempo (`gradeByCount`).
- **Terra:** arrastar (`pointerdown`/`pointermove`/`pointerup`) da
  esquerda pra direita; `% arrastado` vira a zona de graduação
  (`gradeByZone`) — único QTE por gesto de arraste, não clique.
- **Voador:** alvo balança em 3 "voos"; um clique por voo conta como
  acerto (`gradeByCount`).
- **Psíquico:** Simon Says de 4 símbolos — mostra a sequência, depois o
  jogador repete clicando; acerto por símbolo na ordem certa
  (`gradeByCount`). Usa `setTimeout` simples pra revelar a sequência
  (não é tick de jogo, é só a animação de intro do minigame).
- **Pedra:** segurar um botão que balança (tremor visual via seno); soltar
  cedo demais drena o progresso 1.5× mais rápido do que ele enche —
  `gradeByZone` no % de tempo mantido.

**Teste de regressão:** o teste do Sprint 15 que usava `types: ['rock']`
para verificar o fallback "sem QTE, multiplicador fixo" quebrou, porque
Pedra ganhou QTE agora. Trocado pra `['bug']` (ainda sem QTE, reservado
pro Sprint 17).

Faltam 6 tipos (Inseto, Fantasma, Dragão, Aço, Escuridão, Fada) — Sprint 17.
