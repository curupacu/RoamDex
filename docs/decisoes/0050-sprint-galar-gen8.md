# 0050 — Sprint Galar (Gen 8)

Continuação direta da pesquisa (`docs/ROTAS-GALAR.md`) — dono do projeto
mandou 3 zips de pesquisa de referência (fatos corretos, mas em formato
genérico, sem wiring nenhum com o projeto) pras 3 regiões que faltavam
(Alola/Galar/Paldea) e pediu pra terminá-las. Antes de implementar,
perguntei 3 decisões estruturais (nenhuma das 3 é "drop-in" como Hoenn/
Sinnoh/Kalos/Unova foram) e segui as recomendações escolhidas.

## Decisões estruturais confirmadas

1. **Galar tem 2 pares de ginásio version-exclusive** (Bea/Allister em
   Stow-on-Side, Gordie/Melony em Circhester) — sorteado **uma vez na
   criação do save** e fica fixo dali pra frente (mesma ideia de "só uma
   versão do cartucho", não muda a cada visita).
2. Paldea ganharia ordem fixa por nível (não aplica a este sprint).
3. Alola viraria "Provas = ginásios" (não aplica a este sprint).

## O que entrou

- `content/gen8/{starters,gyms,eliteFour,upgrades,locations,
  galar.smoke.test}.ts` — 29 locais (Postwick → Wyndon/victory-road), 8
  ginásios, Champion Cup (Marnie, Hop, Raihan, Bede) + Campeão Leon.
- `content/regions.ts` — `galar` adicionado a `REGION_ORDER`/`REGIONS`
  (`dataUrl: '/data/gen8.json'`).
- `scripts/build-data/build-gen8.ts` — ganhou `LEGACY_IDS` (100 espécies
  de outras gerações usadas nas rotas/times de Galar, ex.: Vulpix,
  Machop, Sneasel) e o `gen8.json` foi reconstruído (191 entradas).
- `engine/save.ts` — `RegionId` ganhou `'galar'`.

### Mecanismo novo: `versionVariant` (padrão diferente do `teamByStarter` de Unova)

Striaton (Unova) resolve por **qual inicial o jogador escolheu**. Os
version-exclusive de Galar são diferentes: não dependem de nada que o
jogador faça, só de qual "cartucho" aquele save representa. Modelado como:

- `RegionSave.versionVariant: 'a' | 'b'` — sorteado uma única vez em
  `emptyRegionSave` (criação do save-slot), **sobrevive ao rebirth**
  (`performRebirth` agora carrega `before.versionVariant` — é identidade
  do cartucho, não progresso de run).
- `GymDefinition` ganhou `teamByVersion`/`leaderNameByVersion`, mesmo
  espírito de `teamByStarter`/`leaderNameByStarter`.
- `systems/gyms/gymProgress.ts`'s `resolveGym` agora checa `teamByVersion`
  primeiro (senão cai no `teamByStarter`, senão no-op) — verificado que
  continua no-op (mesma referência) pros outros 6 ginásios de Galar e
  pra toda outra região.
- Migração nova: `CURRENT_SAVE_VERSION` 13→14, step que sorteia
  `versionVariant` pra toda região já existente num save antigo.

### Achado nº2: Motostoke/Hammerlocke visitadas 2x

Mesmo padrão já usado em Petalburg (Hoenn)/Olivine (Johto): 2 entradas de
local (`motostoke`/`motostoke-gym`, `hammerlocke`/`hammerlocke-gym`), o
ginásio aponta pra segunda. **Bug pego pelo próprio smoke test**: os dois
ginásios (Kabu, Raihan) tinham `locationId` apontando pra 1ª passagem por
engano — `canTravelTo` deixava pular o ginásio sem a insígnia. Corrigido
antes do commit.

### Achado nº3: Elite Four/Campeão

Champion Cup não tem 4 membros fixos de verdade no jogo real (bracket
parcialmente aleatório) — modelado como 4 membros ordenados por nível
crescente (Marnie 47 → Hop 49 → Raihan-cup 54 → Bede 62) + Campeão Leon
(time varia por inicial, `CHAMPION_TEAM_BY_STARTER`, mesmo padrão de toda
região anterior). Hop tinha um 5º Pokémon (o inicial dele, sempre
"vencedor" contra o do jogador) — omitido: não temos mecanismo de variar
time de um Elite-Four-membro por inicial (só o Campeão tem isso), e
inventar uma escolha fixa seria pior que só encurtar o time em 1.

## Verificação

- `tsc -b --noEmit` limpo, `oxlint` limpo.
- Suíte inteira: **393/393** (era 367 — 26 testes novos: 13 no smoke test
  de Galar, o resto no fluxo de migração 13→14).
- **Bug real pego rodando a suíte**: `emptyRegionSave`'s novo
  `Math.random()` quebrou 2 testes de `systems/capture/loot.test.ts` que
  mockavam `Math.random` com uma fila finita (`mockReturnValueOnce`
  encadeado) — a chamada extra de `emptyRegionSave` (dentro de
  `makeRegionSave()`, chamada DEPOIS do mock nesses 2 testes) consumia o
  1º valor da fila, deslocando tudo. Corrigido reordenando (criar o save
  ANTES de montar o mock), não mudando a lógica de produção.
- Simulação de batalha: todos os 8 ginásios vencem sem virar parede (pior
  caso: Kabu, 30% HP). Elite Four + Campeão **vence mesmo no nível médio
  exato** (5% HP) — mesmo padrão de Hoenn/Sinnoh/Kalos (só Unova conseguiu
  o "perde na primeira vez" limpo); não recalibrado, dentro do aceitável.
- Simulação de progressão: curva sobe de forma suave, sem saltos — com
  treino idle, 0.49h (Milo) até 2.87h (Raihan) e 6.12h (Elite Four);
  só-batalha, 3.34h até 18.56h e 37.21h.
- `upgraderoi.sim.test.ts`: upgrades "lendários" e o gap clique-vs-CPS
  passam nos mesmos limites das outras 6 regiões.

## O que ainda falta

- Alola (Provas viram ginásios) e Paldea (ordem fixa por nível) — mesmo
  processo, pesquisa já pronta em `docs/ROTAS-ALOLA.md`/
  `docs/ROTAS-PALDEA.md`, implementação ainda não feita.
- Sprites de treinador — só Kanto tem.
- Upgrades por-prédio (Padrão 5, decisão 0048) — só Kanto tem.
