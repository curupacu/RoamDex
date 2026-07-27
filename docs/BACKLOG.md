# Backlog — bugs e ideias pra próxima sessão

> Registrado em 2026-07-25 pelo dono do projeto, depois de testar o Sprint 20
> (rotas + 8 ginásios) ao vivo.

## Sprint 24 (Gen 2 completa) — pronto e playtestado em 2026-07-26

Johto está implementado (39 localizações, 8 ginásios, Elite Four + Campeão,
pipeline `build:gen2`) — ver `docs/decisoes/0025-sprint24-gen2.md` pro
detalhe completo. **Playtest manual básico confirmado pelo dono do
projeto**: login → seleção de região → Johto → fluxo funcionando, fundos e
sprites carregando certo, encontros selvagens batendo com a rota (o susto
inicial com Metapod/Graveler era comportamento correto — ambos aparecem
selvagens de verdade nessas rotas em Gold, sem bug). Ainda em aberto, sem
dado de playtest suficiente pra fechar de vez:

1. `LEVEL_BUMP` do Elite Four/Campeão de Johto — revisado via simulação em
   2026-07-27 (`docs/decisoes/0034-*.md`): baixado de 25 pra 18, mas o
   Elite Four de Johto ainda pede bem mais folga de nível que o de Kanto
   pra vencer (times com evoluções exclusivas de Gen II, tipo Crobat/
   Steelix, têm stats base mais altos que qualquer "equivalente" de Gen I
   na mesma posição). Baixar só o número não resolveu — continua
   precisando de uma comparação Pokémon-por-Pokémon de verdade.
2. A curva de `unlockAt` das 39 localizações — simulação (2026-07-27,
   `docs/decisoes/0034-*.md`) achou que o doce nunca é o gargalo real em
   NENHUMA das duas regiões (quem trava é o nível/insígnia do ginásio), e
   por isso não mexeu nela. Considerado não-problema por enquanto.
3. Algumas tabelas de encontro selvagem de Johto (rotas com muita divisão
   manhã/dia/noite, e a tabela de Victory Road) passaram por normalização
   manual mais pesada na pesquisa — `docs/ROTAS-JOHTO.md` já marca quais
   merecem conferência contra a fonte antes de tratar como definitivas.
   Duas rotas que travavam de vez o avanço (Rota 22 de Kanto e Rota 46 de
   Johto, níveis baixos demais pra posição delas na trilha linear) foram
   corrigidas em 2026-07-27 (`docs/decisoes/0034-*.md`) — o resto da
   normalização pesada continua sem conferência.

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

## Upgrades genéricos demais — todos os 4 padrões entregues em 2026-07-27

Os upgrades atuais (`content/gen1/upgrades.ts`) eram só "+N doces/clique" e
"+N CPS" — o dono do projeto queria algo com mais personalidade, estilo
Cookie Clicker. Pesquisa em
[`docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md`](PESQUISA-UPGRADES-COOKIE-CLICKER.md)
(2026-07-25) mapeou 4 padrões, todos implementados agora:
- **Padrão 2 (cadeia de tier)**: `docs/decisoes/0026-cadeia-de-tier-upgrades.md`
  — 3 upgrades de compra única por eixo (clique/CPS), terminando num tier
  que escala com Pokémon capturados no roster.
- **Padrão 3 (sinergia) e Padrão 4 (marco global)**:
  `docs/decisoes/0035-upgrades-sinergia-e-marco-global.md` — upgrade que
  exige N cópias de outro + um tipo no time ativo, e multiplicador global
  desbloqueado por `save.badges.length`.

Custos/efeitos dos upgrades de Padrão 2/3/4 seguem a mesma faixa de
grandeza dos tiers vizinhos, sem simulação dedicada (diferente dos achados
numéricos da 0034, que passaram por `tests/simulations/`) — se algum
parecer desbalanceado no playtest, é candidato a uma futura rodada de
medição.

## Ideias de feature / polish (não priorizadas ainda)

- **Animações**: de evolução ✅ (`docs/decisoes/0036-*.md`), de captura
  (arremesso + balanço da bola) e de início de batalha ✅
  (`docs/decisoes/0037-*.md`, 2026-07-27) — as três feitas.
- **Time do treinador do ginásio visível durante a luta**: pokébolas
  pequenas no canto mostrando quantos Pokémon ele tem e quantos já
  caíram (como nos jogos oficiais), + sprite do treinador (verificar se a
  PokeAPI/repositório de sprites tem sprite de treinador antes de assumir
  que dá — pode não ter, é mais focado em Pokémon que em treinador).
- **Catch rate precisa de ajuste** — mecanismo atual
  (`systems/capture/capture.ts`, usa `captureRate` cru da API +
  `captureChance` do time) não está satisfazendo no playtest; rever a
  fórmula. Revisado via simulação em 2026-07-27 (`docs/decisoes/0034-*.md`):
  os números crus pareceram razoáveis (comum ~95%, raríssimo ~10% com a
  melhor bola) — não mudou a fórmula. Suspeita é que a queixa original era
  mais sobre falta de feedback (não dava pra ver a chance antes de
  arriscar) do que a matemática em si; o HUD de captura do sistema de
  Pokébolas (sessão anterior) já mostra a % de cada bola antes do
  arremesso, vale reavaliar essa queixa depois de testar com isso.
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
