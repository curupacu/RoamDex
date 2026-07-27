# 0037 — Animação de início de batalha

Continuação direta do pedido de animações (0036): faltava só "início de
batalha" na lista do `docs/BACKLOG.md`. Captura (arremesso + balanço da
bola) e evolução já tinham sido feitas antes.

## Por que uma abordagem mais leve que a de evolução

Uma evolução é rara (acontece algumas vezes por run); uma batalha acontece
o tempo todo num idle clicker (selvagem a cada intervalo curto, gyms,
Elite Four). Uma tela cheia bloqueante de ~4s a cada luta, no estilo
`EvolutionScene`, viraria irritação em vez de graça. Por isso a intro de
batalha é bem mais curta (**550ms**) e não usa overlay/fila — é só:

- Um flash branco rápido cobrindo `.battle-screen` (`.battle-start-flash`,
  0.85 → 0 de opacidade em 0.5s).
- O time inimigo inteiro (sprite + nome + barra de HP, já que
  `.battle-enemy` é o container dos três) desliza da direita.
- O ativo do jogador (`.battle-tap-area`, só o sprite — nome/HP/energia
  ficam fora do botão) desliza da esquerda.

Ambos via `@keyframes` CSS puro (`translateX` + fade), disparados uma vez
no mount de `BattleScreen` (`introPlaying` state, `useEffect` com um
`setTimeout` de `BATTLE_INTRO_MS = 550`). O botão de tap fica `disabled`
enquanto `introPlaying` é `true`, só pra não deixar um toque acidental
acontecer durante o slide-in — sem bloquear a tela inteira como a
evolução faz (não tem fila, não tem "esperar terminar pra continuar").

## Por que não reusar `EvolutionScene`

Os dois têm timing e propósito diferentes (evento raro/celebratório vs.
transição frequente/rápida) e o de batalha não precisa da máquina de fases
completa (silhueta → flash → crossfade → hold → exit) nem de fila — só
precisa disparar e sumir sozinho uma vez por montagem do componente.
Forçar os dois pelo mesmo componente exigiria props condicionais pra
desligar metade das fases, sem ganhar nada em troca.

## Verificação

`tsc -b`, `oxlint` e os 265 testes existentes continuam limpos (não há
teste de componente pra `BattleScreen.tsx` no repo — só `systems/` tem
teste unitário, convenção já existente). Testado no navegador (dummy
battle do Admin): flash e slide-in visíveis, sem erro no console, o toque
funciona normalmente assim que a intro termina (HP do inimigo caiu num
toque de teste).
