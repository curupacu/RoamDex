# PokéIdle

Jogo idle/clicker de navegador inspirado em Cookie Clicker e PokéClicker.
Login (Google/email/anônimo) → seleção de região → regiões jogáveis em
paralelo, cada uma com seu próprio save e rebirth opcional; batalhas estilo
Pokémon GO com QTE por tipo, ginásios, Elite 4, Victory Road e (futuramente)
raids.

> Projeto fan-made, sem fins lucrativos. Pokémon é propriedade da
> Nintendo/Game Freak/The Pokémon Company. Dados via [PokeAPI](https://pokeapi.co).

## Documentação
- **Design + plano de sprints:** [`docs/ROADMAP-E-SPRINTS.md`](docs/ROADMAP-E-SPRINTS.md)
- **Decisões de arquitetura:** `docs/decisoes/`
- **Balanceamento (planilhas/curvas):** `docs/balanceamento/`

## Estrutura
```
pokeidle/
├── docs/                  # roadmap, decisões, balanceamento
├── scripts/build-data/    # pipeline PokeAPI → JSONs estáticos
├── frontend/
│   ├── public/
│   │   ├── data/          # JSONs gerados por geração (gen1.json...)
│   │   ├── sprites/       # sprites de fallback local
│   │   └── backgrounds/   # fundos por localização (ver content/gen1/locations.ts)
│   └── src/
│       ├── engine/        # game loop, save/migrações, offline, números grandes
│       ├── systems/       # lógica de jogo (1 pasta por sistema)
│       │   ├── economy/   # doces, upgrades, CPS, loja de doces
│       │   ├── capture/   # encontros selvagens, captura vs loot
│       │   ├── battle/    # motor de batalha + qte/ (os 18 minigames)
│       │   ├── team/      # time ativo, XP, evolução, bônus de tipo
│       │   ├── gyms/      # ginásios + elite 4
│       │   ├── rebirth/   # rebirth (por região), victory road, loja de rebirth
│       │   └── raids/     # fase 6 (reservado)
│       ├── content/       # DADOS, não lógica
│       │   ├── regions.ts # registro de regiões (RegionDefinition) — só Kanto de verdade hoje
│       │   └── gen1/      # conteúdo de Kanto: ginásios, e4, upgrades, locations
│       ├── stores/        # zustand stores
│       ├── services/      # firebase (auth: Google/email/anônimo + sync do save)
│       ├── ui/            # screens/ (login, seleção de região, clicker...), components/, styles/
│       └── utils/
├── backend/
│   ├── firestore/         # rules e indexes do Firestore
│   └── functions/         # cloud functions (reservado, se precisar)
└── tests/simulations/     # simulações de economia (1h/10h/50h)
```

## Stack
Vite + TypeScript + React + Zustand · Firebase (Auth + Firestore, local-first) · Vercel · Vitest
