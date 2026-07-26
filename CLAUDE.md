# CLAUDE.md — contexto do projeto PokéIdle

Instruções para assistentes de IA trabalhando neste repositório.

## O que é
Idle/clicker de navegador com Pokémon. O documento canônico de design e
planejamento é `docs/ROADMAP-E-SPRINTS.md` — **leia antes de qualquer sprint**.
Nada de implementar features fora do sprint atual sem alinhar com o dono do projeto.

**Antes de começar a próxima sessão, leia `docs/BACKLOG.md`** — bugs e ideias
que o dono do projeto reportou no playtest e ainda não foram triados/codados.

## Regras de arquitetura (invioláveis)
1. **PokeAPI só em build-time.** O jogo NUNCA chama a PokeAPI em runtime.
   Dados vêm de `frontend/public/data/*.json`, gerados por `scripts/build-data/`.
2. **`systems/` = lógica, `content/` = dados.** Um ginásio novo, boss novo ou
   upgrade novo deve ser um objeto de configuração em `content/`, nunca código novo.
3. **Local-first.** O jogo funciona 100% offline com localStorage; Firebase é
   camada de sync, nunca dependência. Save tem versão + migrações desde o início.
4. **Game loop por timestamp**, nunca por frame/intervalo confiável. Progresso
   offline é calculado por diferença de timestamp.
5. TypeScript estrito. Sem `any` sem justificativa em comentário.
6. **Regiões são save-slots paralelos, não geração linear** (decisão 0022).
   `SaveData.regions[regionId]` guarda tudo por-run (roster, candies,
   badges...) isolado por região; só `insignias`/`rebirthUpgrades`/
   `victoryRoad` são globais. Uma região nova é uma entrada em
   `content/regions.ts` (`RegionDefinition`) — nunca hardcode de
   `content/gen1/*` direto em `systems/`/`ui/` (mesmo espírito da regra 2).

## Fluxo do app (App.tsx)
`onAuthStateChanged` (login: Google/email/anônimo) → `!activeRegionDef`
(Menu → Seleção de região) → `!gen1` (carregando espécies da região atual)
→ `roster vazio` (escolher inicial) → jogo. Cada gate é um early-return em
`App.tsx`; não pular etapa nem assumir que `save.currentRegionId` está
sempre preenchido.

## Convenções
- Idioma da UI e dos textos de jogo: português (BR). Código e commits: inglês.
- Nomes de golpes/Pokémon: nomes oficiais em inglês (vêm da API).
- Bônus econômicos e QTEs por tipo: tabela mestra na seção 3 do roadmap — é a
  fonte da verdade, não inventar variações.
- Toda decisão de design nova vira um registro curto em `docs/decisoes/`.

## O que NUNCA fazer
- Monetização, anúncios ou qualquer coisa que fira o caráter fan-made.
- Chamadas de rede em runtime para dados de Pokémon.
- Quebrar saves existentes (sempre escrever migração).
