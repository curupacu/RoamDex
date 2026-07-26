# 0027 — Upgrades ganham sprite (não são só texto num botão)

> **Revertido em `0028-icones-e-interatividade-upgrades.md`** — usar foto
> de Pokémon como ícone de upgrade não funcionou na prática (feedback do
> dono do projeto ao testar). Mantido aqui só como histórico da tentativa.

## Contexto

Feedback do dono do projeto depois de testar os upgrades novos (decisão
0026) ao vivo: a UI em geral "parece um monte de botão jogado", pouco
intuitiva, sem graça — trouxe `docs/referencias/exemplo coockie
clicker.jfif` como referência de loja com ícone por item (Cursor, Grandma,
Farm... cada um com sprite próprio). Pedido explícito: não copiar o Cookie
Clicker ao pé da letra (perde identidade própria) e não deixar os fundos
por localização (`decisão 0024`) inúteis.

## Decisão

Em vez de um asset novo por upgrade (não temos artista/asset pipeline pra
isso), reaproveitar exatamente o que o jogo já busca da PokeAPI: os sprites
de espécie em `public/sprites/{id}.png`, já usados no mesmo formato
ícone+texto-em-linha em `.roster-entry`/`.pokedex-entry`. `UpgradeDefinition`
ganhou `iconSpeciesId?: number` — cada um dos 30 upgrades (15 por região)
foi curado com um Pokémon que combina tematicamente:

- Upgrades de "força/punho" → Pokémon de luta (Machop, Hitmonchan,
  Primeape...).
- Upgrades ligados a um lugar/evento do jogo original → o Pokémon daquele
  lore (Farol de Olivine → Ampharos; GS Ball → Celebi; Torre de Rádio →
  Magneton; Creche → Togepi/Eevee).
- Os 2 tiers-capstone que escalam com o roster (decisão 0026) → um
  lendário de verdade (Mewtwo/Zapdos em Kanto, Ho-Oh/Lugia em Johto — os 2
  últimos já tinham nome de lendário, os de Kanto foram renomeados de
  "Fúria/Fábrica Lendária" genérico pra combinar).

`UpgradesPanel.tsx` virou uma linha flex (ícone 40×40 pixelado + nome/custo/
efeito empilhados), com uma borda esquerda verde quando o upgrade está
comprável — mesmo sinal visual que `--hp-green` já usa em
`.roster-entry--active`, não uma cor nova. Isso não mexe no fundo da
página: o painel continua o mesmo "card pixelado" opaco de sempre
(`decisão 0003`), só o conteúdo de dentro dele ficou mais rico — os fundos
por localização continuam a única coisa por trás de tudo.

## O que fica de fora por enquanto

Esse tratamento só chegou no painel de upgrades — é o pedaço mais barato/
alto-impacto pra validar a direção (reaproveita ícone já existente, um
componente só). Nav principal, cards de região, telas de ginásio/Elite
Four ainda são texto puro. Fica pra próxima sessão, depois de confirmar
com o dono do projeto se essa direção (sprite da PokeAPI + linha
ícone+texto, sem asset novo) é o caminho certo antes de espalhar pro resto
da UI.

## Verificação

Todos os 30 `iconSpeciesId` conferidos contra os arquivos reais em
`public/sprites/` (nenhum sprite faltando). `tsc -b`, `oxlint`, `vite
build` e a suíte inteira (203 testes) continuam passando — mudança é
puramente de conteúdo (novo campo opcional) + UI, sem lógica de jogo
afetada.
