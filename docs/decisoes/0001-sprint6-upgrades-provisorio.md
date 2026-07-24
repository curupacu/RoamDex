# 0001 — Custos e efeitos dos upgrades do Sprint 6 são provisórios

**Contexto:** Sprint 6 pede upgrades de clique e CPS com desbloqueio
progressivo e custo `base×1.15^n`. Os valores de `baseCost`/`effect`/`unlockAt`
em `content/gen1/upgrades.ts` foram escolhidos por sensação (progressão
estilo Cookie Clicker), sem simulação.

**Decisão:** shippar com esses números provisórios agora pra ter o loop
jogável, e tratar o balanceamento de verdade no Sprint 25
("Balanceamento"), que já existe no roadmap especificamente para isso
(planilha viva + testes Vitest simulando 1h/10h/50h de jogo).

**Impacto:** os 8 upgrades atuais (4 clique + 4 CPS) podem ter
`baseCost`/`effect`/`unlockAt` reajustados no Sprint 25 sem exigir migração
de save — o formato (`Record<string, number>` por id de upgrade) já suporta
qualquer curva de números.
