# 0025 — Sprint 24: Gen 2 completa (Johto)

## O que foi feito

Johto entrou como segunda região jogável, seguindo o padrão que a
refatoração multi-região (decisão 0022) deixou pronto: quase tudo em
`content/regions.ts`, `systems/` e `ui/` já era genérico por região — este
sprint foi ~90% autoria de conteúdo, não refatoração de sistema.

- `scripts/build-data/build-gen2.ts` (novo script, `npm run build:gen2`)
  gera `frontend/public/data/gen2.json`.
- `docs/ROTAS-JOHTO.md` (pesquisa Bulbapedia, Pokémon Gold) — mesma
  metodologia de `docs/ROTAS-KANTO.md`, adaptada pras particularidades de
  Gen II (ver seção própria abaixo).
- `frontend/src/content/gen2/{starters,gyms,eliteFour,locations,upgrades}.ts`
  — 39 localizações (New Bark Town → Victory Road), 8 ginásios (Falkner →
  Clair), Elite Four (Will/Koga/Bruno/Karen) + Campeão (Lance).
- `content/regions.ts`: `REGION_ORDER = ['kanto', 'johto']`, `REGIONS.johto`.
- `frontend/src/engine/save.ts`: `RegionId` ganhou `'johto'`.

## Decisões tomadas sem alinhar antes (registradas aqui, revisão via playtest)

1. **`gen2.json` não é só o dex 152–251.** As tabelas selvagens e times de
   Johto reaproveitam bastante espécie de Gen 1 (Rattata, Tentacool,
   Dragonite...) e o jogo busca **um** `dataUrl` por região como pool
   inteiro de espécies (`App.tsx`, sem merge com `gen1.json` em runtime).
   `build-gen2.ts` ganhou uma lista `LEGACY_IDS` explícita — toda espécie
   citada direto numa tabela selvagem ou time de treinador em
   `ROTAS-JOHTO.md`, mais o sucessor de evolução **por nível** (nunca
   pedra/troca — `resolveEvolution` só reage a `trigger === 'level-up'`,
   ver `systems/team/leveling.ts`) de quem é capturável. `gen2.json` final
   tem 192 entradas (100 do dex novo + 92 legadas).
2. **Bug pré-existente encontrado e corrigido:** `App.tsx` checava
   `eliteFourAvailable` comparando `currentLocation.id === 'victory-road'`
   como string fixa — funcionava por coincidência em Kanto, quebraria em
   Johto. Generalizado pra `currentLocation.id === última localização da
   região`. Por isso o `id` da última localização de Johto também é
   `'victory-road'` (reaproveitando o nome, sem colisão — `RegionSave` é
   por região).
3. **Trecho 6 (Jasmine) não tem geografia nova** — o jogador volta a
   Olivine depois de curar a Amphy com o Chuck. Modelado como uma segunda
   entrada de localização (`olivine-city-gym`), não uma localização nova de
   verdade — mesmo visual/pool (vazio, cidade) da primeira passagem por
   Olivine. Ver nota em `content/gen2/gyms.ts` e a seção do Trecho 6 em
   `ROTAS-JOHTO.md`.
4. **Campeão (Lance) não varia por inicial** — diferente do rival de Kanto.
   Confirmado contra a fonte (`ROTAS-JOHTO.md` linhas 900-908): time único.
   As 3 chaves de `CHAMPION_TEAM_BY_STARTER` apontam pro mesmo array —
   `systems/gyms/champion.ts` não precisou mudar.
5. **`LEVEL_BUMP = 25`** pro Elite Four/Campeão de Johto (`content/gen2/eliteFour.ts`).
   Provisório, **sem nenhum dado de playtest** — os níveis originais de
   Bulbapedia pra Johto (Will 40-42 até Lance 44-50) são bem mais baixos
   que os de Kanto pré-bump (Lorelei 53-56 até Lance 56-62), refletindo o
   próprio ritmo de Gen II. O valor foi escolhido pra aterrissar perto de
   ~65-78 (um pouco acima do range final já calibrado de Kanto, ~65-77),
   assumindo que Johto é jogado como uma segunda run cheia, com bônus da
   Loja de Rebirth de um Kanto já vencido. **Precisa de playtest real**,
   igual às duas rodadas que Kanto levou (`docs/BACKLOG.md`).
6. **Curva de `unlockAt`** das 39 localizações (0 → 650.000 doces
   acumulados) é nova e não vem de simulação — só escalada proporcionalmente
   à curva de Kanto (525.000 em 31 paradas) pro número maior de paradas.
   Mesmo aviso de sempre: Sprint 25 (ou equivalente) é quem calibra de
   verdade.
7. **Dragon's Den não virou localização jogável.** É uma área bônus opcional
   no jogo original (não bloqueia progressão) e o modelo de localizações do
   jogo é estritamente linear, sem ramificação — ficou só documentada em
   `ROTAS-JOHTO.md` como conteúdo de referência pra um possível sprint de
   áreas opcionais no futuro.
8. **Upgrades de Johto** (`content/gen2/upgrades.ts`) são o mesmo formato
   genérico de Kanto, só renomeados com sabor de Johto — o backlog de dar
   personalidade de verdade pros upgrades (`docs/BACKLOG.md`, "Upgrades
   genéricos demais") continua em aberto e vale pras duas regiões.

## Qualidade dos dados herdada de `ROTAS-JOHTO.md`

O documento de pesquisa já sinaliza isso na própria seção de Metodologia,
repetindo aqui porque afeta código: as tabelas de rota com muita divisão
manhã/dia/noite (Rotas 30, 31, 38, 39, 42, 43, 45, 46) e a tabela de Victory
Road (Geração II) passaram por normalização manual mais pesada durante a
pesquisa — vale conferência pontual contra as URLs da Bulbapedia citadas
antes de tratar esses números como definitivos. Times de líder/Elite
Four/campeão são alta confiança (bateram 100% com conhecimento treinado).

## Verificação

Sem acesso a navegador nesta sessão (extensão Claude em Chrome recusada) —
não foi possível fazer o playtest manual que normalmente fecharia um
sprint como este. Em vez disso:

- `tsc -b` e `vite build` (produção) passam limpos.
- `oxlint` limpo.
- Suíte inteira (200 testes, 26 arquivos) passa, incluindo um teste novo
  (`content/gen2/johto.smoke.test.ts`) que percorre as 39 localizações de
  ponta a ponta via `canTravelTo`/`travelTo` reais (não mockado), valida
  que todo `speciesId` citado (selvagem + times) existe em `gen2.json`, e
  confere a sequência Elite Four + Campeão.
- **Pendente:** playtest manual no navegador (login → escolher região Johto
  → starter → andar pelas primeiras rotas → checar fundo/sprites →
  ginásio do Falkner) antes de considerar o sprint fechado de verdade.
