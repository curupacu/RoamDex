# 0012 — Sprint 18: encontros selvagens

Implementa a seção 5 do roadmap ao pé da letra nos números que ela já dá
(90s base, 20s pra ignorar) e provisório no que não especifica (curva de
nível, cortes de raridade por `captureRate`).

**`systems/capture/`** (novo, per README "capture/ encontros selvagens,
captura vs loot"):
- `rarityTier.ts`: 3 tiers via `captureRate` real do `gen1.json`
  (>=150 comum, >=50 incomum, resto raro) — cortes provisórios.
- `wildEncounter.ts`: `wildLevelForProgress(lifetimeCandies)` (nível
  base 5 + 1 a cada 100 doces acumulados, teto 100) e
  `spawnWildEncounter()` com sorteio ponderado por tier.

**Bônus de tipo que finalmente ganham efeito** (estavam "(em breve)"
desde o Sprint 9): Voador (`wildSpawnRate`) encurta o intervalo de spawn
dividindo pelo multiplicador; Inseto (`rareWildChance`) multiplica o peso
do tier raro no sorteio. **Fantasma (`ghostNightWindow`) continua "(em
breve)"** — o roadmap descreve isso como "selvagens raros podem aparecer
à noite (janela bônus)", mas não existe ciclo dia/noite no jogo; não
inventei um só pra encaixar esse bônus.

**Fluxo "sem fricção"**: `BattleScreen` ganhou um prop opcional
`opponent` — se vier de um encontro selvagem, usa a espécie/nível dele;
se vier da aba "Batalha" direto (teste manual), continua caindo no
Rattata nível-do-jogador do Sprint 13. Vitória/derrota/ignorar sempre
limpam o encontro e voltam pro clicker.

**Fora de escopo:** Sprint 19 (capturar ou loot) é o que decide o que
acontece **depois** de vencer o selvagem — hoje a vitória só dá XP igual
qualquer batalha, sem opção de captura ainda.
