# Backlog — bugs e ideias pra próxima sessão

> Registrado em 2026-07-25 pelo dono do projeto, depois de testar o Sprint 20
> (rotas + 8 ginásios) ao vivo. Nada disto foi implementado ainda — é ponto
> de partida da próxima sessão, alinhar prioridade antes de codar.

## Bugs encontrados no playtest

1. **QTE do golpe especial "buga" ao aparecer.** O card do golpe especial dá
   uma "flicada" (pisca) quando surge, e isso às vezes faz o jogador errar o
   ataque sem ter feito nada de errado — parece bug de render/timing, não
   dificuldade de verdade. Investigar `ui/components/qte/QteModal.tsx` e o
   componente do tipo específico onde acontece.
2. **O ataque às vezes reseta o cooldown de ataque do inimigo.** Some com o
   timer do próximo golpe inimigo (`ENEMY_ATTACK_INTERVAL_MS` em
   `content/battle.ts`, controlado em `BattleScreen.tsx`). Isso é
   **explorável**: sendo rápido o suficiente, dá pra vencer qualquer
   batalha (inclusive ginásio) com um Bulbasaur nível 1, porque o inimigo
   nunca chega a atacar de volta. Prioridade alta — é um exploit, não só um
   incômodo visual.
3. **Dá pra avançar de rota/ginásio sem ter vencido o ginásio anterior.**
   `systems/gyms/locations.ts` (`canTravelTo`) hoje só checa
   `lifetimeCandies` acumulado contra `unlockAt` — não checa
   `hasBadge(save, gymId)` da localização anterior. Precisa: só liberar a
   travessia pra além de uma cidade com ginásio se a insígnia daquele
   ginásio já tiver sido conquistada (além do gate de doces, que continua
   valendo pras rotas sem ginásio).

## Upgrades genéricos demais

Os upgrades atuais (`content/gen1/upgrades.ts`) são só "+N doces/clique" e
"+N CPS" — o dono do projeto quer algo com mais personalidade, no estilo
Cookie Clicker (upgrades com efeitos variados/inusitados, não só
multiplicador linear). Preciso de uma sessão de brainstorm de conteúdo
antes de codar isso — não é só "adicionar mais linhas na tabela".

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
- **Fundo muda conforme o lugar** (rota vs caverna vs cidade etc.) — já tem
  sugestões catalogadas por área em `docs/ROTAS-KANTO.md`; hoje o jogo usa
  um fundo único fixo (decisão deliberada do Sprint 20, ver
  `docs/decisoes/0017-*.md`) — isso vira a próxima etapa dessa frente.
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
