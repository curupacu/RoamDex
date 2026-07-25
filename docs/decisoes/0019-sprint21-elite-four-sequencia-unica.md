# 0019 — Elite Four como uma única batalha contínua, sem novo estado no save

## Contexto
Sprint 21 do roadmap: os 4 membros da Elite Four (Lorelei, Bruno, Agatha,
Lance) + Campeão em sequência, com cura parcial (50%) entre as lutas,
desbloqueada com as 8 insígnias + marco final de doces acumulados. Times já
pesquisados em `docs/ROTAS-KANTO.md` (Bulbapedia).

## Decisão
- **A sequência inteira (~26 Pokémon) é UM `BattleState`/mount de
  `BattleScreen`**, generalizando o `enemyTeam`/`enemyIndex` que já existe
  desde o Sprint 20 pra times de ginásio. `EnemyRosterEntry` ganhou
  `trainerName?: string`, marcado só no primeiro Pokémon de cada
  treinador — sua presença já serve de "isso é uma fronteira entre
  treinadores" e de nome pra exibir, sem precisar de uma segunda estrutura
  paralela. `createBattle` computa `trainerBoundaries: Record<number,
  string>` uma vez, a partir disso.
- **Cura de 50% só acontece ao cruzar uma fronteira**, nunca dentro do time
  do mesmo treinador (que continua sem cura, como hoje). A condição
  original que eu ia usar ("o índice atual é uma fronteira → cura") tinha
  um bug pego em revisão de design: isso curaria em CADA tap contra o
  Pokémon de abertura de um treinador, não só na troca. A condição certa
  exige que o hit tenha **matado** o Pokémon ativo E que o novo índice seja
  uma fronteira — só na transição de fato.
- **Zero campos novos em `SaveData`.** O HP/posição da sequência inteira é
  efêmero, do mesmo jeito que já é hoje pra qualquer batalha (um refresh no
  meio de uma luta de ginásio já reinicia a tentativa — isso não muda pra
  Elite Four). "Perdeu → sai, tenta de novo quando quiser" emerge sozinho
  disso, sem máquina de estado nova.
- **Vitória não mexe no save.** A cutscene, o registro na Victory Road e o
  botão de rebirth são Sprint 22 (roadmap seção 8) — este sprint só entrega
  a sequência em si: perder e tentar de novo, ou vencer e ver uma tela.
- **Time do Campeão resolvido a partir do roster**, não do time ativo —
  varre `save.roster` (não `activeTeamIds`) porque não existe função de
  remover Pokémon do roster no jogo, então o starter escolhido continua lá
  mesmo banido do time ativo. Resolvido via `evolutionChain` (o passo
  `trigger: 'initial'` de qualquer estágio da linha dá o id raiz), com
  fallback defensivo pro time do Bulbasaur (caminho inalcançável na
  prática — não tem como o starter não estar no roster depois do
  new-game).
- **Gate de disponibilidade só por localização.** O botão "Desafiar a Elite
  Four" aparece quando `currentLocationId === 'victory-road'`, sem
  reconferir insígnias/doces ali — o gate de `canTravelTo`
  (`systems/gyms/locations.ts`, já exige a insígnia da localização atual
  pra avançar) é a fonte única de verdade de "dá pra estar aqui", mesmo
  modelo de confiança que o botão de ginásio já usa (`gym &&
  <button>`, sem reconferir nada). Registrado aqui pra um futuro
  admin/teleporte não quebrar essa invariante silenciosamente.

## Escopo desta entrega
Só a sequência de batalha + gate + telas de vitória/derrota. Rebirth,
Victory Road e a moeda de Insígnias da Loja de Rebirth ficam pro Sprint 22
e 23.
