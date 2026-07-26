# 0032 — Layout de 3 colunas do game-area (clique | cena | loja)

> Cobre o que o código comenta como decisões "0032" a "0038" — foi tudo
> na mesma sessão, uma sequência de idas e vindas em cima do mesmo
> layout, não vale separar em 7 arquivos.

## Status: inacabado

O dono do projeto pediu pra parar por hoje com o layout ainda **não**
aprovado ("tá ruim ainda"). Este documento registra onde ficou e por quê,
pra próxima sessão continuar do ponto certo em vez de repetir tentativas
já descartadas.

## O que foi pedido (nessa ordem)

1. Grid de upgrade de clique saiu de perto do Pokémon e foi pro topo da
   coluna direita, empilhado com a loja (antes ficava ao lado do
   sprite). Desenho de referência do dono do projeto:
   `docs/referencias/referencias coockie clicekr/Captura de tela
   2026-07-26 194219.png`.
2. A "cena" (geradores de CPS possuídos) deixou de ser quadradinhos
   pequenos lado a lado e virou **faixas largas empilhadas
   verticalmente** (uma por upgrade), cada uma com um banner de fundo —
   reaproveita os fundos por localização que já existem (decisão 0024,
   `frontend/public/backgrounds/*`), ciclando um por faixa.
3. As 3 colunas (clique | cena | loja) precisam ficar **coladas nas
   bordas da JANELA** (não do `<main>` centralizado, que tem
   `max-width`) — Pokémon a 15px da borda esquerda, loja a 0px da
   direita. Truque de CSS usado: `width: 100vw` + margem negativa
   (`calc(-50vw + 50%)`) no `.game-area`, ver `frontend/src/index.css`.
4. **Sem scroll interno em nenhuma coluna** — é a página inteira que
   cresce e rola junto (removido `overflow-y:auto` + altura fixa que
   existiam numa tentativa intermediária).
5. A faixa central (cena) tem que ter **largura fixa em px, centralizada
   na coluna do meio**, sem esticar conforme o tamanho da tela — por
   isso `.game-area` virou `display: grid` com
   `grid-template-columns: auto 1fr 320px` e `.upgrade-scene` tem
   `width: 560px; margin: 0 auto` dentro da faixa `1fr`.
6. Tamanhos: Pokémon 160→200px, ícone da loja 52→64px (grid de clique
   igual, sem mudar), sprite dentro da faixa 28→40px, cabem 18 por faixa
   agora (era 8), em grade 6×3.

## Bug real encontrado no meio do processo (não é frescura de CSS)

A animação `scene-bob` (o sprite "flutuando" dentro da faixa)
**substituía inteiro** o `transform: translate(-50%, -50%)` que
centralizava cada ícone no ponto calculado — uma `animation` troca o
`transform` todo, não soma com o que já tava declarado no elemento. Isso
fazia os ícones desenharem deslocados, meio pra fora da caixa. Corrigido
colocando o `translate(-50%,-50%)` **dentro de cada keyframe** também.

## Arquivos principais

- `frontend/src/App.tsx` — JSX do `.game-area`: `.click-stage` (só o
  Pokémon agora) → `<UpgradeScene>` → `<div className="side-column">`
  (`ClickUpgradesGrid` + `UpgradesPanel`).
- `frontend/src/ui/components/UpgradeScene.tsx` — faixas (`scene-lane`),
  banner de fundo por índice (`LANE_BACKGROUNDS`), posição em grade 6×3
  com jitter determinístico (`seededRandom`).
- `frontend/src/index.css` — `.game-area` (grid full-bleed),
  `.side-column`, `.scene-lane*`, tamanhos dos ícones.

## Verificação feita

`tsc -b`, `oxlint` e os 208 testes passam a cada rodada. Validado
visualmente **no app rodando de verdade** (não só mock estático) via
Playwright + Brave headless contra `npm run dev`, login anônimo real,
compra de upgrades real — não só screenshot de maquete.

## Em aberto pra próxima sessão

O dono do projeto ainda não aprovou o resultado visual final ("tá ruim
ainda", sem detalhar o quê especificamente desta vez). Próximo passo:
pedir um novo print/desenho apontando exatamente o que incomoda antes de
tentar mais uma rodada de CSS às cegas — as últimas rodadas mostraram que
adivinhar sem uma referência visual concreta gasta muito tempo em
tentativas erradas.
