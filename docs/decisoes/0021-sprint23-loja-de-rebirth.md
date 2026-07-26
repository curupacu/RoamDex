# 0021 — Sprint 23: Insígnias e Loja de Rebirth

## Contexto
Sprint 23 do roadmap (seção 9): moeda de Insígnias (ganha por Elite Four
vencida + marcos da run) e ~10 upgrades permanentes que sobrevivem ao
rebirth, com UI própria.

## Decisão

- **Ambiguidade de nome resolvida por separação de campo, não de palavra.**
  O roadmap usa "insígnia" tanto pra insígnia de ginásio (`save.badges`,
  por-run, já existe desde o Sprint 20) quanto pra moeda permanente da Loja
  de Rebirth (seção 9). São conceitos diferentes que o próprio design doc
  nomeia igual — mantive o texto de UI como "Insígnias" (fiel ao roadmap),
  mas o campo do save é `insignias: number` (moeda, nunca reseta),
  totalmente separado de `badges: string[]` (ids de ginásio, reseta a cada
  rebirth). Sem risco de colisão de dado, só de nome em português.
- **Fórmula de "Elite Four vencida + marcos da run" (provisória, como toda
  curva econômica do jogo até aqui):** `10` de base por vencer o Campeão +
  `1` por insígnia de ginásio da run (`badges.length`) + `1` a cada 100.000
  doces acumulados na run (`lifetimeCandies`). Calculada em
  `insigniasEarned` (`systems/rebirth/rebirth.ts`) a partir do save **antes**
  do reset, somada ao saldo permanente dentro de `performRebirth`. Sprint 25
  é quem tunga isso com dado real de múltiplos rebirths.
- **7 upgrades, não ~10 arredondado pra baixo de propósito.** A pesquisa em
  `docs/PESQUISA-UPGRADES-COOKIE-CLICKER.md` (pedida depois da queixa
  "upgrades genéricos demais" do BACKLOG) mostra que preencher até um número
  redondo com reskins do mesmo padrão é exatamente o problema que o dono do
  projeto já reclamou — preferi 7 alavancas genuinamente diferentes
  (`content/rebirthShop.ts`) a inflar pra 10 com duplicatas de "+X% CPS
  Tier 2/3". Todas seguem o padrão "building" (compra infinita, custo
  ×1.6 por nível) exceto uma:
  - `first-run-candies`, `muscle-memory`, `productive-colony`,
    `ancestral-training`, `wild-instinct`, `keen-nose`: infinitas, cada uma
    afeta um sistema diferente (doces iniciais, nível inicial, CPS, XP,
    velocidade de spawn, chance de raro).
  - `second-pokeball`: `maxLevel: 1`, cara de propósito — é o item de
    "rede de segurança" tardia que o roadmap descreve.
- **Custo escala ×1.6 por nível, não ×1.15** (a curva dos upgrades da run em
  `content/gen1/upgrades.ts`) — Insígnias só chegam uma vez por rebirth
  (minutos/horas de jogo cada), não por segundo, então a curva precisa
  morder mais cedo pra não ficar plana por dezenas de rebirths.
- **Todos os bônus são fatores multiplicativos ≥1** (`1 + nível×efeito`),
  mesma convenção de `economyMultiplier` (`systems/economy/typeBonuses.ts`)
  — CPS, XP, velocidade de spawn selvagem e chance de raro só multiplicam
  em cima do fator que já existia, sem introduzir uma segunda convenção de
  "bônus aditivo" no meio do código.
- **`second-pokeball` (Segunda Pokébola)**: ao falhar a primeira Pokébola,
  rola de novo automaticamente uma vez (mesma fórmula de `rollCapture`,
  mesmo bônus de tipo) antes de considerar que o Pokémon fugiu. Fica em
  `App.tsx` (`handleCaptureWild`), não em `systems/capture/capture.ts`, pra
  não acoplar a lógica de captura em si ao save de upgrades permanentes —
  mesmo espírito de `capture.ts` continuar "sem saber" de tipos/upgrades,
  só recebendo multiplicadores prontos.
- **`insignias`/`rebirthUpgrades` no `SaveData` v9**, campos novos, migração
  8→9 backfilla `0`/`{}`.

## Escopo desta entrega
Moeda + loja + integração dos 7 bônus. Nenhum upgrade novo depende de
conteúdo da Gen 2 (que ainda não existe) nem do slot de time extra em
batalha (o próprio roadmap já marca esse item como "(futuro)").
