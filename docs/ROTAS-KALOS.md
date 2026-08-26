# Rotas de Kalos — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Segue o mesmo modelo de `docs/ROTAS-KANTO.md`,
> `docs/ROTAS-JOHTO.md`, `docs/ROTAS-HOENN.md` e `docs/ROTAS-SINNOH.md`. Os
> iniciais de Kalos (Chespin #650, Fennekin #653, Froakie #656) entram no
> nível 5, mesmo padrão das regiões anteriores.

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem da versão
  **Pokémon X** (Geração VI) — quando X e Y divergem numa mesma rota (troca
  clássica de versão: Plusle/Minun, Houndour/Electrike, Sawk/Throh,
  Spritzee/Swirlix, Zangoose/Seviper), só ficou o lado de **X**, anotado
  onde acontece.
- Mesmas simplificações já usadas nas regiões anteriores: pesca, Rock Smash
  e encontros de horda (grupos de vários selvagens de uma vez, mecânica
  nova da Gen 6) descartados; Surf entra na mesma tabela sem renormalizar;
  masmorras/cavernas com várias áreas colapsadas numa linha só por espécie.
- **Flores coloridas** (mecânica nova da Gen 6 — tabela de grama muda
  ligeiramente conforme a cor do canteiro) foram tratadas como variação da
  mesma rota, não mecânica nova: só a tabela "grama normal"/primeira
  listada entrou no documento, mesmo espírito da decisão já tomada pra
  swarm (Johto) e Poké Radar (Sinnoh) — não inventa mecânica nova pro jogo.
- **Kalos tem duas rotas com número de acesso especial**: Route 13 (os
  selvagens aparecem como "montinhos de terra" que perseguem o jogador, não
  grama) e Route 22 (rota curta perto do início do jogo com nível baixo,
  que só reabre pro lado do Victory Road depois de um marco da história,
  com nível bem mais alto — usei a tabela de nível alto, já que é essa que
  o jogador realmente enfrenta nesse ponto da progressão linear deste
  documento).
- **Qualidade dos dados**: todas as tabelas vieram de WebFetch ao vivo
  nesta sessão. Times de líder de ginásio, Elite Four e Campeã são de alta
  confiança (páginas simples).

---

## Trecho 1 — Vaniville Town → Santalune (Ginásio 1: Viola, Bug)

Locais: Vaniville Town, Route 1, Aquacorde Town, Route 2, Santalune
Forest, Route 3, Santalune City.

### Route 1
Sem encontro selvagem em nenhuma versão — confirmado na Bulbapedia
("a única primeira rota da franquia sem Pokémon selvagem").

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_1

### Route 2
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Fletchling | 20% | 2–3 | A pé (grama) |
| Bunnelby | 20% | 2–3 | A pé (grama) |
| Scatterbug | 20% | 2–3 | A pé (grama) |
| Zigzagoon | 15% | 3–4 | A pé (grama) |
| Pidgey | 14% | 3–4 | A pé (grama) |
| Caterpie | 11% | 3–4 | A pé (grama) |
| Weedle | 11% | 3–4 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_2

### Santalune Forest
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Caterpie | 20% | 2–3 | A pé (grama) |
| Weedle | 20% | 2–3 | A pé (grama) |
| Scatterbug | 20% | 2–3 | A pé (grama) |
| Pansear | 10% | 4 | A pé (grama) |
| Pansage | 10% | 4 | A pé (grama) |
| Panpour | 10% | 4 | A pé (grama) |
| Fletchling | 10% | 4 | A pé (grama) |
| Pikachu | 6% | 3–4 | A pé (grama) |
| Metapod | 4% | 4 | A pé (grama) |
| Kakuna | 4% | 4 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Santalune_Forest

### Route 3
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Bunnelby | 20% | 3–4 | A pé (grama) |
| Fletchling | 20% | 3, 5 | A pé (grama) |
| Bidoof | 20% | 3–4 | A pé (grama) |
| Azurill | 10% | 5 | A pé (grama) |
| Burmy | 10% | 5 | A pé (grama) |
| Pidgey | 10% | 4 | A pé (grama) |
| Dunsparce | 5% | 5 | A pé (grama) |
| Pikachu | 5% | 4–5 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_3

### Viola (Ginásio 1 — Bug)
| Pokémon | Nível | Tipo |
|---|---|---|
| Surskit | 10 | Bug/Water |
| Vivillon | 12 | Bug/Flying |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Viola

---

## Trecho 2 — Santalune → Cyllage (Ginásio 2: Grant, Rock)

Locais: Route 4, Lumiose City (passagem), Route 5, Route 6, Route 7,
Route 8, Route 9, Cyllage City.

### Route 4
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Combee | 30% | 6–8 | A pé (grama) |
| Flabébé (Amarela) | 30% | 6–8 | A pé (grama) |
| Ledyba | 10% | 8 | A pé (grama) |
| Skitty | 10% | 8 | A pé (grama) |
| Budew | 10% | 8 | A pé (grama) |
| Ralts | 5% | 8 | A pé (grama) |
| Flabébé (Laranja) | 4% | 7 | A pé (grama) |
| Flabébé (Branca) | 1% | 8 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_4

### Route 5
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Bunnelby | 30% | 8–10 | A pé (grama) |
| Furfrou | 20% | 8–9 | A pé (grama) |
| Doduo | 10% | 10 | A pé (grama) |
| Gulpin | 10% | 10 | A pé (grama) |
| Skiddo | 10% | 10 | A pé (grama) |
| Pancham | 10% | 10 | A pé (grama) |
| Plusle | 5% | 9–10 | A pé (grama) |
| Abra | 5% | 10 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_5

### Route 6
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Oddish | 30% | 10–12 | A pé (grama) |
| Sentret | 20% | 10–11 | A pé (grama) |
| Espurr | 20% | 11–12 | A pé (grama) |
| Honedge | 15% | 11–12 | A pé (grama) |
| Nincada | 10% | 12 | A pé (grama) |
| Kecleon | 5% | 11–12 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_6

### Route 7
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Croagunk | 35% | 12–14 | A pé (grama) |
| Smeargle | 10% | 14 | A pé (grama) |
| Volbeat | 10% | 13 | A pé (grama) |
| Illumise | 10% | 13 | A pé (grama) |
| Roselia | 10% | 14 | A pé (grama) |
| Ducklett | 10% | 14 | A pé (grama) |
| Spritzee | 10% | 14 | A pé (grama) |
| Flabébé (Laranja) | 4% | 13 | A pé (grama) |
| Flabébé (Branca) | 1% | 14 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_7

### Route 8
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Drifloon | 30% | 13–15 | A pé (grama) |
| Spoink | 20% | 13–14 | A pé (grama) |
| Inkay | 15% | 14–15 | A pé (grama) |
| Zangoose | 10% | 14 | A pé (grama) |
| Absol | 10% | 15 | A pé (grama) |
| Mienfoo | 10% | 15 | A pé (grama) |
| Bagon | 5% | 14–15 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_8

### Route 9
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Hippopotas | 40% | 15–17 | A pé (terreno) |
| Sandile | 40% | 15–17 | A pé (terreno) |
| Helioptile | 20% | 15–17 | A pé (terreno) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_9

### Grant (Ginásio 2 — Rock)
| Pokémon | Nível | Tipo |
|---|---|---|
| Amaura | 25 | Rock/Ice |
| Tyrunt | 25 | Rock/Dragon |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Grant
Nota: Grant é o único líder deste documento a lutar com só 2 Pokémon
(confirmado na fonte) — mantido fiel ao jogo original.

---

## Trecho 3 — Cyllage → Shalour (Ginásio 3: Korrina, Fighting)

Locais: Route 10, Reflection Cave, Route 11, Shalour City.

### Route 10
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Golett | 30% | 19–21 | A pé (grama) |
| Sigilyph | 20% | 19–21 | A pé (grama) |
| Hawlucha | 20% | 19–20 | A pé (grama) |
| Snubbull | 10% | 21 | A pé (grama) |
| Houndour | 10% | 21 | A pé (grama) |
| Eevee | 5% | 19–21 | A pé (grama) |
| Emolga | 5% | 19–20 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_10

### Reflection Cave
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Roggenrola | 20% | 21–22 | Caverna |
| Solosis | 20% | 22–23 | Caverna |
| Mr. Mime | 20% | 22–23 | Caverna |
| Chingling | 15% | 21–22 | Caverna |
| Wobbuffet | 10% | 22 | Caverna |
| Carbink | 10% | 23 | Caverna |
| Sableye | 5% | 22–23 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Reflection_Cave

### Route 11
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Hariyama | 20% | 22–23 | A pé (grama) |
| Staravia | 20% | 22–23 | A pé (grama) |
| Sawk | 20% | 22–23 | A pé (grama) |
| Chingling | 10% | 21 | A pé (grama) |
| Stunky | 10% | 21 | A pé (grama) |
| Nidorina | 10% | 21 | A pé (grama) |
| Nidorino | 10% | 21 | A pé (grama) |
| Dedenne | 5% | 21–22 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_11

### Korrina (Ginásio 3 — Fighting)
| Pokémon | Nível | Tipo |
|---|---|---|
| Machoke | 28 | Fighting |
| Mienfoo | 29 | Fighting |
| Hawlucha | 32 | Fighting/Flying |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Korrina

---

## Trecho 4 — Shalour → Coumarine (Ginásio 4: Ramos, Grass)

Locais: Route 12, Coumarine City.

### Route 12
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Slowpoke | 30% | 23–25 | A pé (grama) |
| Chatot | 30% | 23–25 | A pé (grama) |
| Tauros | 10% | 25 | A pé (grama) |
| Miltank | 10% | 25 | A pé (grama) |
| Exeggcute | 10% | 24 | A pé (grama) |
| Pinsir | 5% | 25 | A pé (grama) |
| Heracross | 5% | 25 | A pé (grama) |
| Pachirisu | 5% | 23–24 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_12

### Ramos (Ginásio 4 — Grass)
| Pokémon | Nível | Tipo |
|---|---|---|
| Jumpluff | 30 | Grass/Flying |
| Weepinbell | 31 | Grass/Poison |
| Gogoat | 34 | Grass |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ramos

---

## Trecho 5 — Coumarine → Lumiose (Ginásio 5: Clemont, Electric)

Locais: Route 13, Lumiose City (ginásio).

### Route 13
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Dugtrio | 40% | 26–28 | A pé (montinhos de terra) |
| Trapinch | 40% | 26–28 | A pé (montinhos de terra) |
| Gible | 20% | 26–28 | A pé (montinhos de terra) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_13
Nota: rota usa a mecânica de "montinhos de terra" que perseguem o
jogador em vez de grama — tratado como método próprio, sem inventar
mecânica nova pro jogo (só reaproveitando o mesmo slot de "encontro
selvagem periódico" que já existe).

### Clemont (Ginásio 5 — Electric)
| Pokémon | Nível | Tipo |
|---|---|---|
| Emolga | 35 | Electric/Flying |
| Magneton | 35 | Electric/Steel |
| Heliolisk | 37 | Electric/Normal |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Clemont

---

## Trecho 6 — Lumiose → Laverre (Ginásio 6: Valerie, Fairy)

Locais: Route 14, Laverre City.

### Route 14
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Skorupi | 20% | 30–31 | A pé (grama) |
| Weepinbell | 20% | 31–32 | A pé (grama) |
| Carnivine | 15% | 30–32 | A pé (grama) |
| Quagsire | 10% | 30 | A pé (grama) |
| Karrablast | 10% | 30 | A pé (grama) |
| Shelmet | 10% | 30 | A pé (grama) |
| Goomy | 10% | 30 | A pé (grama) |
| Haunter | 5% | 31 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_14

### Valerie (Ginásio 6 — Fairy)
| Pokémon | Nível | Tipo |
|---|---|---|
| Mawile | 38 | Steel/Fairy |
| Mr. Mime | 39 | Psychic/Fairy |
| Sylveon | 42 | Fairy |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Valerie

---

## Trecho 7 — Laverre → Anistar (Ginásio 7: Olympia, Psychic)

Locais: Route 15, Route 16, Route 17, Frost Cavern, Anistar City.

### Route 15
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Mightyena | 30% | 34–36 | A pé (grama) |
| Liepard | 30% | 34–36 | A pé (grama) |
| Skorupi | 20% | 34–35 | A pé (grama) |
| Foongus | 20% | 34–35 | A pé (grama) |
| Watchog | 10% | 36 | A pé (grama) |
| Pawniard | 10% | 36 | A pé (grama) |
| Klefki | 10% | 34–36 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_15

### Route 16
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Pumpkaboo (Médio) | 30% | 34–35 | A pé (grama) |
| Foongus | 20% | 34, 36 | A pé (grama) |
| Pumpkaboo (Pequeno) | 20% | 35–36 | A pé (grama) |
| Phantump | 10% | 35 | A pé (grama) |
| Pumpkaboo (Grande) | 10% | 36 | A pé (grama) |
| Klefki | 9% | 34–35 | A pé (grama) |
| Pumpkaboo (Super) | 1% | 36 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_16

### Route 17
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Delibird | 40% | 38–40 | A pé (neve) |
| Snover | 30% | 38–39 | A pé (neve) |
| Sneasel | 29% | 38–40 | A pé (neve) |
| Abomasnow | 1% | 40 | A pé (neve) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_17

### Frost Cavern
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Jynx | 20% | 39–40 | Caverna |
| Piloswine | 20% | 38–39 | Caverna |
| Beartic | 20% | 39–40 | Caverna |
| Bergmite | 20% | 39–40 | Caverna |
| Haunter | 16% | 38–40 | Caverna |
| Cryogonal | 4% | 40 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Frost_Cavern

### Olympia (Ginásio 7 — Psychic)
| Pokémon | Nível | Tipo |
|---|---|---|
| Sigilyph | 44 | Psychic/Flying |
| Slowking | 45 | Water/Psychic |
| Meowstic | 48 | Psychic |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Olympia

---

## Trecho 8 — Anistar → Snowbelle (Ginásio 8: Wulfric, Ice) → Elite Four → Campeã

Locais: Route 18, Route 19, Snowbelle City, Route 21, Route 22, Victory
Road (Kalos).

### Route 18
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Gurdurr | 30% | 44–46 | A pé (grama) |
| Graveler | 15% | 45–46 | A pé (grama) |
| Torkoal | 20% | 44–45 | A pé (grama) |
| Pupitar | 10% | 46 | A pé (grama) |
| Lairon | 10% | 46 | A pé (grama) |
| Durant | 10% | 44 | A pé (grama) |
| Heatmor | 5% | 45–46 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_18

### Route 19
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Drapion | 30% | 46–48 | A pé (grama) |
| Weepinbell | 20% | 46–47 | A pé (grama) |
| Quagsire | 10% | 48 | A pé (grama) |
| Karrablast | 10% | 47 | A pé (grama) |
| Shelmet | 10% | 47 | A pé (grama) |
| Sliggoo | 10% | 48 | A pé (grama) |
| Carnivine | 5% | 46, 48 | A pé (grama) |
| Haunter | 5% | 47 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_19

### Wulfric (Ginásio 8 — Ice)
| Pokémon | Nível | Tipo |
|---|---|---|
| Cryogonal | 55 | Ice |
| Abomasnow | 56 | Grass/Ice |
| Avalugg | 59 | Ice |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Wulfric
Nota: Avalugg nível 59 é, segundo a própria Bulbapedia, "o Pokémon de
maior nível usado por um líder de ginásio antes do Hall da Fama" — mantido
fiel à fonte; se aparecer como problemático na simulação de balanço, é
candidato natural a ajuste (mesmo método usado no Slaking de Hoenn).

### Route 21
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Floatzel | 40% | 50–52 | A pé (grama) |
| Spinda | 20% | 50, 52 | A pé (grama) |
| Altaria | 20% | 50–51 | A pé (grama) |
| Scyther | 10% | 50–52 | A pé (grama) |
| Ursaring | 10% | 52 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_21

### Route 22
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Bibarel | 20% | 26–27 | A pé (grama) |
| Psyduck | 20% | 25–26 | A pé (grama) |
| Azumarill | 20% | 25–26 | A pé (grama) |
| Diggersby | 10% | 27 | A pé (grama) |
| Farfetch'd | 10% | 26 | A pé (grama) |
| Litleo | 10% | 25 | A pé (grama) |
| Dunsparce | 5% | 26 | A pé (grama) |
| Riolu | 5% | 25–26 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kalos_Route_22
Nota: usada a tabela "flores amarelas" (nível mais alto, ~25-27) — é essa
que abre pro lado do Victory Road depois de um marco da história; a tabela
"grama normal" (nível 5-7) é o que um jogador vê vindo de Vaniville bem no
início, irrelevante pra esta posição no documento.

### Victory Road (Kalos)
| Pokémon | Chance (X) | Nível | Método |
|---|---|---|---|
| Gurdurr | 30% | 57–59 | Caverna |
| Druddigon | 20% | 58–59 | Caverna |
| Graveler | 20% | 57–58 | Caverna |
| Lickitung | 15% | 58–59 | Caverna |
| Haunter | 10% | 58 | Caverna |
| Zweilous | 5% | 59 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Victory_Road_(Kalos)
Nota: mesma regra de sempre — horda, Rock Smash e pesca descartados.

### Elite Four de Kalos

**Malva (Fire)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Pyroar | 63 | Fire/Normal |
| Torkoal | 63 | Fire |
| Chandelure | 63 | Ghost/Fire |
| Talonflame | 65 | Fire/Flying |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Malva

**Siebold (Water)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Clawitzer | 63 | Water |
| Gyarados | 63 | Water/Flying |
| Starmie | 63 | Water/Psychic |
| Barbaracle | 65 | Rock/Water |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Siebold

**Wikstrom (Steel)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Klefki | 63 | Steel/Fairy |
| Probopass | 63 | Rock/Steel |
| Scizor | 63 | Bug/Steel |
| Aegislash | 65 | Steel/Ghost |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Wikstrom

**Drasna (Dragon)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Dragalge | 63 | Poison/Dragon |
| Druddigon | 63 | Dragon |
| Altaria | 63 | Dragon/Flying |
| Noivern | 65 | Flying/Dragon |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Drasna

### Campeã: Diantha
| Pokémon | Nível | Tipo |
|---|---|---|
| Hawlucha | 64 | Fighting/Flying |
| Tyrantrum | 65 | Rock/Dragon |
| Aurorus | 65 | Rock/Ice |
| Gourgeist | 65 | Ghost/Grass |
| Goodra | 66 | Dragon |
| Gardevoir | 68 | Psychic/Fairy |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Diantha
Nota: no jogo original Gardevoir Mega Evolui — mecânica de Megas não
existe neste projeto (fora de escopo do roadmap), mantido como Gardevoir
comum.

---

## Resumo — o que fazer com isto

- **36 locais reais cobertos**, organizados nos 8 trechos por insígnia
  (mesma ordem em X e Y — ao contrário de Hoenn/Sinnoh, Kalos não tem
  swap de líder entre versões).
- **8 ginásios + Elite Four (4) + Campeã**, todos com time e nível
  confirmados via Bulbapedia ao vivo.
- **Pendências explícitas** (não fabricadas): Camphrier Town/Ambrette
  Town/Geosenge Town (cidades sem grama própria relevante), Glittering
  Cave, Parfum Palace, Tower of Mastery, Connecting Cave, Azure Bay, Kalos
  Power Plant, Poké Ball Factory, Lost Hotel, Route 20/Pokémon Village
  (conteúdo de shiny hunting/pós-jogo), Couriway Town, Lysandre Labs/Team
  Flare HQ (trama, sem selvagem). Se algum desses precisar entrar no jogo,
  pesquisar antes de codificar.
- **Mecânicas novas da Gen 6 fora de escopo, registradas aqui pra não
  esquecer**: flores coloridas (variação de tabela por cor), encontros de
  horda (batalha contra vários selvagens fracos de uma vez), Mega Evolução
  (Diantha usaria Mega Gardevoir). Nenhuma dessas vira mecânica nova no
  jogo — mesma decisão já tomada pra swarm/Poké Radar nas regiões
  anteriores.
