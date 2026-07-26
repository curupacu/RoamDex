# Backlog — bugs e ideias pra próxima sessão

> Registrado em 2026-07-25 pelo dono do projeto, depois de testar o Sprint 20
> (rotas + 8 ginásios) ao vivo.

## Bugs encontrados no playtest — corrigidos em 2026-07-25

1. ~~QTE do golpe especial "buga" ao aparecer.~~ **Corrigido.** Causa raiz:
   `DarkQte.tsx`/`PoisonQte.tsx` sorteavam a posição do alvo dentro do
   `useEffect` via `setState`, então o alvo só aparecia (e "pulava" para a
   posição sorteada) um render depois do modal já estar na tela. Trocado
   por inicializador preguiçoso do `useState` (`useState(() => ...)`), que
   fixa a posição já no primeiro render.
2. ~~O ataque às vezes reseta o cooldown de ataque do inimigo (exploit).~~
   **Corrigido.** `BattleScreen.tsx` dava um reset completo de
   `ENEMY_ATTACK_INTERVAL_MS` toda vez que um QTE terminava — encadear QTEs
   sem parar mantinha o inimigo parado pra sempre. Agora só garante um piso
   de `TELEGRAPH_WINDOW_MS` de reação (`Math.max`), sem restartar o timer
   inteiro.
3. ~~Dá pra avançar de rota/ginásio sem ter vencido o ginásio anterior.~~
   **Corrigido.** `canTravelTo` (`systems/gyms/locations.ts`) agora também
   checa `hasBadge` do ginásio da localização atual (se houver) antes de
   liberar o próximo passo — o gate de doces continua valendo do mesmo
   jeito pras rotas sem ginásio.

## Balanceamento — ajustes provisórios em 2026-07-25 (fora do Sprint 25 oficial, a pedido do dono)

- **Nível quase não importava.** `STAT_GROWTH_PER_LEVEL` (`systems/team/stats.ts`)
  estava em 0.03 (3%/nível) — nível 25 tinha só ~1.5x os status de nível 5,
  então um Bulbasaur nv5 arrasava o Lt. Surge (nv 18-24). Subido pra 0.1.
- **Ritmo de ataque do inimigo muito mais lento que o do jogador.** Tap do
  jogador não tem cooldown nenhum (limitado só pela velocidade de clique) e
  enche energia pra ulta a cada ~4 taps, enquanto o inimigo só atacava a
  cada 3s fixos (`ENEMY_ATTACK_INTERVAL_MS`, `content/battle.ts`) — na
  prática o jogador emendava ultas toda hora enquanto o inimigo "batia
  raramente e fraco". `ENEMY_ATTACK_INTERVAL_MS` 3000→1500 e
  `TELEGRAPH_WINDOW_MS` 800→500, pra deixar o ritmo do inimigo mais
  próximo do ritmo natural de tap/ulta do jogador.
- Ambos continuam **provisórios** — o Sprint 25 formal ("Balanceamento") é
  quem faz o ajuste fino de verdade com dados de simulação
  (`tests/simulations/`). Vale o dono do projeto validar em jogo se o Lt.
  Surge (e os ginásios seguintes) ficaram desafiadores sem virar parede
  intransponível.

## Balanceamento — round 2 (Sprint 21, playtest da Elite Four)

- **Selvagens ainda raros demais.** `BASE_SPAWN_INTERVAL_MS`
  (`systems/capture/wildEncounter.ts`) 45s→25s.
- **Elite Four/Campeão sem ameaça real** — um Dragonite nv67 sozinho não
  passou nem perto de meia vida na sequência inteira (26 Pokémon, 4 curas de
  50% entre treinadores). Os níveis de `docs/ROTAS-KANTO.md` são os do jogo
  original (RPG de save único) — o próprio doc já avisa que são "referência
  de proporção, não número absoluto" pro ritmo idle. `content/gen1/eliteFour.ts`
  ganhou um `LEVEL_BUMP = 12` aplicado em cima de todo nível pesquisado
  (números da Bulbapedia continuam visíveis no código, só somados). Só afeta
  Elite Four/Campeão — ginásios normais não mudaram, sem relato de estarem
  fracos.
- Continua tudo **provisório** — é um ajuste redondo, não calibrado por
  simulação; o dono do projeto precisa confirmar se o Dragonite (ou outro
  time forte) agora sente a sequência como "difícil de verdade, dá pra
  perder" em vez de "parede" ou ainda "fácil demais" — pode precisar de
  outra rodada pra qualquer um dos dois lados.

## Upgrades genéricos demais

Os upgrades atuais (`content/gen1/upgrades.ts`) são só "+N doces/clique" e
"+N CPS" — o dono do projeto quer algo com mais personalidade, no estilo
Cookie Clicker (upgrades com efeitos variados/inusitados, não só
multiplicador linear). Preciso de uma sessão de brainstorm de conteúdo
antes de codar isso — não é só "adicionar mais linhas na tabela".
**Pesquisa de como o Cookie Clicker estrutura isso:**
[`docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md`](PESQUISA-UPGRADES-COOKIE-CLICKER.md)
(2026-07-25) — 4 padrões identificados (building empilhável, cadeia de
upgrade de compra única por tier, sinergia entre dois sistemas, marco
global) e ideias iniciais de como mapear pro que o RoamDex já tem.

## Ideias de feature / polish (não priorizadas ainda)

- **Animações**: de evolução, de início de batalha, de captura (hoje tudo é
  instantâneo/estático).
- **Time do treinador do ginásio visível durante a luta**: pokébolas
  pequenas no canto mostrando quantos Pokémon ele tem e quantos já
  caíram (como nos jogos oficiais), + sprite do treinador (verificar se a
  PokeAPI/repositório de sprites tem sprite de treinador antes de assumir
  que dá — pode não ter, é mais focado em Pokémon que em treinador).
- **Catch rate precisa de ajuste** — mecanismo atual
  (`systems/capture/capture.ts`, usa `captureRate` cru da API +
  `captureChance` do time) não está satisfazendo no playtest; rever a
  fórmula.
- **Pokébolas diferentes** com bônus de captura diferentes (Great Ball,
  Ultra Ball etc.) — hoje só existe "jogar Pokébola", sem escolha.
- ~~**Fundo muda conforme o lugar** (rota vs caverna vs cidade etc.)~~
  **Feito em 2026-07-26.** Cada uma das 39 localizações de Kanto agora
  declara seu próprio `background` (`content/gen1/locations.ts`); o CSS
  troca via custom property quando `currentLocation` muda. Ver
  `docs/decisoes/0024-*.md`.
- **Mecânica de batalha nova, tipo "dano compartilhado periódico"**: ideia
  solta do dono do projeto — a cada ~3s os dois Pokémon (jogador e inimigo)
  levam uns 20 de dano cada, ou algo parecido. Precisa de bastante desenho
  antes de virar código (não é uma decisão de número, é uma mecânica nova).
- **Bônus de dano por tipo/terreno** (ex.: "na água, ataques de água dão
  mais dano") — ideia mencionada meio solta na conversa, não ficou claro se
  é elemento do cenário (rota aquática = terreno d'água) ou outra coisa.
  **Alinhar com o dono do projeto antes de implementar** — como está, é
  parecido mas não é a mesma coisa que a efetividade de tipo que já existe
  (`content/typeEffectiveness.ts`), então vale confirmar o que ele quer
  além disso.
