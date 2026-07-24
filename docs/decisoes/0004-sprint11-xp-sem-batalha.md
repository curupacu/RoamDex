# 0004 — Sprint 11: XP vem só do upgrade "Treinamento" por enquanto

**Contexto:** o roadmap (seção 7) já previa isso: "XP vem de batalhas
(...). Complemento idle: upgrade 'Treinamento' que gera XP passivo
lento, pra ninguém travar por odiar batalhar." Só que a Fase 3 (motor de
batalha) só começa no Sprint 13 — então hoje o Treinamento é a **única**
fonte de XP que existe, não um complemento.

**Decisão:**
- `content/gen1/upgrades.ts` ganhou o upgrade `training-regimen`
  ("Treinamento", kind `xp`), reaproveitando 100% do sistema de upgrades
  do Sprint 6 (curva de custo, desbloqueio progressivo, painel) — só
  precisou de um terceiro `kind` e um `totalXpPerSecond()` espelhando
  `totalCps()`.
- O XP gerado é aplicado a **todo o time ativo** por igual (não só o
  "ativo que clica") — a diferenciação "o ativo ganha mais" da seção 7 é
  sobre XP de batalha, que ainda não existe; fica pra quando o motor de
  batalha (Sprint 13) chegar.
- Evolução (`resolveEvolution` em `systems/team/leveling.ts`) usa a
  `evolutionChain` que já vem pronta em `gen1.json` desde o Sprint 2 —
  cada estágio da cadeia carrega a cadeia inteira, então funciona igual
  não importa em qual estágio o Pokémon está.
- "Stats escalando" (`systems/team/stats.ts`, `deriveStats`) segue a
  fórmula base da seção 4 (HP=base_hp, ATK=max(atk,sp_atk),
  DEF=média(def,sp_def)) com um multiplicador de crescimento por nível
  por cima — a seção 4 não especifica a curva exata de escala, então é
  provisório (`STAT_GROWTH_PER_LEVEL`), igual o resto dos números do
  Sprint 6/9.
- "Golpe muda de estágio" (seção 3) **não** foi implementado ainda — não
  existe move/golpe nenhum até o motor de batalha + QTE (Sprints 13–17).
  Fica registrado aqui pra não esquecer, mesmo sem código ainda.

**Impacto:** `xpForNextLevel`, `applyXpGain`, `resolveEvolution` e
`deriveStats` são todos puros e não sabem de onde o XP vem — quando o
Sprint 13+ trouxer XP de batalha de verdade, é só outra fonte chamando
`gainTeamXp`, sem mexer nessa lógica.
