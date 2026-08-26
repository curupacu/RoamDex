# Esqueleto de pesquisa — Sinnoh a Paldea (Gen 4–9)

> Documento de pesquisa/design, nível "esqueleto": iniciais, ordem de
> ginásios/líderes e Elite Four/Campeão de cada região, mais qualquer
> diferença estrutural que quebre o padrão "8 ginásios lineares + Elite Four
> de 4 + gate por doces acumulados" que o jogo usa hoje. **Não tem tabela de
> encontro selvagem rota-a-rota nem nível/time exato de treinador** — isso é
> o próximo passo, do mesmo jeito que foi feito pra Hoenn em
> `docs/ROTAS-HOENN.md` (WebFetch ao vivo na Bulbapedia, região por região).
> Identidades/tipos de líder abaixo são conhecimento de jogo bem estabelecido
> (baixo risco de erro); **times exatos com nível não estão aqui de
> propósito** — foi o pedido explícito do dono do projeto pra não gastar
> tempo nisso agora.
>
> Gen 3 (Hoenn) já tem pesquisa completa em `docs/ROTAS-HOENN.md` — não
> repetida aqui.

---

## Gen 4 — Sinnoh (Diamond/Pearl/Platinum)

- **Dex nacional:** 387–493 (107 espécies) — já baixado em `gen4.json`.
- **Iniciais:** Turtwig (Grama), Chimchar (Fogo), Piplup (Água).
- **Encaixe no padrão do jogo:** bom — 8 ginásios lineares, Elite Four de 4 +
  Campeã. Sem ajuste estrutural necessário.

| # | Líder | Cidade | Tipo |
|---|---|---|---|
| 1 | Roark | Oreburgh City | Rock |
| 2 | Gardenia | Eterna City | Grass |
| 3 | Maylene | Veilstone City | Fighting |
| 4 | Crasher Wake | Pastoria City | Water |
| 5 | Fantina | Hearthome City | Ghost |
| 6 | Byron | Canalave City | Steel |
| 7 | Candice | Snowpoint City | Ice |
| 8 | Volkner | Sunyshore City | Electric |

**Elite Four:** Aaron (Bug) → Bertha (Ground) → Flint (Fire) → Lucian
(Psychic). **Campeã:** Cynthia (time misto, sem tipo fixo — considerada uma
das campeãs mais fortes da franquia).

---

## Gen 5 — Unova (Black/White/Black 2/White 2)

- **Dex nacional:** 494–649 (156 espécies) — já baixado em `gen5.json`.
- **Iniciais:** Snivy (Grama), Tepig (Fogo), Oshawott (Água).
- **Encaixe no padrão do jogo:** bom, com uma ressalva — o primeiro ginásio
  (Striaton City) tem **3 líderes** (Cilan/Chili/Cress, Grama/Fogo/Água) e o
  jogo só deixa enfrentar o que é fraco contra o inicial do jogador; os
  outros dois viram batalhas normais de NPC depois. Precisa de uma decisão
  de design pequena (qual dos 3 vira "o líder oficial" no conteúdo do jogo,
  ou modelar a escolha condicional).

| # | Líder (Black/White) | Cidade | Tipo |
|---|---|---|---|
| 1 | Cilan/Chili/Cress (trio) | Striaton City | Grass/Fire/Water |
| 2 | Lenora | Nacrene City | Normal |
| 3 | Burgh | Castelia City | Bug |
| 4 | Elesa | Nimbasa City | Electric |
| 5 | Clay | Driftveil City | Ground |
| 6 | Skyla | Mistralton City | Flying |
| 7 | Brycen | Icirrus City | Ice |
| 8 | Drayden (Black) / Iris (White) | Opelucid City | Dragon |

**Elite Four:** Shauntal (Ghost) → Marshal (Fighting) → Grimsley (Dark) →
Caitlin (Psychic). **Campeão:** Alder (Black/White, misto) — em Black
2/White 2 o campeão passa a ser Iris e a ordem/composição de alguns ginásios
muda (Roxie substitui Burgh, Marlon é adicionado); tratar B2/W2 como versão
alternativa a decidir, não pesquisado em detalhe aqui.

---

## Gen 6 — Kalos (X/Y)

- **Dex nacional:** 650–721 (72 espécies) — já baixado em `gen6.json`.
- **Iniciais:** Chespin (Grama), Fennekin (Fogo), Froakie (Água).
- **Encaixe no padrão do jogo:** bom — 8 ginásios lineares, Elite Four de 4 +
  Campeã. Sem ajuste estrutural necessário.

| # | Líder | Cidade | Tipo |
|---|---|---|---|
| 1 | Viola | Santalune City | Bug |
| 2 | Grant | Cyllage City | Rock |
| 3 | Korrina | Shalour City | Fighting |
| 4 | Ramos | Coumarine City | Grass |
| 5 | Clemont | Lumiose City | Electric |
| 6 | Valerie | Laverre City | Fairy |
| 7 | Olympia | Anistar City | Psychic |
| 8 | Wulfric | Snowbelle City | Ice |

**Elite Four:** Malva (Fire) → Siebold (Water) → Wikstrom (Steel) → Drasna
(Dragon). **Campeã:** Diantha (misto, sem tipo fixo).

---

## Gen 7 — Alola (Sun/Moon/Ultra Sun/Ultra Moon)

- **Dex nacional:** 722–809 (88 espécies) — já baixado em `gen7.json`.
- **Iniciais:** Rowlet (Grama), Litten (Fogo), Popplio (Água).
- **⚠️ Não encaixa no padrão do jogo — precisa de decisão de design antes de
  codificar.** Alola **não tem ginásios**: tem o **sistema de Trials**, 4
  ilhas com Capitães de Trial (desafio temático + batalha contra um "Totem
  Pokémon" gigante, não um treinador humano no formato ginásio) e um
  "Kahuna" por ilha no fim de cada trilha insular. A "Elite Four" também é
  diferente — é a Alola Pokémon League, com os próprios Kahunas como membros
  (Hala, Olivia, Acerola, Kahili) e o Campeão é Professor Kukui (Sun/Moon) ou
  Hau (Ultra Sun/Ultra Moon). Não dá pra simplesmente listar "8 ginásios" —
  as opções são: (a) adaptar os Capitães de Trial + Totem como o equivalente
  a "ginásio" (só existem 7-9 trials dependendo da versão, não 8), ou (b)
  redesenhar o gate de progressão de Alola sem depender de "8 insígnias".
  **Alinhar com o dono do projeto antes de implementar esta região.**

Capitães de Trial (referência, não é lista de "8 ginásios"): Ilima (Normal),
Lana (Water), Kiawe (Fire), Mallow (Grass), Sophocles (Electric), Acerola
(Ghost, também Elite Four), Mina (Fairy, só em Ultra Sun/Moon).

---

## Gen 8 — Galar (Sword/Shield)

- **Dex nacional:** 810–905 (96 espécies, inclui formas de Legends Arceus
  que entraram nesse intervalo antes do lançamento da Gen 9) — já baixado em
  `gen8.json`.
- **Iniciais:** Grookey (Grama), Scorbunny (Fogo), Sobble (Água).
- **⚠️ Não encaixa perfeitamente — duas rupturas do padrão.** (1) Os
  ginásios são **Gym Stadium**, formato de arena de estádio com desafio
  antes da luta (não é só "andar até o líder"), e a lista **muda entre
  Sword e Shield** (4º e 6º ginásio têm líderes diferentes por versão). (2)
  Galar **não tem Elite Four tradicional** — o pós-jogo é a Champion Cup,
  um torneio de eliminação direta contra vários rivais e por fim o Campeão,
  sem 4 membros fixos guardando o portão. Precisa de decisão de design:
  simplificar a Champion Cup pra caber no molde "Elite Four de 4 + Campeão"
  já usado nas outras regiões, ou aceitar que Galar tem uma estrutura
  diferente.

| # | Líder (Sword) | Líder (Shield) | Cidade | Tipo |
|---|---|---|---|---|
| 1 | Milo | Milo | Turffield | Grass |
| 2 | Nessa | Nessa | Hulbury | Water |
| 3 | Kabu | Kabu | Motostoke | Fire |
| 4 | Bea | Allister | Stow-on-Side | Fighting / Ghost |
| 5 | Opal | Opal | Ballonlea | Fairy |
| 6 | Gordie | Melony | Circhester | Rock / Ice |
| 7 | Piers | Piers | Spikemuth | Dark |
| 8 | Raihan | Raihan | Hammerlocke | Dragon |

**Campeão:** Leon (usa Charizard, sem tipo fixo de time).

---

## Gen 9 — Paldea (Scarlet/Violet)

- **Dex nacional:** 906–1025 (120 espécies, inclui conteúdo de DLC) — já
  baixado em `gen9.json`.
- **Iniciais:** Sprigatito (Grama), Fuecoco (Fogo), Quaxly (Água).
- **⚠️ Maior ruptura estrutural de todas — precisa de decisão de design
  antes de codificar.** Paldea é **mundo aberto**, com **três trilhas
  paralelas independentes** que o jogador escolhe em qualquer ordem, não uma
  sequência linear de 8 ginásios:
  1. **Victory Road** — os 8 ginásios de verdade (lista abaixo).
  2. **Starfall Street** — 5 bases do Team Star (chefes temáticos por tipo,
     não são "ginásios" no sentido clássico).
  3. **Path of Legends** — 5 Titã Pokémon (batalhas de perseguição/fuga
     contra um Pokémon gigante, mecânica bem diferente de batalha normal).
  Só depois de completar as três trilhas (ou uma combinação suficiente) o
  jogo libera a "Academy Ace Tournament", que é o equivalente a Elite
  Four+Campeã aqui. Encaixar isso no molde "8 ginásios lineares com gate por
  doces acumulados" do jogo exige uma decisão real: simplificar pra só usar
  a trilha de ginásios (ignorando Team Star/Titãs) e tratar como se fosse
  linear, ou desenhar as três trilhas como conteúdo paralelo de verdade
  (bem mais trabalho). **Não decidir isso sem alinhar com o dono do
  projeto.**

| # | Líder | Cidade | Tipo |
|---|---|---|---|
| 1 | Katy | Cortondo | Bug |
| 2 | Brassius | Artazon | Grass |
| 3 | Iono | Levincia | Electric |
| 4 | Kofu | Cascarrafa | Water |
| 5 | Larry | Medali | Normal |
| 6 | Ryme | Montenevera | Ghost |
| 7 | Tulip | Alfornada | Psychic |
| 8 | Grusha | Glaseado | Ice |

**Elite Four (Academy):** Rika (Ground) → Poppy (Steel) → Larry (Flying —
segunda aparição dele, tipo diferente do ginásio) → Hassel (Dragon).
**Campeã:** Geeta (misto).

---

## Resumo — o que fazer primeiro na próxima leva

1. **Sinnoh e Kalos são "drop-in"** — mesmo formato de Kanto/Johto/Hoenn,
   sem decisão de design pendente. São os candidatos óbvios pra próxima
   pesquisa completa (rota-a-rota, no molde de `docs/ROTAS-HOENN.md`).
2. **Unova precisa de uma micro-decisão** (qual dos 3 líderes de Striaton
   vira o conteúdo "oficial" do ginásio 1) mas fora isso também é linear.
3. **Alola, Galar e Paldea exigem decisão de design antes de qualquer
   pesquisa de rota** — não são só "mais uma região", são estruturas
   diferentes do que o jogo já modela. Vale decidir isso com o dono do
   projeto antes de investir tempo de pesquisa nelas.
