# Rotas de Kanto — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Antes de tocar em código dos ginásios (Sprint 20), o
> sistema de batalha vai ser redesenhado em torno de **rotas** entre cidades: o
> jogador anda pela rota, um selvagem aparece a cada ~1 min, ele batalha, evolui e
> fica mais forte; a qualquer momento pode tentar o ginásio daquela área (mas
> provavelmente só vai conseguir depois de já ter apanhado um pouco). Ao vencer o
> ginásio, destrava a próxima rota.

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem "a pé"/pesca/surf da
  versão **Pokémon Red** (Geração I). Nenhum número foi inventado — cada tabela
  abaixo tem a URL da página usada logo abaixo dela.
- Quando Red e Blue divergiam numa mesma rota (o que acontece bastante — várias
  espécies trocam entre versões), só ficou o que é **exclusivo de Red**; isso está
  anotado em cada seção onde acontece.
- As porcentagens são por método (grama / pesca / surf / caverna) e, quando a
  fonte listava tudo, somam 100% dentro do método — é o jeito de conferir que a
  lista está completa.
- **Import importante:** a geografia real de Kanto não é linear (tem desvios,
  volta atrás, cidades trancadas até mais tarde no jogo original — ex: Saffron e
  Viridian Gym ficam bloqueados até certo ponto). Pra virar uma progressão simples
  de "rota → ginásio → próxima rota" no jogo, eu agrupei os locais reais em **8
  trechos**, na ordem clássica de insígnias de Red/Blue/Yellow (Boulder → Cascade
  → Thunder → Rainbow → Soul → Marsh → Volcano → Earth). Cada trecho abaixo diz
  exatamente quais locais reais foram agrupados nele — se quiser reordenar/dividir
  diferente, é só mexer aqui antes de eu codar.

---

## Trecho 1 — Pallet → Pewter (Ginásio 1: Brock)

Locais reais agrupados: Route 1, Route 2, Viridian Forest.

**Sugestão de arte de fundo:** trilha de grama simples saindo de casa, meio
"início de jornada" — grama baixa e clara em Route 1/2, e a Viridian Forest como
sub-área própria (mais escura, copa fechada, luz filtrada verde — combina com ser
a primeira área "labiríntica" do jogo).

### Route 1
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 50% | 2–5 | A pé (grama) |
| Rattata | 50% | 2–4 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_1

### Route 2
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Weedle | 15% | 3–5 | A pé (grama) |
| Pidgey | 45% | 3–5 | A pé (grama) |
| Rattata | 40% | 2–5 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_2
Nota: Caterpie é exclusivo de Blue aqui; Nidoran♀/♂ são exclusivos de Yellow. Há
também uma troca única NPC (Abra por Mr. Mime), não é encontro selvagem.

### Viridian Forest
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Caterpie | 5% | 3 | A pé (grama) |
| Metapod | 5% | 4 | A pé (grama) |
| Weedle | 45% | 3–5 | A pé (grama) |
| Kakuna | 40% | 4–6 | A pé (grama) |
| Pikachu | 5% | 3, 5 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Viridian_Forest
Nota: Pidgey/Pidgeotto na floresta são exclusivos de Yellow.

### Líder — Brock (Pewter City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Geodude | 12 |
| 2 | Onix | 14 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Brock

---

## Trecho 2 — Pewter → Cerulean (Ginásio 2: Misty)

Locais reais agrupados: Route 3, Mt. Moon (1F/B1F/B2F), Route 4.

**Sugestão de arte de fundo:** Route 3 como sopé rochoso/gramado subindo a
montanha; Mt. Moon como caverna escura com pontos de luz azulada (tem até
meteorito na lore); Route 4 abrindo pra beira de rio/lago anunciando Cerulean
City (cidade "aquática").

### Route 3
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 45% | 6–8 | A pé (grama) |
| Spearow | 45% | 5–8 | A pé (grama) |
| Jigglypuff | 10% | 3, 5, 7 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_3
Nota: Rattata, Sandshrew e Mankey aqui são exclusivos de Yellow.

### Mt. Moon
| Andar | Pokémon | Chance (Red) | Nível |
|---|---|---|---|
| 1F | Clefairy | 1% | 8 |
| 1F | Zubat | 79% | 6–11 |
| 1F | Paras | 5% | 8 |
| 1F | Geodude | 15% | 8, 10 |
| B1F | Clefairy | 4% | 9 |
| B1F | Zubat | 60% | 7–11 |
| B1F | Paras | 10% | 10 |
| B1F | Geodude | 26% | 7–9 |
| B2F | Clefairy | 6% | 10, 12 |
| B2F | Zubat | 49% | 9–12 |
| B2F | Paras | 15% | 10, 12 |
| B2F | Geodude | 30% | 9–10 |

(Método: a pé, caverna, em todos os andares.)
Fonte: https://bulbapedia.bulbagarden.net/wiki/Mt._Moon
Nota: Sandshrew (1F) é exclusivo de Yellow.

### Route 4
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Rattata | 40% | 8, 10, 12 | A pé (grama) |
| Spearow | 35% | 8, 10, 12 | A pé (grama) |
| Ekans | 25% | 6, 8, 10, 12 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Psyduck | 33% | 15 | Pesca (Super Rod) |
| Krabby | 33% | 15 | Pesca (Super Rod) |
| Goldeen | 33% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_4
Nota: em Blue, Ekans é substituído por Sandshrew (mesma chance/nível).

### Líder — Misty (Cerulean City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Staryu | 18 |
| 2 | Starmie | 21 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Misty

---

## Trecho 3 — Cerulean → Vermilion (Ginásio 3: Lt. Surge)

Locais reais agrupados: Route 24, Route 25, Route 5, Route 6, Underground Path
(5-6).

**Sugestão de arte de fundo:** Route 24/25 como ponte/trilha florida perto de
água (Nugget Bridge); Route 5/6 mais urbana, aproximando-se de Vermilion —
cidade portuária, então vale um tom "beira de porto" no fim do trecho.

### Route 24
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Weedle | 20% | 7 | A pé (grama) |
| Kakuna | 20% | 8 | A pé (grama) |
| Pidgey | 20% | 12–13 | A pé (grama) |
| Oddish | 25% | 12–14 | A pé (grama) |
| Abra | 15% | 8, 10, 12 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Psyduck | 33% | 15 | Pesca (Super Rod) |
| Krabby | 33% | 15 | Pesca (Super Rod) |
| Goldeen | 33% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_24
Nota: Caterpie/Metapod/Bellsprout são exclusivos de Blue aqui.

### Route 25
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Caterpie | 1% | 8 | A pé (grama) |
| Metapod | 4% | 7 | A pé (grama) |
| Weedle | 20% | 8 | A pé (grama) |
| Kakuna | 20% | 9 | A pé (grama) |
| Pidgey | 15% | 13 | A pé (grama) |
| Oddish | 25% | 12–14 | A pé (grama) |
| Abra | 15% | 10, 12 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Psyduck | 33% | 15 | Pesca (Super Rod) |
| Krabby | 33% | 15 | Pesca (Super Rod) |
| Goldeen | 33% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_25
Nota: Bellsprout é exclusivo de Blue aqui.

### Route 5
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 40% | 13, 15–16 | A pé (grama) |
| Oddish | 35% | 13, 15–16 | A pé (grama) |
| Mankey | 25% | 10, 12, 14, 16 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_5
Nota: Meowth/Bellsprout exclusivos de Blue; sem água acessível na rota.

### Route 6
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 40% | 13, 15–16 | A pé (grama) |
| Oddish | 35% | 13, 15–16 | A pé (grama) |
| Mankey | 25% | 10, 12, 14, 16 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Shellder | 50% | 15 | Pesca (Super Rod) |
| Krabby | 50% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_6
Nota: Meowth/Bellsprout exclusivos de Blue; Psyduck/Golduck via Surf são exclusivos
de Yellow (sem Surf em Red aqui).

### Underground Path (Route 5–6)
Não há tabela de encontro documentada no Bulbapedia para nenhuma versão — página é
só desambiguação. Sem dados, não incluído.
Fonte: https://bulbapedia.bulbagarden.net/wiki/Underground_Path

### Líder — Lt. Surge (Vermilion City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Voltorb | 21 |
| 2 | Pikachu | 18 |
| 3 | Raichu | 24 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lt._Surge

---

## Trecho 4 — Vermilion → Celadon (Ginásio 4: Erika)

Locais reais agrupados: Route 11, Diglett's Cave, Route 9, Rock Tunnel (1F/B1F),
Route 10, Route 7, Route 8.

**Sugestão de arte de fundo:** Route 11 mais industrial/portuária ainda (perto do
S.S. Anne); Diglett's Cave e Rock Tunnel escuras, terrosas — Rock Tunnel
especialmente apertada e sem luz (no jogo original precisa de Flash); Route 7/8
já abrindo pra um visual mais "cidade grande" chegando em Celadon (a cidade mais
urbana/comercial de Kanto).

### Route 11
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Spearow | 35% | 13, 15, 17 | A pé (grama) |
| Ekans | 40% | 12, 14–15 | A pé (grama) |
| Drowzee | 25% | 9, 11, 13, 15 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Shellder | 50% | 15 | Pesca (Super Rod) |
| Krabby | 50% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_11
Nota: Sandshrew exclusivo de Blue.

### Diglett's Cave
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Diglett | 95% | 15–22 | A pé (caverna) |
| Dugtrio | 5% | 29, 31 | A pé (caverna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Diglett%27s_Cave

### Route 9
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Rattata | 40% | 14, 16–17 | A pé (grama) |
| Spearow | 35% | 13, 16–17 | A pé (grama) |
| Ekans | 25% | 11, 13, 15, 17 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_9
Nota: Sandshrew exclusivo de Blue.

### Rock Tunnel
| Andar | Pokémon | Chance (Red) | Nível |
|---|---|---|---|
| 1F | Zubat | 55% | 15–18 |
| 1F | Geodude | 25% | 16–17 |
| 1F | Machop | 15% | 15, 17 |
| 1F | Onix | 5% | 13, 15 |
| B1F | Zubat | 50% | 16–18 |
| B1F | Machop | 15% | 15, 17 |
| B1F | Geodude | 26% | 16–18 |
| B1F | Onix | 9% | 13, 17 |

(Método: a pé, caverna.) Fonte: https://bulbapedia.bulbagarden.net/wiki/Rock_Tunnel

### Route 10
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Spearow | 35% | 13, 16–17 | A pé (grama) |
| Ekans | 25% | 11, 13, 15, 17 | A pé (grama) |
| Voltorb | 40% | 14, 16–17 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Poliwhirl | 50% | 23 | Pesca (Super Rod) |
| Slowpoke | 50% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_10
Nota: Sandshrew exclusivo de Blue.

### Route 7
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 30% | 19, 22 | A pé (grama) |
| Oddish | 30% | 19, 22 | A pé (grama) |
| Mankey | 30% | 17–20 | A pé (grama) |
| Growlithe | 10% | 18, 20 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_7
Nota: Vulpix/Meowth/Bellsprout exclusivos de Blue.

### Route 8
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 30% | 18, 20 | A pé (grama) |
| Ekans | 20% | 17, 19 | A pé (grama) |
| Mankey | 30% | 18, 20 | A pé (grama) |
| Growlithe | 20% | 15–18 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_8
Nota: Sandshrew/Vulpix/Meowth exclusivos de Blue.

### Líder — Erika (Celadon City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Victreebel | 29 |
| 2 | Tangela | 24 |
| 3 | Vileplume | 29 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Erika

---

## Trecho 5 — Celadon → Fuchsia (Ginásio 5: Koga)

Locais reais agrupados: Route 16, Route 17 (Cycling Road), Route 18.

**Sugestão de arte de fundo:** Route 17 é literalmente a Cycling Road — pista
comprida ladeira abaixo, visual de estrada/velocidade; Route 16/18 mais gramado
aberto perto d'água, aproximando de Fuchsia (cidade do Safari Zone, tom mais
"selva/reserva").

### Route 16
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Rattata | 30% | 18, 20, 22 | A pé (grama) |
| Raticate | 5% | 23, 25 | A pé (grama) |
| Spearow | 40% | 20, 22 | A pé (grama) |
| Doduo | 25% | 18, 20, 22 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_16

### Route 17 (Cycling Road)
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Raticate | 30% | 25, 27, 29 | A pé (grama) |
| Spearow | 40% | 20, 22 | A pé (grama) |
| Fearow | 5% | 25, 27 | A pé (grama) |
| Doduo | 25% | 24, 26, 28 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Tentacool | 25% | 5 | Pesca (Super Rod) |
| Krabby | 25% | 15 | Pesca (Super Rod) |
| Goldeen | 25% | 15 | Pesca (Super Rod) |
| Magikarp | 25% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_17

### Route 18
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Raticate | 20% | 25, 29 | A pé (grama) |
| Spearow | 40% | 20, 22 | A pé (grama) |
| Fearow | 15% | 25, 27, 29 | A pé (grama) |
| Doduo | 25% | 24, 26, 28 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Tentacool | 25% | 5 | Pesca (Super Rod) |
| Krabby | 25% | 15 | Pesca (Super Rod) |
| Goldeen | 25% | 15 | Pesca (Super Rod) |
| Magikarp | 25% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_18
Nota: há um NPC que troca Lickitung pelo Slowbro do jogador — troca fixa, não
encontro selvagem.

### Líder — Koga (Fuchsia City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Koffing | 37 |
| 2 | Muk | 39 |
| 3 | Koffing | 37 |
| 4 | Weezing | 43 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Koga

---

## Trecho 6 — Fuchsia → Saffron (Ginásio 6: Sabrina)

Locais reais agrupados: Route 15, Route 14, Route 13, Route 12.

**Sugestão de arte de fundo:** grama densa/mato alto (bate com a vibe "psíquica/
misteriosa" que antecede Saffron) — pode escurecer levemente e usar tons
roxo/azulado conforme se aproxima da cidade, já puxando pro tema de Sabrina.

### Route 15
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 15% | 23 | A pé (grama) |
| Pidgeotto | 5% | 28, 30 | A pé (grama) |
| Oddish | 35% | 22, 24, 26 | A pé (grama) |
| Gloom | 5% | 30 | A pé (grama) |
| Venonat | 20% | 26, 28 | A pé (grama) |
| Ditto | 20% | 26 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_15

### Route 14
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 20% | 26 | A pé (grama) |
| Pidgeotto | 5% | 28, 30 | A pé (grama) |
| Oddish | 35% | 22, 24, 26 | A pé (grama) |
| Gloom | 5% | 30 | A pé (grama) |
| Venonat | 20% | 24, 26 | A pé (grama) |
| Ditto | 15% | 23 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_14
Nota: a água da rota é inacessível legitimamente em Red/Blue, então pesca listada
na fonte foi omitida aqui por ser inalcançável em jogo normal.

### Route 13
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 35% | 25, 27 | A pé (grama) |
| Oddish | 35% | 22, 24, 26 | A pé (grama) |
| Gloom | 5% | 28, 30 | A pé (grama) |
| Venonat | 20% | 24, 26 | A pé (grama) |
| Ditto | 5% | 25 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Tentacool | 25% | 5 | Pesca (Super Rod) |
| Krabby | 25% | 15 | Pesca (Super Rod) |
| Goldeen | 25% | 15 | Pesca (Super Rod) |
| Magikarp | 25% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_13
Nota: Slowpoke/Slowbro via Surf são exclusivos de Yellow aqui.

### Route 12
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 40% | 23, 25, 27 | A pé (grama) |
| Oddish | 35% | 22, 24, 26 | A pé (grama) |
| Gloom | 5% | 28, 30 | A pé (grama) |
| Venonat | 20% | 24, 26 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Tentacool | 25% | 5 | Pesca (Super Rod) |
| Krabby | 25% | 15 | Pesca (Super Rod) |
| Goldeen | 25% | 15 | Pesca (Super Rod) |
| Magikarp | 25% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_12
Nota: sem encontros de Surf em Red aqui (Slowpoke/Slowbro via Surf só a partir de
Yellow).

### Líder — Sabrina (Saffron City)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Kadabra | 38 |
| 2 | Mr. Mime | 37 |
| 3 | Venomoth | 38 |
| 4 | Alakazam | 43 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sabrina

---

## Trecho 7 — Saffron → Cinnabar (Ginásio 7: Blaine)

Locais reais agrupados: Route 19, Route 20, Seafoam Islands.

**Sugestão de arte de fundo:** trecho todo aquático (Route 19/20 são 100% mar) —
água aberta, ondas; Seafoam Islands como caverna de gelo/rocha úmida (contraste
com a lava de Cinnabar logo depois, que é uma ilha vulcânica).

### Route 19
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Tentacool | 100% | 5, 10, 15, 20, 30, 35, 40 | Surf |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Shellder | 25% | 15 | Pesca (Super Rod) |
| Horsea | 25% | 15 | Pesca (Super Rod) |
| Goldeen | 25% | 15 | Pesca (Super Rod) |
| Staryu | 25% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_19 (rota 100% aquática
em Red, sem grama)

### Route 20
Mesma tabela de Route 19 (Tentacool 100% via Surf + mesma tabela de pesca).
Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_20

### Seafoam Islands
| Andar | Pokémon | Chance (Red) | Nível |
|---|---|---|---|
| 1F | Zubat | 10% | 21 |
| 1F | Golbat | 5% | 29 |
| 1F | Psyduck | 5% | 28 |
| 1F | Golduck | 1% | 38 |
| 1F | Slowpoke | 20% | 30 |
| 1F | Seel | 20% | 30 |
| 1F | Shellder | 19% | 28, 30 |
| 1F | Horsea | 20% | 28, 30 |
| B1F | Slowpoke | 15% | 28, 30 |
| B1F | Seel | 15% | 28, 30 |
| B1F | Dewgong | 4% | 38 |
| B1F | Shellder | 15% | 32 |
| B1F | Horsea | 30% | 30, 32 |
| B1F | Seadra | 1% | 37 |
| B1F | Staryu | 20% | 30 |
| B2F | Golbat | 4% | 30 |
| B2F | Slowpoke | 30% | 30, 32 |
| B2F | Slowbro | 1% | 37 |
| B2F | Seel | 35% | 30, 32 |
| B2F | Shellder | 5% | 28 |
| B2F | Horsea | 15% | 28, 30 |
| B2F | Staryu | 10% | 30 |
| B3F | Slowpoke | 35% | 31, 33 |
| B3F | Seel | 30% | 31, 33 |
| B3F | Dewgong | 1% | 37 |
| B3F | Shellder | 15% | 29, 31 |
| B3F | Horsea | 15% | 29, 31 |
| B3F | Seadra | 4% | 39 |
| B4F | Golbat | 1% | 32 |
| B4F | Slowpoke | 15% | 29, 31 |
| B4F | Slowbro | 4% | 39 |
| B4F | Seel | 15% | 29, 31 |
| B4F | Shellder | 30% | 31, 33 |
| B4F | Horsea | 35% | 31, 33 |

(Método: a pé, caverna, em todos os andares; mais pesca com a mesma tabela de
Route 19/20.) Fonte: https://bulbapedia.bulbagarden.net/wiki/Seafoam_Islands

### Líder — Blaine (Cinnabar Island)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Growlithe | 42 |
| 2 | Ponyta | 40 |
| 3 | Rapidash | 42 |
| 4 | Arcanine | 47 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Blaine

---

## Trecho 8 — volta a Viridian (Ginásio 8: Giovanni) → Victory Road → Elite Four

Locais reais agrupados: Route 21, Route 22, Route 23, Victory Road.

**Sugestão de arte de fundo:** Route 21 aquática (Surf) fechando o círculo até
perto de Pallet; Route 22/23 voltando a terra firme, ficando mais rochoso e
íngreme; Victory Road como caverna de montanha mais dura/imponente que todas as
anteriores — é o "boss dungeon" antes da Elite Four, merece se destacar
visualmente (tons frios, pedra escura, talvez neblina).

### Route 21
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Pidgey | 30% | 21, 23 | A pé (grama) |
| Pidgeotto | 15% | 30, 32 | A pé (grama) |
| Rattata | 30% | 21, 23 | A pé (grama) |
| Raticate | 15% | 30 | A pé (grama) |
| Tangela | 10% | 28, 30, 32 | A pé (grama) |
| Tentacool | 100% | 5, 10, 15, 20, 30, 35, 40 | Surf |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Shellder | 25% | 15 | Pesca (Super Rod) |
| Horsea | 25% | 15 | Pesca (Super Rod) |
| Goldeen | 25% | 15 | Pesca (Super Rod) |
| Staryu | 25% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_21

### Route 22
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Rattata | 45% | 2–4 | A pé (grama) |
| Spearow | 10% | 3, 5 | A pé (grama) |
| Nidoran♀ | 5% | 3–4 | A pé (grama) |
| Nidoran♂ | 40% | 2–4 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Poliwag | 50% | 15 | Pesca (Super Rod) |
| Goldeen | 50% | 15 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_22

### Route 23
| Pokémon | Chance (Red) | Nível | Método |
|---|---|---|---|
| Spearow | 15% | 26 | A pé (grama) |
| Fearow | 25% | 38, 41, 43 | A pé (grama) |
| Ekans | 20% | 26 | A pé (grama) |
| Arbok | 5% | 41 | A pé (grama) |
| Ditto | 35% | 33, 38, 43 | A pé (grama) |
| Magikarp | 100% | 5 | Pesca (Old Rod) |
| Poliwag | 50% | 10 | Pesca (Good Rod) |
| Goldeen | 50% | 10 | Pesca (Good Rod) |
| Slowbro | 25% | 23 | Pesca (Super Rod) |
| Kingler | 25% | 23 | Pesca (Super Rod) |
| Seadra | 25% | 23 | Pesca (Super Rod) |
| Seaking | 25% | 23 | Pesca (Super Rod) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kanto_Route_23

### Victory Road
| Andar | Pokémon | Chance (Red) | Nível |
|---|---|---|---|
| 1F | Zubat | 15% | 22 |
| 1F | Golbat | 5% | 41 |
| 1F | Machop | 20% | 24 |
| 1F | Machoke | 4% | 42 |
| 1F | Geodude | 20% | 26 |
| 1F | Graveler | 5% | 41 |
| 1F | Onix | 30% | 36, 39, 42 |
| 1F | Marowak | 1% | 43 |
| 2F | Zubat | 15% | 26 |
| 2F | Golbat | 5% | 40 |
| 2F | Machop | 20% | 22 |
| 2F | Machoke | 5% | 41 |
| 2F | Geodude | 20% | 24 |
| 2F | Graveler | 1% | 43 |
| 2F | Onix | 30% | 36, 39, 42 |
| 2F | Marowak | 4% | 40 |
| 3F | Zubat | 15% | 22 |
| 3F | Golbat | 5% | 41 |
| 3F | Venomoth | 10% | 40 |
| 3F | Machop | 20% | 24 |
| 3F | Machoke | 5% | 42, 45 |
| 3F | Geodude | 20% | 26 |
| 3F | Graveler | 5% | 43 |
| 3F | Onix | 20% | 42, 45 |

(Método: a pé, caverna; sem Surf/pesca em Red aqui.)
Fonte: https://bulbapedia.bulbagarden.net/wiki/Victory_Road_(Kanto)

### Líder — Giovanni (Viridian City, ginásio final antes da Elite Four)
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Rhyhorn | 45 |
| 2 | Dugtrio | 42 |
| 3 | Nidoqueen | 44 |
| 4 | Nidoking | 45 |
| 5 | Rhydon | 50 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Giovanni

---

## Elite Four + Campeão

**Sugestão de arte de fundo:** Indigo Plateau — salão formal/imponente, cada sala
da Elite Four temática por tipo (gelo/água pra Lorelei, luta/pedra pra Bruno,
fantasma/veneno pra Agatha, dragão pra Lance), campeão num salão final mais
grandioso que os outros.

### Lorelei
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Dewgong | 54 |
| 2 | Cloyster | 53 |
| 3 | Slowbro | 54 |
| 4 | Jynx | 56 |
| 5 | Lapras | 56 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lorelei

### Bruno
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Onix | 53 |
| 2 | Hitmonchan | 55 |
| 3 | Hitmonlee | 55 |
| 4 | Onix | 56 |
| 5 | Machamp | 58 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Bruno

### Agatha
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Gengar | 56 |
| 2 | Golbat | 56 |
| 3 | Haunter | 55 |
| 4 | Arbok | 58 |
| 5 | Gengar | 60 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Agatha

### Lance
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Gyarados | 58 |
| 2 | Dragonair | 56 |
| 3 | Dragonair | 56 |
| 4 | Aerodactyl | 60 |
| 5 | Dragonite | 62 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lance

### Campeão (rival) — time varia conforme o inicial do jogador
No jogo original o time do rival campeão depende do starter escolhido pelo
jogador (contra-tipo + starter final trocam). Como o roadmap do projeto já
prevê escolha de inicial, faz sentido espelhar essa lógica: 4 membros fixos +
2 que variam por starter.

**Se o jogador escolheu Bulbasaur:**
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Pidgeot | 61 |
| 2 | Alakazam | 59 |
| 3 | Rhydon | 61 |
| 4 | Exeggutor | 61 |
| 5 | Gyarados | 63 |
| 6 | Charizard | 65 |

**Se o jogador escolheu Charmander:**
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Pidgeot | 61 |
| 2 | Alakazam | 59 |
| 3 | Rhydon | 61 |
| 4 | Arcanine | 61 |
| 5 | Exeggutor | 63 |
| 6 | Blastoise | 65 |

**Se o jogador escolheu Squirtle:**
| Ordem | Pokémon | Nível |
|---|---|---|
| 1 | Pidgeot | 61 |
| 2 | Alakazam | 59 |
| 3 | Rhydon | 61 |
| 4 | Gyarados | 61 |
| 5 | Arcanine | 63 |
| 6 | Venusaur | 65 |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Blue_(game)

---

## Pontos em aberto pro dono do projeto decidir

1. **Surf e pesca:** vários trechos (19, 20, 21, Seafoam) têm Pokémon só via Surf
   ou vara de pescar — mecânicas que o jogo ainda não tem (roadmap não menciona
   Surf/pesca). Precisa decidir: implementa essas mecânicas, ou esses encontros
   ficam de fora / viram só grama simplificada nessas rotas?
2. **Agrupamento dos trechos:** o agrupamento acima é uma linearização — a
   geografia real tem desvios (ex: Route 24/25 é um desvio pra Bill's House, não
   o caminho principal pra Vermilion). Se quiser, dá pra redesenhar os 8 trechos
   com locais diferentes.
3. **Elite Four/Victory Road:** o roadmap diz que ginásios dão insígnia + a Elite
   4 é o portão do rebirth (seção 8). Este doc já traz os dados prontos da Elite
   Four e do campeão pra quando chegarmos lá (Sprint 21), não precisa pesquisar de
   novo.
4. **Níveis reais vs. escala do jogo:** os níveis acima são os do jogo original
   (RPG por turnos, save único). No PokéIdle a progressão é diferente (idle,
   múltiplos loops, rebirth) — bater 1:1 com esses níveis pode não fazer sentido
   de balanceamento; considerar usá-los como referência de *proporção* entre
   áreas, não como número absoluto.
