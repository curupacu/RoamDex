# 0006 — Sprint 13: motor de batalha sem efetividade de tipo nem QTE

**Contexto:** a seção 4 do roadmap descreve o motor de batalha inteiro
(stats, tap-to-attack, energia, efetividade de tipo, QTE do super golpe),
mas a tabela de sprints separa isso em fases: efetividade de tipo é
Sprint 14, e o framework de QTE + os 18 golpes são Sprints 15-17. Sprint
13 é só a base: HP/ATK/DEF, tap, energia, troca, vitória/derrota, cura
automática.

**Decisões de escopo:**
- **Sem efetividade de tipo ainda** — dano usa só
  `max(1, atk - def×0.5)` (amortecimento simples pra DEF nunca zerar o
  dano). Sprint 14 multiplica isso por 2×/1×/0.5× depois.
- **Super golpe é só um multiplicador fixo** (`SUPER_ATTACK_MULTIPLIER =
  2.5`) quando a energia enche — não existe QTE nem os golpes por tipo
  ainda (Sprints 15-17). Quando o framework de QTE chegar, ele substitui
  esse multiplicador fixo por "cheio/médio/fraco" conforme a execução.
- **Inimigo fixo de teste** (`content/battle.ts`, Rattata nv.5) — não é
  selvagem de verdade (isso é Sprint 18, com escala de nível pela run).
  Existe só pra dar uma batalha jogável antes desse sistema existir.
- **HP não é salvo** — vive só dentro do `BattleState` de
  `systems/battle/engine.ts`, recalculado do zero (`deriveStats`) toda
  batalha nova. Isso já implementa sozinho a "cura automática
  pós-batalha" do roadmap, sem precisar de nenhum campo novo no save.
- **XP de batalha** finalmente fecha a lacuna registrada no
  `docs/decisoes/0004`: vitória agora dá XP de verdade (todo o time
  ganha `BATTLE_XP_TEAM`, o ativo ganha mais um `BATTLE_XP_ACTIVE_BONUS`
  em cima), via o `gainMemberXp` que o Sprint 11 já deixou pronto pra
  isso.

**Não mexido ainda:** os bônus econômicos de Lutador (ATK), Pedra (DEF),
Elétrico (crítico) e Aço (redução de dano) do Sprint 9 continuam
"(em breve)" — dá pra ligá-los na batalha a qualquer momento (só chamar
`economyMultiplier(team, 'teamAtk')` etc.), mas isso fica pro Sprint 14
junto da efetividade de tipo, pra não misturar escopo.
