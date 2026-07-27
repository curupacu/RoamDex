# 0036 — Animação de evolução

Pedido direto do dono do projeto, com a ideia já desenhada: "quando ele
atinge o nível da evolução aparece um negócio sobrepondo tudo com a
silhueta do bulbassauro e um fundo preto... aí o fundo brilha, a silhueta
dá um fade out e o venossaur aparece dando fade in". Item que já constava
no `docs/BACKLOG.md` como polish não priorizado, adiantado agora por pedido
explícito.

## Detecção de evolução

`resolveEvolutionSafely`/`gainMemberXp`/`gainTeamXp` (já existiam desde o
Sprint 11/13) trocam o `speciesId` de um membro do roster quando ele cruza
o nível de evolução, mas não emitiam nenhum sinal de "isso acabou de
acontecer" — precisava de um jeito de saber, sem tocar nessas funções
puras já testadas.

`systems/team/leveling.ts` ganhou `detectEvolutions(before, after)`: compara
dois snapshots de `RegionSave` **por índice** no array `roster` e reporta
`{ from, to }` pra cada posição cujo `speciesId` mudou. Isso só é seguro
porque `gainMemberXp`/`gainTeamXp` (e `buyRareCandy`, que usa a mesma
lógica) só fazem `.map()` no roster — nunca adicionam/removem membro nem
reordenam. **Não pode ser reusado** em nada que capture/libere Pokémon.

## Onde é chamado (e onde não é)

Comparado antes/depois nos três pontos onde o jogador está de olho na tela:
- **Vitória em batalha** (`handleVictory`).
- **Doce Raro** (`handleBuyRareCandy`) — ação explícita do jogador.
- **Tick idle de XP** (loop principal do `App.tsx`, "Treinamento" idle).

**De propósito NÃO chamado** no catch-up de progresso offline (efeito que
roda uma vez no load): um período longo fora do jogo pode evoluir vários
Pokémon de uma vez, e abrir uma fila de telas cheias assim que o app carrega
seria pior que só aplicar silenciosamente (mesmo espírito de já não animar
o catch-up de doces, só resumir num banner).

Efeito colateral fora de um updater de `setSave`: React 18 `StrictMode`
(ligado em `main.tsx`) invoca updaters em dobro em dev pra pegar
impureza — um `setEvolutionQueue` chamado DE DENTRO de um updater do
`setSave` duplicaria a fila em dev. Por isso a detecção lê o `regionSave`/
`save` do escopo do render (ou o `region` já lido do ref no tick do loop),
não o `current` do updater — mesmo split que `handleClick` já usa pro
candy-pop (a mutação real do save continua usando `current`, só a
detecção de evolução usa a snapshot externa).

## Fila (`evolutionQueue`)

Array de `{ from, to }` em `App.tsx`. Só o primeiro item é montado como
`<EvolutionScene>`; o componente chama `onDone` quando termina e o app tira
o item do topo, avançando pro próximo (cobre o caso de duas evoluções no
mesmo tick idle). Overlay é `position: fixed`, então cobre qualquer view
ativa (Clicker, Time, Pokédex...), não só a tela de clique.

## `EvolutionScene` (fases, ~3.85s no total)

`enter` (0.5s, fade-in do preto + silhueta) → `flash` (0.9s, fundo pisca em
branco) → `reveal` (0.7s, crossfade silhueta→sprite colorido) → `hold`
(1.3s, mostra o resultado + legenda "X evoluiu para Y!") → `exit` (0.45s,
fade-out). Silhueta é o MESMO sprite normal (`sprite.local`, já existe pra
qualquer espécie) com filtro CSS `brightness(0) invert(1)` — sem asset novo,
mesmo truque já usado no `GoldenEncounter` (brilho dourado via filtro).

## Verificação

21 testes novos (4 pra `detectEvolutions` em `leveling.test.ts` + os já
existentes de evolução continuam passando), 265 no total, `tsc -b` e
`oxlint` limpos. Testado no navegador (`npm run dev`, guest login): Doce
Raro repetido até cruzar nível 16 (Bulbasaur→Ivysaur) e nível 32
(Ivysaur→Venusaur) disparou a animação nas duas vezes, sem erro no console,
sem travar a UI depois — a tela fecha sozinha e o jogo continua normal.
