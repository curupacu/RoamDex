# 0030 — O quadro completo: cena que enche, "???", Golden Encounter, flavor text

## Contexto

Depois da 0029, feedback foi direto: eu ainda tava pensando "dentro da
caixa" — só arrumando visual, sem entender por que Cookie Clicker
funciona como *jogo*. Pedido: pesquisar de verdade (reviews, análises,
psicologia de clicker/incremental) e montar o quadro completo com tudo —
cena, upgrades bloqueados como "???", um evento de bônus tipo golden
cookie, e textos com graça.

## O que a pesquisa mostrou (resumo, fontes no chat)

Cookie Clicker não é "feio vs bonito" — o visual **é** mecânica de jogo:

1. **Loop honesto**: número sobe, com som/texto/animação a cada ação —
   reforço quase sempre positivo, nunca punitivo.
2. **Curva de recompensa exponencial**: início inunda de vitórias
   rápidas; depois espaça, e o sentimento vira orgulho, não só prazer.
3. **Escalada de absurdo**: cada tier é uma ideia nova, não só um número
   maior (Cursor → Vovó → ... → Torre Mágica).
4. **O visual é objetivo secundário de verdade**: um autor (Critical
   Video Game Studies) documentou comprar Cursor mesmo sendo pior
   economicamente, só pra "completar o círculo" ao redor do cookie — a
   riqueza visual compete com a eficiência como meta, não é decoração.
5. **"???" cria antecipação** sem esconder que tem mais conteúdo vindo.
6. **Reforço de recompensa variável** (golden cookies aparecendo em
   intervalo aleatório) é o que torna o jogo "surpreendente" de verdade —
   intervalos fixos não têm o mesmo efeito psicológico.

## O que foi implementado

### 1. Cena que enche de verdade (substitui o scatter aleatório da 0029)

`UpgradeScene.tsx` reescrito: cada gerador de CPS possuído ganha seu
próprio "lote" (`.scene-plot`) que enche visualmente conforme você compra
mais cópias, até 8 (`PLOT_CAPACITY`) — aí ganha uma borda/brilho dourado
de "completo" (`.scene-plot--full`). Isso dá o objetivo estético que a
pesquisa mostrou ser real: encher o lote é uma meta à parte de "render
mais doce/segundo". Continua sem precisar de asset novo (mesmo ícone da
loja, decisão 0028).

### 2. "???" nos upgrades ainda bloqueados

`nextLocked()` novo em `systems/economy/upgrades.ts` — acha o próximo
upgrade bloqueado mais barato de destravar, dentro de uma lista (clique
ou CPS/XP, cada componente filtra o seu). `ClickUpgradesGrid` mostra um
quadradinho "?" extra no fim da grade; `UpgradesPanel` mostra uma linha
"???" extra no fim da lista — ambos desabilitados, mostrando quantos
doces acumulados faltam. Cria expectativa sem estragar a surpresa do que
vem, mesma ideia dos prédios "???" do Cookie Clicker antes de dar pra
pagar.

### 3. Golden Encounter — evento de bônus surpresa

Novo par `content/goldenEncounter.ts` (constantes) +
`systems/economy/goldenEncounter.ts` (`frenzyMultiplier`,
`triggerFrenzy`, reaproveitando o **mesmo mecanismo de `buffs`** que já
existe pro XP boost da Candy Shop, `isBuffActive`) + `GoldenEncounter.tsx`
(botão clicável). Um Pokémon aleatório (id 1-251, reaproveita
`public/sprites/`) aparece em posição aleatória dentro do `.game-area`,
com brilho dourado via CSS (`drop-shadow` + `brightness`, sem asset
novo), em **intervalo aleatório** (90s-240s, de propósito — reforço de
recompensa variável, diferente do `wildEncounter` que usa intervalo fixo)
e some sozinho depois de 12s se ignorado. Clicar a tempo ativa "Frenzia":
clique e doces/s ×7 por 30s (`FRENZY_MULTIPLIER`), com um banner
`🔥 Frenzia!` enquanto ativo. Mesma regra de extensão que o XP boost já
tinha: pegar de novo enquanto ativo soma tempo em vez de resetar.

Frenzia **não** entra no cálculo de progresso offline (só no loop ao
vivo e no clique) — de propósito, pra não virar um jeito de "bancar" 7x
de produção por horas só por ter fechado a aba com o buff ativo.

### 4. Flavor text

`UpgradeDefinition` ganhou `flavor?: string` — uma frase curta por
upgrade (30 escritas, Kanto + Johto), escalando de mundano pra mais
"personagem" conforme o tier, tipo o humor crescente do Cookie Clicker.
Aparece como linha itálica discreta na loja (`UpgradesPanel`) e no
tooltip do quadradinho de clique.

## Verificação

`tsc -b`, `oxlint` e a suíte inteira passam — **208 testes** (203 + 5
novos: `nextLocked` × 2, `goldenEncounter` × 3). Validação visual via
mock estático (mesmo método da 0029: `index.css` real + Brave headless
via Playwright) confirmando lado a lado: quadradinho "?" bloqueado, linha
"???" na loja, flavor text nas linhas, lote cheio com brilho dourado, e o
Golden Encounter brilhando sobre o game-area. Não testado no app rodando
de verdade (sem login Firebase) — mesma ressalva da 0029, vale um play
manual.

## O que continua de fora (fica pra outra rodada)

- Nav principal, cards de região, telas de ginásio (mesma ressalva desde
  a 0028/0029).
- Os 30 ícones de verdade continuam sendo o pedido de asset nº1 — sem
  eles, quadradinho/loja/cena mostram só texto.
- O enxame de cursores orbitando (ponto #4 da análise das imagens de
  referência) e o fundo em camadas tipo corte transversal (pontos #1/#3)
  não entraram — são mudanças estruturais maiores (o fundo em camadas
  pede repensar o sistema de fundos-por-local da 0024) e ficam como
  candidato claro pra próxima rodada, não pra encaixar de última hora
  nesta.
