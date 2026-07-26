# 0020 — Sprint 22: rebirth manual + Victory Road como snapshot no save

## Contexto
Sprint 22 do roadmap: reset da run nas regras exatas da Parte 1 (seção 1),
devolução do time à forma base, registro do time campeão na Victory Road, e
"fluxo de nova geração". Decisão 0019 (Sprint 21) já havia deixado isso
explicitamente fora de escopo: "Rebirth, Victory Road e a moeda de Insígnias
da Loja de Rebirth ficam pro Sprint 22 e 23."

## Decisão

- **`SaveData` v8** ganha dois campos: `championBeaten: boolean` e
  `victoryRoad: VictoryRoadEntry[]`. `VictoryRoadEntry` guarda
  `region`, `completedAt` e um snapshot raso do time ativo
  (`{ speciesId, level }[]`) no momento da vitória — exatamente o que o
  roadmap pede ("espécies, formas e níveis no momento da vitória"), nada
  além disso (sem stats calculados, sem moves — reconstituível a partir do
  `gen1.json` quando as raids da Fase 6 precisarem disso de verdade).
- **Vencer o Campeão e apertar Rebirth são dois momentos separados**,
  seguindo a proposta #6 do roadmap ("o jogador escolhe quando apertar").
  `BattleScreen` ganhou `onEliteFourVictory`, chamado uma única vez (mesmo
  padrão de guarda que já existe para `onVictory`/`onGymVictory`), que só
  registra o snapshot na Victory Road e liga `championBeaten` — nenhum
  reset acontece aí. Um banner persistente aparece na tela do clicker
  enquanto `championBeaten` for true, com o botão real de Rebirth (com
  `window.confirm`, mesmo padrão usado pro conflito de save da nuvem em
  `App.tsx`, por ser uma ação destrutiva de verdade).
- **`performRebirth` (`systems/rebirth/rebirth.ts`)** zera `candies`,
  `lifetimeCandies`, `upgrades`, `buffs` e `badges`, e volta
  `currentLocationId` pro início de Kanto — confirma a proposta #8 do
  roadmap (os marcos de doces acumulados resetam). Cada membro do roster
  volta pra forma base (via o mesmo lookup de `evolutionChain`/`trigger:
  'initial'` que `champion.ts` já usa pros starters, generalizado pra
  qualquer espécie) e nível 1/xp 0; duas famílias que colidem na mesma
  forma base (ex.: um Caterpie selvagem guardado ao lado de um Butterfree
  evoluído de outro Caterpie) colapsam num único membro — o roster nunca
  suportou duplicata de `speciesId`, e pós-rebirth os dois seriam idênticos
  mesmo. `activeTeamIds` esvazia (proposta do roadmap: "time ativo,
  reescolhido do zero") — o jogador re-monta o time na tela Time depois.
- **Sem tela de novo inicial no rebirth, por enquanto.** O roadmap descreve
  "nova geração, novos 3 iniciais" — mas Gen 2 ainda não existe
  (`content/gen2/` só tem `.gitkeep`, Sprint 24 é quem constrói isso). Com
  só Kanto no jogo, forçar de novo o picker de Bulbasaur/Charmander/Squirtle
  criaria uma segunda cópia de um starter que o jogador já tem, sem
  propósito — e o próprio roadmap já permite "usar veteranos resetados" sem
  pegar um novo inicial. Fica como está até o Sprint 24 dar um motivo real
  (escolher entre Gen 1 e Gen 2). Registrado aqui pra não ser esquecido
  quando esse sprint chegar.
- **`VictoryRoadScreen` nova, só leitura** — lista cada entrada por região/
  data com o time daquele momento (sprite + nível). Nenhuma interação além
  de visualizar, como o roadmap pede pra este sprint ("Victory Road é, por
  enquanto, um hall da fama somente-leitura").

## Escopo desta entrega
Reset de rebirth + registro/tela da Victory Road. A moeda de Insígnias e a
Loja de Rebirth (upgrades permanentes) ficam pro Sprint 23, como já previsto.
