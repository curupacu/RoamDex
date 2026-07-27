# 0033 — Sistema de Pokébolas + fixes de sync + reskin visual

Sessão só de Claude (sem sprint numerado formal), motivada por feedback
direto do dono do projeto testando o app: dois bugs de sincronização achados
numa revisão de código pedida, e uma leva de pedidos visuais + a primeira
metade do sistema de captura (bolas — a animação em si e o resto da
personalidade de captura ficam pra continuar depois).

## Bugs corrigidos

1. **`lastSavedAt` nunca avançava durante a sessão.** `App.tsx`'s `persist()`
   chamava `writeSave(saveRef.current)` (que grava a versão com timestamp
   fresco só no localStorage) e depois mandava `saveRef.current` — o valor
   ANTIGO, nunca atualizado — pro `pushCloudSave`. Resultado: a nuvem
   recebia sempre o mesmo `lastSavedAt` da carga da sessão, quebrando a
   comparação "última escrita vence" do `resolveSync` (risco real de perder
   progresso ao trocar de aparelho). Fix: `writeSave` agora retorna o objeto
   gravado (`engine/save.ts`), e `persist()` usa esse retorno pros dois
   lados.
2. **Regras do Firestore rejeitavam toda escrita.** `isValidSave` exigia um
   campo `candies` na raiz do documento — que não existe mais desde a
   multi-região (decisão 0022), migrado pra dentro de `regions.kanto.candies`.
   Toda sincronização na nuvem falhava com "Missing or insufficient
   permissions" silenciosamente. Fix no arquivo (`backend/firestore/
   firestore.rules`), validando o formato atual (`regions`, `insignias`,
   etc.). **Ainda não publicado** — precisa ser colado no Firebase Console
   (Firestore → Regras) ou de um `firebase deploy` (não há `firebase.json`/
   `.firebaserc` neste repo ainda).

## Reskin visual (pedido do dono do projeto)

- **Hover card** (`ui/components/UpgradeCard.tsx`) substitui o `title`
  nativo em toda a UI de upgrades/loja: nome, efeito, flavor e — novidade —
  **quanto aquele upgrade específico já rendeu no total** (`RegionSave.
  upgradeEarnings`, save v11→v12, alimentado a cada clique/tick de CPS/XP
  e também no cálculo de doces offline). Achado no meio do caminho:
  `.upgrades-panel li` tinha `overflow: hidden` que cortava o card por cima
  — removido.
- Ícones de upgrade/loja aumentados (grid de clique 58→74px, ícones da
  loja/upgrades 64→80px; coluna lateral do `.game-area` alargada de 320px
  pra 380px pra caber).
- Tema roxo → marrom: `--panel-border` (#6a4fc0 → #8a5a2b), a cor de borda
  usada em praticamente todo card/botão do jogo.
- Nav: botão "Regiões" virou "Home" — agora volta pro Menu (`HomeScreen`,
  onde tem o card "História"), não pula direto pra seleção de região.
- Animação de flutuar dos sprites da cena central (`UpgradeScene`) removida
  a pedido — ficava "flutuandinho" de um jeito que incomodava.

## Sistema de Pokébolas (primeira metade — a animação de arremesso é o
próximo passo combinado com o dono do projeto)

- **3 bolas** (`content/pokeballs.ts`): Pokébola (infinita, base,
  `catchMultiplier: 1`), Great Ball (x1.5, 300 doces, `lootWeight: 4`),
  Ultra Ball (x2, 1200 doces, `lootWeight: 1` — mais rara que a Great Ball
  tanto pra comprar quanto pro loot, como pedido). Números provisórios,
  mesmo tratamento de todo o resto da economia do jogo.
- `RegionSave.pokeballs: Record<string, number>` (save v12→v13) — só as
  bolas finitas são contadas; a Pokébola base nunca aparece aí. Reseta no
  rebirth, mesma lógica de `upgrades`.
- `systems/capture/pokeballs.ts`: `buyBall`/`spendBall` (nomeada assim, não
  `useBall` — colidia com a regra de lint `react-hooks/rules-of-hooks` por
  causa do prefixo `use`), `captureOptions` (uma linha por bola com
  quantidade e chance calculada pra aquele Pokémon específico) e
  `rollLootBall` (sorteio ponderado pelo `lootWeight`).
- `systems/capture/loot.ts`: `rollLoot` ganhou uma terceira saída
  (`kind: 'pokeball'`), checada depois do upgrade e antes de doces — cada
  `if` já consome uma tentativa própria de `Math.random()`, mesmo
  tratamento provisório dos outros números daqui.
- **HUD de captura** (`BattleScreen.tsx`): "Capturar" agora abre um menu
  listando cada bola (nome, quantidade ou `∞`, chance de captura já
  calculada pra este encontro) antes de jogar — pedido explícito do dono
  do projeto ("aparece um hudzinho que você escolhe"). Bola gastar-se no
  arremesso, acerte ou erre — só a Pokébola normal nunca acaba. A "segunda
  chance" da Loja de Rebirth (`hasCaptureRetry`) continua re-rolando com a
  MESMA bola, não gasta uma segunda.
- **Animação de captura** (`BattleScreen.tsx` + `index.css`): o resultado já
  foi decidido e aplicado no momento em que a bola é escolhida
  (`onCapture` roda na hora) — a animação só atrasa QUANDO o texto de
  resultado aparece: bola desenhada em CSS puro (sem asset novo, círculo
  vermelho/branco com faixa preta) é arremessada de baixo pra cima
  (~0.5s), o selvagem "é sugado" pra dentro dela (fade + scale-down), ela
  balança 3x pra dar suspense (~1.5s), e só então o "Capturado!"/"fugiu"
  aparece.
- **Loja de Doces** (`CandyShopScreen.tsx`): nova seção "Pokébolas" pra
  comprar Great/Ultra Ball, mesmo tratamento visual (hover card) do resto.

## Verificação

`tsc -b`, `oxlint` e a suíte inteira (223 testes, incluindo os novos
`systems/capture/pokeballs.test.ts` e os ajustes em `loot.test.ts`/
`save.test.ts` pro novo passo de migração) passam limpos. Testado no
navegador de ponta a ponta: compra de bola na loja, HUD de captura com
chance por bola, animação (arremesso → sumiço → balanço → resultado),
loot dropando bola. Regra do Firestore só corrigida no arquivo — falta
publicar de verdade (ver seção de bugs acima).

## Em aberto

- Publicar as regras do Firestore corrigidas.
- `docs/BACKLOG.md`'s "catch rate precisa de ajuste" continua valendo —
  os multiplicadores das bolas são só mais um fator na mesma fórmula que já
  estava sinalizada como precisando de revisão.
- Preços/multiplicadores das bolas e chance de drop no loot são chute
  redondo, sem simulação — mesmo aviso de sempre pro Sprint 25.
