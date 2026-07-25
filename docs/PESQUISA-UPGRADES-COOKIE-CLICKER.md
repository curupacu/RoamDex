# Pesquisa — como o Cookie Clicker estrutura upgrades

> Pesquisa pedida pelo dono do projeto em 2026-07-25, ligada ao item "Upgrades
> genéricos demais" do `docs/BACKLOG.md`. Só levantamento de como o jogo de
> referência faz — nenhuma decisão tomada ainda, nenhum código mudado. Serve
> de insumo pra sessão de brainstorm que o backlog já pede antes de codar
> upgrades novos.

## O problema que motivou a pesquisa

Hoje (`content/gen1/upgrades.ts`) todo upgrade do RoamDex segue o mesmo molde:
compra infinita, custo `base×1.15^comprados`, efeito linear fixo por compra
(+N doces/clique ou +N CPS). É exatamente o padrão de **building** do Cookie
Clicker (tipo Cursor/Grandma) — só que o Cookie Clicker usa esse padrão para
UMA categoria de coisa (os prédios) e reserva um sistema totalmente diferente
para "upgrades" de verdade. O RoamDex só tem a primeira categoria.

## Os 4 padrões de upgrade do Cookie Clicker

### 1. Building (empilhável) — o que o RoamDex já tem
Compra quantos quiser do mesmo item; custo sobe ~1.15x a cada compra; efeito
soma linear. Exemplo: **Grandma** — 100 doces a primeira, +1 CpS cada,
`1.15^comprados`. É a base do jogo, mas sozinha fica "genérica" — é
literalmente o que o dono do projeto reclamou.

### 2. Cadeia de upgrade de compra única (o "upgrade da mãozinha")
Uma sequência de upgrades **ligados ao mesmo alvo** (o Cursor), cada um
comprado **uma vez só**, e cada um só aparece depois que o anterior foi
comprado (ou que você atinge um marco de quantidade possuída daquele
prédio). Cada tier é estruturalmente diferente do anterior, não só "mais
forte":

| Upgrade | Precisa possuir | Custo | Efeito |
|---|---|---|---|
| Reinforced index finger | 1 cursor | 100 | Cursor 2× eficiente |
| Carpal tunnel prevention cream | 1 cursor | 500 | Cursor 2× eficiente |
| Ambidextrous | 10 cursores | 10.000 | Cursor 2× eficiente |
| Thousand fingers | 25 cursores | 100.000 | Cursor ganha +0.1 CpS **por cada prédio não-Cursor que você tem** (efeito muda de tipo, não só de número) |
| Million fingers | 50 cursores | 10M | Multiplica o ganho do Thousand fingers por 5× |
| Billion/Trillion/... fingers | 100, 150, 200... cursores | escalando | Multiplica por 10×, 20×, 20×... cada tier |

O pulo do gato: os 3 primeiros tiers são só "dobra o efeito" (repetitivo,
como o RoamDex hoje), mas a partir do 4º tier (**Thousand fingers**) o
upgrade muda de NATUREZA — passa a escalar com algo que não é o próprio
Cursor (a quantidade de OUTROS prédios). Isso é o que dá "personalidade":
o upgrade conta uma mini-história (dedo reforçado → creme → sem-dor →
agora usa mil dedos pra ajudar em tudo que você tem).

### 3. Upgrade de sinergia entre dois sistemas ("grandmas temáticas")
Aparecem quando você tem **15 de um prédio específico + 1 Grandma**, e cada
uma é temada nesse prédio (Farmer grandmas, Miner grandmas, Witch grandmas,
Cosmic grandmas...). Efeito de mão dupla: dobra a eficiência da Grandma E dá
um bônus percentual crescente ao prédio-tema (ex.: Farmer grandmas = Fazendas
+1% CpS por Grandma possuída — quanto mais Grandma você tem DEPOIS de
comprar essa, mais forte fica a Fazenda). Isso cria motivo pra investir em
duas coisas ao mesmo tempo, não só na mais eficiente isoladamente.

### 4. Multiplicador global por marco (Kitten upgrades)
Não são amarrados a UM prédio — dão um multiplicador percentual em **toda a
produção do jogo**, e desbloqueiam por marco de progresso (no Cookie
Clicker, número de conquistas desbloqueadas). Custo altíssimo, mas o efeito
composto (multiplicativo entre tiers) domina o late-game. É o "prêmio por
ter jogado bastante e feito de tudo", não por focar em uma coisa só.

## Resumo da diferença de personalidade

| Padrão | Compra | Escala com | O que dá "sabor" |
|---|---|---|---|
| Building (RoamDex hoje) | Infinita | Nada além de si mesmo | Nenhum — é só número maior |
| Cadeia tier (mãozinha) | Única, por tier | Marco de posse do próprio alvo | Efeito muda de tipo a cada tier (dobra → escala com outra coisa) |
| Sinergia (grandma temática) | Única | Cruza dois sistemas (15 de X + 1 de Y) | Recompensa combinar investimentos |
| Marco global (kitten) | Única | Progresso geral (conquistas) | Prêmio por jogar amplo, não fundo |

## Ideias de aplicação pro RoamDex (rascunho — não decidido, discutir com o dono)

Mapeando pros sistemas que já existem no jogo (`content/gen1/upgrades.ts`,
`systems/team/roster` para Pokémon possuídos, `save.badges` pra insígnias):

- **Cadeia tier nos upgrades de clique/CPS atuais**: em vez de só empilhar
  infinito, cada upgrade atual vira o "tier 1-3" (dobra simples) e ganha um
  tier 4+ que muda de natureza — ex. "Fúria Pokémon" (hoje só +150
  doces/clique) evoluir pra um tier que dá bônus por Pokémon **capturado**
  no roster, não por comprado de novo.
- **Sinergia com o time/tipos**: um upgrade que só aparece com 15 de algum
  upgrade de CPS comprado + um Pokémon de tipo específico no time ativo —
  ecoa o sistema de bônus de tipo que já existe (`systems/economy/typeBonuses.ts`)
  em vez de inventar um sistema novo do zero.
- **Marco global amarrado a insígnias**: um multiplicador percentual em
  tudo, desbloqueado por número de ginásios vencidos (`save.badges.length`)
  em vez de "conquistas" (que o RoamDex não tem) — reaproveita um dado que
  já existe no save.
- Tudo isso é só direção, não spec — precisa da sessão de brainstorm que o
  `docs/BACKLOG.md` já pede antes de virar `UpgradeDefinition` de verdade.

## Fontes
- [Upgrades — The Cookie Clicker Wiki](https://cookieclicker.wiki.gg/wiki/Upgrades)
- [Cursor — The Cookie Clicker Wiki](https://cookieclicker.wiki.gg/wiki/Cursor)
- [Grandma — The Cookie Clicker Wiki](https://cookieclicker.wiki.gg/wiki/Grandma)
- [Kitten — The Cookie Clicker Wiki](https://cookieclicker.wiki.gg/wiki/Kitten)
