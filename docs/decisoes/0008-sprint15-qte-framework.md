# 0008 — Sprint 15: framework de QTE + 6 tipos ("leva 1")

**Contexto:** roadmap Sprint 15: "Framework de QTE + 6 primeiros tipos
(Grama, Fogo, Água, Elétrico, Normal, Lutador) com 3 estágios de golpe |
Pronto quando: QTE bom = dano cheio; framework aceita QTE novo só com
config."

**Como o framework fica extensível por config:**
- `content/moves.ts` → `MOVES: Partial<Record<TypeName, MoveSet>>` — só
  os 6 tipos desse sprint têm entrada. `hasQte(type)` em
  `systems/battle/engine.ts` checa essa tabela.
- `ui/components/qte/QteModal.tsx` despacha pro componente certo por
  `switch (type)`. Adicionar um tipo novo (Sprint 16/17) = 1 entrada em
  `MOVES` + 1 componente novo + 1 `case` no switch — o motor de batalha
  (`engine.ts`) não muda nada.
- Tipos sem QTE ainda caem no fallback do Sprint 13 (multiplicador fixo
  `SUPER_ATTACK_MULTIPLIER`, sem minigame), então não ficam pior que
  antes enquanto esperam a própria leva.

**Graduação (`systems/battle/qte/grading.ts`):** os 6 minigames são bem
diferentes (segurar-soltar, mash, onda, sequência, ritmo, combo), mas
todos produzem só um `QteResult` ('full'/'partial'/'weak') através de 3
helpers puros e testáveis (`gradeByZone`, `gradeByCount`,
`gradeByOffset`) — a lógica de "quão bem jogou" fica separada de "como
esse minigame específico funciona".

**Estágio do golpe** (`systems/battle/moveStage.ts`): reaproveita o
`evolutionChain` do Sprint 11 pra espécies que evoluem (estágio = índice
na cadeia) e cai em marcos de nível 20/40 pras que não evoluem — exatamente
a decisão 5 da seção 3, sem inventar nada novo.

**Números provisórios** (thresholds de cada minigame, `QTE_RESULT_MULTIPLIER`):
mesmo tratamento do Sprint 6/9/11/12 — Sprint 25 ajusta com dados de
simulação. O importante aqui era o framework funcionar, não a dificuldade
estar calibrada.

**Fora de escopo:** os 12 tipos restantes (Sprints 16-17), e qualquer
ligação entre os bônus econômicos de batalha (Lutador/Pedra/Aço,
`docs/decisoes/0006`/`0007`) e os QTEs — continuam independentes por
enquanto.
