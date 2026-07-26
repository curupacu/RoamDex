# 0022 — Multi-região (regiões como save-slots paralelos) + login gate

## Contexto
Fora do fluxo normal de sprints do roadmap: pedido direto do dono do
projeto pra alinhar a arquitetura do save e o boot do jogo às referências
já catalogadas em `docs/referencias/` — `pokerogue-login.jpeg` (tela de
login antes de jogar) e `pokelike-menu2.png` (cards de região com cadeado,
stats por região).

O design documentado até aqui (Parte 1 §1 do roadmap) descrevia rebirth
como um avanço **linear**: uma run, uma geração de cada vez, sem voltar.
`REGION_ID = 'kanto'` hardcoded em `systems/rebirth/rebirth.ts` já vinha com
o comentário "hardcoded until a second region needs this parameterized" —
esta entrega é essa parametrização, mais o login que o roadmap original
(seção 11) já previa (Firebase Auth anônimo + Google) mas nunca ganhou UI.

## Decisão

### Regiões como save-slots paralelos, não geração linear
- **`SaveData` v10**: campos por-run (candies, roster, upgrades, buffs,
  currentLocationId, badges, championBeaten) saem do topo do save e viram
  `regions: Partial<Record<RegionId, RegionSave>>`. Globais de verdade
  (`insignias`, `rebirthUpgrades`, `victoryRoad`) continuam no topo — já
  eram compartilhados entre regiões antes disso existir, nada muda aí.
  `regionsUnlocked: RegionId[]` e `currentRegionId: RegionId | null` são
  novos; `currentRegionId: null` é o sinal pra mostrar a tela de seleção.
- **Cada região é isolada**: Pokédex (via roster), time ativo, doces e
  ginásios de uma região não vazam pra outra. O dono do projeto foi
  explícito: "cada um vai ter a própria pokedex e o sistema de seus
  pokemons" — divergência deliberada da ideia antiga de "misturar
  gerações livremente" no time.
- **Vencer a Elite Four libera a próxima região na hora** (`unlockNextRegion`,
  `systems/rebirth/rebirth.ts`), independente de dar rebirth.
- **Rebirth vira por-região e opcional**: `performRebirth(region, save, gen1)`
  agora só reseta a `RegionSave` daquela região (roster volta a forma
  base/lvl 1, candies/badges zeram) — as outras regiões e os globais
  (insígnias, rebirthUpgrades, victoryRoad) não são tocados. Não força mais
  avançar pra próxima região; o jogador pode rejogar a mesma região
  resetada quantas vezes quiser.
- **Loja de Rebirth continua global**: `insignias`/`rebirthUpgrades` valem
  em qualquer região, sem mudança de estrutura — já eram top-level.

### Registro de conteúdo por região (`content/regions.ts`, novo)
Não existia nenhum objeto que agrupasse "tudo de uma geração" — `locations`,
`gyms`, `eliteFour`, `upgrades`, `starterIds` eram importados soltos e
hardcoded em ~8 arquivos (`systems/gyms/*`, `systems/economy/upgrades.ts`,
`systems/capture/loot.ts`, `NewGameScreen`, `BattleScreen`, `LocationNav`,
`UpgradesPanel`, `App.tsx`). Esses arquivos passam a receber o conteúdo via
parâmetro (`RegionDefinition`) em vez de importar `content/gen1/*` fixo —
o próprio conteúdo de Kanto continua morando em `content/gen1/`, só ganhou
uma camada de registro por cima. `Gen1Entry` virou `SpeciesEntry` em todo o
código (rename mecânico) — manter uma variável chamada "gen1" quando ela
pode ser de Johto depois era isca de bug.

**Só Kanto é uma região "de verdade" jogável nesta entrega.** Johto/Hoenn/
Sinnoh aparecem na tela de seleção como cards bloqueados "em breve"
(`UPCOMING_REGIONS`), igual à referência Pokelike — sem conteúdo real atrás.
Construir Johto (Sprint 24 do roadmap) fica de fora: o objetivo aqui era
deixar a arquitetura pronta pra isso virar só "registrar conteúdo", não
outra rodada de refactor.

### Login gate
- **Trava o boot** (referência PokéRogue): antes de jogar, o jogador escolhe
  Google, email+senha, ou "continuar sem conta". `App.tsx` não chama mais
  `ensureSignedIn()` automaticamente — escuta `onAuthStateChanged` direto e
  só entra no jogo quando resolve pra um usuário (de qualquer um dos 3
  jeitos). Sessão do Firebase persiste (inclusive anônima), então quem já
  escolheu uma vez não vê essa tela de novo nas próximas aberturas.
- `services/auth.ts` ganhou `signInWithGoogle` (popup direto, não
  `linkWithPopup`), `signUpWithEmail`, `signInWithEmail`, `signInAsGuest`.
  `linkWithGoogle` (upgrade de conta anônima existente) continua no arquivo,
  sem UI nesta entrega — fica reservada pra um futuro "vincular conta" a
  partir de dentro do jogo.
- Local-first não muda: o save sempre existe em `localStorage` independente
  de auth (`useState(() => loadSave())` já era síncrono antes de qualquer
  resolução de login), então a tela de login não arrisca perder progresso
  de quem já jogava.

## Fora de escopo (registrado, não esquecido)
- Conteúdo de Johto/Hoenn/Sinnoh de verdade — Sprint 24 do roadmap.
- Parametrizar `scripts/build-data/build-gen1.ts` por geração — só
  necessário quando Johto entrar de fato.
- Renomear a pasta `content/gen1/` — fica como está, o registro de regiões
  aponta pra ela.
- Fluxo de "vincular Google numa conta anônima existente" — função pronta
  (`linkWithGoogle`), sem UI.
- Recuperação de senha no form de email — v1 só faz login/cadastro.
- Rename de variável `gen1`/prop `gen1` pra `speciesData` nos componentes —
  só o tipo (`Gen1Entry`→`SpeciesEntry`) foi renomeado; manter o nome da
  variável era o item mais arriscado/menos importante do rename, deixado
  pra uma limpeza futura se incomodar.
