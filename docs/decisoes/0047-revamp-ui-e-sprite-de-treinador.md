# 0047 — Revamp de UI (nav/loja/batalha) + retrato do treinador em Kanto

Pedido do dono do projeto: a UI estava "fraca" pra uma das partes mais
importantes do jogo (nav, troca de região, roster, info de ginásio) — ele
mandou referências de clickers (Cookie Clicker) e de telas de batalha
Pokémon DS/3DS, pedindo pra "ir sem medo". Passou por 3 rodadas de
feedback na mesma sessão antes de fechar.

## Repaginação visual — 3 rodadas

1. **1ª tentativa**: recolorir os 4 componentes citados (nav, region-card,
   roster, location-nav) pra uma paleta "Centro Pokémon" clara (azul/
   branco, cantos arredondados). Feedback: "só mudou as cores, não é isso
   que eu quero" — faltava mudar FORMA, não só cor.
2. **2ª tentativa**: virou "menu de batalha" de verdade — cada botão em
   bloco colorido por função (Clicker=vermelho, Time=verde, Pokédex=teal,
   Loja=dourado, Home=azul, Backup=cinza, Admin=vermelho escuro; mesma
   ideia de FIGHT/BAG/POKÉMON/RUN dos jogos), canto cortado em diagonal
   (`clip-path`), borda grossa, sombra dura deslocada. Aplicado primeiro só
   nos 4 componentes originais, depois espalhado pro resto do app (botão
   genérico, pokédex, tela de inicial, banners). Feedback: o card CLARO
   ainda destoava do clima escuro/floresta do resto do jogo.
3. **3ª rodada**: a paleta de CARD (antes `--gba-*` clara) virou escura de
   novo, convergindo pra perto de `--panel-*` — só a FORMA (corte, borda,
   sombra, cabeçalho colorido) é o que ficou da repaginação, não mais
   "card claro vs. card escuro". Nessa mesma leva, as duas áreas que ainda
   faltavam explicitamente citadas ("upgrades" e "batalhas") ganharam a
   linguagem nova: linhas de upgrade da loja com tarja lateral colorida por
   `kind` (cps=teal, xp=verde, globalMultiplier=roxo; affordability agora é
   brilho/saturação, não muda mais a cor de identidade), quadrados de
   upgrade de clique com acento vermelho, e botões de ação da batalha
   (Continuar/Capturar/Pegar Loot/Voltar) como blocos coloridos
   (`.btn-action`, utilitário novo reaproveitável).

Variáveis novas (`--gba-*` pro card, `--pkc-*` pros pares de cor por
função) ficaram deliberadamente separadas de `--panel-*`/`--text-*`
antigas — não é código morto, é abrir espaço pra migrar o resto do app
(QTEs, barras de HP/energia) pra essa linguagem depois sem quebrar nada
que ainda não foi tocado.

## Retrato do treinador humano na batalha (Kanto)

Pedido específico: "um spritezinho do Brock na batalha do Brock". Hoje a
batalha só mostrava o Pokémon, nunca o treinador. Confirmado com o dono do
projeto antes de baixar qualquer arquivo: fonte = Bulbapedia (mesmo
espírito fan-made dos sprites de Pokémon já usados), escopo = só Kanto
primeiro (8 líderes + Elite Four), as outras 4 regiões ficam pra depois.

- 12 sprites baixados (arte oficial "Let's Go Pikachu/Eevee", que a
  Bulbapedia hospeda por treinador) — resolução original vinha
  gigante (até 6MB, 3128×3750px numa arte só); redimensionado via `ffmpeg`
  pra 320px de altura antes de entrar no repo (`frontend/public/trainers/
  kanto/*.png`, 12 arquivos, 18-95KB cada, ~760KB total).
- `GymDefinition`/`EliteFourMember` (content/gen1/gyms.ts,
  content/gen1/eliteFour.ts) ganharam `trainerSprite?: string` opcional —
  content continua sendo só dado, nenhuma lógica nova em `systems/`.
- `BattleScreen.tsx`: resolve o sprite certo por `frozenEncounter.kind`
  ('gym' pega direto de `frozenEncounter.gym.trainerSprite`; 'elite-four'
  casa `currentTrainerProgress(battle).name` contra `regionDef.eliteFour`
  pra achar QUEM está lutando agora, já que ginásio não usa
  `trainerBoundaries` — só a sequência de Elite Four usa). Renderizado
  como um retrato pequeno (64px) no canto superior-esquerdo do Pokémon
  inimigo, sem `image-rendering: pixelated` (é arte colorida moderna, não
  pixel art) — nunca compete de tamanho com o sprite do Pokémon.

## Verificação

`tsc -b --noEmit` limpo, `oxlint` limpo. Suíte inteira: 335/335 (sem
mudança de contagem — é tudo CSS/JSX/conteúdo estático, nenhum teste novo
necessário). Testado ao vivo no navegador via `npm run dev`: nav, seleção
de região, roster, linha de upgrade e uma luta real contra o Brock (Pewter
City) confirmando o retrato aparecendo certo.

## O que ainda falta

- Retrato de treinador só existe pra Kanto — Johto/Hoenn/Sinnoh/Kalos
  ficam pra uma leva futura, mesmo processo (Bulbapedia, Let's Go quando
  existir sprite equivalente, senão outra fonte a confirmar).
- QTEs e barras de HP/energia continuam com a paleta antiga
  (`--panel-*`/`--accent-yellow`) por design nesta rodada — são widgets
  densos/funcionais, não cartões de menu; migrar isso pra `--gba-*` é
  decisão em aberto, não pedida ainda.
- Nenhum novo teste automatizado cobre `trainerSprite` (é conteúdo
  estático opcional, mesmo padrão de `background` em `LocationDefinition`,
  que também não tem teste dedicado).
