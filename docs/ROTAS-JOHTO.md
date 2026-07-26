# Rotas de Johto — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Segue o mesmo modelo de `docs/ROTAS-KANTO.md`
> (Sprint 20), agora pra Johto (Sprint 24): o jogador anda por uma **rota**, um
> selvagem aparece periodicamente, ele batalha, evolui e fica mais forte; a
> qualquer momento pode tentar o ginásio daquela área. Ao vencer o ginásio,
> destrava a próxima rota. Os iniciais de Johto (Chikorita #152, Cyndaquil
> #155, Totodile #158) entram no nível 5, igual ao padrão já usado em Kanto —
> isso já está resolvido em código, não é assunto deste documento.

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem "a pé"/surf da versão
  **Pokémon Gold** (Geração II). Nenhum número foi inventado — cada tabela
  abaixo tem a URL da página usada logo abaixo dela.
- Quando Gold e Silver divergiam numa mesma rota (troca de espécie por versão,
  padrão muito comum em Gen II — ex: Caterpie/Weedle, Ledyba/Spinarak,
  Phanpy/Teddiursa), só ficou o que é **exclusivo de Gold**; isso está anotado
  em cada seção onde acontece. Crystal também é mencionado quando muda algo
  relevante.
- **Diferenças de Gen II em relação ao método usado em Kanto** (avisando de
  antemão porque muda a tabela inteira):
  1. **Pesca (Old/Good/Super Rod) foi descartada por completo.** Em Kanto ela
     ainda entrava nas tabelas; aqui não — o jogo não tem mecânica de vara de
     pescar no roadmap atual, e Gen II tem pesca em praticamente toda rota com
     água, o que infla demais o escopo sem necessidade.
  2. **Surf entra na mesma tabela da rota "a pé", sem renormalizar** — mesma
     lógica que Kanto já usava pra Surf (ex: Route 19/21), só que agora é a
     regra geral, não exceção.
  3. **Dungeons com vários andares foram colapsadas numa linha só por
     espécie** (Union Cave, Slowpoke Well, Mt. Mortar, Ice Path, Victory
     Road): a % de cada andar em que a espécie aparece foi **somada** (não
     renormalizada — funciona como peso relativo pra sorteio, não como
     probabilidade estrita que precisa fechar em 100%) e o nível virou uma
     faixa mín–máx cobrindo todos os andares. Isso é diferente de Kanto, que
     mantinha tabela por andar — aqui simplificamos mais.
  4. **Headbutt (árvore) e Rock Smash foram descartados**, pelo mesmo motivo
     da pesca: dependem de golpe/HM que não faz parte do loop de exploração do
     jogo (andar pela rota e apanhar espécie selvagem "ambiente").
  5. **Gen II tem tabela de encontro dividida por horário (Manhã/Dia/Noite)**,
     mecânica que não existe em Gen I — o jogo não tem ciclo dia/noite no
     roadmap atual. Pra não inventar uma mecânica nova, a janela Manhã/Dia foi
     tratada como o "pool principal" da rota e a Noite entrou como linhas
     extras na mesma tabela, com o método marcado "à noite" e sem
     renormalizar contra o pool do dia — mesmo espírito do item 2 (Surf
     dobrado no pool sem reajustar as %).
- **Import importante (igual Kanto):** a geografia real de Johto não é linear
  — em especial, Olivine City é visitada fisicamente a caminho de Cianwood
  (pra pegar o barco), mas o ginásio da Jasmine só abre depois que Chuck é
  derrotado e o SecretPotion é trazido pra curar a Amphy. Pra virar uma
  progressão simples de "rota → ginásio → próxima rota", agrupei os locais
  reais em **8 trechos, na ordem oficial de insígnias** (a mesma ordem que
  aparece no estojo de insígnias do jogo): Zephyr (Falkner) → Hive (Bugsy) →
  Plain (Whitney) → Fog (Morty) → Storm (Chuck) → Mineral (Jasmine) → Glacier
  (Pryce) → Rising (Clair). Cada trecho abaixo diz exatamente quais locais
  reais foram agrupados nele.
- **Qualidade dos dados / o que revisar:** tentei WebFetch direto nas páginas
  da Bulbapedia antes de escrever qualquer número, e a maioria respondeu (as
  URLs citadas abaixo foram, de fato, buscadas ao vivo nesta sessão — não são
  só "conhecimento treinado"). Duas exceções: `Johto_Route_26/27` e
  `Victory_Road_(Johto)` não existem como páginas próprias — o caminho pós-
  Blackthorn até Indigo Plateau reaproveita as rotas numeradas 26–28 que
  fisicamente ficam em Kanto (`Kanto_Route_26`, `Kanto_Route_27`,
  `Kanto_Route_28`) e o **mesmo** Victory Road de Kanto (`Victory_Road_(Kanto)`,
  que tem uma seção de tabela pra Geração II); usei essas URLs corretas e
  anotei a diferença. Como as tabelas de Gen II são bem mais densas que as de
  Gen I (têm a divisão de horário citada acima), a ferramenta de busca
  processa cada página com um modelo auxiliar pra extrair a tabela — em rotas
  com muita divisão Manhã/Dia/Noite (ex: Route 30, 31, 38, 39, 42, 43, 45, 46)
  e nas dungeons colapsadas, os números finais foram limpos/normalizados por
  mim a partir do que a ferramenta retornou e podem ter pequeno desvio da
  tabela fonte. **Recomendo revisão humana pontual dessas tabelas contra a URL
  citada antes de qualquer número entrar em `content/` do jogo** — times de
  líder de ginásio, Elite Four e campeão são de alta confiança (páginas
  simples, sem tabela de horário, conferidas contra conhecimento treinado e
  batendo 100%); as tabelas de rota são a parte que merece o double-check.

---

## Trecho 1 — New Bark Town → Violet (Ginásio 1: Falkner, Zephyr Badge)

Locais reais agrupados: New Bark Town, Route 29, Route 30, Route 31, Violet
City.

**Sugestão de arte de fundo:** New Bark Town como vilarejo pequeno e calmo (o
"início de jornada" de Johto — literalmente o nome da cidade é sobre isso);
Route 29/30/31 como grama baixa e clara ganhando árvores gradualmente; Violet
City com a Sprout Tower ao fundo (torre de madeira alta, silhueta contra o
céu) sinalizando o primeiro ginásio.

### New Bark Town
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Tentacool | 90% | 15–24 | Surf |
| Tentacruel | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/New_Bark_Town
Nota: é aqui que o jogador recebe o inicial (Chikorita/Cyndaquil/Totodile,
nível 5) do Prof. Elm — não é encontro selvagem, só presente único.

### Route 29
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Sentret | 40% | 2–3 | A pé (grama) |
| Pidgey | 55% | 2–4 | A pé (grama) |
| Hoppip | 5% | 3 | A pé (grama) |
| Hoothoot | 85% | 2–4 | A pé (grama, à noite) |
| Rattata | 15% | 2–4 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_29
Nota: em Silver, algumas dessas espécies têm proporção diferente nas mesmas
janelas de horário; mantivemos só a distribuição de Gold.

### Route 30
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Caterpie | 50% | 3–4 | A pé (grama) |
| Metapod | 10% | 4 | A pé (grama) |
| Pidgey | 40% | 2, 4 | A pé (grama) |
| Ledyba | 30% | 3 | A pé (grama) |
| Hoppip | 5% | 4 | A pé (grama) |
| Rattata | 40% | 3–4 | A pé (grama, à noite) |
| Hoothoot | 30% | 4 | A pé (grama, à noite) |
| Poliwag | 20% | 4 | A pé (grama, à noite) |
| Zubat | 5% | 3 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_30
Nota: Weedle/Kakuna substituem Caterpie/Metapod em Silver (troca clássica de
versão em Gen II); mantivemos a linha de Gold.

### Route 31
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Bellsprout | 20% | 3, 5 | A pé (grama) |
| Caterpie | 30% | 4–5 | A pé (grama) |
| Metapod | 15% | 5 | A pé (grama) |
| Pidgey | 30% | 3–5 | A pé (grama) |
| Ledyba | 30% | 4 | A pé (grama) |
| Hoppip | 5% | 5 | A pé (grama) |
| Hoothoot | 40% | 5 | A pé (grama, à noite) |
| Spinarak | 30% | 4 | A pé (grama, à noite) |
| Gastly | 5% | 5 | A pé (grama, à noite) |
| Zubat | 5% | 4 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_31
Nota: Weedle/Kakuna substituem Caterpie/Metapod em Silver, igual Route 30;
tabela desta rota teve mais ruído na extração automática — vale conferir os %
exatos direto na fonte.

### Violet City
Sem tabela de encontro documentada pra área externa da cidade — a Sprout
Tower tem Rattata/Gastly mencionados no texto da página, mas sem tabela de
taxas/níveis publicada. Sem dados confiáveis, não incluído (mesmo tratamento
que Kanto deu ao Underground Path).
Fonte: https://bulbapedia.bulbagarden.net/wiki/Violet_City

### Líder — Falkner (Violet City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Pidgey | 7 |
| 2 | Pidgeotto | 9 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Falkner
Nota: Falkner tem, notavelmente, os Pokémon de nível mais baixo entre todos os
líderes de ginásio de qualquer região — o Pidgeotto já entra "underleveled"
pro ponto do jogo em que aparece. Em Crystal ele ganha um terceiro Pokémon
(Hoothoot); mantivemos o time de Gold (2 Pokémon).

---

## Trecho 2 — Violet → Azalea (Ginásio 2: Bugsy, Hive Badge)

Locais reais agrupados: Route 32, Union Cave, Route 33, Azalea Town (+
Slowpoke Well como sub-área).

**Sugestão de arte de fundo:** Route 32 com grama densa perto de riacho
(muitos Pokémon de água aqui, incluindo Wooper); Union Cave como caverna
clássica, rocha clara/terrosa (é uma das cavernas mais compridas do jogo,
conecta até nas Ruins of Alph); Route 33 volta a grama aberta encostada no
mar; Azalea Town pequena e rural, no meio de floresta.

### Route 32
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Rattata | 40% | 4, 6, 8 | A pé (grama) |
| Ekans | 30% | 4 | A pé (grama) |
| Bellsprout | 30% | 6 | A pé (grama) |
| Mareep | 20% | 6 | A pé (grama) |
| Hoppip | 10% | 6 | A pé (grama) |
| Wooper | 4% | 4 | A pé (grama) |
| Pidgey | 5% | 7 | A pé (grama) |
| Zubat | 1% | 4 | A pé (grama) |
| Wooper | 35% | 6, 8 | A pé (grama, à noite) |
| Gastly | 5% | 7 | A pé (grama, à noite) |
| Hoothoot | 5% | 7 | A pé (grama, à noite) |
| Tentacool | 60% | 15–19 | Surf |
| Tentacruel | 10% | 20–24 | Surf |
| Quagsire | 30% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_32

### Union Cave (1F + B1F + B2F colapsados)
| Pokémon | Peso (soma entre andares) | Nível (faixa) | Método |
|---|---|---|---|
| Zubat | 80% | 5–22 | A pé (caverna) |
| Geodude | 70% | 6–21 | A pé (caverna) |
| Rattata | 50% | 4–22 | A pé (caverna) |
| Sandshrew | 60% | 6–8 | A pé (caverna) |
| Onix | 20% | 6–23 | A pé (caverna) |
| Raticate | 30% | 22 | A pé (caverna) |
| Golbat | 20% | 22 | A pé (caverna) |
| Wooper | 120% | 15–19 | Surf |
| Quagsire | 70% | 15–24 | Surf |
| Tentacool | 60% | 15–19 | Surf |
| Tentacruel | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Union_Cave
Nota: pesos somados entre 1F/B1F/B2F conforme metodologia (não fecham em
100% — são peso relativo, não probabilidade). B2F já dá acesso à água salgada
que conecta a Route 33 (por isso Tentacool/Tentacruel aparecem via Surf junto
de Wooper/Quagsire).

### Route 33
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Rattata | 40% | 6–7 | A pé (grama) |
| Ekans | 30% | 7 | A pé (grama) |
| Hoppip | 35% | 6–8 | A pé (grama) |
| Spearow | 20% | 6 | A pé (grama) |
| Geodude | 20% | 6 | A pé (grama) |
| Zubat | 5% | 4 | A pé (grama) |
| Rattata | 60% | 6–7 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_33

### Slowpoke Well (B1F + B2F colapsados)
| Pokémon | Peso (soma entre andares) | Nível (faixa) | Método |
|---|---|---|---|
| Zubat | 165% | 5–23 | A pé (caverna) |
| Slowpoke | 30% | 6–23 | A pé (caverna) |
| Golbat | 5% | 23 | A pé (caverna) |
| Slowpoke | 190% | 10–24 | Surf |
| Slowbro | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Slowpoke_Well
Nota: dados idênticos entre Gold/Silver/Crystal nesta área segundo a própria
fonte. É o local onde a Team Rocket foi expulsa e o jogador recebe um
Slowpoke via evento — não confundir com o encontro selvagem em si.

### Azalea Town
Sem tabela de encontro documentada pra área externa da cidade (só Headbutt em
árvores, descartado pela metodologia). Sem dados, não incluído.
Fonte: https://bulbapedia.bulbagarden.net/wiki/Azalea_Town

### Líder — Bugsy (Azalea Town)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Metapod | 14 |
| 2 | Kakuna | 14 |
| 3 | Scyther | 16 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Bugsy

---

## Trecho 3 — Azalea → Goldenrod (Ginásio 3: Whitney, Plain Badge)

Locais reais agrupados: Ilex Forest, Route 34, Goldenrod City.

**Sugestão de arte de fundo:** Ilex Forest como sub-área fechada e escura
(copa densa, luz filtrada — mesma vibe que Kanto deu pra Viridian Forest, faz
sentido ser a "floresta labiríntica" de Johto também); Route 34 abrindo de
volta pra grama e beira d'água; Goldenrod City como a maior cidade do jogo —
visual urbano, comercial, quase "capital".

### Ilex Forest
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Caterpie | 50% | 5–6 | A pé (grama) |
| Weedle | 50% | 5–6 | A pé (grama) |
| Pidgey | 5% | 7 | A pé (grama) |
| Zubat | 5% | 5 | A pé (grama) |
| Paras | 15% | 5–6 | A pé (grama) |
| Oddish | 60% | 5–6 | A pé (grama, à noite) |
| Venonat | 30% | 5 | A pé (grama, à noite) |
| Zubat | 25% | 5–6 | A pé (grama, à noite) |
| Paras | 15% | 5–6 | A pé (grama, à noite) |
| Psyduck | 10% | 7 | A pé (grama, à noite) |
| Hoothoot | 5% | 7 | A pé (grama, à noite) |
| Psyduck | 90% | 10–19 | Surf |
| Golduck | 10% | 15–19 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ilex_Forest
Nota: é aqui que a Team Rocket sequestra o Slowpoke e o jogador recebe o
Farfetch'd do velhinho — eventos fixos, não encontro selvagem.

### Route 34
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Rattata | 35% | 11, 13 | A pé (grama) |
| Pidgey | 20% | 12–20 | A pé (grama) |
| Snubbull | 30% | 10 | A pé (grama) |
| Abra | 10% | 10 | A pé (grama) |
| Jigglypuff | 5% | 12 | A pé (grama) |
| Ditto | 5% | 10 | A pé (grama) |
| Tentacool | 90% | 15–24 | Surf |
| Tentacruel | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_34

### Goldenrod City
Sem tabela de encontro selvagem documentada — a única "captura" na cidade é o
Eevee de presente do Bill (evento único, não selvagem). Sem dados, não
incluído.
Fonte: https://bulbapedia.bulbagarden.net/wiki/Goldenrod_City

### Líder — Whitney (Goldenrod City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Clefairy | 18 |
| 2 | Miltank | 20 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Whitney
Nota: o Miltank usa Rollout e é considerado um dos chefes mais duros do jogo
pra esse ponto da progressão, apesar de só ter 2 Pokémon.

---

## Trecho 4 — Goldenrod → Ecruteak (Ginásio 4: Morty, Fog Badge)

Locais reais agrupados: Route 35, National Park, Route 36, Route 37, Ecruteak
City.

**Sugestão de arte de fundo:** Route 35/36/37 como grama alta padrão,
clareando conforme sobe; National Park como sub-área de jardim bem cuidado,
cheio de flores (contraste proposital com o resto — é literalmente um
parque); Ecruteak City com as duas torres (Tin Tower dourada, Burned Tower
carbonizada) dominando o horizonte — cidade antiga, tom místico/xamânico.

### Route 35
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Nidoran♀ | 30% | 12 | A pé (grama) |
| Nidoran♂ | 30% | 12 | A pé (grama) |
| Snubbull | 30% | 12 | A pé (grama) |
| Drowzee | 20% | 14 | A pé (grama) |
| Growlithe | 20% | 13 | A pé (grama) |
| Abra | 10% | 10 | A pé (grama) |
| Pidgey | 5% | 14 | A pé (grama) |
| Jigglypuff | 5% | 12 | A pé (grama) |
| Ditto | 4% | 10 | A pé (grama) |
| Yanma | 1% | 12 | A pé (grama) |
| Hoothoot | 5% | 14 | A pé (grama, à noite) |
| Psyduck | 90% | 15–24 | Surf |
| Golduck | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_35

### National Park
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Caterpie | 50% | 10–12 | A pé (grama) |
| Weedle | 50% | 10–12 | A pé (grama) |
| Metapod | 30% | 10 | A pé (grama) |
| Kakuna | 30% | 10 | A pé (grama) |
| Pidgey | 35% | 10–14 | A pé (grama) |
| Nidoran♀ | 30% | 12 | A pé (grama) |
| Nidoran♂ | 30% | 12 | A pé (grama) |
| Sunkern | 25% | 11–13 | A pé (grama) |
| Ledyba | 20% | 14 | A pé (grama) |
| Hoothoot | 100% | 10–14 | A pé (grama, à noite) |
| Psyduck | 30% | 12 | A pé (grama, à noite) |
| Spinarak | 20% | 14 | A pé (grama, à noite) |
| Venonat | 10% | 10–12 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/National_Park
Nota: o parque também sedia o Bug-Catching Contest (evento com regras
próprias, prêmios por peso do inseto capturado) — fora do escopo desta
tabela, que é só o pool selvagem "normal".

### Route 36
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Nidoran♀ | 30% | 12 | A pé (grama) |
| Nidoran♂ | 30% | 12 | A pé (grama) |
| Pidgey | 25% | 13–15 | A pé (grama) |
| Vulpix | 10% | 13 | A pé (grama) |
| Growlithe | 10% | 13 | A pé (grama) |
| Stantler | 5% | 13 | A pé (grama) |
| Hoothoot | 25% | 13–15 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_36

### Route 37
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Pidgey | 60% | 13, 15 | A pé (grama) |
| Ledyba | 30% | 13 | A pé (grama) |
| Vulpix | 15% | 14, 16 | A pé (grama) |
| Growlithe | 15% | 14, 16 | A pé (grama) |
| Pidgeotto | 5% | 15 | A pé (grama) |
| Hoothoot | 60% | 13, 15 | A pé (grama, à noite) |
| Spinarak | 30% | 13 | A pé (grama, à noite) |
| Stantler | 30% | 15 | A pé (grama, à noite) |
| Noctowl | 5% | 15 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_37

### Ecruteak City
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Poliwag | 90% | 15–24 | Surf |
| Poliwhirl | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ecruteak_City
Nota: Burned Tower e Tin Tower (interiores da cidade, ligados à lenda dos três
cães lendários) não tiveram tabela extraída nesta pesquisa — ficou como ponto
em aberto na seção final.

### Líder — Morty (Ecruteak City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Gastly | 21 |
| 2 | Haunter | 21 |
| 3 | Gengar | 25 |
| 4 | Haunter | 23 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Morty

---

## Trecho 5 — Ecruteak → Cianwood (Ginásio 5: Chuck, Storm Badge)

Locais reais agrupados: Route 38, Route 39, Olivine City (passagem — ginásio
ainda fechado), Route 40, Route 41, Cianwood City.

**Sugestão de arte de fundo:** Route 38/39 como pastagem aberta (é onde ficam
Tauros/Miltank soltos, visual de fazenda); Olivine City com o farol icônico
ao fundo, cidade portuária; Route 40/41 100% aquáticas (travessia de barco/
Surf até a ilha); Cianwood City isolada numa ilha rochosa, clima mais
"tempestuoso" (bate com o tipo do Chuck e o nome do badge, Storm).

### Route 38
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Rattata | 30% | 16 | A pé (grama) |
| Raticate | 30% | 16 | A pé (grama) |
| Meowth | 30% | 16 | A pé (grama) |
| Magnemite | 20% | 16 | A pé (grama) |
| Pidgeotto | 10% | 16 | A pé (grama) |
| Farfetch'd | 10% | 16 | A pé (grama) |
| Miltank | 5% | 13 | A pé (grama) |
| Tauros | 4% | 13 | A pé (grama) |
| Snubbull | 1% | 13 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_38

### Route 39
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Rattata | 30% | 16 | A pé (grama) |
| Raticate | 30% | 17 | A pé (grama) |
| Meowth | 30% | 16 | A pé (grama) |
| Magnemite | 20% | 16 | A pé (grama) |
| Pidgeotto | 10% | 16 | A pé (grama) |
| Farfetch'd | 10% | 16 | A pé (grama) |
| Tauros | 5% | 15 | A pé (grama) |
| Miltank | 5% | 15 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_39

### Olivine City
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Tentacool | 90% | 15–24 | Surf |
| Tentacruel | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Olivine_City
Nota: neste trecho o jogador só **passa** por Olivine (farol, embarque pro
barco de Cianwood) — a Jasmine está presa no farol cuidando da Amphy doente e
não bate ginásio ainda. O combate contra ela só acontece no Trecho 6.

### Route 40
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Tentacool | 90% | 15–24 | Surf |
| Tentacruel | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_40
Nota: rota 100% aquática; a única outra opção de encontro na fonte é Rock
Smash (Krabby/Shuckle), descartada pela metodologia (mecânica fora do loop de
exploração do jogo, mesmo motivo de excluir pesca/Headbutt).

### Route 41
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Tentacool | 70% | 15–24 | Surf |
| Tentacruel | 20% | 20–24 | Surf |
| Mantine | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_41
Nota: rota 100% aquática (Whirl Islands ficam nessa região, mas são área
opcional/pós-jogo — não incluída aqui). Mantine é exclusivo de Gold/Crystal
nesta rota.

### Cianwood City
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Tentacool | 90% | 15–24 | Surf |
| Tentacruel | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Cianwood_City

### Líder — Chuck (Cianwood City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Primeape | 27 |
| 2 | Poliwrath | 30 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Chuck
Nota: é aqui que o jogador pega o SecretPotion na farmácia da cidade, item
necessário pra curar a Amphy da Jasmine e liberar o Trecho 6.

---

## Trecho 6 — volta a Olivine (Ginásio 6: Jasmine, Mineral Badge)

Locais reais agrupados: nenhum local novo — o jogador refaz o caminho de
volta (Route 41/40, ou o barco direto) até Olivine City, agora com o
SecretPotion pra curar a Amphy e liberar o ginásio. Por isso este trecho não
tem tabela de encontro própria: reaproveita a mesma água de Olivine
(Tentacool/Tentacruel via Surf) já listada no Trecho 5. Isso é uma
simplificação deliberada — no jogo real dá pra pegar o Fast Ship direto de
Olivine pra Cianwood e vice-versa, sem precisar surfar pelas rotas 40/41 de
novo; o trecho existe só pra marcar "aqui o jogador enfrenta a Jasmine", igual
ao espírito da nota que Kanto fez sobre o desvio de Route 24/25 até a casa do
Bill.

**Sugestão de arte de fundo:** reaproveitar o mesmo visual do farol de Olivine
do Trecho 5, talvez com luz mais quente/dourada (Amphy curada, clima de
resolução antes do ginásio).

### Líder — Jasmine (Olivine City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Magnemite | 30 |
| 2 | Magnemite | 30 |
| 3 | Steelix | 35 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Jasmine
Nota: Jasmine carrega um Hyper Potion durante a luta (item de treinador, não
afeta o time em si).

---

## Trecho 7 — Olivine/Cianwood → Mahogany (Ginásio 7: Pryce, Glacier Badge)

Locais reais agrupados: Route 42, Mt. Mortar, Lake of Rage, Route 43, Route
44, Mahogany Town.

**Sugestão de arte de fundo:** Route 42 subindo elevação, grama mais fria;
Mt. Mortar como caverna imponente de montanha (é uma dungeon grande, quase
"boss dungeon" regional, tem até um NPC especial lá dentro); Lake of Rage
como lago aberto meio sinistro (é o local do evento do Gyarados vermelho e da
base secundária da Team Rocket — vale um tom mais tenso/nebuloso); Route
43/44 voltando a mata fechada; Mahogany Town pequena e enevoada, já
anunciando o clima gelado de Pryce/Ice Path.

### Route 42
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Ekans | 30% | 13 | A pé (grama) |
| Mankey | 30% | 15 | A pé (grama) |
| Mareep | 30% | 13 | A pé (grama) |
| Spearow | 30% | 14, 16 | A pé (grama) |
| Rattata | 20% | 15 | A pé (grama) |
| Flaaffy | 10% | 15, 17 | A pé (grama) |
| Raticate | 10% | 16 | A pé (grama) |
| Fearow | 5% | 16 | A pé (grama) |
| Arbok | 5% | 15 | A pé (grama) |
| Goldeen | 90% | 15–24 | Surf |
| Seaking | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_42

### Mt. Mortar (1F entrada + 1F fundos + 2F + B1F colapsados)
| Pokémon | Peso (soma entre andares) | Nível (faixa) | Método |
|---|---|---|---|
| Zubat | 125% | 13–17 | A pé (caverna) |
| Geodude | 75% | 13–31 | A pé (caverna) |
| Machop | 65% | 13–16 | A pé (caverna) |
| Rattata | 44% | 14–16 | A pé (caverna) |
| Raticate | 20% | 14–30 | A pé (caverna) |
| Machoke | 30% | 32 | A pé (caverna) |
| Graveler | 30% | 31 | A pé (caverna) |
| Golbat | 5% | 30 | A pé (caverna) |
| Marill | 1% | 15 | A pé (caverna) |
| Goldeen | 180% | 15–29 | Surf |
| Seaking | 20% | 20–29 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Mt._Mortar
Nota: pesos somados entre as 4 seções (entrada, fundos, 2F, B1F) conforme
metodologia. Existe também um Tyrogue de presente (nível 10, dado pelo NPC
Kiyo após um combate) — evento único, não encontro selvagem.

### Lake of Rage
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Magikarp | 90% | 10–19 | Surf |
| Gyarados | 10% | 15–19 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lake_of_Rage
Nota: o Gyarados vermelho lendário é um evento fixo de história (nível 30,
sempre macho), não faz parte deste pool aleatório.

### Route 43
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Sentret | 30% | 15 | A pé (grama) |
| Pidgeotto | 25% | 17 | A pé (grama) |
| Farfetch'd | 20% | 16 | A pé (grama) |
| Furret | 15% | 15–17 | A pé (grama) |
| Flaaffy | 30% | 15 | A pé (grama) |
| Mareep | 10% | 15 | A pé (grama) |
| Raticate | 5% | 17 | A pé (grama) |
| Venonat | 5% | 16 | A pé (grama) |
| Noctowl | 20% | 17 | A pé (grama, à noite) |
| Venonat | 15% | 16 | A pé (grama, à noite) |
| Magikarp | 100% | 10–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_43

### Route 44
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Lickitung | 40% | 22–26 | A pé (grama) |
| Weepinbell | 35% | 22–24 | A pé (grama) |
| Tangela | 30% | 23 | A pé (grama) |
| Bellsprout | 20% | 22 | A pé (grama) |
| Poliwag | 90% | 20–29 | Surf |
| Poliwhirl | 10% | 25–29 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_44

### Mahogany Town
Sem tabela de encontro selvagem documentada pra área externa da cidade (a
base secreta da Team Rocket fica embaixo do Mart, mas isso é dungeon
opcional/história, não pool selvagem comum). Sem dados, não incluído.
Fonte: https://bulbapedia.bulbagarden.net/wiki/Mahogany_Town

### Líder — Pryce (Mahogany Town)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Seel | 27 |
| 2 | Dewgong | 29 |
| 3 | Piloswine | 31 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Pryce

---

## Trecho 8 — Mahogany → Blackthorn (Ginásio 8: Clair, Rising Badge)

Locais reais agrupados: Ice Path, Route 45, Route 46, Blackthorn City (+
Dragon's Den como área bônus opcional).

**Sugestão de arte de fundo:** Ice Path como caverna de gelo genuína — piso
escorregadio, azul pálido, estalactites de gelo (visualmente a área mais fria
do jogo até aqui); Route 45/46 voltando a terreno rochoso/montanhoso;
Blackthorn City pequena e tradicional, no sopé de montanhas nevadas — a
"cidade dos treinadores de dragão", clima quase de vila isolada de vento.

### Ice Path (1F + B1F + B2F + B3F colapsados)
| Pokémon | Peso (soma entre andares) | Nível (faixa) | Método |
|---|---|---|---|
| Swinub | 160% | 21–25 | A pé (caverna) |
| Golbat | 120% | 22–24 | A pé (caverna) |
| Zubat | 100% | 22–24 | A pé (caverna) |
| Delibird | 80% | 22–24 | A pé (caverna) |
| Jynx | 20% | 22–24 | A pé (caverna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ice_Path
Nota: pesos somados entre os 4 andares. Em Silver, Zubat é bem mais raro e
Jynx mais comum; em Crystal aparece Sneasel também (não incluído aqui, é
específico de Crystal).

### Route 45
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Graveler | 40% | 23–27 | A pé (grama) |
| Geodude | 30% | 23 | A pé (grama) |
| Gligar | 20% | 24 | A pé (grama) |
| Phanpy | 10% | 20 | A pé (grama) |
| Skarmory | 5% | 27 | A pé (grama) |
| Magikarp | 100% | 5–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_45
Nota: Phanpy é exclusivo de Gold nesta rota; Teddiursa é o equivalente de
Silver (mesmo nível/chance, espécie trocada).

### Route 46
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Spearow | 35% | 2–3 | A pé (grama) |
| Geodude | 40% | 2–3 | A pé (grama) |
| Rattata | 20% | 2 | A pé (grama) |
| Jigglypuff | 5% | 3, 5 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Johto_Route_46
Nota: fonte lista essas taxas como diurnas; em Silver/Crystal a distribuição
noturna muda bastante (Rattata sobe pra 50%, Geodude pra 45%) — como o jogo
não modela dia/noite, mantivemos só a tabela de Gold sem tentar reconstituir
a divisão.

### Blackthorn City
Sem tabela de encontro selvagem documentada pra área externa da cidade. Sem
dados, não incluído.
Fonte: https://bulbapedia.bulbagarden.net/wiki/Blackthorn_City

### Dragon's Den (área bônus opcional, não bloqueia progressão)
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Magikarp | 90% | 10–19 | Surf |
| Dratini | 10% | 10–14 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Dragon%27s_Den
Nota: é onde acontece o teste do velhinho pra ganhar a Dragon Fang (avaliação
de como o jogador trata os próprios Pokémon) — evento de história, não afeta
este pool. Incluído como área bônus opcional porque não é obrigatória pra
pegar a Rising Badge nem pra avançar de trecho.

### Líder — Clair (Blackthorn City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Dragonair | 37 |
| 2 | Dragonair | 37 |
| 3 | Dragonair | 37 |
| 4 | Kingdra | 40 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Clair
Nota: Clair carrega Full Heal e Full Restore (itens de treinador, não afetam
o time). É a última insígnia de Johto (Rising Badge).

---

## Rumo a Indigo Plateau — Elite Four + Campeão

Com as 8 insígnias de Johto na mão, o caminho até a Elite Four **não** é uma
"Victory Road de Johto" separada — Bulbapedia não tem essa página. Na
Geração II, o jogador segue pelas rotas numeradas 26–28 (continuação da
numeração de Johto, mas fisicamente já em território de Kanto) até chegar no
**mesmo** Victory Road de Kanto usado no jogo de Gen I, que dá em Indigo
Plateau. Isso é o inverso do que acontecia em Kanto (onde o Victory Road vinha
**antes** do último ginásio, Giovanni) — aqui ele vem **depois** do último
ginásio (Clair). Sinalizando isso explicitamente porque muda a ordem em
relação ao padrão que Kanto estabeleceu.

**Sugestão de arte de fundo:** Route 26/27/28 num tom de transição — grama
ainda johtiana mas ficando mais seca/rochosa conforme se aproxima de Kanto;
Victory Road reaproveita o mesmo visual imponente já sugerido no doc de Kanto
(caverna de montanha dura, tons frios, neblina); Indigo Plateau como salão
formal grandioso, igual sugerido em Kanto.

### Route 26 (numeração de Johto, localização física em Kanto)
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Doduo | 40% | 28–30 | A pé (grama) |
| Sandslash | 30% | 28 | A pé (grama) |
| Ponyta | 20% | 32 | A pé (grama) |
| Dodrio | 5% | 30 | A pé (grama) |
| Raticate | 4% | 30 | A pé (grama) |
| Quagsire | 1% | 30 | A pé (grama) |
| Tentacool | 90% | 25–34 | Surf |
| Tentacruel | 10% | 30–34 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_26

### Route 27 (numeração de Johto, localização física em Kanto)
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Doduo | 50% | 28–30 | A pé (grama) |
| Raticate | 30% | 28 | A pé (grama) |
| Arbok | 30% | 28 | A pé (grama) |
| Quagsire | 10% | 28 | A pé (grama) |
| Sandslash | 5% | 30 | A pé (grama) |
| Ponyta | 5% | 32 | A pé (grama) |
| Dodrio | 5% | 30 | A pé (grama) |
| Noctowl | 40% | 28–32 | A pé (grama, à noite) |
| Tentacool | 90% | 15–24 | Surf |
| Tentacruel | 10% | 20–24 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_27

### Route 28 (numeração de Johto, localização física em Kanto — sopé do Mt. Silver)
| Pokémon | Chance (Gold) | Nível | Método |
|---|---|---|---|
| Ponyta | 30% | 40 | A pé (grama) |
| Tangela | 30% | 39 | A pé (grama) |
| Rapidash | 10% | 42 | A pé (grama) |
| Arbok | 10% | 42 | A pé (grama) |
| Ursaring | 20% | 40 | A pé (grama) |
| Doduo | 5% | 41 | A pé (grama) |
| Dodrio | 5% | 43 | A pé (grama) |
| Poliwhirl | 40% | 40 | A pé (grama, à noite) |
| Golbat | 30% | 40–42 | A pé (grama, à noite) |
| Sneasel | 10% | 40 | A pé (grama, à noite) |
| Poliwag | 90% | 35–44 | Surf |
| Poliwhirl | 10% | 40–44 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_28
Nota: Ursaring é exclusivo de Gold aqui; Donphan é o equivalente de Silver.
Mt. Silver (onde Red, o campeão de Gen I, pode ser enfrentado pós-jogo) fica
nesta região, mas é conteúdo endgame — fora do escopo deste doc.

### Victory Road (mesmo local de Kanto, tabela de Geração II)
| Pokémon | Chance (Gold, aprox.) | Nível | Método |
|---|---|---|---|
| Graveler | 25% | 32–40 | A pé (caverna) |
| Golbat | 20% | 32–34 | A pé (caverna) |
| Ursaring | 20% | 33 | A pé (caverna) |
| Onix | 15% | 32–36 | A pé (caverna) |
| Rhyhorn | 15% | 32–35 | A pé (caverna) |
| Sandslash | 3% | 35 | A pé (caverna) |
| Rhydon | 2% | 35 | A pé (caverna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Victory_Road_(Kanto) (seção de
Geração II da página)
Nota: a tabela fonte divide por horário e por sub-seção da caverna; os
valores acima são uma normalização feita por mim pra caber no formato deste
doc — **essa é a tabela com maior chance de imprecisão do documento inteiro,
recomendo conferência manual direto na fonte antes de usar em código**.
Donphan substitui Ursaring em Silver.

### Elite Four — Will
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Xatu | 40 |
| 2 | Exeggutor | 41 |
| 3 | Slowbro | 41 |
| 4 | Jynx | 41 |
| 5 | Xatu | 42 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Will
Nota: time inteiro de tipo Psíquico, especialidade de Will.

### Elite Four — Koga
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Ariados | 40 |
| 2 | Venomoth | 41 |
| 3 | Forretress | 43 |
| 4 | Muk | 42 |
| 5 | Crobat | 44 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Koga
Nota: este é o time de Koga como membro da Elite Four em Gen II — diferente
do time dele como líder do Ginásio de Fuchsia em Gen I (já documentado em
`ROTAS-KANTO.md`). Em Johto ele troca o cargo de líder por um lugar na
Elite Four.

### Elite Four — Bruno
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Hitmontop | 42 |
| 2 | Hitmonlee | 42 |
| 3 | Hitmonchan | 42 |
| 4 | Onix | 43 |
| 5 | Machamp | 46 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Bruno
Nota: Bruno continua na Elite Four (mesma posição de Gen I), agora com
Hitmontop — Pokémon novo de Geração II — substituindo parte do time antigo.

### Elite Four — Karen
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Umbreon | 42 |
| 2 | Vileplume | 42 |
| 3 | Gengar | 45 |
| 4 | Murkrow | 44 |
| 5 | Houndoom | 47 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Karen
Nota: Karen é o único membro da Elite Four de Johto sem tipo fixo definido
(time misto propositalmente "sombrio"/sem padrão óbvio) — substitui a posição
que Lorelei ocupava em Kanto.

### Campeão — Lance
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Gyarados | 44 |
| 2 | Dragonite | 47 |
| 3 | Charizard | 46 |
| 4 | Aerodactyl | 46 |
| 5 | Dragonite | 47 |
| 6 | Dragonite | 50 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lance

**Diferença importante em relação ao padrão de Kanto:** em Kanto, o time do
campeão (o rival, Blue) varia conforme o inicial escolhido pelo jogador — por
isso `ROTAS-KANTO.md` documentou 3 variantes. Em Johto **isso não existe**:
Lance tem um único time fixo em Gold/Silver/Crystal, independente do inicial
escolhido (o que varia por inicial em Gen II são as batalhas contra o rival,
não a batalha de campeão). Confirmado direto na fonte: a página do Lance lista
só um time de campeão, sem nenhuma nota de variação por versão ou por
inicial. Portanto, ao contrário de Kanto, **não há 3 variantes aqui** — é
só este time único.

---

## Pontos em aberto pro dono do projeto decidir

1. **Surf, pesca, Headbutt e Rock Smash:** Gen II tem ainda mais mecânicas de
   encontro gated por HM/golpe do que Gen I. Pra este doc, descartei pesca,
   Headbutt e Rock Smash por completo, e dobrei Surf dentro do pool "a pé"
   sem renormalizar (mesma lógica que Kanto já usava). Se o roadmap decidir
   implementar Surf como mecânica própria em algum sprint futuro, dá pra
   destacar essas linhas de novo — elas já estão marcadas "Surf" na coluna
   Método.
2. **Ciclo dia/noite:** Gen II introduziu esse conceito e boa parte das
   tabelas acima dependem dele. Simplifiquei fundindo Manhã/Dia como pool
   principal e Noite como linhas extras não-renormalizadas. Se o jogo algum
   dia ganhar um ciclo dia/noite de verdade (parece fora de escopo hoje), dá
   pra usar essas mesmas tabelas sem trabalho extra de pesquisa — os dados de
   horário já estão documentados por trecho, só não estão sendo usados como
   "gate" agora.
3. **Trecho 6 sem geografia nova:** documentei isso explicitamente na seção
   do Trecho 6 — ele reaproveita a água de Olivine do Trecho 5. Se preferir,
   dá pra fundir Trecho 5 e 6 num só (Storm + Mineral Badge nas mesmas telas)
   e ajustar a ordem de progressão no código; mantive separado aqui só pra
   espelhar 1 trecho = 1 badge, igual ao padrão pedido.
4. **Áreas sem tabela de encontro:** Violet City, Azalea Town, Goldenrod
   City, Mahogany Town e Blackthorn City não têm pool selvagem documentado
   pra área externa (só interiores específicos como Sprout Tower, ou eventos
   fixos). Burned Tower e Tin Tower (Ecruteak) também ficaram de fora por
   falta de tempo de pesquisa nesta passada — se forem virar área jogável,
   precisam de uma pesquisa extra dedicada.
5. **Qualidade dos números em rotas com muita divisão de horário e nas
   dungeons colapsadas:** já sinalizado na Metodologia, repetindo aqui porque
   é o ponto mais importante pra revisão humana antes de ir pro código —
   Route 30, 31, 38, 39, 42, 43, 45, 46, e principalmente a tabela de Victory
   Road (que teve normalização manual mais pesada) merecem um confere rápido
   contra a URL citada. Times de líder de ginásio/Elite Four/campeão são alta
   confiança (bateram 100% com conhecimento treinado, sem tabela de horário
   pra complicar a extração).
6. **Níveis reais vs. escala do jogo:** mesmo aviso do doc de Kanto — os
   níveis acima são os do jogo original (RPG por turnos linear). No PokéIdle
   a progressão é diferente (idle, múltiplos loops, rebirth); considerar
   usá-los como referência de *proporção* entre trechos, não como número
   absoluto de balanceamento.
