# 0024 — Fundo muda por local

## Contexto
Item já registrado no `BACKLOG.md` ("Fundo muda conforme o lugar") desde o
Sprint 20 (decisão 0017), que deliberadamente adiou isso e manteve um fundo
único fixo. O dono do projeto forneceu um conjunto de artes (pack com
variantes dia/noite: praia, caverna, deserto, lago, montanha, oceano,
caminho, neve, grama alta, subaquático) prontas pra usar.

As imagens tinham sido salvas em `frontend/dist/` (pasta de build, ignorada
pelo git e recriada do zero a cada `npm run build`) em vez de
`frontend/public/` (a pasta de assets de verdade) — precisavam ser movidas
antes de qualquer coisa, senão sumiriam no próximo build.

## Decisão
- Assets copiados e renomeados (sem espaço, minúsculo) pra
  `frontend/public/backgrounds/`: `beach(.png/-2/-night)`, `cave(.png/-2/-3/-night)`,
  `desert(.png/-night)`, `lake(.png/-night)`, `mountain(.png/-2/-night)`,
  `ocean(.png/-night)`, `path(.png/-2/-night)`, `snow(.png/-night)`,
  `tall-grass(.png/-night)`, `underwater.png`, `flowers.jpg`,
  `route-grass.webp`. `forest.jpg` (fundo antigo/único) continua como
  fallback do CSS.
- **`LocationDefinition` ganha o campo `background: string`**
  (`content/gen1/locations.ts`) — cada uma das 39 localizações de Kanto
  declara seu próprio arquivo, dado, não lógica (CLAUDE.md regra 2). Sem
  asset de "cidade" ou "floresta densa" de verdade no pack — cidades usam
  variantes de `path`/`mountain`/`lake`/`ocean` conforme o tema do ginásio
  local, e a Floresta de Viridian usa `tall-grass-night` (mais escuro,
  mais denso) na falta de um asset de floresta dedicado.
  `snow`/`desert-night`/`lake-night`/`beach-night`/`beach-2`/`cave-3`
  ficam sem uso por enquanto — Kanto não tem rota de neve/deserto de
  verdade — reservados pra quando uma região futura precisar.
- **`index.css`**: `body`'s `background-image` passa a ler
  `var(--bg-image)` com `url('/backgrounds/forest.jpg')` como valor
  default da custom property — cobre as telas sem localização ativa
  (login, seleção de região, novo jogo).
- **`App.tsx`**: `useEffect` novo, disparado quando `currentLocation` muda,
  faz `document.body.style.setProperty('--bg-image', ...)`. Não duplica
  lógica de fallback — só troca a variável que o CSS já lê.
- Ginásios e Elite Four/Campeão não têm fundo próprio: a batalha acontece
  "na" location atual (`currentLocationId` não muda durante uma luta), o
  fundo da cidade/rota já cobre isso.

## Escopo
Só Kanto. Quando uma região nova entrar (Sprint 24+), ela declara seus
próprios `background` por localização do mesmo jeito — nenhuma mudança de
sistema necessária.
