# 0053 — Reformulação: Treinamento, Reforço de Treino e Rare Candy

Pedido do dono do projeto: as três formas de um Pokémon ganhar XP fora de
batalha estavam "horríveis"/"meio paia" — Treinamento era um prédio idle
idêntico nas 9 regiões sem cadeia nenhuma, Reforço de treino era um botão
fixo pra sempre (300 doces → 2x XP por 10min), e Rare Candy dava 1 nível
de graça totalmente desconectado de insígnias ou qualquer outro sistema.
Pedido pra reformular os 3 juntos, como uma progressão coesa, e aprovar um
plano ambicioso antes de implementar (plano aprovado via EnterPlanMode
nesta sessão).

## O que entrou

**Treinamento vira cadeia de tier + sinergia psíquica** (zero campos
novos em `UpgradeDefinition` — reaproveita 100% os Padrões já existentes):
- `training-drills` / `training-simulator`: 2 tiers `kind:'xp'`,
  `maxPurchases: 1`, efeito flat crescente — mesmo formato da cadeia
  "Treinador Lendário" (decisão 0026).
- `training-academy`: 3º tier "muda de natureza" (`scalesWith:
  'rosterSize'`) — Treinamento passa a escalar com quantos Pokémon você
  capturou, não só um número fixo.
- `training-psychic-bond`: 4º tier, Padrão 3 (sinergia, decisão 0035) —
  `requiresSynergy: { upgradeId: 'training-academy', count: 1, teamType:
  'psychic' }`.
- `content/types.ts`: `'xpGain'` (bônus de Psíquico) entrou em
  `LIVE_BONUS_KINDS` — já estava na tabela mestra de tipos desde sempre,
  mas nada multiplicava de fato até agora. `App.tsx` (4 pontos: XP idle
  ativo/loop de fundo, XP de batalha normal/vitória) passou a multiplicar
  `economyMultiplier(team, 'xpGain')` junto dos outros multiplicadores de
  XP já existentes.

**Reforço de treino vira cadeia de tiers** (`content/shop.ts`'s
`XP_BOOST_TIERS`, bespoke — decidiu-se NÃO criar um `kind` novo em
`UpgradeDefinition` pra isso, já que "duração de buff" não é uma produção
contínua nem um multiplicador permanente como os kinds existentes
entendem):
- 3 tiers (2x/10min → 2.5x/15min → 3x/20min), cada um gatilhado por
  doces vitalícias + insígnias + posse do upgrade de Treinamento
  correspondente (`requiresTrainingUpgradeId`, checado à mão com
  `ownedCount`, mesma ideia do Padrão 5 mas sem passar por
  `UpgradeDefinition`) — une Treinamento e Reforço numa progressão só.
- `buyXpBoost` sempre ativa o MELHOR tier já desbloqueado;
  `RegionSave.buffs` ganhou uma segunda chave (`XP_BOOST_MULTIPLIER_KEY`)
  guardando o multiplicador do tier que estava ativo na hora da compra
  (não o tier atual), pra destravar um tier novo não mudar
  retroativamente um boost já em andamento.
- `CandyShopScreen.tsx` mostra o tier atual + um hint de "próximo tier"
  (mesma ideia do `lockedHint`/"???" dos upgrades) em vez de um botão
  estático.

**Rare Candy vira injeção parcial de XP, custo ligado a insígnias**
(continua bespoke em `candyShop.ts` — é uma ação repetível por-membro,
não um upgrade de região, então não vira `UpgradeDefinition`):
- Não dá mais +1 nível de graça — injeta `RARE_CANDY_XP_FRACTION` (40%)
  do XP do próximo nível via `gainMemberXp` (que já lida com XP
  fracionário, multi-level-up e evolução sozinho — zero mudança na
  engine de leveling).
- Custo escala pelo nível do alvo E fica mais barato (em %) conforme
  `save.badges.length` cresce (`RARE_CANDY_BADGE_DISCOUNT_PER_BADGE`,
  até `RARE_CANDY_MAX_BADGE_DISCOUNT` = 60%).

## Verificação

`tsc -b --noEmit` limpo, `oxlint` limpo. `candyShop.test.ts` reescrito
(tiers de Reforço, fração de XP + desconto por insígnia do Rare Candy).

## O que ainda falta

- Conteúdo só em Kanto (`content/gen1/upgrades.ts`) — rollout pras outras
  8 regiões é repetição mecânica idêntica ao precedente já feito 2x pro
  Padrão 5 (mesmos ids/kinds/gates, só nomes/flavors localizados), tratado
  como trabalho de conteúdo subsequente.
- Fase 2 opcional descartada por ora: Rare Candy "pequeno vs. grande" (2
  botões por linha do roster) — a mecânica atual (fração fixa de 40%) já
  resolve o problema central ("não trivializar a curva"), a variante fica
  pra depois se fizer falta.
- Números (custos, frações, tiers) são um primeiro palpite — mesmo
  tratamento de "Sprint 25 Balanceamento" de todo o resto do jogo:
  `tests/simulations/progression.sim.test.ts` é onde a curva real se
  confirma ou se ajusta depois de testado ao vivo.
