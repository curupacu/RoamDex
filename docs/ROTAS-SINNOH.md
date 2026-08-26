# Rotas de Sinnoh — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Segue o mesmo modelo de `docs/ROTAS-KANTO.md`,
> `docs/ROTAS-JOHTO.md` e `docs/ROTAS-HOENN.md`. Os iniciais de Sinnoh
> (Turtwig #387, Chimchar #390, Piplup #393) entram no nível 5, mesmo padrão
> das regiões anteriores.

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem da versão
  **Pokémon Platinum** (Geração IV) — não Diamond/Pearl. Isso importa: a
  **ordem dos ginásios muda** entre as versões. Em D/P é Roark → Gardenia →
  Maylene → Wake → Fantina → Byron → Candice → Volkner; em **Platinum,
  Fantina passa pro 3º lugar e Maylene pro 4º** (confirmado contra
  `Sinnoh_League` na Bulbapedia): Roark → Gardenia → **Fantina** →
  **Maylene** → Wake → Byron → Candice → Volkner. Esse documento segue a
  ordem de Platinum.
- Mesmas simplificações já usadas em Hoenn/Johto: pesca e Rock Smash fora de
  escopo; Surf entra na mesma tabela da rota "a pé" sem renormalizar;
  masmorras com vários andares colapsadas numa linha só por espécie.
- **Sinnoh também tem divisão Manhã/Dia/Noite** (igual Johto) — dia é o pool
  principal, linhas exclusivas de noite somadas por cima sem renormalizar,
  mesmo tratamento.
- **Encontro por Enxame (swarm) e Poké Radar** aparecem em quase toda rota
  de Sinnoh — tratados como o "swarm" de Johto (Skitty em Route 116):
  variação rara, não vira mecânica nova, então **não entraram nas tabelas
  abaixo** (mesma decisão que already existed pra Johto).
- **Geografia real de Sinnoh é a mais não-linear das 4 regiões
  pesquisadas até agora** — tem retrocesso constante (o jogador volta a
  Veilstone depois de Snowpoint, por exemplo) e sidequests inteiras (trio
  dos lagos Verity/Valor/Acuity, Distortion World, Iron Island, Old
  Chateau, Lost Tower). Pra virar "rota → ginásio → próxima rota", agrupei
  em **8 trechos pela ordem de insígnia de Platinum**, e several dessas
  sidequests ficaram de fora por completo (ver lista de pendências).
- **Qualidade dos dados**: todas as tabelas vieram de WebFetch ao vivo
  nesta sessão. Sinnoh tem as tabelas mais densas até agora (divisão
  Manhã/Dia/Noite quase universal, várias rotas com áreas "norte/sul" com
  tabelas diferentes) — a ferramenta de extração teve mais ruído aqui que
  nas regiões anteriores (alguns valores vieram como "varia por horário"
  sem o número exato, ou peso citado batendo >100% quando morning/day têm
  valores diferentes pro mesmo Pokémon). **Recomendo revisão humana mais
  cuidadosa nessas tabelas antes de qualquer número entrar em `content/`
  — mais ainda que Hoenn.**
- Times de líder de ginásio, Elite Four e Campeã são de alta confiança
  (páginas simples). Uma pegadinha: as páginas de treinador listam **dois
  níveis por Pokémon** (primeira luta / revanche pós-jogo) — só o primeiro
  número (mais baixo) entrou nas tabelas abaixo.

---

## Trecho 1 — Twinleaf Town → Oreburgh (Ginásio 1: Roark, Rock)

Locais: Twinleaf Town, Route 201, Sandgem Town, Route 202, Jubilife City,
Route 203, Oreburgh Gate, Oreburgh City.

### Route 201
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Bidoof | 50% | 2–4 | A pé (grama) |
| Starly | 40% | 2–3 | A pé (grama) |
| Kricketot | 10% | 3 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_201
Nota: aqui o jogador ganha o inicial (Turtwig/Chimchar/Piplup, nível 5) do
Prof. Rowan — evento único, não encontro selvagem.

### Route 202
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Bidoof | 45% | 2–4 | A pé (grama) |
| Starly | 20% | 2, 4 | A pé (grama) |
| Kricketot | 20% | 3–4 | A pé (grama) |
| Shinx | 15% | 3–4 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_202

### Route 203
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Abra | 15% | 4–5 | A pé (grama) |
| Starly | 25% | 4, 6–7 | A pé (grama) |
| Bidoof | 15% | 5–7 | A pé (grama) |
| Shinx | 25% | 4–5 | A pé (grama) |
| Kricketot | 10% | 4–5 | A pé (grama) |
| Zubat | 10% | 4 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_203

### Oreburgh Gate
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Zubat | 50% | 5–9 | Caverna (1F–B1F, somado) |
| Psyduck | 35% | 5–10 | Caverna (1F–B1F, somado) |
| Geodude | 15% | 5–8 | Caverna (1F–B1F, somado) |
| Golbat | 5% | 10 | Caverna (B1F) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Oreburgh_Gate

### Roark (Ginásio 1 — Rock)
| Pokémon | Nível | Tipo |
|---|---|---|
| Geodude | 12 | Rock/Ground |
| Onix | 12 | Rock/Ground |
| Cranidos | 14 | Rock |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Roark

---

## Trecho 2 — Oreburgh → Eterna (Ginásio 2: Gardenia, Grass)

Locais: Route 204, Ravaged Path, Route 205, Eterna Forest, Eterna City.

### Route 204
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Starly | 30% | 4–6 | A pé (grama) |
| Bidoof | 25% | 4–6 | A pé (grama) |
| Budew | 25% | 3–5 | A pé (grama) |
| Shinx | 15% | 4–5 | A pé (grama) |
| Kricketot | 10% | 3–4 | A pé (grama) |
| Wurmple | 10% | 4 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_204
Nota: trecho colapsado (sul+norte da rota real, mesmas espécies, norte só
com nível mais alto) — mesma simplificação de multi-área usada em outras
rotas deste doc.

### Ravaged Path
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Zubat | 65% | 3–6 | Caverna |
| Psyduck | 35% | 4–6 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ravaged_Path

### Route 205
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Shellos (mar oeste) | 65% | 9–12 | A pé (grama) |
| Buizel | 15% | 10–11 | A pé (grama) |
| Pachirisu | 10% | 9–11 | A pé (grama) |
| Bidoof | 10% | 10 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_205
Nota: trecho sul (o que liga a Floaroma/Eterna Forest); tabela do trecho
norte veio incompleta na extração automática — vale conferir contra a
fonte antes de usar.

### Eterna Forest
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Budew | 30% | 10–11 | A pé (grama) |
| Murkrow | 20% | 10–11 | A pé (grama) |
| Misdreavus | 20% | 10–11 | A pé (grama) |
| Bidoof | 10% | 12 | A pé (grama) |
| Kricketot | 10% | 12 | A pé (grama) |
| Hoothoot | 10% | 12 | A pé (grama, à noite) |
| Gastly | 4% | 13 | A pé (grama, à noite) |
| Silcoon | 5% | 12 | A pé (grama) |
| Cascoon | 5% | 12 | A pé (grama) |
| Beautifly | 1% | 14 | A pé (grama) |
| Dustox | 1% | 14 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Eterna_Forest

### Gardenia (Ginásio 2 — Grass)
| Pokémon | Nível | Tipo |
|---|---|---|
| Turtwig | 20 | Grass |
| Cherrim | 20 | Grass |
| Roserade | 22 | Grass/Poison |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Gardenia
Nota: Turtwig no time da Gardenia é só um dos 3 iniciais que a IA usa
conforme a versão/dados da Bulbapedia — mantido como veio da fonte.

---

## Trecho 3 — Eterna → Hearthome (Ginásio 3: Fantina, Ghost)

Locais: Route 206, Route 207, Mt. Coronet (trecho sul), Route 208,
Hearthome City.

### Route 206
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Geodude | 30% | 16, 18 | A pé (grama) |
| Ponyta | 30% | 16–17 | A pé (grama) |
| Stunky | 25% | 14–16 | A pé (grama) |
| Gligar | 20% | 16, 18 | A pé (grama) |
| Machop | 20% | 17–19 | A pé (grama) |
| Zubat | 10% | 17 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_206

### Route 207
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Machop | 45% | 5–8 | A pé (grama) |
| Geodude | 30% | 5–7 | A pé (grama) |
| Ponyta | 25% | 5–7 | A pé (grama) |
| Kricketot | 10% | 5–6 | A pé (grama) |
| Zubat | 10% | 5 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_207

### Mt. Coronet (trecho sul)
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Geodude | 30% | 14–19 | Caverna |
| Zubat | 20% | 14–19 | Caverna |
| Meditite | 20% | 18, 20 | Caverna |
| Bronzor | 20% | 18 | Caverna |
| Clefairy | 10% | 17 | Caverna |
| Chingling | 10% | 17, 19 | Caverna |
| Machop | 10% | 20 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Mt._Coronet
Nota: só o trecho sul (o que liga Route 207 a Hearthome) foi pesquisado —
o trecho norte (perto de Snowpoint) não veio numa extração limpa, ver
pendências no fim do documento. Código reaproveita esta mesma tabela pras
duas travessias (mesma simplificação de "rota revisitada sem tabela
própria" já usada em Hoenn pro Route 104).

### Route 208
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Bibarel | 20% | 18–20 | A pé (grama) |
| Psyduck | 30% | 16–18 | A pé (grama) |
| Roselia | 15% | 19–20 | A pé (grama) |
| Ralts | 15% | 17–18 | A pé (grama) |
| Bidoof | 20% | 18 | A pé (grama) |
| Machop | 10% | 16–17 | A pé (grama) |
| Meditite | 10% | 16–17 | A pé (grama) |
| Budew | 10% | 18–19 | A pé (grama) |
| Zubat | 10% | 19 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_208

### Fantina (Ginásio 3 — Ghost)
| Pokémon | Nível | Tipo |
|---|---|---|
| Duskull | 24 | Ghost |
| Haunter | 24 | Ghost/Poison |
| Mismagius | 26 | Ghost |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Fantina

---

## Trecho 4 — Hearthome → Veilstone (Ginásio 4: Maylene, Fighting)

Locais: Route 209, Solaceon Town, Route 210 (trecho sul), Route 215,
Veilstone City.

### Route 209
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Roselia | 25% | 19–20 | A pé (grama) |
| Ralts | 20% | 17–19 | A pé (grama) |
| Bibarel | 30% | 18–19 | A pé (grama) |
| Starly | 20% | 16 | A pé (grama) |
| Staravia | 20% | 18–19 | A pé (grama) |
| Zubat | 10% | 19 | A pé (grama, à noite) |
| Gastly | 10% | 19 | A pé (grama, à noite) |
| Duskull | 10% | 17 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_209

### Route 210 (trecho sul)
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Kricketune | 30% | 18–19 | A pé (grama) |
| Ponyta | 35% | 19–21 | A pé (grama) |
| Staravia | 20% | 19 | A pé (grama) |
| Roselia | 15% | 20–21 | A pé (grama) |
| Geodude | 20% | 18 | A pé (grama) |
| Noctowl | 10% | 21 | A pé (grama) |
| Hoothoot | 10% | 20 | A pé (grama) |
| Chansey | 5% | 19, 21 | A pé (grama) |
| Scyther | 5% | 19 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_210
Nota: só o trecho sul (o que liga Solaceon Town a Veilstone via Route 215);
o trecho norte (Celestic Town) não entrou — ver pendências.

### Route 215
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Staravia | 30% | 19–22 | A pé (grama) |
| Marill | 25% | 20–22 | A pé (grama) |
| Scyther | 15% | 20–22 | A pé (grama) |
| Lickitung | 10% | 20 | A pé (grama) |
| Kricketune | 10% | 20 | A pé (grama) |
| Abra | 10% | 19 | A pé (grama) |
| Kadabra | 10% | 21–22 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_215

### Maylene (Ginásio 4 — Fighting)
| Pokémon | Nível | Tipo |
|---|---|---|
| Meditite | 28 | Fighting/Psychic |
| Machoke | 29 | Fighting |
| Lucario | 32 | Fighting/Steel |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Maylene

---

## Trecho 5 — Veilstone → Pastoria (Ginásio 5: Crasher Wake, Water)

Locais: Route 214, Route 213, Pastoria City.

### Route 214
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Graveler | 25% | 21–24 | A pé (grama) |
| Ponyta | 25% | 23–24 | A pé (grama) |
| Geodude | 20% | 21–24 | A pé (grama) |
| Rhyhorn | 20% | 21, 23–24 | A pé (grama) |
| Kricketune | 20% | 22–23 | A pé (grama) |
| Houndour | 15% | 22–24 | A pé (grama, à noite) |
| Zubat | 10% | 22 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_214

### Route 213
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Shellos (mar leste) | 35% | 24–26 | A pé (grama) |
| Wingull | 20% | 24–26 | A pé (grama) |
| Chatot | 20% | 23, 25 | A pé (grama) |
| Buizel | 25% | 23, 25 | A pé (grama) |
| Floatzel | 10% | 22 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_213

### Crasher Wake (Ginásio 5 — Water)
| Pokémon | Nível | Tipo |
|---|---|---|
| Gyarados | 33 | Water/Flying |
| Quagsire | 34 | Water/Ground |
| Floatzel | 37 | Water |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Crasher_Wake

---

## Trecho 6 — Pastoria → Canalave (Ginásio 6: Byron, Steel)

Locais: Route 212, Route 218, Route 219, Route 220, Route 221, Canalave
City.

### Route 212
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Roselia | 35% | 22–24 | A pé (grama) |
| Marill | 25% | 21–23 | A pé (grama) |
| Kirlia | 20% | 22–24 | A pé (grama) |
| Staravia | 20% | 21–23 | A pé (grama) |
| Ralts | 10% | 22 | A pé (grama) |
| Quagsire | 30% | 24–26 | A pé (grama) |
| Bibarel | 35% | 18–20 | A pé (grama) |
| Buizel | 15% | 23–25 | A pé (grama) |
| Croagunk | 10% | 24–25 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_212
Nota: rota tem uma metade "seca" e outra "alagada" (evento de trama —
Team Galactic inunda parte da rota); as duas tabelas foram somadas numa só,
mesma lógica de multi-área do resto do documento.

### Route 218
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Floatzel | 30% | 29–31 | A pé (grama) |
| Shellos (mar oeste) | 35% | 28, 30 | A pé (grama) |
| Mr. Mime | 25% | 29–31 | A pé (grama) |
| Chatot | 20% | 28, 30 | A pé (grama) |
| Wingull | 10% | 29–30 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_218

### Route 219 / Route 220 / Route 221
Três rotas de água/praia com o mesmo trio-base de Surf de Sinnoh (variação
pequena de Pelipper).
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Tentacool | 60% | 20–30 | Surf |
| Tentacruel | 9% | 20–40 | Surf |
| Wingull | 30% | 20–30 | Surf |
| Pelipper | 1% | 20–40 | Surf |

Fontes: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_219 ·
https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_220 ·
https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_221
Nota: Route 221 também tem grama seca (Sudowoodo/Girafarig/Roselia/
Floatzel, 28–31, 25% cada) — somada na tabela de código, não repetida aqui
por brevidade.

### Byron (Ginásio 6 — Steel)
| Pokémon | Nível | Tipo |
|---|---|---|
| Magneton | 37 | Electric/Steel |
| Steelix | 38 | Steel/Ground |
| Bastiodon | 41 | Rock/Steel |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Byron

---

## Trecho 7 — Canalave → Snowpoint (Ginásio 7: Candice, Ice)

Locais: Route 211, Route 216, Route 217, Snowpoint City.

### Route 211
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Meditite | 40% | 13–15 | A pé (grama) |
| Machop | 15% | 14–15 | A pé (grama) |
| Bidoof | 20% | 14 | A pé (grama) |
| Chingling | 15% | 14, 16 | A pé (grama) |
| Bronzor | 10% | 14, 16 | A pé (grama) |
| Geodude | 10% | 13 | A pé (grama) |
| Ponyta | 10% | 13 | A pé (grama) |
| Zubat | 10% | 14 | A pé (grama, à noite) |
| Hoothoot | 10% | 15 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_211
Nota: só o trecho oeste (o que dá pra Canalave/Route 218); o trecho leste
(mais alto nível, perto de Mt. Coronet norte) não entrou — ver pendências.

### Route 216
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Snover | 40% | 32–35 | A pé (grama) |
| Sneasel | 35% | 33–35 | A pé (grama) |
| Meditite | 20% | 32–33 | A pé (grama) |
| Noctowl | 10% | 33 | A pé (grama) |
| Snorunt | 10% | 33 | A pé (grama) |
| Machoke | 10% | 34 | A pé (grama) |
| Graveler | 5% | 35 | A pé (grama) |
| Zubat | 10% | 32 | A pé (grama, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_216

### Route 217
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Snover | 40% | 32–35 | A pé (neve) |
| Swinub | 35% | 32–34 | A pé (neve) |
| Sneasel | 25% | 33–35 | A pé (neve) |
| Medicham | 20% | 35–36 | A pé (neve) |
| Machoke | 20% | 35–36 | A pé (neve) |
| Meditite | 10% | 35 | A pé (neve) |
| Snorunt | 20% | 33 | A pé (neve, à noite) |
| Zubat | 10% | 35 | A pé (neve, à noite) |
| Noctowl | 10% | 35 | A pé (neve, à noite) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_217

### Candice (Ginásio 7 — Ice)
| Pokémon | Nível | Tipo |
|---|---|---|
| Sneasel | 40 | Dark/Ice |
| Piloswine | 40 | Ice/Ground |
| Abomasnow | 42 | Grass/Ice |
| Froslass | 44 | Ice/Ghost |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Candice

---

## Trecho 8 — Snowpoint → Sunyshore (Ginásio 8: Volkner, Electric) → Elite Four → Campeã

Locais: Route 222, Sunyshore City, Route 223, Victory Road (Sinnoh).

### Route 222
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Electabuzz | 30% | 39, 41 | A pé (grama) |
| Floatzel | 20% | 40 | A pé (grama) |
| Purugly | 15% | 41–42 | A pé (grama) |
| Glameow | 20% | 40 | A pé (grama) |
| Gastrodon (mar leste) | 10% | 40–42 | A pé (grama) |
| Luxio | 10% | 38, 40 | A pé (grama) |
| Magnemite | 10% | 39 | A pé (grama) |
| Wingull | 10% | 38 | A pé (grama) |
| Chatot | 10% | 38 | A pé (grama) |
| Magneton | 5% | 41 | A pé (grama) |
| Pelipper | 5% | 40 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_222

### Route 223
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Tentacruel | 60% | 30–50 | Surf |
| Pelipper | 30% | 30–50 | Surf |
| Mantyke | 10% | 30–40 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sinnoh_Route_223

### Volkner (Ginásio 8 — Electric)
| Pokémon | Nível | Tipo |
|---|---|---|
| Jolteon | 46 | Electric |
| Raichu | 46 | Electric |
| Luxray | 48 | Electric |
| Electivire | 50 | Electric |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Volkner

### Victory Road (Sinnoh)
| Pokémon | Chance (Platinum) | Nível | Método |
|---|---|---|---|
| Steelix | 20% | 42–44 | Caverna (1F–2F, somado) |
| Rhydon | 15% | 41–43 | Caverna (1F–2F, somado) |
| Rhyhorn | 20% | 41 | Caverna (1F) |
| Graveler | 15% | 42–43 | Caverna (1F–2F, somado) |
| Golbat | 10% | 41–43 | Caverna (1F–2F, somado) |
| Magneton | 30% | 41, 43 | Caverna (2F) |
| Onix | 5% | 42 | Caverna (2F) |
| Medicham | 15% | 44–47 | Caverna (1F–2F, somado) |
| Gabite | 5% | 41–43 | Caverna (1F–2F, somado) |
| Azumarill | 30% | 41, 43 | Caverna (B1F) |
| Floatzel | 30% | 42, 44 | Caverna (B1F) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Victory_Road_(Sinnoh)
Nota: mesma regra de sempre — Rock Smash e pesca descartados.

### Elite Four de Sinnoh

**Aaron (Bug)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Yanmega | 49 | Bug/Flying |
| Vespiquen | 50 | Bug/Flying |
| Scizor | 49 | Bug/Steel |
| Heracross | 51 | Bug/Fighting |
| Drapion | 53 | Poison/Dark |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Aaron

**Bertha (Ground)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Whiscash | 50 | Water/Ground |
| Hippowdon | 52 | Ground |
| Golem | 52 | Rock/Ground |
| Gliscor | 53 | Ground/Flying |
| Rhyperior | 55 | Ground/Rock |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Bertha

**Flint (Fire)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Houndoom | 52 | Dark/Fire |
| Rapidash | 53 | Fire |
| Flareon | 55 | Fire |
| Infernape | 55 | Fire/Fighting |
| Magmortar | 57 | Fire |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Flint

**Lucian (Psychic)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Mr. Mime | 53 | Psychic |
| Bronzong | 54 | Steel/Psychic |
| Espeon | 55 | Psychic |
| Alakazam | 56 | Psychic |
| Gallade | 59 | Psychic/Fighting |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lucian

### Campeã: Cynthia
| Pokémon | Nível | Tipo |
|---|---|---|
| Spiritomb | 58 | Ghost/Dark |
| Roserade | 58 | Grass/Poison |
| Milotic | 58 | Water |
| Togekiss | 60 | Normal/Flying |
| Lucario | 60 | Fighting/Steel |
| Garchomp | 62 | Dragon/Ground |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Cynthia
Nota: time da PRIMEIRA luta como Campeã ("antes do Stark Mountain"), não o
time de revanche pós-jogo (que sobe pra 74-78) — mesma regra de "só a
primeira luta" aplicada a Elite Four/ginásios no resto do documento.

---

## Resumo — o que fazer com isto

- **40 locais reais cobertos**, organizados nos 8 trechos pela ordem de
  insígnia de **Platinum** (diferente de Diamond/Pearl — Fantina é a 3ª,
  não a 5ª).
- **8 ginásios + Elite Four (4) + Campeã**, todos com time e nível
  confirmados via Bulbapedia ao vivo.
- **Pendências explícitas** (não fabricadas): Old Chateau, Lost Tower,
  Wayward Cave, Maniac Tunnel, Fuego Ironworks, Iron Island, Celestic Town,
  Route 210 (trecho norte), Route 211 (trecho leste), Mt. Coronet (trecho
  norte), trio dos lagos (Verity/Valor/Acuity, incluindo as sidequests dos
  pássaros lendários), Distortion World/Spear Pillar (Giratina, claramente
  conteúdo de pós-jogo, mesmo espírito do Sky Pillar de Hoenn). Se algum
  desses precisar entrar no jogo, pesquisar antes de codificar.
- **Confiança menor que Hoenn** nas tabelas de encontro (não nos times de
  treinador) — Sinnoh tem mais divisão de horário e mais rotas com
  múltiplas áreas, e a ferramenta de extração teve mais ruído aqui. Vale
  revisão humana pontual antes de qualquer ajuste fino de raridade.
