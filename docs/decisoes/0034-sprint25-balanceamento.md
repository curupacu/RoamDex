# 0034 — Sprint 25: Balanceamento (primeira rodada, via simulação)

Pedido direto do dono do projeto: "não acho que esteja balanceado... balanceie
tudo... jogue o jogo inteiro e teste... demore o tempo que precisar". Em vez
de só ajustar números no chute, montei simulações de verdade em
`tests/simulations/` (reaproveitando o código real de `systems/`/`content/`,
nunca reimplementando fórmula nenhuma) pra medir o jogo em vez de adivinhar.
Isso mudou o diagnóstico logo de cara — o problema real não era onde eu
esperava.

## Infraestrutura nova

- `tests/simulations/` (a pasta que o README já citava, mas só tinha um
  `.gitkeep`) agora roda de verdade — `frontend/vite.config.ts` ganhou
  `server.fs.allow: ['..']` (o sandbox do Vite bloqueia servir arquivo de
  fora da raiz por padrão) e `test.include` apontando pra lá também.
- `economySim.ts`/`progressionSim.ts`/`battleSim.ts`: harnesses que reusam
  `systems/economy/*`, `systems/team/leveling.ts` e o motor de batalha real
  (`createBattle`/`applyPlayerTap`/`applyEnemyAttack`/`resolveQteAttack`) —
  simulam um comprador guloso (sempre compra o upgrade de melhor
  doces-por-segundo-equivalente afordável) e uma luta de verdade taps por
  tap, não uma fórmula à parte.
- `systems/battle/engine.ts` passou a exportar `calculateDamage` (só pra
  simulação reusar — sem isso teria que reimplementar a fórmula).

## Achado #1 — o doce nunca foi o gargalo (e por isso não mexi nele)

Rodando só a economia (`economy.sim.test.ts`): com só 2 cliques/s, Kanto
inteiro (Pallet → Victory Road, curva de `unlockAt` de 0 a 525.000) libera
em **~13 minutos**. Cheguei a tentar subir a curva de custo dos upgrades
(1.15 → 1.22) — quase não mudou nada, porque a bola de neve
compra-mais-CPS-compra-mais-rápido-o-próximo domina rápido demais pra
qualquer ajuste modesto no expoente segurar.

Isso poderia parecer um problema, mas `canTravelTo` (`systems/gyms/
locations.ts`) exige DUAS coisas pra avançar por uma cidade de ginásio: doce
E a insígnia. O doce nunca é o gargalo de verdade — quem trava é o nível do
time pro ginásio. **Não mexi nos custos/efeitos de upgrade nem na curva de
`unlockAt`** — validado que isso não cria parede nenhuma, só significa que o
doce vira decorativo cedo (o que já é meio o espírito do roadmap: "gastar
aqui é decisão de otimização sem culpa").

## Achado #2 — XP de batalha era praticamente decorativo (esse sim, corrigido)

Com XP de batalha FIXO (`BATTLE_XP_TEAM`/`BATTLE_XP_ACTIVE_BONUS` = 15/15,
como estava desde o Sprint 13), simulando só batalha (sem Treinamento idle)
o Kanto levava **68+ horas** só pra juntar XP suficiente pro Giovanni — a
curva de XP (`xpForNextLevel` ~nível^1.8) cresce muito mais rápido que
qualquer fonte fixa de XP consegue acompanhar. Achado em
`progression.sim.test.ts`.

**Fix:** XP de batalha agora escala com o nível do time inimigo que acabou
de cair, mesmo espírito do loot de doces (`BASE_LOOT_CANDIES + enemyLevel *
LOOT_CANDIES_PER_LEVEL`, que já existia). `content/battle.ts`'s
`battleXpForVictory(enemyLevel)`: time ganha `enemyLevel × 2`, o ativo ganha
mais `enemyLevel × 2` (total `enemyLevel × 4`). `BattleScreen.tsx` calcula o
nível médio do time inimigo que caiu e manda pro `onVictory`; `App.tsx`'s
`handleVictory` usa isso em vez da constante fixa. Ginásios (com vários
Pokémon) agora rendem mais XP que um selvagem comum só por serem mais
fortes, sem precisar reestruturar pra "XP por Pokémon derrotado dentro da
luta" (continua um grant só por vitória).

Com o fix: Kanto com Treinamento+batalha chega no Giovanni em ~2.8h e no
Elite Four em ~7.2h; só-batalha (sem nenhum Treinamento comprado) chega no
Giovanni em ~25h. Números em `progression.sim.test.ts`'s saída de console.

## Achado #3 — duas rotas quebravam o "voltar pra treinar" no fim do jogo

`canTravelTo` permite voltar um passo de graça a qualquer momento — é assim
que um jogador preso numa cidade de ginásio (sem grama, `encounters: []`)
treina: volta pra rota anterior. A simulação achou que **Rota 22 (Kanto,
`unlockAt` 465.000) e Rota 46 (Johto, `unlockAt` 490.000)** tinham só
Pokémon nível 2-5 — corretos pro jogo original (as duas são "rotas de
volta" que conectam perto do começo do mapa nos jogos de verdade), mas
aqui, numa trilha estritamente linear, elas caem bem antes do ÚLTIMO
ginásio de cada região (Giovanni nível médio 45, Clair nível médio 38).
Resultado: preso ali, o jogador nunca ganha XP suficiente pra continuar —
**Johto especificamente NUNCA alcançava o Elite Four em 50h simuladas de
só-batalha** (achado concreto, não estimativa).

**Fix:** os níveis das duas rotas foram ajustados pra ficar entre as rotas
vizinhas (mesmas espécies pesquisadas, só o nível mudou — Rota 22: 2-5 →
24-29; Rota 46: 2-3 → 26-31). Depois do fix, Johto só-batalha alcança Clair
em 15.4h e o Elite Four em 41.5h (antes: nunca). Isso é uma correção pontual
nos dois piores casos — `docs/decisoes/0025-*.md` já avisava que as tabelas
de selvagem de Johto "passaram por normalização manual mais pesada... vale
conferência" — o problema é mais amplo que essas duas rotas, só que essas
duas eram as únicas que travavam de vez.

## Achado #4 — Elite Four de Johto pede muito mais folga de nível que o de Kanto

`battle.sim.test.ts` testa os 8 ginásios de cada região com um time de
verdade (os 3 iniciais evoluídos até o estágio que o nível permite — testar
com Rattata como "referência neutra" foi minha primeira tentativa e um erro
de método, ver comentário no arquivo: Rattata é deliberadamente um dos
Pokémon mais fracos do jogo, perde pra qualquer evoluído de verdade mesmo
no mesmo nível só por causa dos stats base). **Os 8 ginásios das duas
regiões são vencíveis no próprio nível médio do time**, com boa margem de
HP restante — isso ficou como asserção de regressão real
(`expect(result.outcome).toBe('victory')`).

O Elite Four é DESIGN pra perder na primeira vez (roadmap seção 8) — Kanto
(já calibrado por playtest real, `LEVEL_BUMP=12`) precisa de **+8 níveis**
de folga acima do nível médio do time inimigo pra vencer. Johto precisava
de **+20** com o `LEVEL_BUMP=25` original — quase 3× mais. Tentei baixar só
o `LEVEL_BUMP` (25→15) e a folga necessária NÃO mudou (continuou +20) —
sinal de que o problema não é o nível em si, é a composição do time:
Crobat/Steelix/Forretress são evoluções exclusivas da Gen II, com stats
base mais altos que qualquer "equivalente" de Gen I na mesma posição da
sequência. Baixei `LEVEL_BUMP` pra **18** mesmo assim (reduz o piso
absoluto, não piora nada) e deixei uma asserção de regressão mais frouxa
(vence com +20 de folga, não trava pra sempre) — **mas isso continua em
aberto pra uma rodada de balanceamento dedicada, Pokémon por Pokémon**,
igual as duas rodadas reais que o Elite Four de Kanto já teve
(`docs/BACKLOG.md`).

## Achado #5 — chance de captura: revisada, não mudada

`capture.sim.test.ts` tabula `captureChance` pra captureRate comum/incomum/
raro/raríssimo × as 3 bolas × bônus de Fada. Os números pareceram
razoáveis (comum sempre fácil ~95%, raríssimo mesmo com Ultra Ball fica em
~10% — difícil mas não impossível, e falhar só custa "o Pokémon foge", não
uma penalidade maior). O `docs/BACKLOG.md` já registrava "catch rate
precisa de ajuste... não está satisfazendo no playtest" — sem mais detalhe
do que especificamente incomodava, e a matemática crua não pareceu quebrada,
não mudei a fórmula. Provável que a queixa original fosse mais sobre falta
de feedback (não dava pra ver a chance antes de arriscar) do que a fórmula
em si — o HUD de captura (sessão anterior, sistema de Pokébolas) já mostra
a % exata de cada bola antes do arremesso, o que deve ajudar bastante nisso
sozinho.

## Achado #6 — upgrades "lendários" (escalam com roster) e o gap clique×CPS
(adicionado depois de uma pergunta direta do dono do projeto)

Nenhuma das simulações acima simula captura de verdade — `roster` fica
sempre vazio, então um upgrade com `scalesWith: 'rosterSize'` nunca
aparecia como problema ali. O dono do projeto perguntou diretamente se
"Fúria do Ho-Oh"/"Fábrica do Lugia" (e os equivalentes de Kanto, Mewtwo/
Zapdos) eram inúteis, e se o clique rendia muito mais que investir em CPS
— as duas suspeitas bateram, e ganharam checagem própria em
`upgraderoi.sim.test.ts` (efeito-por-doce-gasto de cada upgrade, sem
precisar simular uma run inteira):

- **Upgrades lendários eram inviáveis de verdade**: pra só EMPATAR (não
  superar) em eficiência com o tier anterior, "Fúria do Mewtwo"/"Ho-Oh"
  precisava de **131 Pokémon no roster** — mais que o dex inteiro de
  Kanto (151 espécies). Efeito subido de 8→50 doces/clique por Pokémon
  (agora precisa de ~21 pra empatar); "Fábrica do Zapdos"/"Lugia" de
  1.2→12 CPS por Pokémon (agora ~36.5, ainda generoso mas alcançável).
- **Clique rendia ~15x mais por doce gasto que CPS** na mesma posição de
  tier (ex.: Dedos Ligeiros 0.1 efeito/doce vs Ajudante Voluntário
  0.0067) — mesmo contando que CPS também rende offline/sem esforço
  (o que essa conta não captura), o gap era exagerado demais pra CPS
  parecer uma escolha de verdade pra quem joga ativo. Efeitos de CPS
  (as 6 unidades infinitas: Ajudante Voluntário → Rede de Postos, e as
  equivalentes de Johto) multiplicados por ~3x — gap ficou entre 1.9x e
  5x conforme o tier, favorecendo clique pra quem joga ativo sem fazer
  CPS parecer desperdício.

Ambos ganharam teste de regressão real (`expect(...).toBeLessThan(...)`),
não só diagnóstico.

## Verificação

254 testes (todos os anteriores + os novos de `tests/simulations/`,
incluindo o achado #6), `tsc -b` e `oxlint` limpos. Testado no navegador com
o save real existente: sem erros de console, dados carregando certo com o
schema novo.

## Em aberto pra uma próxima rodada

1. ~~**Elite Four de Johto** pede desproporcionalmente mais folga de nível
   que o de Kanto~~ — causa raiz achada e corrigida (decisão 0038): não era
   nenhum dos 4 membros do Elite Four, era só o time do Campeão (Lance),
   com 3 Dragonite cheios sem cura entre si.
2. ~~As tabelas de selvagem de Johto com divisão manhã/dia/noite~~ —
   conferidas (decisão 0039): 3 achados reais corrigidos (Rota 42 faltava
   3 linhas noturnas, Rota 43 faltava Girafarig, Rota 45 faltava Donphan).
   Victory Road e Rotas 26/27/38/39 continuam sem confiança suficiente pra
   mexer (ferramenta de fetch mostrou sinais de erro nessas — ver 0039).
3. ~~`docs/BACKLOG.md`'s pendências de upgrade (Padrão 3 sinergia, Padrão 4
   marco global)~~ — implementados, ver `docs/decisoes/0035-*.md`. O
   `catch rate` (revisado aqui, sem mudança) continua como estava.
