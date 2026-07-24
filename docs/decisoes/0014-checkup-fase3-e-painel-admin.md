# 0014 — Checkup pós-Fase 3: 4 bugs corrigidos + painel de admin temporário

Varredura pedida pelo dono do projeto depois de fechar a Fase 3. Achados
reais, todos cobertos por teste novo:

1. **`LIVE_BONUS_KINDS` desatualizado** (`content/types.ts`) — Voador
   (Sprint 18), Inseto (Sprint 18) e Fada (Sprint 19) ganharam sistema
   de verdade, mas a UI do clicker continuava marcando os três como
   "(em breve)". Lista atualizada.
2. **`BattleScreen` recalculava o inimigo reativamente** a partir da
   prop `opponent` a cada render, em vez de travar no que
   `createBattle()` já tinha usado pra montar os stats no mount. Se o
   `wildEncounter` do componente pai mudasse com a batalha em
   andamento, o sprite/nome mostrado podia descolar do inimigo real da
   luta. Corrigido travando `opponent` num `useState` (`frozenOpponent`)
   que ignora mudanças da prop depois do mount.
3. **Evolução podia duplicar `speciesId` no roster.** O roster é
   indexado por espécie, sem suporte a duplicata — premissa segura até
   o Sprint 19 tornar captura real (dá pra pegar Bulbasaur E Ivysaur
   como capturas separadas). Se o Bulbasaur evoluísse depois, viraria
   um segundo Ivysaur, ambígua pra qualquer `find()` por speciesId.
   `resolveEvolutionSafely()` (novo, em `systems/team/leveling.ts`)
   verifica colisão contra o resto do roster antes de trocar a espécie
   — se colidir, o nível ainda sobe, só a evolução visual não acontece.
   Usado por `gainMemberXp` e `buyRareCandy`.
4. **Capturar uma espécie já possuída dizia "capturado!"** mesmo o
   roster ignorando a duplicata silenciosamente (`addToRoster` já
   fazia isso desde o Sprint 10). `handleCaptureWild` agora checa
   `isCaptured()` antes de rolar e retorna uma mensagem honesta ("Você
   já tem um X!") sem fingir que a bola funcionou.

**Painel de admin temporário** (`ui/screens/AdminScreen.tsx`, nova aba
"Admin" na nav): + 100k doces, adicionar qualquer uma das 151 espécies
ao time num nível escolhido (testa os 18 QTEs sem esperar captura de
verdade), forçar um encontro selvagem instantâneo com espécie
escolhida, e setar o nível do Pokémon ativo direto. Marcado no código
como temporário — não é feature de nenhum sprint, é ferramenta de
teste manual. Remover quando não for mais necessário.
