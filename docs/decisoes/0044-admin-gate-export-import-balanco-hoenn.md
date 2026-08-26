# 0044 — Painel Admin escondido, export/import de save (Sprint 27), balanço de Hoenn

Três pedidos do dono do projeto na mesma sessão: fechar o "bloco rápido"
identificado numa auditoria anterior (painel Admin exposto pra qualquer
jogador em produção + Sprint 27 nunca implementado) e rodar o balanceamento
real de Hoenn (`tests/simulations/`) que a 0043 tinha deixado como
pendência explícita. Teste em navegador continua fora do escopo por pedido
direto — só as duas próximas sessões cobrem isso.

## Painel Admin escondido atrás de `import.meta.env.DEV`

`App.tsx` tinha um botão "Admin" sempre visível na nav, sem gate nenhum —
qualquer jogador no Vercel conseguia adicionar candies/insígnias de graça.
Botão e `<AdminScreen>` agora só renderizam quando `import.meta.env.DEV` é
`true` (Vite substitui isso em build time — `npm run build` vira `false`
estático, o bundler remove o branch morto; `npm run dev` continua
mostrando o painel normalmente pra debug local).

## Export/import de save (Sprint 27)

- `engine/save.ts`: `exportSave(data)`/`importSave(encoded)` — Base64 via
  `TextEncoder`/`TextDecoder` (UTF-8 seguro, evita o combo depreciado
  `escape`/`unescape`+`btoa`/`atob`). `importSave` roda o resultado por
  `migrateSave`, igual `loadSave` — um backup exportado numa versão de save
  antiga continua importável depois de migrações futuras.
- `ui/screens/SaveBackupScreen.tsx`: tela nova, textarea readonly com botão
  "Copiar" (usa `navigator.clipboard`) pro export, textarea + botão
  "Importar" (com `window.confirm`, já que substitui o save local inteiro)
  pro import. Acessível a todo jogador via botão "Backup" na nav — ao
  contrário do Admin, este não é dev-only.
- Sem endpoint novo, sem Firebase — é local-first puro (regra 3 do
  CLAUDE.md), só um blob que o jogador guarda em outro lugar.
- Testes: `save.test.ts` ganhou 4 casos (round-trip, texto não-ASCII,
  compatibilidade com `migrateSave`, erro em entrada inválida).

## Balanceamento de Hoenn — achado real: Norman/Slaking

Adicionei Hoenn a `tests/simulations/battle.sim.test.ts` (mesmo
`describe.each` que já cobre Kanto/Johto) — 1 de 9 casos falhou: Norman
perdia 100% do time (0% HP restante) no próprio nível médio do time, todos
os outros 7 ginásios de Hoenn passaram de primeira.

**Causa raiz** (mesmo método da 0038 — script temporário fazendo swap de
nível Pokémon-a-Pokémon, deletado depois de incorporado): não é o time
inteiro, é só o Slaking (nível 31 original). Slaking tem o maior ATK base
não-lendário da Gen 3 (160) — no jogo de verdade isso é freado pela
habilidade Truant (só ataca a cada 2 turnos), que este projeto não modela
(roadmap seção 4: só HP/ATK/DEF, sem habilidades). Mesma categoria de
problema que os 3 Dragonite do Lance em Johto: um Pokémon real cujo
equilíbrio pretendido depende de mecânica fora do escopo do motor.

**Fix**: `content/gen3/gyms.ts` ganhou `NORMAN_SLAKING_LEVEL = 28` (nível
original pesquisado, 31, continua documentado no comentário) — varredura
isolada achou que 28 é o primeiro valor com margem confortável (20% HP
restante, nem parede nem "quase perdeu"). Só o Slaking mudou; Spinda/
Vigoroth/Linoone continuam nos níveis pesquisados (27/27/29), e Slaking
continua sendo o Pokémon mais forte do time de Norman — só não mais
inatingível.

Hoenn também entrou em `progression.sim.test.ts` (diagnóstico, sem
assertion — confirma que o `unlockAt` escrito à mão na 0043 mantém o
mesmo padrão já visto em Kanto/Johto: o gate de doce nunca é o gargalo
real, quem trava é sempre nível/insígnia) e `upgraderoi.sim.test.ts`
(assertions reais — passou de primeira, esperado, já que os upgrades de
Hoenn são cópia numérica dos de Kanto/Johto, só com nome/flavor
diferentes).

## Verificação

`tsc -b --noEmit` limpo, `oxlint` limpo. Suíte inteira: **291/291** (era
274 antes desta sessão — 4 testes novos de export/import + 13 de Hoenn
entrando nas simulações de batalha/upgrade ROI que já existiam
parametrizadas por região).

## O que ainda falta

- Teste em navegador (Admin gate, backup, e o balanço de Hoenn) — pedido
  explícito pra ficar de fora desta sessão.
- Pendências de pesquisa já registradas em `docs/ROTAS-HOENN.md` (rotas
  106/107/108 etc.) — sem mudança.
- Fase 5 (Sprint 26: tutorial, settings, responsivo mobile) continua em
  aberto — só o item de export/import da Fase 5 foi resolvido aqui.
